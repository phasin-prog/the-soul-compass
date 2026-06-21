import 'server-only';

import {
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getR2BucketName, getR2Client } from './client';
import { normalizeWikiArticleMeta } from '@/lib/wiki/article-metadata';
import type { WikiArticle, WikiArticleMeta } from '@/lib/wiki/types';

function ownerPrefix(ownerId: string): string {
  return `wiki/${encodeURIComponent(ownerId)}`;
}

function articlePrefix(ownerId: string, articleId: string): string {
  return `${ownerPrefix(ownerId)}/${encodeURIComponent(articleId)}`;
}

export function getWikiArticleKeys(ownerId: string, articleId: string) {
  const prefix = articlePrefix(ownerId, articleId);

  return {
    prefix,
    markdownKey: `${prefix}/article.md`,
    metadataKey: `${prefix}/meta.json`,
  };
}

async function readTextObject(key: string): Promise<string | null> {
  try {
    const response = await getR2Client().send(
      new GetObjectCommand({
        Bucket: getR2BucketName(),
        Key: key,
      })
    );

    return response.Body ? await response.Body.transformToString('utf-8') : '';
  } catch (error) {
    const status =
      typeof error === 'object' &&
      error !== null &&
      '$metadata' in error &&
      typeof error.$metadata === 'object' &&
      error.$metadata !== null &&
      'httpStatusCode' in error.$metadata
        ? error.$metadata.httpStatusCode
        : undefined;

    if (status === 404) return null;
    throw error;
  }
}

export async function getR2Text(key: string): Promise<string | null> {
  return readTextObject(key);
}

export async function getWikiArticle(
  ownerId: string,
  articleId: string
): Promise<WikiArticle | null> {
  const keys = getWikiArticleKeys(ownerId, articleId);
  const [metadataText, content] = await Promise.all([
    readTextObject(keys.metadataKey),
    readTextObject(keys.markdownKey),
  ]);

  if (!metadataText || content === null) return null;

  const metadata = normalizeWikiArticleMeta(
    JSON.parse(metadataText),
    keys.markdownKey
  );

  if (
    !metadata ||
    metadata.ownerId !== ownerId ||
    metadata.id !== articleId
  ) {
    return null;
  }

  return { ...metadata, content };
}

export async function listWikiArticles(
  ownerId: string
): Promise<WikiArticleMeta[]> {
  const metadataKeys: string[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await getR2Client().send(
      new ListObjectsV2Command({
        Bucket: getR2BucketName(),
        Prefix: `${ownerPrefix(ownerId)}/`,
        ContinuationToken: continuationToken,
      })
    );

    for (const object of response.Contents || []) {
      if (object.Key?.endsWith('/meta.json')) {
        metadataKeys.push(object.Key);
      }
    }

    continuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : undefined;
  } while (continuationToken);

  const metadata = await Promise.all(
    metadataKeys.map(async (key) => {
      const value = await readTextObject(key);
      if (!value) return null;

      const markdownKey = key.replace(/meta\.json$/, 'article.md');
      return normalizeWikiArticleMeta(JSON.parse(value), markdownKey);
    })
  );

  return metadata
    .filter(
      (article): article is WikiArticleMeta =>
        article !== null && article.ownerId === ownerId
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveWikiArticle(article: WikiArticle): Promise<void> {
  const keys = getWikiArticleKeys(article.ownerId, article.id);
  const metadata: WikiArticleMeta = { ...article };
  delete (metadata as Partial<WikiArticle>).content;

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getR2BucketName(),
      Key: keys.markdownKey,
      Body: article.content,
      ContentType: 'text/markdown; charset=utf-8',
      CacheControl: 'private, no-store',
    })
  );

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getR2BucketName(),
      Key: keys.metadataKey,
      Body: JSON.stringify(metadata, null, 2),
      ContentType: 'application/json; charset=utf-8',
      CacheControl: 'private, no-store',
    })
  );
}

export async function deleteWikiArticle(
  ownerId: string,
  articleId: string
): Promise<void> {
  const { prefix } = getWikiArticleKeys(ownerId, articleId);
  const response = await getR2Client().send(
    new ListObjectsV2Command({
      Bucket: getR2BucketName(),
      Prefix: `${prefix}/`,
    })
  );

  const objects = (response.Contents || [])
    .map((object) => object.Key)
    .filter((key): key is string => Boolean(key))
    .map((Key) => ({ Key }));

  if (objects.length === 0) return;

  await getR2Client().send(
    new DeleteObjectsCommand({
      Bucket: getR2BucketName(),
      Delete: { Objects: objects, Quiet: true },
    })
  );
}

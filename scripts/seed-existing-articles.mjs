import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';
import matter from 'gray-matter';

for (const envFile of ['.env', '.env.local']) {
  if (existsSync(envFile)) process.loadEnvFile(envFile);
}

function required(name, fallbackName) {
  const value = process.env[name] || process.env[fallbackName];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function argument(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const ownerId = argument('owner-id') || process.env.STUDIO_SEED_OWNER_ID;
const ownerName =
  argument('owner-name') ||
  process.env.STUDIO_SEED_OWNER_NAME ||
  'Phasin Pasumart';
const force = process.argv.includes('--force');

if (!ownerId) {
  throw new Error(
    'Pass --owner-id <Clerk user id> or set STUDIO_SEED_OWNER_ID.'
  );
}

const supabase = createClient(
  required('NEXT_PUBLIC_SUPABASE_URL'),
  required('SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY'),
  { auth: { autoRefreshToken: false, persistSession: false } }
);
const r2 = new S3Client({
  region: 'auto',
  endpoint: required('R2_ENDPOINT'),
  credentials: {
    accessKeyId: required('R2_ACCESS_KEY_ID'),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
  },
});
const bucket = required('R2_BUCKET_NAME');
const contentRoot = path.join(process.cwd(), 'content', 'articles');

function keys(articleId) {
  const prefix = `wiki/${encodeURIComponent(ownerId)}/${encodeURIComponent(articleId)}`;
  return {
    markdown: `${prefix}/article.md`,
    published: `${prefix}/published.md`,
    metadata: `${prefix}/meta.json`,
  };
}

async function objectExists(key) {
  try {
    await r2.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (error) {
    if (error?.$metadata?.httpStatusCode === 404) return false;
    throw error;
  }
}

function hash(content) {
  return createHash('sha256').update(content).digest('hex');
}

function outgoingLinks(content) {
  return Array.from(
    content.matchAll(/\[\[(article|concept):([^|\]]+)(?:\|([^\]]+))?\]\]/g),
    ([, kind, slug, label]) => ({
      kind,
      slug,
      label: label || slug,
    })
  );
}

const localeDirectories = await readdir(contentRoot, { withFileTypes: true });
const files = [];

for (const directory of localeDirectories) {
  if (!directory.isDirectory()) continue;
  const entries = await readdir(path.join(contentRoot, directory.name), {
    withFileTypes: true,
  });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(path.join(contentRoot, directory.name, entry.name));
    }
  }
}

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const { data, content } = matter(source);
  const articleId = String(data.id || `${data.language}-${data.slug}`);
  const articleKeys = keys(articleId);

  if (!force && (await objectExists(articleKeys.metadata))) {
    console.log(`skip ${data.language}/${data.slug}: already editable`);
    continue;
  }

  const contentMd = content.trim();
  const contentHash = hash(contentMd);
  const publishedAt = new Date(`${data.publishedAt}T00:00:00.000Z`).toISOString();
  const updatedAt = new Date(`${data.updatedAt}T00:00:00.000Z`).toISOString();
  const coverImage =
    data.coverImage ||
    {
      src: '/article-cover-fallback.svg',
      alt: String(data.title),
      width: 1600,
      height: 900,
    };
  const { data: existingPublication, error: existingError } = await supabase
    .from('article_publications')
    .select('id')
    .eq('language', data.language)
    .eq('slug', data.slug)
    .maybeSingle();

  if (existingError) throw existingError;

  const publicId = existingPublication?.id || articleId;
  const metadata = {
    schemaVersion: 3,
    id: articleId,
    publicId,
    ownerId,
    authorName: data.author || ownerName,
    title: data.title,
    subtitle: data.subtitle || '',
    slug: data.slug,
    locale: data.language,
    excerpt: data.excerpt,
    category: data.category,
    school: data.school,
    difficulty: data.difficulty,
    coverImage,
    tags: data.tags || [],
    aliases: [],
    outgoingLinks: outgoingLinks(contentMd),
    relatedConcepts: data.relatedConcepts || [],
    relatedArticles: data.relatedArticles || [],
    references: data.references || [],
    ...(data.seriesId ? { seriesId: data.seriesId } : {}),
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    translations: data.translations || {},
    featured: data.featured === true,
    status: 'published',
    markdownKey: articleKeys.markdown,
    contentHash,
    publishedContentHash: contentHash,
    publishedSlug: data.slug,
    readingMinutes: data.readingTime,
    createdAt: publishedAt,
    updatedAt,
    publishedAt,
  };

  await Promise.all([
    r2.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: articleKeys.markdown,
        Body: contentMd,
        ContentType: 'text/markdown; charset=utf-8',
        CacheControl: 'private, no-store',
      })
    ),
    r2.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: articleKeys.published,
        Body: contentMd,
        ContentType: 'text/markdown; charset=utf-8',
        CacheControl: 'public, max-age=3600',
      })
    ),
    r2.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: articleKeys.metadata,
        Body: JSON.stringify(metadata, null, 2),
        ContentType: 'application/json; charset=utf-8',
        CacheControl: 'private, no-store',
      })
    ),
  ]);

  const { error } = await supabase.from('article_publications').upsert(
    {
      id: publicId,
      slug: data.slug,
      language: data.language,
      status: 'published',
      title: data.title,
      subtitle: data.subtitle || '',
      excerpt: data.excerpt,
      category: data.category,
      school: data.school,
      difficulty: data.difficulty,
      reading_time: data.readingTime,
      published_at: publishedAt,
      updated_at: updatedAt,
      author: data.author || ownerName,
      cover_image: coverImage,
      cover_url: coverImage.src,
      cover_path: coverImage.path || null,
      cover_alt: coverImage.alt,
      tags: data.tags || [],
      aliases: [],
      related_concepts: data.relatedConcepts || [],
      related_articles: data.relatedArticles || [],
      references: data.references || [],
      series_id: data.seriesId || null,
      seo_title: data.seoTitle,
      seo_description: data.seoDescription,
      translations: data.translations || {},
      featured: data.featured === true,
      markdown_key: articleKeys.published,
      content_hash: contentHash,
    },
    { onConflict: 'id' }
  );

  if (error) throw error;
  console.log(`seeded ${data.language}/${data.slug}`);
}

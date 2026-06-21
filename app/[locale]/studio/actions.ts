'use server';

import { createHash, randomInt, randomUUID } from 'node:crypto';
import { auth, currentUser } from '@clerk/nextjs/server';
import readingTime from 'reading-time';
import { revalidatePath, updateTag } from 'next/cache';
import { z } from 'zod';
import {
  categoryIds,
  isCategoryId,
  type CategoryId,
} from '@/lib/content/categories';
import { schedulePostHogLog } from '@/lib/observability/posthog-logs';
import {
  deleteWikiArticle,
  getWikiArticle,
  getWikiArticleKeys,
  listWikiArticles,
  savePublishedWikiContent,
  saveWikiArticle,
} from '@/lib/r2/wiki-store';
import type { Locale } from '@/lib/site';
import {
  categorySchools,
  parseConceptLinks,
  parseReferences,
} from '@/lib/wiki/article-metadata';
import {
  ARTICLE_PUBLICATIONS_CACHE_TAG,
  articleCacheTag,
  articleLocaleCacheTag,
} from '@/lib/wiki/cache';
import {
  extractWikiLinks,
  parseCommaSeparated,
  slugifyWikiValue,
} from '@/lib/wiki/markdown';
import {
  publishWikiArticle,
  unpublishWikiArticle,
} from '@/lib/wiki/published';
import type {
  PublishRequirementKey,
  StudioActionResult,
  StudioArticleInput,
} from '@/lib/wiki/studio-types';
import type { WikiArticle } from '@/lib/wiki/types';
import {
  articleDifficulties,
  articleSchools,
  type ArticleDifficulty,
  type ArticleSchool,
} from '@/types/article';

const optionalUrl = z.union([z.literal(''), z.url()]);
const optionalCategory = z.union([z.literal(''), z.enum(categoryIds)]);
const optionalSchool = z.union([z.literal(''), z.enum(articleSchools)]);
const optionalDifficulty = z.union([
  z.literal(''),
  z.enum(articleDifficulties),
]);
const optionalDimension = z
  .string()
  .trim()
  .max(5)
  .regex(/^\d*$/, 'กรุณาใช้ตัวเลขเท่านั้น');

const articleInputSchema = z.object({
  title: z.string().trim().min(1, 'กรุณาใส่ชื่อบทความ').max(160),
  subtitle: z.string().trim().max(240),
  content: z.string().min(1, 'กรุณาใส่เนื้อหาบทความ').max(500_000),
  slug: z.string().trim().max(180),
  excerpt: z.string().trim().max(500),
  category: optionalCategory,
  school: optionalSchool,
  difficulty: optionalDifficulty,
  tags: z.string().max(1_000),
  aliases: z.string().max(1_000),
  relatedConcepts: z.string().max(10_000),
  relatedArticles: z.string().max(4_000),
  references: z.string().max(30_000),
  seriesId: z.string().trim().max(180),
  seoTitle: z.string().trim().max(160),
  seoDescription: z.string().trim().max(320),
  translationTh: z.string().trim().max(180),
  translationEn: z.string().trim().max(180),
  coverImageUrl: optionalUrl,
  coverImageAlt: z.string().trim().max(240),
  coverImageWidth: optionalDimension,
  coverImageHeight: optionalDimension,
  featured: z.boolean(),
});

interface AuthenticatedUser {
  userId: string;
  name: string;
}

interface PreparedArticle {
  article: WikiArticle;
  created: boolean;
}

function normalizeLocale(value: string): Locale {
  return value === 'en' ? 'en' : 'th';
}

async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const [{ userId }, user] = await Promise.all([auth(), currentUser()]);

  if (!userId) return null;

  const email = user?.primaryEmailAddress?.emailAddress;
  const name =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    email ||
    'The Soul’s Compass';

  return { userId, name };
}

function authenticationError(): StudioActionResult {
  return {
    status: 'error',
    message: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง',
  };
}

function validationError(error: z.ZodError): StudioActionResult {
  return {
    status: 'error',
    message: 'กรุณาตรวจข้อมูลที่กรอกอีกครั้ง',
    fieldErrors: error.flatten().fieldErrors,
  };
}

function createPublicId(): string {
  return String(Date.now() * 1000 + randomInt(0, 1000));
}

function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

function parseDimension(value: string, fallback: number): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function invalidatePublicArticleCaches(
  locale: Locale,
  currentSlug: string,
  nextSlug = currentSlug
) {
  updateTag(ARTICLE_PUBLICATIONS_CACHE_TAG);
  updateTag(articleLocaleCacheTag(locale));
  updateTag(articleCacheTag(locale, currentSlug));

  if (nextSlug !== currentSlug) {
    updateTag(articleCacheTag(locale, nextSlug));
  }
}

function revalidateStudioRoutes(locale: Locale, articleId?: string) {
  revalidatePath(`/${locale}/studio`);
  revalidatePath(`/${locale}/studio/articles`);

  if (articleId) {
    revalidatePath(`/${locale}/studio/${articleId}`);
    revalidatePath(`/${locale}/studio/articles/${articleId}/edit`);
  }
}

async function slugBelongsToAnotherArticle(
  ownerId: string,
  locale: Locale,
  slug: string,
  articleId?: string
): Promise<boolean> {
  const articles = await listWikiArticles(ownerId);
  return articles.some(
    (article) =>
      article.id !== articleId &&
      article.locale === locale &&
      article.slug === slug
  );
}

function hasValidReferenceUrls(article: WikiArticle): boolean {
  return article.references.every((reference) => {
    if (!reference.url) return true;

    try {
      new URL(reference.url);
      return true;
    } catch {
      return false;
    }
  });
}

function getMissingPublishFields(
  article: WikiArticle
): PublishRequirementKey[] {
  const missing: PublishRequirementKey[] = [];

  if (!article.title.trim()) missing.push('title');
  if (!article.content.trim()) missing.push('content');
  if (!article.slug.trim()) missing.push('slug');
  if (!article.excerpt.trim()) missing.push('excerpt');
  if (!isCategoryId(article.category)) missing.push('category');
  if (!article.seoDescription.trim()) missing.push('seoDescription');

  return missing;
}

async function prepareArticle(
  user: AuthenticatedUser,
  locale: Locale,
  input: StudioArticleInput,
  currentArticle: WikiArticle | null
): Promise<PreparedArticle | StudioActionResult> {
  const result = articleInputSchema.safeParse(input);

  if (!result.success) return validationError(result.error);

  const slug = slugifyWikiValue(
    result.data.slug || currentArticle?.slug || result.data.title
  );

  if (!slug) {
    return {
      status: 'error',
      message: 'ไม่สามารถสร้าง slug จากชื่อบทความนี้ได้',
      fieldErrors: {
        slug: ['กรุณาใส่ slug ที่มีตัวอักษรหรือตัวเลข'],
      },
    };
  }

  if (
    await slugBelongsToAnotherArticle(
      user.userId,
      locale,
      slug,
      currentArticle?.id
    )
  ) {
    return {
      status: 'error',
      message: 'มีบทความที่ใช้ slug นี้แล้ว',
      fieldErrors: {
        slug: ['Slug ต้องไม่ซ้ำในภาษาเดียวกัน'],
      },
    };
  }

  const parsedReferences = parseReferences(result.data.references);
  const now = new Date().toISOString();
  const contentHash = hashContent(result.data.content);
  const id = currentArticle?.id || randomUUID();
  const keys = getWikiArticleKeys(user.userId, id);
  const stats = readingTime(result.data.content);
  const category = result.data.category as CategoryId | '';
  const school = result.data.school as ArticleSchool | '';
  const difficulty = result.data.difficulty as ArticleDifficulty | '';
  const parsedConcepts = parseConceptLinks(result.data.relatedConcepts)
    .map((concept) => ({
      ...concept,
      slug: slugifyWikiValue(concept.slug),
    }))
    .filter((concept) => Boolean(concept.slug));

  const article: WikiArticle = {
    ...(currentArticle || {}),
    schemaVersion: 3,
    id,
    publicId: currentArticle?.publicId || createPublicId(),
    ownerId: user.userId,
    authorName: user.name,
    title: result.data.title,
    subtitle: result.data.subtitle,
    slug,
    locale,
    excerpt: result.data.excerpt,
    category,
    school,
    difficulty,
    coverImage: result.data.coverImageUrl
      ? {
          src: result.data.coverImageUrl,
          alt: result.data.coverImageAlt || result.data.title,
          width: parseDimension(result.data.coverImageWidth, 1600),
          height: parseDimension(result.data.coverImageHeight, 900),
        }
      : null,
    tags: parseCommaSeparated(result.data.tags),
    aliases: parseCommaSeparated(result.data.aliases),
    outgoingLinks: extractWikiLinks(result.data.content),
    relatedConcepts: parsedConcepts,
    relatedArticles: parseCommaSeparated(result.data.relatedArticles)
      .map(slugifyWikiValue)
      .filter(Boolean),
    references: parsedReferences,
    seriesId: result.data.seriesId || undefined,
    seoTitle: result.data.seoTitle,
    seoDescription: result.data.seoDescription,
    translations: {
      ...(result.data.translationTh
        ? { th: slugifyWikiValue(result.data.translationTh) }
        : {}),
      ...(result.data.translationEn
        ? { en: slugifyWikiValue(result.data.translationEn) }
        : {}),
    },
    featured: result.data.featured,
    status: currentArticle?.status || 'draft',
    markdownKey: currentArticle?.markdownKey || keys.markdownKey,
    contentHash,
    publishedContentHash:
      currentArticle?.publishedContentHash ||
      (currentArticle?.status === 'published'
        ? currentArticle.contentHash
        : null),
    publishedSlug:
      currentArticle?.publishedSlug ||
      (currentArticle?.status === 'published' ? currentArticle.slug : null),
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    createdAt: currentArticle?.createdAt || now,
    updatedAt: now,
    publishedAt: currentArticle?.publishedAt || null,
    content: result.data.content,
  };

  if (!hasValidReferenceUrls(article)) {
    return {
      status: 'error',
      message: 'URL ในเอกสารอ้างอิงอย่างน้อยหนึ่งรายการไม่ถูกต้อง',
      fieldErrors: {
        references: ['กรุณาใช้ URL เต็ม เช่น https://example.com/source'],
      },
    };
  }

  return { article, created: !currentArticle };
}

async function preservePublishedSnapshot(article: WikiArticle): Promise<void> {
  if (article.status !== 'published') return;

  if (
    article.publishedContentHash &&
    article.publishedContentHash !== article.contentHash
  ) {
    return;
  }

  const publishedAt = article.publishedAt || new Date().toISOString();
  const publishedArticle: WikiArticle = {
    ...article,
    status: 'published',
    publishedAt,
  };
  const publishedMarkdownKey =
    await savePublishedWikiContent(publishedArticle);

  await publishWikiArticle(publishedArticle, publishedMarkdownKey);
  invalidatePublicArticleCaches(
    article.locale,
    article.publishedSlug || article.slug
  );
}

function successResult(article: WikiArticle): StudioActionResult {
  return {
    status: 'success',
    message: 'บันทึกฉบับร่างแล้ว',
    articleId: article.id,
    slug: article.slug,
    updatedAt: article.updatedAt,
    articleStatus: article.status,
  };
}

export async function saveStudioArticle(
  articleId: string | null,
  localeValue: string,
  input: StudioArticleInput
): Promise<StudioActionResult> {
  const locale = normalizeLocale(localeValue);
  const user = await getAuthenticatedUser();

  if (!user) return authenticationError();

  const currentArticle = articleId
    ? await getWikiArticle(user.userId, articleId)
    : null;

  if (articleId && !currentArticle) {
    return {
      status: 'error',
      message: 'ไม่พบบทความ หรือคุณไม่มีสิทธิ์แก้ไขบทความนี้',
    };
  }

  const prepared = await prepareArticle(user, locale, input, currentArticle);
  if ('status' in prepared) return prepared;

  try {
    if (currentArticle?.status === 'published') {
      await preservePublishedSnapshot(currentArticle);
    }

    await saveWikiArticle(prepared.article);
  } catch (error) {
    schedulePostHogLog('error', 'cms.article.save_failed', {
      articleId: currentArticle?.publicId,
      locale,
      category: prepared.article.category || 'uncategorized',
      errorType: error instanceof Error ? error.name : 'UnknownError',
    });

    return {
      status: 'error',
      message: 'บันทึกไม่สำเร็จ',
    };
  }

  revalidateStudioRoutes(locale, prepared.article.id);
  schedulePostHogLog(
    'info',
    prepared.created ? 'cms.article.created' : 'cms.article.saved',
    {
      articleId: prepared.article.publicId,
      locale,
      category: prepared.article.category || 'uncategorized',
      status: prepared.article.status,
      readingMinutes: prepared.article.readingMinutes,
    }
  );

  return successResult(prepared.article);
}

export async function publishStudioArticle(
  articleId: string | null,
  localeValue: string,
  input: StudioArticleInput
): Promise<StudioActionResult> {
  const locale = normalizeLocale(localeValue);
  const user = await getAuthenticatedUser();

  if (!user) return authenticationError();

  const currentArticle = articleId
    ? await getWikiArticle(user.userId, articleId)
    : null;

  if (articleId && !currentArticle) {
    return {
      status: 'error',
      message: 'ไม่พบบทความ หรือคุณไม่มีสิทธิ์แก้ไขบทความนี้',
    };
  }

  const prepared = await prepareArticle(user, locale, input, currentArticle);
  if ('status' in prepared) return prepared;

  const missingFields = getMissingPublishFields(prepared.article);
  if (missingFields.length > 0) {
    return {
      status: 'error',
      message: 'ยังเผยแพร่ไม่ได้',
      missingFields,
    };
  }

  const category = prepared.article.category as CategoryId;
  const draftArticle = prepared.article;
  const now = new Date().toISOString();
  const publishedArticle: WikiArticle = {
    ...draftArticle,
    category,
    school: draftArticle.school || categorySchools[category],
    difficulty: draftArticle.difficulty || 'intermediate',
    seoTitle: draftArticle.seoTitle || draftArticle.title,
    status: 'published',
    publishedAt: draftArticle.publishedAt || now,
    publishedContentHash: draftArticle.contentHash,
    publishedSlug: draftArticle.slug,
    updatedAt: now,
  };

  try {
    if (currentArticle?.status === 'published') {
      await preservePublishedSnapshot(currentArticle);
    }

    await saveWikiArticle(draftArticle);
    const publishedMarkdownKey =
      await savePublishedWikiContent(publishedArticle);
    await saveWikiArticle(publishedArticle);

    try {
      await publishWikiArticle(publishedArticle, publishedMarkdownKey);
    } catch (error) {
      await saveWikiArticle(draftArticle).catch(() => undefined);
      throw error;
    }
  } catch (error) {
    schedulePostHogLog('error', 'cms.article.publish_failed', {
      articleId: publishedArticle.publicId,
      locale,
      category,
      errorType: error instanceof Error ? error.name : 'UnknownError',
    });

    return {
      status: 'error',
      message: 'เผยแพร่ไม่สำเร็จ',
      articleId: draftArticle.id,
      slug: draftArticle.slug,
      updatedAt: draftArticle.updatedAt,
      articleStatus: draftArticle.status,
    };
  }

  invalidatePublicArticleCaches(
    locale,
    currentArticle?.publishedSlug || currentArticle?.slug || publishedArticle.slug,
    publishedArticle.slug
  );
  revalidateStudioRoutes(locale, publishedArticle.id);
  revalidatePath(`/${locale}/articles`);
  revalidatePath(`/${locale}/articles/${publishedArticle.slug}`);
  schedulePostHogLog('info', 'cms.article.published', {
    articleId: publishedArticle.publicId,
    locale,
    category,
    readingMinutes: publishedArticle.readingMinutes,
  });

  return {
    status: 'success',
    message: 'เผยแพร่บทความแล้ว',
    articleId: publishedArticle.id,
    slug: publishedArticle.slug,
    updatedAt: publishedArticle.updatedAt,
    articleStatus: 'published',
  };
}

export async function unpublishStudioArticle(
  articleId: string,
  localeValue: string
): Promise<StudioActionResult> {
  const locale = normalizeLocale(localeValue);
  const user = await getAuthenticatedUser();

  if (!user) return authenticationError();

  const currentArticle = await getWikiArticle(user.userId, articleId);

  if (!currentArticle) {
    return {
      status: 'error',
      message: 'ไม่พบบทความ หรือคุณไม่มีสิทธิ์แก้ไขบทความนี้',
    };
  }

  const draftArticle: WikiArticle = {
    ...currentArticle,
    status: 'draft',
    updatedAt: new Date().toISOString(),
  };

  try {
    await saveWikiArticle(draftArticle);

    try {
      await unpublishWikiArticle(currentArticle);
    } catch (error) {
      await saveWikiArticle(currentArticle).catch(() => undefined);
      throw error;
    }
  } catch (error) {
    schedulePostHogLog('error', 'cms.article.unpublish_failed', {
      articleId: currentArticle.publicId,
      locale,
      category: currentArticle.category || 'uncategorized',
      errorType: error instanceof Error ? error.name : 'UnknownError',
    });

    return {
      status: 'error',
      message: 'ยกเลิกการเผยแพร่ไม่สำเร็จ',
    };
  }

  invalidatePublicArticleCaches(
    locale,
    currentArticle.publishedSlug || currentArticle.slug
  );
  revalidateStudioRoutes(locale, articleId);
  revalidatePath(`/${locale}/articles`);
  schedulePostHogLog('info', 'cms.article.unpublished', {
    articleId: currentArticle.publicId,
    locale,
    category: currentArticle.category || 'uncategorized',
  });

  return {
    status: 'success',
    message: 'ยกเลิกการเผยแพร่แล้ว',
    articleId,
    slug: currentArticle.slug,
    updatedAt: draftArticle.updatedAt,
    articleStatus: 'draft',
  };
}

export async function deleteStudioArticle(
  articleId: string,
  localeValue: string
): Promise<StudioActionResult> {
  const locale = normalizeLocale(localeValue);
  const user = await getAuthenticatedUser();

  if (!user) return authenticationError();

  const article = await getWikiArticle(user.userId, articleId);

  if (!article) {
    return {
      status: 'error',
      message: 'ไม่พบบทความ หรือคุณไม่มีสิทธิ์ลบบทความนี้',
    };
  }

  try {
    if (article.status === 'published') {
      await unpublishWikiArticle(article);
      invalidatePublicArticleCaches(
        locale,
        article.publishedSlug || article.slug
      );
    }

    await deleteWikiArticle(user.userId, articleId);
  } catch (error) {
    schedulePostHogLog('error', 'cms.article.delete_failed', {
      articleId: article.publicId,
      locale,
      category: article.category || 'uncategorized',
      errorType: error instanceof Error ? error.name : 'UnknownError',
    });

    return {
      status: 'error',
      message: 'ลบบทความไม่สำเร็จ',
    };
  }

  revalidateStudioRoutes(locale);
  revalidatePath(`/${locale}/articles`);
  schedulePostHogLog('info', 'cms.article.deleted', {
    articleId: article.publicId,
    locale,
    category: article.category || 'uncategorized',
    wasPublished: article.status === 'published',
  });

  return {
    status: 'success',
    message: 'ลบบทความแล้ว',
    articleId,
    articleStatus: article.status,
  };
}

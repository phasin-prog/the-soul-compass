'use server';

import { createHash, randomInt, randomUUID } from 'node:crypto';
import { auth, currentUser } from '@clerk/nextjs/server';
import readingTime from 'reading-time';
import { revalidatePath, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { categoryIds } from '@/lib/content/categories';
import { schedulePostHogLog } from '@/lib/observability/posthog-logs';
import type { Locale } from '@/lib/site';
import {
  deleteWikiArticle,
  getWikiArticle,
  getWikiArticleKeys,
  listWikiArticles,
  saveWikiArticle,
} from '@/lib/r2/wiki-store';
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
  publishWikiArticle,
  unpublishWikiArticle,
} from '@/lib/wiki/published';
import {
  extractWikiLinks,
  parseCommaSeparated,
  slugifyWikiValue,
} from '@/lib/wiki/markdown';
import type { WikiActionState } from '@/lib/wiki/action-state';
import type { WikiArticle, WikiArticleStatus } from '@/lib/wiki/types';
import {
  articleDifficulties,
  articleSchools,
  articleStatuses,
} from '@/types/article';

const optionalUrl = z.union([z.literal(''), z.url()]);

const createSchema = z.object({
  title: z.string().trim().min(2).max(160),
  slug: z.string().trim().max(180),
  category: z.enum(categoryIds),
});

const updateSchema = createSchema.extend({
  subtitle: z.string().trim().max(240),
  excerpt: z.string().trim().max(500),
  school: z.enum(articleSchools),
  difficulty: z.enum(articleDifficulties),
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
  coverImageWidth: z.coerce.number().int().min(1).max(10_000),
  coverImageHeight: z.coerce.number().int().min(1).max(10_000),
  content: z.string().max(500_000),
  status: z.enum(articleStatuses),
  featured: z.boolean(),
});

function normalizeLocale(value: string): Locale {
  return value === 'en' ? 'en' : 'th';
}

async function getAuthenticatedUser() {
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

function validationError(error: z.ZodError): WikiActionState {
  return {
    status: 'error',
    message: 'กรุณาตรวจข้อมูลที่กรอกอีกครั้ง',
    fieldErrors: error.flatten().fieldErrors,
  };
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

function createPublicId(): string {
  return String(Date.now() * 1000 + randomInt(0, 1000));
}

function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex');
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

function publicationReadinessError(article: WikiArticle): WikiActionState | null {
  const issues: string[] = [];

  if (!article.excerpt) issues.push('คำโปรย');
  if (!article.content.trim()) issues.push('เนื้อหาบทความ');
  if (!article.seoTitle) issues.push('SEO title');
  if (!article.seoDescription) issues.push('SEO description');

  if (issues.length === 0) return null;

  return {
    status: 'error',
    message: `ยังเผยแพร่ไม่ได้ กรุณาเติม: ${issues.join(', ')}`,
  };
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

export async function createWikiArticle(
  localeValue: string,
  _previousState: WikiActionState,
  formData: FormData
): Promise<WikiActionState> {
  const locale = normalizeLocale(localeValue);
  const user = await getAuthenticatedUser();

  if (!user) {
    return {
      status: 'error',
      message: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง',
    };
  }

  const result = createSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug') || '',
    category: formData.get('category'),
  });

  if (!result.success) return validationError(result.error);

  const slug = slugifyWikiValue(result.data.slug || result.data.title);

  if (!slug) {
    return {
      status: 'error',
      message: 'ไม่สามารถสร้าง slug จากชื่อบทความนี้ได้',
      fieldErrors: {
        slug: ['กรุณาใส่ slug ที่มีตัวอักษรหรือตัวเลข'],
      },
    };
  }

  if (await slugBelongsToAnotherArticle(user.userId, locale, slug)) {
    return {
      status: 'error',
      message: 'มีบทความที่ใช้ slug นี้แล้ว',
      fieldErrors: {
        slug: ['Slug ต้องไม่ซ้ำในภาษาเดียวกัน'],
      },
    };
  }

  const id = randomUUID();
  const now = new Date().toISOString();
  const keys = getWikiArticleKeys(user.userId, id);
  const content = `# ${result.data.title}\n\nเริ่มเขียนที่นี่ และเชื่อมแนวคิดด้วย [[concept:slug|ชื่อแนวคิด]] หรือเชื่อมบทความด้วย [[slug|ข้อความที่แสดง]]\n`;

  const article: WikiArticle = {
    schemaVersion: 2,
    id,
    publicId: createPublicId(),
    ownerId: user.userId,
    authorName: user.name,
    title: result.data.title,
    subtitle: '',
    slug,
    locale,
    excerpt: '',
    category: result.data.category,
    school: categorySchools[result.data.category],
    difficulty: 'intermediate',
    coverImage: null,
    tags: [],
    aliases: [],
    outgoingLinks: [],
    relatedConcepts: [],
    relatedArticles: [],
    references: [],
    seoTitle: result.data.title,
    seoDescription: '',
    translations: {},
    featured: false,
    status: 'draft',
    markdownKey: keys.markdownKey,
    contentHash: hashContent(content),
    readingMinutes: 1,
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
    content,
  };

  try {
    await saveWikiArticle(article);
  } catch (error) {
    schedulePostHogLog('error', 'cms.article.create_failed', {
      locale,
      category: result.data.category,
      errorType: error instanceof Error ? error.name : 'UnknownError',
    });

    return {
      status: 'error',
      message:
        error instanceof Error
          ? `สร้างบทความไม่สำเร็จ: ${error.message}`
          : 'สร้างบทความไม่สำเร็จ',
    };
  }

  schedulePostHogLog('info', 'cms.article.created', {
    articleId: article.publicId,
    locale,
    category: article.category,
    status: article.status,
  });

  redirect(`/${locale}/studio/${id}`);
}

export async function updateWikiArticle(
  articleId: string,
  localeValue: string,
  _previousState: WikiActionState,
  formData: FormData
): Promise<WikiActionState> {
  const locale = normalizeLocale(localeValue);
  const user = await getAuthenticatedUser();

  if (!user) {
    return {
      status: 'error',
      message: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง',
    };
  }

  const currentArticle = await getWikiArticle(user.userId, articleId);

  if (!currentArticle) {
    return {
      status: 'error',
      message: 'ไม่พบบทความ หรือคุณไม่มีสิทธิ์แก้ไขบทความนี้',
    };
  }

  const result = updateSchema.safeParse({
    title: formData.get('title'),
    subtitle: formData.get('subtitle') || '',
    slug: formData.get('slug') || '',
    category: formData.get('category'),
    school: formData.get('school'),
    difficulty: formData.get('difficulty'),
    excerpt: formData.get('excerpt') || '',
    tags: formData.get('tags') || '',
    aliases: formData.get('aliases') || '',
    relatedConcepts: formData.get('relatedConcepts') || '',
    relatedArticles: formData.get('relatedArticles') || '',
    references: formData.get('references') || '',
    seriesId: formData.get('seriesId') || '',
    seoTitle: formData.get('seoTitle') || '',
    seoDescription: formData.get('seoDescription') || '',
    translationTh: formData.get('translationTh') || '',
    translationEn: formData.get('translationEn') || '',
    coverImageUrl: formData.get('coverImageUrl') || '',
    coverImageAlt: formData.get('coverImageAlt') || '',
    coverImageWidth: formData.get('coverImageWidth') || '1600',
    coverImageHeight: formData.get('coverImageHeight') || '900',
    content: formData.get('content') || '',
    status: formData.get('status'),
    featured: formData.get('featured') === 'on',
  });

  if (!result.success) return validationError(result.error);

  const slug = slugifyWikiValue(result.data.slug || result.data.title);

  if (!slug) {
    return {
      status: 'error',
      message: 'Slug ต้องมีตัวอักษรหรือตัวเลขอย่างน้อยหนึ่งตัว',
      fieldErrors: { slug: ['Slug ไม่ถูกต้อง'] },
    };
  }

  if (
    await slugBelongsToAnotherArticle(
      user.userId,
      locale,
      slug,
      currentArticle.id
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

  const now = new Date().toISOString();
  const nextStatus = result.data.status as WikiArticleStatus;
  const stats = readingTime(result.data.content);
  const parsedConcepts = parseConceptLinks(result.data.relatedConcepts).map(
    (concept) => ({
      ...concept,
      slug: slugifyWikiValue(concept.slug),
    })
  ).filter((concept) => Boolean(concept.slug));
  const parsedReferences = parseReferences(result.data.references);
  const article: WikiArticle = {
    ...currentArticle,
    schemaVersion: 2,
    authorName: user.name,
    title: result.data.title,
    subtitle: result.data.subtitle,
    slug,
    locale,
    excerpt: result.data.excerpt,
    category: result.data.category,
    school: result.data.school,
    difficulty: result.data.difficulty,
    coverImage: result.data.coverImageUrl
      ? {
          src: result.data.coverImageUrl,
          alt: result.data.coverImageAlt || result.data.title,
          width: result.data.coverImageWidth,
          height: result.data.coverImageHeight,
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
    status: nextStatus,
    content: result.data.content,
    contentHash: hashContent(result.data.content),
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    updatedAt: now,
    publishedAt:
      nextStatus === 'published'
        ? currentArticle.publishedAt || now
        : currentArticle.publishedAt,
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

  if (nextStatus === 'published') {
    const readinessError = publicationReadinessError(article);
    if (readinessError) return readinessError;
  }

  try {
    if (nextStatus === 'published') {
      await saveWikiArticle(article);

      try {
        await publishWikiArticle(article);
      } catch (error) {
        await saveWikiArticle(currentArticle).catch(() => undefined);
        throw error;
      }
    } else if (currentArticle.status === 'published') {
      await unpublishWikiArticle(currentArticle);

      try {
        await saveWikiArticle(article);
      } catch (error) {
        await publishWikiArticle(currentArticle).catch(() => undefined);
        throw error;
      }
    } else {
      await saveWikiArticle(article);
    }
  } catch (error) {
    schedulePostHogLog('error', 'cms.article.save_failed', {
      articleId: currentArticle.publicId,
      locale,
      category: article.category,
      requestedStatus: nextStatus,
      errorType: error instanceof Error ? error.name : 'UnknownError',
    });

    return {
      status: 'error',
      message:
        error instanceof Error
          ? `บันทึกไม่สำเร็จ: ${error.message}`
          : 'บันทึกไม่สำเร็จ',
    };
  }

  if (
    currentArticle.status === 'published' ||
    nextStatus === 'published'
  ) {
    invalidatePublicArticleCaches(locale, currentArticle.slug, slug);
  }

  revalidatePath(`/${locale}/studio`);
  revalidatePath(`/${locale}/studio/${articleId}`);

  schedulePostHogLog('info', 'cms.article.saved', {
    articleId: article.publicId,
    locale,
    category: article.category,
    status: nextStatus,
    readingMinutes: article.readingMinutes,
    published: nextStatus === 'published',
  });

  return {
    status: 'success',
    message:
      nextStatus === 'published'
        ? 'บันทึกและเผยแพร่แล้ว หน้าเว็บจะอ่าน metadata จาก Supabase และเนื้อหาจาก R2 โดยไม่ต้อง build ใหม่'
        : nextStatus === 'review'
          ? 'บันทึกและส่งเข้าสถานะตรวจทานแล้ว'
          : 'บันทึกฉบับร่างแล้ว',
  };
}

export async function deleteWikiArticleAction(
  articleId: string,
  localeValue: string
): Promise<void> {
  const locale = normalizeLocale(localeValue);
  const { userId } = await auth();

  if (!userId) redirect(`/${locale}/sign-in`);

  const article = await getWikiArticle(userId, articleId);
  if (!article) redirect(`/${locale}/studio`);

  if (article.status === 'published') {
    await unpublishWikiArticle(article);
    invalidatePublicArticleCaches(locale, article.slug);
  }

  await deleteWikiArticle(userId, articleId);

  revalidatePath(`/${locale}/studio`);
  schedulePostHogLog('info', 'cms.article.deleted', {
    articleId: article.publicId,
    locale,
    category: article.category,
    wasPublished: article.status === 'published',
  });
  redirect(`/${locale}/studio`);
}

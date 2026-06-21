import 'server-only';

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { z } from 'zod';
import {
  categoryIds,
  isCategoryId,
  type CategoryId,
} from '@/lib/content/categories';
import { getR2Text } from '@/lib/r2/wiki-store';
import type { Locale } from '@/lib/site';
import { articleCacheTag } from '@/lib/wiki/cache';
import {
  getPublishedArticle,
  listPublishedArticles,
} from '@/lib/wiki/published';
import type { PublishedArticle } from '@/lib/wiki/types';
import {
  articleDifficulties,
  articleSchools,
  articleStatuses,
  type Article,
  type ArticleSchool,
  type ArticleSummary,
} from '@/types/article';

const contentRoot = path.join(process.cwd(), 'content', 'articles');
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const articleFrontmatterSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().default(''),
  excerpt: z.string().min(1),
  language: z.enum(['th', 'en']),
  status: z.enum(articleStatuses),
  category: z.enum(categoryIds),
  school: z.enum(articleSchools),
  difficulty: z.enum(articleDifficulties),
  readingTime: z.number().int().positive(),
  publishedAt: z.string().regex(isoDatePattern),
  updatedAt: z.string().regex(isoDatePattern),
  author: z.string().min(1),
  coverImage: z
    .object({
      src: z.string().min(1),
      alt: z.string().min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })
    .nullable(),
  tags: z.array(z.string().min(1)).default([]),
  relatedConcepts: z
    .array(
      z.object({
        slug: z.string().min(1),
        title: z.string().min(1),
      })
    )
    .default([]),
  relatedArticles: z.array(z.string().min(1)).default([]),
  references: z
    .array(
      z.object({
        id: z.string().min(1),
        authors: z.string().min(1),
        year: z.number().int().positive().optional(),
        title: z.string().min(1),
        publication: z.string().min(1).optional(),
        url: z.url().optional(),
      })
    )
    .default([]),
  seriesId: z
    .string()
    .min(1)
    .nullable()
    .optional()
    .transform((value) => value ?? undefined),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  translations: z
    .object({
      th: z.string().min(1).optional(),
      en: z.string().min(1).optional(),
    })
    .default({}),
  featured: z.boolean().optional(),
});

const categorySchools: Record<CategoryId, ArticleSchool> = {
  'analytical-psychology': 'Analytical Psychology',
  psychoanalysis: 'Psychoanalysis',
  neuroscience: 'Neuroscience',
  'social-psychology': 'Social Psychology',
  philosophy: 'Philosophy',
  'philosophy-of-mind': 'Philosophy of Mind',
  typology: 'Typology',
  tpdt: 'TPDT',
};

function toSummary(article: Article): ArticleSummary {
  const { body, references, ...summary } = article;
  void body;
  void references;
  return summary;
}

async function readStaticArticle(filePath: string): Promise<Article> {
  const source = await readFile(filePath, 'utf8');
  const { data, content } = matter(source);
  const parsed = articleFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(
      `Invalid article frontmatter in ${path.relative(process.cwd(), filePath)}: ${z.prettifyError(parsed.error)}`
    );
  }

  if (!content.trim()) {
    throw new Error(
      `Article body is empty in ${path.relative(process.cwd(), filePath)}`
    );
  }

  return {
    ...parsed.data,
    body: content.trim(),
  };
}

const loadStaticArticles = cache(async (): Promise<Article[]> => {
  const localeDirectories = await readdir(contentRoot, {
    withFileTypes: true,
  });
  const files: string[] = [];

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

  const articles = await Promise.all(files.map(readStaticArticle));
  const ids = new Set<string>();
  const localizedSlugs = new Set<string>();

  for (const article of articles) {
    const localizedSlug = `${article.language}:${article.slug}`;

    if (ids.has(article.id)) {
      throw new Error(`Duplicate article id: ${article.id}`);
    }

    if (localizedSlugs.has(localizedSlug)) {
      throw new Error(`Duplicate article slug: ${localizedSlug}`);
    }

    ids.add(article.id);
    localizedSlugs.add(localizedSlug);
  }

  for (const article of articles) {
    for (const relatedSlug of article.relatedArticles) {
      if (!localizedSlugs.has(`${article.language}:${relatedSlug}`)) {
        throw new Error(
          `Broken related article link in ${article.slug}: ${relatedSlug}`
        );
      }
    }

    for (const [locale, translatedSlug] of Object.entries(
      article.translations
    )) {
      if (
        translatedSlug &&
        !localizedSlugs.has(`${locale as Locale}:${translatedSlug}`)
      ) {
        throw new Error(
          `Broken translation link in ${article.slug}: ${locale}:${translatedSlug}`
        );
      }
    }
  }

  return articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

function hasPublishedBackend(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
      process.env.R2_ENDPOINT &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME
  );
}

function isUnprovisionedPublishedBackend(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.includes(
      "Could not find the table 'public.article_publications'"
    )
  );
}

function normalizeCategory(category: string): CategoryId {
  return isCategoryId(category) ? category : 'analytical-psychology';
}

function mapPublishedArticle(
  article: PublishedArticle,
  body = ''
): Article {
  const category = normalizeCategory(article.category);

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle,
    excerpt: article.excerpt,
    body,
    language: article.locale,
    status: 'published',
    category,
    school: article.school || categorySchools[category],
    difficulty: article.difficulty,
    readingTime: article.readingMinutes,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    author: article.authorName,
    coverImage: article.coverImage,
    tags: article.tags,
    relatedConcepts: article.relatedConcepts,
    relatedArticles: article.relatedArticles,
    references: article.references,
    seriesId: article.seriesId,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    translations: article.translations,
    featured: article.featured,
  };
}

async function getCachedPublishedBody(
  article: PublishedArticle
): Promise<string | null> {
  return unstable_cache(
    () => getR2Text(article.markdownKey),
    ['article-r2-body', article.markdownKey, article.contentHash],
    {
      revalidate: 3600,
      tags: [articleCacheTag(article.locale, article.slug)],
    }
  )();
}

async function getRemotePublishedArticles(
  locale: Locale
): Promise<ArticleSummary[]> {
  if (!hasPublishedBackend()) return [];

  try {
    const articles = await listPublishedArticles(locale);
    return articles.map((article) => toSummary(mapPublishedArticle(article)));
  } catch (error) {
    if (isUnprovisionedPublishedBackend(error)) return [];

    console.error(
      `[articles] Failed to load published articles for locale "${locale}".`,
      error instanceof Error ? error.message : error
    );
    throw new Error(
      `Published article backend is unavailable: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

export const getStaticPublishedArticles = cache(
  async (locale: Locale): Promise<Article[]> => {
    const articles = await loadStaticArticles();
    return articles.filter(
      (article) =>
        article.language === locale && article.status === 'published'
    );
  }
);

export const getPublishedArticles = cache(
  async (locale: Locale): Promise<ArticleSummary[]> => {
    const [staticArticles, remoteArticles] = await Promise.all([
      getStaticPublishedArticles(locale),
      getRemotePublishedArticles(locale),
    ]);
    const merged = new Map(
      staticArticles.map((article) => [article.slug, toSummary(article)])
    );

    for (const article of remoteArticles) {
      merged.set(article.slug, article);
    }

    return Array.from(merged.values()).sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt)
    );
  }
);

export const getArticleBySlug = cache(
  async (locale: Locale, slug: string): Promise<Article | null> => {
    const staticArticles = await getStaticPublishedArticles(locale);
    const staticArticle = staticArticles.find(
      (article) => article.slug === slug
    );

    if (staticArticle) return staticArticle;
    if (!hasPublishedBackend()) return null;

    try {
      const remoteArticle = await getPublishedArticle(locale, slug);

      if (!remoteArticle) return null;

      const body = await getCachedPublishedBody(remoteArticle);
      return body === null ? null : mapPublishedArticle(remoteArticle, body);
    } catch (error) {
      if (isUnprovisionedPublishedBackend(error)) return null;

      console.error(
        `[articles] Failed to load published article "${slug}" (locale: ${locale}).`,
        error instanceof Error ? error.message : error
      );
      throw new Error(
        `Unable to load published article "${slug}": ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
);

export async function getRelatedArticles(
  article: Article
): Promise<ArticleSummary[]> {
  const articles = await getPublishedArticles(article.language);
  const relatedSlugs = new Set(article.relatedArticles);

  return articles.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      (relatedSlugs.has(candidate.slug) ||
        candidate.relatedArticles.includes(article.slug))
  );
}

export async function getFeaturedArticles(
  locale: Locale,
  limit = 3
): Promise<ArticleSummary[]> {
  const articles = await getPublishedArticles(locale);
  return articles.filter((article) => article.featured).slice(0, limit);
}

export async function getArticlesByCategory(
  locale: Locale,
  category: CategoryId
): Promise<ArticleSummary[]> {
  const articles = await getPublishedArticles(locale);
  return articles.filter((article) => article.category === category);
}

export async function getStaticArticleParams() {
  const articles = await loadStaticArticles();
  return articles
    .filter((article) => article.status === 'published')
    .map((article) => ({
      locale: article.language,
      slug: article.slug,
    }));
}

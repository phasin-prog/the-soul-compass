import 'server-only';

import { unstable_cache } from 'next/cache';
import { isCategoryId } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { getSupabasePublic } from '@/lib/supabase/public';
import {
  articleDifficulties,
  articleSchools,
  type ArticleConceptLink,
  type ArticleCoverImage,
  type ArticleDifficulty,
  type ArticleReference,
  type ArticleSchool,
} from '@/types/article';
import {
  ARTICLE_PUBLICATIONS_CACHE_TAG,
  articleCacheTag,
  articleLocaleCacheTag,
} from './cache';
import type {
  PublishedArticle,
  WikiArticle,
  WikiArticleMeta,
} from './types';

const publicationColumns = [
  'id',
  'slug',
  'language',
  'status',
  'title',
  'subtitle',
  'excerpt',
  'category',
  'school',
  'difficulty',
  'reading_time',
  'published_at',
  'updated_at',
  'author',
  'cover_image',
  'tags',
  'aliases',
  'related_concepts',
  'related_articles',
  'references',
  'series_id',
  'seo_title',
  'seo_description',
  'translations',
  'featured',
  'markdown_key',
  'content_hash',
].join(',');

interface ArticlePublicationRow {
  id: string;
  slug: string;
  language: string;
  status: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  school: string;
  difficulty: string;
  reading_time: number;
  published_at: string;
  updated_at: string;
  author: string;
  cover_image: ArticleCoverImage | null;
  tags: string[];
  aliases: string[];
  related_concepts: ArticleConceptLink[];
  related_articles: string[];
  references: ArticleReference[];
  series_id: string | null;
  seo_title: string;
  seo_description: string;
  translations: Partial<Record<Locale, string>>;
  featured: boolean;
  markdown_key: string;
  content_hash: string;
}

function isSchool(value: string): value is ArticleSchool {
  return articleSchools.includes(value as ArticleSchool);
}

function isDifficulty(value: string): value is ArticleDifficulty {
  return articleDifficulties.includes(value as ArticleDifficulty);
}

function toPublishedArticle(
  row: ArticlePublicationRow
): PublishedArticle | null {
  if (
    row.status !== 'published' ||
    (row.language !== 'th' && row.language !== 'en') ||
    !isCategoryId(row.category) ||
    !isSchool(row.school) ||
    !isDifficulty(row.difficulty)
  ) {
    return null;
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    excerpt: row.excerpt,
    category: row.category,
    school: row.school,
    difficulty: row.difficulty,
    locale: row.language,
    coverImage: row.cover_image,
    tags: row.tags || [],
    aliases: row.aliases || [],
    outgoingLinks: [],
    relatedConcepts: row.related_concepts || [],
    relatedArticles: row.related_articles || [],
    references: row.references || [],
    seriesId: row.series_id || undefined,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    translations: row.translations || {},
    featured: row.featured,
    authorName: row.author,
    markdownKey: row.markdown_key,
    contentHash: row.content_hash,
    readingMinutes: row.reading_time,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

export async function publishWikiArticle(article: WikiArticle): Promise<void> {
  if (article.status !== 'published' || !article.publishedAt) {
    throw new Error('Only published articles can be added to the public index.');
  }

  const row: ArticlePublicationRow = {
    id: article.publicId,
    slug: article.slug,
    language: article.locale,
    status: 'published',
    title: article.title,
    subtitle: article.subtitle,
    excerpt: article.excerpt,
    category: article.category,
    school: article.school,
    difficulty: article.difficulty,
    reading_time: article.readingMinutes,
    published_at: article.publishedAt,
    updated_at: article.updatedAt,
    author: article.authorName,
    cover_image: article.coverImage,
    tags: article.tags,
    aliases: article.aliases,
    related_concepts: article.relatedConcepts,
    related_articles: article.relatedArticles,
    references: article.references,
    series_id: article.seriesId || null,
    seo_title: article.seoTitle,
    seo_description: article.seoDescription,
    translations: article.translations,
    featured: article.featured,
    markdown_key: article.markdownKey,
    content_hash: article.contentHash,
  };

  const { error } = await getSupabaseAdmin()
    .from('article_publications')
    .upsert(row, { onConflict: 'id' });

  if (error) {
    throw new Error(`Supabase publish failed: ${error.message}`);
  }
}

export async function unpublishWikiArticle(
  article: Pick<WikiArticleMeta, 'publicId'>
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('article_publications')
    .delete()
    .eq('id', article.publicId);

  if (error) {
    throw new Error(`Supabase unpublish failed: ${error.message}`);
  }
}

async function queryPublishedArticles(
  locale: Locale
): Promise<PublishedArticle[]> {
  const { data, error } = await getSupabasePublic()
    .from('article_publications')
    .select(publicationColumns)
    .eq('language', locale)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    throw new Error(`Supabase article query failed: ${error.message}`);
  }

  return ((data || []) as unknown as ArticlePublicationRow[])
    .map(toPublishedArticle)
    .filter((article): article is PublishedArticle => article !== null);
}

async function queryPublishedArticle(
  locale: Locale,
  slug: string
): Promise<PublishedArticle | null> {
  const { data, error } = await getSupabasePublic()
    .from('article_publications')
    .select(publicationColumns)
    .eq('language', locale)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    throw new Error(`Supabase article query failed: ${error.message}`);
  }

  return data
    ? toPublishedArticle(data as unknown as ArticlePublicationRow)
    : null;
}

export async function listPublishedArticles(
  locale: Locale
): Promise<PublishedArticle[]> {
  return unstable_cache(
    () => queryPublishedArticles(locale),
    ['article-publications', locale],
    {
      revalidate: 3600,
      tags: [
        ARTICLE_PUBLICATIONS_CACHE_TAG,
        articleLocaleCacheTag(locale),
      ],
    }
  )();
}

export async function getPublishedArticle(
  locale: Locale,
  slug: string
): Promise<PublishedArticle | null> {
  return unstable_cache(
    () => queryPublishedArticle(locale, slug),
    ['article-publication', locale, slug],
    {
      revalidate: 3600,
      tags: [
        ARTICLE_PUBLICATIONS_CACHE_TAG,
        articleLocaleCacheTag(locale),
        articleCacheTag(locale, slug),
      ],
    }
  )();
}

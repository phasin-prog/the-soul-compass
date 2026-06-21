import {
  isCategoryId,
  type CategoryId,
} from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import {
  articleDifficulties,
  articleSchools,
  type ArticleConceptLink,
  type ArticleReference,
  type ArticleSchool,
} from '@/types/article';
import type { WikiArticleMeta, WikiArticleStatus, WikiLink } from './types';

export const categorySchools: Record<CategoryId, ArticleSchool> = {
  'analytical-psychology': 'Analytical Psychology',
  psychoanalysis: 'Psychoanalysis',
  neuroscience: 'Neuroscience',
  'social-psychology': 'Social Psychology',
  philosophy: 'Philosophy',
  'philosophy-of-mind': 'Philosophy of Mind',
  typology: 'Typology',
  tpdt: 'TPDT',
};

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function wikiLinks(value: unknown): WikiLink[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is WikiLink =>
      typeof item === 'object' &&
      item !== null &&
      'slug' in item &&
      typeof item.slug === 'string' &&
      'label' in item &&
      typeof item.label === 'string'
  );
}

function conceptLinks(value: unknown): ArticleConceptLink[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is ArticleConceptLink =>
      typeof item === 'object' &&
      item !== null &&
      'slug' in item &&
      typeof item.slug === 'string' &&
      'title' in item &&
      typeof item.title === 'string'
  );
}

function references(value: unknown): ArticleReference[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is ArticleReference =>
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      typeof item.id === 'string' &&
      'authors' in item &&
      typeof item.authors === 'string' &&
      'title' in item &&
      typeof item.title === 'string'
  );
}

function translations(value: unknown): Partial<Record<Locale, string>> {
  if (!value || typeof value !== 'object') return {};

  const raw = value as Record<string, unknown>;
  return {
    ...(typeof raw.th === 'string' && raw.th ? { th: raw.th } : {}),
    ...(typeof raw.en === 'string' && raw.en ? { en: raw.en } : {}),
  };
}

export function normalizeWikiArticleMeta(
  value: unknown,
  fallbackMarkdownKey: string
): WikiArticleMeta | null {
  if (!value || typeof value !== 'object') return null;

  const raw = value as Record<string, unknown>;
  const locale: Locale = raw.locale === 'en' ? 'en' : 'th';
  const status: WikiArticleStatus =
    raw.status === 'published' ||
    raw.status === 'review' ||
    raw.status === 'archived'
      ? raw.status
      : 'draft';
  const category = isCategoryId(String(raw.category))
    ? (raw.category as CategoryId)
    : '';
  const school = articleSchools.includes(raw.school as ArticleSchool)
    ? (raw.school as ArticleSchool)
    : '';
  const difficulty = articleDifficulties.includes(
    raw.difficulty as (typeof articleDifficulties)[number]
  )
    ? (raw.difficulty as (typeof articleDifficulties)[number])
    : '';
  const title = typeof raw.title === 'string' ? raw.title : '';
  const excerpt = typeof raw.excerpt === 'string' ? raw.excerpt : '';

  if (
    typeof raw.id !== 'string' ||
    typeof raw.publicId !== 'string' ||
    typeof raw.ownerId !== 'string' ||
    typeof raw.slug !== 'string' ||
    !title
  ) {
    return null;
  }

  return {
    schemaVersion: 3,
    id: raw.id,
    publicId: raw.publicId,
    ownerId: raw.ownerId,
    authorName:
      typeof raw.authorName === 'string' ? raw.authorName : 'The Soul’s Compass',
    title,
    subtitle: typeof raw.subtitle === 'string' ? raw.subtitle : '',
    slug: raw.slug,
    locale,
    excerpt,
    category,
    school,
    difficulty,
    coverImage:
      raw.coverImage && typeof raw.coverImage === 'object'
        ? (raw.coverImage as WikiArticleMeta['coverImage'])
        : null,
    tags: stringArray(raw.tags),
    aliases: stringArray(raw.aliases),
    outgoingLinks: wikiLinks(raw.outgoingLinks),
    relatedConcepts: conceptLinks(raw.relatedConcepts),
    relatedArticles: stringArray(raw.relatedArticles),
    references: references(raw.references),
    seriesId:
      typeof raw.seriesId === 'string' && raw.seriesId
        ? raw.seriesId
        : undefined,
    seoTitle:
      typeof raw.seoTitle === 'string' && raw.seoTitle ? raw.seoTitle : title,
    seoDescription:
      typeof raw.seoDescription === 'string' && raw.seoDescription
        ? raw.seoDescription
        : excerpt,
    translations: translations(raw.translations),
    featured: raw.featured === true,
    status,
    markdownKey:
      typeof raw.markdownKey === 'string'
        ? raw.markdownKey
        : fallbackMarkdownKey,
    contentHash: typeof raw.contentHash === 'string' ? raw.contentHash : '',
    publishedContentHash:
      typeof raw.publishedContentHash === 'string'
        ? raw.publishedContentHash
        : status === 'published' && typeof raw.contentHash === 'string'
          ? raw.contentHash
          : null,
    publishedSlug:
      typeof raw.publishedSlug === 'string'
        ? raw.publishedSlug
        : status === 'published' && typeof raw.slug === 'string'
          ? raw.slug
          : null,
    readingMinutes:
      typeof raw.readingMinutes === 'number' && raw.readingMinutes > 0
        ? raw.readingMinutes
        : 1,
    createdAt:
      typeof raw.createdAt === 'string'
        ? raw.createdAt
        : new Date(0).toISOString(),
    updatedAt:
      typeof raw.updatedAt === 'string'
        ? raw.updatedAt
        : new Date(0).toISOString(),
    publishedAt:
      typeof raw.publishedAt === 'string' ? raw.publishedAt : null,
  };
}

export function parseConceptLinks(value: string): ArticleConceptLink[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [slug, title] = line.split('|').map((part) => part.trim());
      return { slug, title: title || slug };
    })
    .filter((concept) => Boolean(concept.slug));
}

export function formatConceptLinks(value: ArticleConceptLink[]): string {
  return value
    .map((concept) => `${concept.slug} | ${concept.title}`)
    .join('\n');
}

export function parseReferences(value: string): ArticleReference[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [authors, yearValue, title, publication, url] = line
        .split('|')
        .map((part) => part.trim());
      const year = yearValue ? Number.parseInt(yearValue, 10) : undefined;

      return {
        id: `studio-reference-${index + 1}`,
        authors,
        ...(year && Number.isFinite(year) ? { year } : {}),
        title,
        ...(publication ? { publication } : {}),
        ...(url ? { url } : {}),
      };
    })
    .filter((reference) => Boolean(reference.authors && reference.title));
}

export function formatReferences(value: ArticleReference[]): string {
  return value
    .map((reference) =>
      [
        reference.authors,
        reference.year || '',
        reference.title,
        reference.publication || '',
        reference.url || '',
      ].join(' | ')
    )
    .join('\n');
}

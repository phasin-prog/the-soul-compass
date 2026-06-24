import {
  isCategoryId,
  type CategoryId,
} from '@/lib/content/categories';
import { parseLocale } from '@/lib/locale';
import type { Locale } from '@/lib/site';
import {
  articleDifficulties,
  articleSchools,
  articleSourceStatuses,
  type ArticleConceptLink,
  type ArticleReference,
  type ArticleSchool,
  type ArticleSourceStatus,
  type ArticleDifficulty,
} from '@/types/article';
import type { WikiArticleMeta, WikiArticleStatus, WikiLink } from './types';
import type { SeriesItem } from '@/types/series';

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
  const locale: Locale = parseLocale(String(raw.locale ?? ''));
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

  const rawTags = stringArray(raw.tags);

  // Extract custom difficulty (academic) from tags or fallback to field
  const readingLevelTag = rawTags.find(t => t.startsWith('reading-level:'));
  const difficulty = readingLevelTag 
    ? (readingLevelTag.substring('reading-level:'.length) as ArticleDifficulty)
    : articleDifficulties.includes(raw.difficulty as ArticleDifficulty)
      ? (raw.difficulty as ArticleDifficulty)
      : '';

  // Extract sourceStatus from tags or fallback to field or 'original'
  const sourceStatusTag = rawTags.find(t => t.startsWith('source-status:'));
  const sourceStatus = sourceStatusTag
    ? (sourceStatusTag.substring('source-status:'.length) as ArticleSourceStatus)
    : articleSourceStatuses.includes(raw.sourceStatus as ArticleSourceStatus)
      ? (raw.sourceStatus as ArticleSourceStatus)
      : typeof raw.difficulty === 'string' && articleSourceStatuses.includes(raw.difficulty as ArticleSourceStatus) // in case raw contains it
        ? (raw.difficulty as ArticleSourceStatus)
        : 'original';

  const cleanTags = rawTags.filter(t => !t.startsWith('source-status:') && !t.startsWith('reading-level:'));

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
    sourceStatus,
    coverImage:
      raw.coverImage && typeof raw.coverImage === 'object'
        ? (raw.coverImage as WikiArticleMeta['coverImage'])
        : null,
    tags: cleanTags,
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
    postType:
      raw.postType === 'article' ||
      raw.postType === 'concept' ||
      raw.postType === 'series'
        ? raw.postType
        : 'article',
    originalTerm: typeof raw.originalTerm === 'string' ? raw.originalTerm : undefined,
    thaiTerm: typeof raw.thaiTerm === 'string' ? raw.thaiTerm : undefined,
    shortDefinition: typeof raw.shortDefinition === 'string' ? raw.shortDefinition : undefined,
    tradition: typeof raw.tradition === 'string' ? raw.tradition : undefined,
    thinkers: Array.isArray(raw.thinkers) ? stringArray(raw.thinkers) : undefined,
    commonMisunderstandings: Array.isArray(raw.commonMisunderstandings) ? stringArray(raw.commonMisunderstandings) : undefined,
    examples: Array.isArray(raw.examples) ? stringArray(raw.examples) : undefined,
    entryType: typeof raw.entryType === 'string' ? raw.entryType : undefined,
    items: Array.isArray(raw.items) ? (raw.items as SeriesItem[]) : undefined,
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

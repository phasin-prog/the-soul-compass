import type { CategoryId } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import type { SeriesItem } from './series';

export const articleStatuses = [
  'draft',
  'review',
  'published',
  'archived',
] as const;
export type ArticleStatus = (typeof articleStatuses)[number];

export const articleDifficulties = [
  'beginner',
  'intermediate',
  'advanced',
  'academic',
] as const;
export type ArticleDifficulty = (typeof articleDifficulties)[number];

export const articleSourceStatuses = [
  'original',
  'primary-source',
  'secondary-source',
  'translation-draft',
  'pending-verification',
  'experiment',
  'verified',
  'needs-revision',
] as const;
export type ArticleSourceStatus = (typeof articleSourceStatuses)[number];

export const articleSchools = [
  'Analytical Psychology',
  'Psychoanalysis',
  'Neuroscience',
  'Social Psychology',
  'Philosophy',
  'Philosophy of Mind',
  'Typology',
  'TPDT',
] as const;
export type ArticleSchool = (typeof articleSchools)[number];

export interface ArticleCoverImage {
  src: string;
  path?: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArticleConceptLink {
  slug: string;
  title: string;
}

export interface ArticleReference {
  id: string;
  authors: string;
  year?: number;
  title: string;
  publication?: string;
  url?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string;
  language: Locale;
  status: ArticleStatus;
  category: CategoryId;
  school: ArticleSchool;
  difficulty: ArticleDifficulty;
  sourceStatus?: ArticleSourceStatus;
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
  author: string;
  coverImage: ArticleCoverImage | null;
  tags: string[];
  relatedConcepts: ArticleConceptLink[];
  relatedArticles: string[];
  references: ArticleReference[];
  seriesId?: string;
  postType?: 'article' | 'concept' | 'series';
  // Concept metadata
  originalTerm?: string;
  thaiTerm?: string;
  shortDefinition?: string;
  tradition?: string;
  thinkers?: string[];
  commonMisunderstandings?: string[];
  examples?: string[];
  entryType?: string;
  // Series metadata
  items?: SeriesItem[];
  seoTitle: string;
  seoDescription: string;
  translations: Partial<Record<Locale, string>>;
  featured?: boolean;
}

export type ArticleSummary = Omit<Article, 'body' | 'references'>;


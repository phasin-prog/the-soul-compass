import type { CategoryId } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';

export const seriesTypes = [
  'foundation',
  'deep-reading',
  'comparative',
  'tpdt',
] as const;
export type SeriesType = (typeof seriesTypes)[number];

export const seriesStatuses = [
  'draft',
  'active',
  'completed',
  'archived',
] as const;
export type SeriesStatus = (typeof seriesStatuses)[number];

export const seriesDifficulties = [
  'beginner',
  'intermediate',
  'advanced',
] as const;
export type SeriesDifficulty = (typeof seriesDifficulties)[number];

export const seriesItemTypes = [
  'article',
  'concept',
  'reference',
  'note',
] as const;
export type SeriesItemType = (typeof seriesItemTypes)[number];

export type SeriesCategory = CategoryId | 'comparative-psychology';

export interface SeriesCoverImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SeriesItem {
  id: string;
  seriesId: string;
  order: number;
  type: SeriesItemType;
  targetId: string;
  title: string;
  description: string;
  required: boolean;
  estimatedReadingTime: number;
}

export interface Series {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  introduction: string;
  language: Locale;
  type: SeriesType;
  category: SeriesCategory;
  difficulty: SeriesDifficulty;
  status: SeriesStatus;
  coverImage: SeriesCoverImage | null;
  estimatedReadingTime: number;
  articleCount: number;
  conceptCount: number;
  author: string;
  publishedAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  items: SeriesItem[];
  suggestedSeries: string[];
  translations: Partial<Record<Locale, string>>;
}

export type SeriesSummary = Omit<Series, 'introduction' | 'items'> & {
  itemCount: number;
};

export interface ResolvedSeriesItem extends SeriesItem {
  href: string | null;
  targetSlug: string | null;
  targetAvailable: boolean;
}

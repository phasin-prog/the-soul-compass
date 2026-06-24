import type { WikiArticleStatus } from './types';

export const publishRequirementKeys = [
  'title',
  'content',
  'slug',
  'excerpt',
  'category',
  'difficulty',
  'coverImage',
  'coverAlt',
] as const;

export type PublishRequirementKey =
  (typeof publishRequirementKeys)[number];

export interface StudioArticleInput {
  title: string;
  subtitle: string;
  content: string;
  slug: string;
  excerpt: string;
  category: string;
  school: string;
  difficulty: string;
  tags: string;
  aliases: string;
  relatedConcepts: string;
  relatedArticles: string;
  references: string;
  seriesId: string;
  seoTitle: string;
  seoDescription: string;
  translationTh: string;
  translationEn: string;
  coverImageUrl: string;
  coverImagePath: string;
  coverImageAlt: string;
  coverImageWidth: string;
  coverImageHeight: string;
  featured: boolean;
  sourceStatus: string;
  postType: string;
  originalTerm: string;
  thaiTerm: string;
  shortDefinition: string;
  tradition: string;
  thinkers: string;
  commonMisunderstandings: string;
  examples: string;
  entryType: string;
  seriesItemsJson: string;
}

export interface StudioActionResult {
  status: 'success' | 'error';
  message: string;
  articleId?: string;
  slug?: string;
  updatedAt?: string;
  articleStatus?: WikiArticleStatus;
  fieldErrors?: Record<string, string[]>;
  missingFields?: PublishRequirementKey[];
  errorKind?:
    | 'auth'
    | 'validation'
    | 'conflict'
    | 'database'
    | 'storage'
    | 'network'
    | 'unknown';
  coverImage?: {
    src: string;
    path: string;
    alt: string;
    width: number;
    height: number;
  };
}

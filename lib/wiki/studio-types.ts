import type { WikiArticleStatus } from './types';

export const publishRequirementKeys = [
  'title',
  'content',
  'slug',
  'excerpt',
  'category',
  'seoDescription',
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
  coverImageAlt: string;
  coverImageWidth: string;
  coverImageHeight: string;
  featured: boolean;
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
}

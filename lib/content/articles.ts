/**
 * Article type definitions and utilities
 * Content will be managed via MDX files or CMS
 */

import type { Locale } from '../site';
import type { CategoryId } from './categories';

export interface ArticleMeta {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  category: CategoryId;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTime: number; // minutes
  featured?: boolean;
  keywords?: string[];
}

export interface Article extends ArticleMeta {
  content: Record<Locale, string>; // MDX content or markdown
}

/**
 * Placeholder for article fetching logic
 * To be implemented with MDX or CMS integration
 */
export async function getArticles(): Promise<ArticleMeta[]> {
  // TODO: Implement with MDX files or headless CMS
  return [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // TODO: Implement with MDX files or headless CMS
  return null;
}

export async function getFeaturedArticles(
  limit: number = 3
): Promise<ArticleMeta[]> {
  // TODO: Implement
  return [];
}

export async function getArticlesByCategory(
  category: CategoryId
): Promise<ArticleMeta[]> {
  // TODO: Implement
  return [];
}

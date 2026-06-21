/**
 * Series (article collections) type definitions
 */

import type { Locale } from '../site';
import type { CategoryId } from './categories';

export interface SeriesMeta {
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  category: CategoryId;
  articleSlugs: string[]; // Ordered list of article slugs
  publishedAt: string;
  updatedAt?: string;
}

export interface Series extends SeriesMeta {
  articles: Array<{
    slug: string;
    title: Record<Locale, string>;
    excerpt: Record<Locale, string>;
    order: number;
  }>;
}

/**
 * Placeholder for series fetching logic
 */
export async function getSeries(): Promise<SeriesMeta[]> {
  // TODO: Implement
  return [];
}

export async function getSeriesBySlug(): Promise<Series | null> {
  // TODO: Implement
  return null;
}

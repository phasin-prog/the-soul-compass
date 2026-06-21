/**
 * Concept definitions (glossary/encyclopedia entries)
 */

import type { Locale } from '../site';
import type { CategoryId } from './categories';

export interface ConceptMeta {
  slug: string;
  term: Record<Locale, string>;
  definition: Record<Locale, string>;
  category: CategoryId;
  relatedConcepts?: string[]; // slugs
  relatedArticles?: string[]; // slugs
}

export interface Concept extends ConceptMeta {
  content: Record<Locale, string>; // Extended explanation
  references?: Array<{
    author: string;
    title: string;
    year: number;
    url?: string;
  }>;
}

/**
 * Placeholder for concept fetching logic
 */
export async function getConcepts(): Promise<ConceptMeta[]> {
  // TODO: Implement
  return [];
}

export async function getConceptBySlug(slug: string): Promise<Concept | null> {
  // TODO: Implement
  return null;
}

export async function getConceptsByCategory(
  category: CategoryId
): Promise<ConceptMeta[]> {
  // TODO: Implement
  return [];
}

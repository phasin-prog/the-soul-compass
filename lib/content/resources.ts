/**
 * Resource definitions (books, papers, external links)
 */

import type { Locale } from '../site';
import type { CategoryId } from './categories';

export type ResourceType = 'book' | 'paper' | 'video' | 'website' | 'course';

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  author: string;
  year?: number;
  description: Record<Locale, string>;
  url?: string;
  category: CategoryId;
  language: string; // ISO language code
  featured?: boolean;
}

/**
 * Placeholder for resource fetching logic
 */
export async function getResources(): Promise<Resource[]> {
  // TODO: Implement
  return [];
}

export async function getResourcesByCategory(): Promise<Resource[]> {
  // TODO: Implement
  return [];
}

export async function getFeaturedResources(): Promise<Resource[]> {
  // TODO: Implement
  return [];
}

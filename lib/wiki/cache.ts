import type { Locale } from '@/lib/site';

export const ARTICLE_PUBLICATIONS_CACHE_TAG = 'article-publications';

export function articleLocaleCacheTag(locale: Locale): string {
  return `article-publications:${locale}`;
}

export function articleCacheTag(locale: Locale, slug: string): string {
  return `article-publications:${locale}:${slug}`;
}

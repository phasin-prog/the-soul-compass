/**
 * Route generation utilities
 */

import type { Locale } from './site';

export const routes = {
  home: (locale: Locale) => `/${locale}`,

  // Content routes
  articles: (locale: Locale) => `/${locale}/articles`,
  article: (locale: Locale, slug: string) => `/${locale}/articles/${slug}`,

  series: (locale: Locale) => `/${locale}/series`,
  seriesDetail: (locale: Locale, slug: string) => `/${locale}/series/${slug}`,

  concepts: (locale: Locale) => `/${locale}/concepts`,
  concept: (locale: Locale, slug: string) => `/${locale}/concepts/${slug}`,
  externalLinks: (locale: Locale) => `/${locale}/external-links`,

  // Member routes
  login: (locale: Locale) => `/${locale}/login`,
  register: (locale: Locale) => `/${locale}/register`,
  account: (locale: Locale) => `/${locale}/account`,
  bookmarks: (locale: Locale) => `/${locale}/account/bookmarks`,
  readingHistory: (locale: Locale) => `/${locale}/account/reading-history`,
  savedConcepts: (locale: Locale) => `/${locale}/account/saved-concepts`,
  admin: (locale: Locale) => `/${locale}/admin`,
  adminArticles: (locale: Locale) => `/${locale}/admin/articles`,
  adminConcepts: (locale: Locale) => `/${locale}/admin/concepts`,
  adminExternalLinks: (locale: Locale) => `/${locale}/admin/external-links`,

  // Category routes
  analyticalPsychology: (locale: Locale) => `/${locale}/analytical-psychology`,
  analyticalPsychologyArticle: (locale: Locale, slug: string) =>
    `/${locale}/analytical-psychology/${slug}`,

  psychoanalysis: (locale: Locale) => `/${locale}/psychoanalysis`,
  psychoanalysisArticle: (locale: Locale, slug: string) =>
    `/${locale}/psychoanalysis/${slug}`,

  philosophy: (locale: Locale) => `/${locale}/philosophy`,
  philosophyArticle: (locale: Locale, slug: string) =>
    `/${locale}/philosophy/${slug}`,

  typology: (locale: Locale) => `/${locale}/typology`,
  typologyArticle: (locale: Locale, slug: string) =>
    `/${locale}/typology/${slug}`,

  tpdt: (locale: Locale) => `/${locale}/tpdt`,
  tpdtArticle: (locale: Locale, slug: string) =>
    `/${locale}/tpdt/${slug}`,

  // Static pages
  resources: (locale: Locale) => `/${locale}/resources`,
  reference: (locale: Locale, slug: string) =>
    `/${locale}/resources/${slug}`,
  support: (locale: Locale) => `/${locale}/support`,
  about: (locale: Locale) => `/${locale}/about`,
  manifesto: (locale: Locale) => `/${locale}/manifesto`,
  contact: (locale: Locale) => `/${locale}/contact`,
} as const;

/**
 * Extract locale from pathname
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment === 'th' || firstSegment === 'en') {
    return firstSegment;
  }

  return null;
}

/**
 * Remove locale prefix from pathname
 */
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment === 'th' || firstSegment === 'en') {
    return '/' + segments.slice(1).join('/');
  }

  return pathname;
}

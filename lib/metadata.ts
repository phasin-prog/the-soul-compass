/**
 * Shared metadata utilities
 */

import type { Locale } from './site';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoulscompass.com';

/**
 * Generate canonical URL for a route
 */
export function getCanonicalUrl(locale: Locale, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}/${locale}${cleanPath}`;
}

/**
 * Generate alternate URLs for locale switching
 */
export function getAlternateUrls(path: string = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return {
    'x-default': `${baseUrl}/th${cleanPath}`,
    th: `${baseUrl}/th${cleanPath}`,
    en: `${baseUrl}/en${cleanPath}`,
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function getOrganizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "The Soul's Compass",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      locale === 'th'
        ? 'พื้นที่ศึกษาจิตใจมนุษย์ผ่านจิตวิทยาหลายสำนัก ประสาทวิทยาศาสตร์ และปรัชญา'
        : 'A space for studying mind across psychology, neuroscience, and philosophy',
    sameAs: [],
  };
}

/**
 * Generate JSON-LD structured data for WebSite
 */
export function getWebSiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "The Soul's Compass",
    url: `${baseUrl}/${locale}`,
    description:
      locale === 'th'
        ? 'พื้นที่ความรู้เรื่องจิตใจมนุษย์ที่เชื่อมจิตวิทยาหลายสำนัก ประสาทวิทยาศาสตร์ จิตวิทยาสังคม และปรัชญา'
        : 'A serious knowledge platform connecting multiple psychologies, neuroscience, social psychology, and philosophy',
    inLanguage: locale === 'th' ? 'th-TH' : 'en-US',
  };
}

/**
 * Generate JSON-LD for Article
 */
export function getArticleJsonLd(
  locale: Locale,
  article: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    updatedAt?: string;
    author: string;
    category: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${baseUrl}/${locale}/articles/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: "The Soul's Compass",
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    articleSection: article.category,
    inLanguage: locale === 'th' ? 'th-TH' : 'en-US',
  };
}

export function getConceptJsonLd(
  locale: Locale,
  concept: {
    title: string;
    description: string;
    slug: string;
    category: string;
    tradition: string;
    updatedAt: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: concept.title,
    description: concept.description,
    url: `${baseUrl}/${locale}/concepts/${concept.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: "The Soul's Compass Concept Library",
      url: `${baseUrl}/${locale}/concepts`,
    },
    termCode: concept.slug,
    inLanguage: locale === 'th' ? 'th-TH' : 'en-US',
    additionalType: concept.category,
    subjectOf: concept.tradition,
    dateModified: concept.updatedAt,
  };
}

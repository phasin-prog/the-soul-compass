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
        ? 'พื้นที่สำหรับอ่านจิตใจมนุษย์อย่างลึกกว่าแบบทดสอบ'
        : 'A space for understanding the human psyche beyond personality tests',
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
        ? 'พื้นที่สำหรับอ่านจิตใจมนุษย์อย่างลึกกว่าแบบทดสอบ — จิตวิทยาเชิงลึก จิตวิเคราะห์ และปรัชญา'
        : 'A serious knowledge platform for depth psychology, analytical psychology, psychoanalysis, and philosophy',
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
    inLanguage: locale === 'th' ? 'th-TH' : 'en-US',
  };
}

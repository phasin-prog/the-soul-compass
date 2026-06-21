import { describe, expect, it } from 'vitest';
import {
  getAlternateUrls,
  getArticleJsonLd,
  getCanonicalUrl,
  getConceptJsonLd,
  getOrganizationJsonLd,
  getWebSiteJsonLd,
} from './metadata';

const baseUrl = 'https://thesoulscompass.com';

describe('getCanonicalUrl', () => {
  it('generates canonical URL for locale root', () => {
    expect(getCanonicalUrl('th')).toBe(`${baseUrl}/th/`);
    expect(getCanonicalUrl('en')).toBe(`${baseUrl}/en/`);
  });

  it('appends path with leading slash', () => {
    expect(getCanonicalUrl('th', '/articles')).toBe(`${baseUrl}/th/articles`);
  });

  it('normalizes path without leading slash', () => {
    expect(getCanonicalUrl('en', 'concepts/anima')).toBe(
      `${baseUrl}/en/concepts/anima`
    );
  });

  it('handles empty path', () => {
    expect(getCanonicalUrl('th', '')).toBe(`${baseUrl}/th/`);
  });
});

describe('getAlternateUrls', () => {
  it('returns alternate URLs for all locales and x-default', () => {
    const result = getAlternateUrls('/articles');
    expect(result).toEqual({
      'x-default': `${baseUrl}/th/articles`,
      th: `${baseUrl}/th/articles`,
      en: `${baseUrl}/en/articles`,
    });
  });

  it('handles empty path', () => {
    const result = getAlternateUrls();
    expect(result).toEqual({
      'x-default': `${baseUrl}/th/`,
      th: `${baseUrl}/th/`,
      en: `${baseUrl}/en/`,
    });
  });

  it('normalizes path without leading slash', () => {
    const result = getAlternateUrls('concepts');
    expect(result.th).toBe(`${baseUrl}/th/concepts`);
    expect(result.en).toBe(`${baseUrl}/en/concepts`);
  });
});

describe('getOrganizationJsonLd', () => {
  it('returns schema.org Organization for Thai locale', () => {
    const result = getOrganizationJsonLd('th');
    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('Organization');
    expect(result.name).toBe("The Soul's Compass");
    expect(result.url).toBe(baseUrl);
    expect(result.description).toContain('จิตวิทยา');
  });

  it('returns English description for en locale', () => {
    const result = getOrganizationJsonLd('en');
    expect(result.description).toContain('psychology');
  });
});

describe('getWebSiteJsonLd', () => {
  it('returns schema.org WebSite with correct locale URL', () => {
    const result = getWebSiteJsonLd('th');
    expect(result['@type']).toBe('WebSite');
    expect(result.url).toBe(`${baseUrl}/th`);
    expect(result.inLanguage).toBe('th-TH');
  });

  it('uses en-US language for English locale', () => {
    const result = getWebSiteJsonLd('en');
    expect(result.url).toBe(`${baseUrl}/en`);
    expect(result.inLanguage).toBe('en-US');
  });
});

describe('getArticleJsonLd', () => {
  const article = {
    title: 'Shadow Work',
    description: 'Understanding shadows',
    slug: 'shadow-work',
    publishedAt: '2024-01-15',
    author: 'Test Author',
    category: 'analytical-psychology',
  };

  it('returns schema.org Article with correct fields', () => {
    const result = getArticleJsonLd('th', article);
    expect(result['@type']).toBe('Article');
    expect(result.headline).toBe('Shadow Work');
    expect(result.url).toBe(`${baseUrl}/th/articles/shadow-work`);
    expect(result.datePublished).toBe('2024-01-15');
    expect(result.dateModified).toBe('2024-01-15');
    expect(result.author.name).toBe('Test Author');
    expect(result.inLanguage).toBe('th-TH');
    expect(result.articleSection).toBe('analytical-psychology');
  });

  it('uses updatedAt for dateModified when provided', () => {
    const result = getArticleJsonLd('en', {
      ...article,
      updatedAt: '2024-06-01',
    });
    expect(result.dateModified).toBe('2024-06-01');
    expect(result.inLanguage).toBe('en-US');
  });
});

describe('getConceptJsonLd', () => {
  const concept = {
    title: 'Anima',
    description: 'The feminine inner personality',
    slug: 'anima',
    category: 'analytical-psychology',
    tradition: 'Jungian',
    updatedAt: '2024-03-10',
  };

  it('returns schema.org DefinedTerm', () => {
    const result = getConceptJsonLd('th', concept);
    expect(result['@type']).toBe('DefinedTerm');
    expect(result.name).toBe('Anima');
    expect(result.url).toBe(`${baseUrl}/th/concepts/anima`);
    expect(result.termCode).toBe('anima');
    expect(result.inLanguage).toBe('th-TH');
    expect(result.dateModified).toBe('2024-03-10');
  });

  it('generates correct URL for English locale', () => {
    const result = getConceptJsonLd('en', concept);
    expect(result.url).toBe(`${baseUrl}/en/concepts/anima`);
    expect(result.inLanguage).toBe('en-US');
  });
});

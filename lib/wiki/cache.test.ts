import { describe, expect, it } from 'vitest';
import {
  ARTICLE_PUBLICATIONS_CACHE_TAG,
  articleCacheTag,
  articleLocaleCacheTag,
} from './cache';

describe('ARTICLE_PUBLICATIONS_CACHE_TAG', () => {
  it('is the expected constant', () => {
    expect(ARTICLE_PUBLICATIONS_CACHE_TAG).toBe('article-publications');
  });
});

describe('articleLocaleCacheTag', () => {
  it('generates locale-scoped cache tag for th', () => {
    expect(articleLocaleCacheTag('th')).toBe('article-publications:th');
  });

  it('generates locale-scoped cache tag for en', () => {
    expect(articleLocaleCacheTag('en')).toBe('article-publications:en');
  });
});

describe('articleCacheTag', () => {
  it('generates locale+slug cache tag', () => {
    expect(articleCacheTag('th', 'shadow-work')).toBe(
      'article-publications:th:shadow-work'
    );
  });

  it('generates different tags for different locales', () => {
    expect(articleCacheTag('th', 'test')).not.toBe(
      articleCacheTag('en', 'test')
    );
  });

  it('generates different tags for different slugs', () => {
    expect(articleCacheTag('th', 'slug-a')).not.toBe(
      articleCacheTag('th', 'slug-b')
    );
  });
});

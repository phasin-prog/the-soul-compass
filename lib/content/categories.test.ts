import { describe, expect, it } from 'vitest';
import { categories, categoryIds, isCategoryId } from './categories';

describe('categoryIds', () => {
  it('contains all expected category identifiers', () => {
    const expected = [
      'analytical-psychology',
      'psychoanalysis',
      'neuroscience',
      'social-psychology',
      'philosophy',
      'philosophy-of-mind',
      'typology',
      'tpdt',
    ];
    expect(categoryIds).toEqual(expected);
  });
});

describe('categories', () => {
  it('has an entry for every categoryId', () => {
    for (const id of categoryIds) {
      expect(categories[id]).toBeDefined();
      expect(categories[id].id).toBe(id);
    }
  });

  it('each category has bilingual name and description', () => {
    for (const id of categoryIds) {
      const cat = categories[id];
      expect(typeof cat.name.th).toBe('string');
      expect(typeof cat.name.en).toBe('string');
      expect(cat.name.th.length).toBeGreaterThan(0);
      expect(cat.name.en.length).toBeGreaterThan(0);
      expect(typeof cat.description.th).toBe('string');
      expect(typeof cat.description.en).toBe('string');
    }
  });

  it('each category has a non-empty slug', () => {
    for (const id of categoryIds) {
      expect(categories[id].slug).toBeTruthy();
    }
  });

  it('slug matches the id', () => {
    for (const id of categoryIds) {
      expect(categories[id].slug).toBe(id);
    }
  });

  it('each category has a color', () => {
    for (const id of categoryIds) {
      expect(categories[id].color).toBeTruthy();
    }
  });
});

describe('isCategoryId', () => {
  it('returns true for valid category ids', () => {
    expect(isCategoryId('analytical-psychology')).toBe(true);
    expect(isCategoryId('psychoanalysis')).toBe(true);
    expect(isCategoryId('neuroscience')).toBe(true);
    expect(isCategoryId('tpdt')).toBe(true);
    expect(isCategoryId('philosophy-of-mind')).toBe(true);
  });

  it('returns false for invalid strings', () => {
    expect(isCategoryId('invalid')).toBe(false);
    expect(isCategoryId('')).toBe(false);
    expect(isCategoryId('Analytical-Psychology')).toBe(false);
    expect(isCategoryId('analytics')).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import { defaultLocale, getT, isValidLocale, locales } from './index';

describe('locales', () => {
  it('contains th and en', () => {
    expect(locales).toEqual(['th', 'en']);
  });
});

describe('defaultLocale', () => {
  it('defaults to Thai', () => {
    expect(defaultLocale).toBe('th');
  });
});

describe('isValidLocale', () => {
  it('returns true for "th"', () => {
    expect(isValidLocale('th')).toBe(true);
  });

  it('returns true for "en"', () => {
    expect(isValidLocale('en')).toBe(true);
  });

  it('returns false for unsupported locales', () => {
    expect(isValidLocale('fr')).toBe(false);
    expect(isValidLocale('ja')).toBe(false);
    expect(isValidLocale('')).toBe(false);
    expect(isValidLocale('TH')).toBe(false);
  });
});

describe('getT', () => {
  it('returns Thai translations for "th"', () => {
    const t = getT('th');
    expect(t.meta.siteName).toBeDefined();
    expect(typeof t.meta.siteName).toBe('string');
    expect(t.meta.siteName.length).toBeGreaterThan(0);
  });

  it('returns English translations for "en"', () => {
    const t = getT('en');
    expect(t.meta.siteName).toBeDefined();
    expect(typeof t.meta.siteName).toBe('string');
  });

  it('returns all required translation keys', () => {
    const t = getT('th');
    expect(t.nav).toBeDefined();
    expect(t.nav.home).toBeDefined();
    expect(t.nav.articles).toBeDefined();
    expect(t.categories).toBeDefined();
    expect(t.article).toBeDefined();
    expect(t.concept).toBeDefined();
    expect(t.ui).toBeDefined();
    expect(t.footer).toBeDefined();
  });

  it('English and Thai have the same top-level keys', () => {
    const th = getT('th');
    const en = getT('en');
    expect(Object.keys(th).sort()).toEqual(Object.keys(en).sort());
  });
});

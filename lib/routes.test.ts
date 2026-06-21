import { describe, expect, it } from 'vitest';
import { getLocaleFromPathname, removeLocaleFromPathname, routes } from './routes';

describe('routes', () => {
  describe('home', () => {
    it('returns /th for Thai locale', () => {
      expect(routes.home('th')).toBe('/th');
    });
    it('returns /en for English locale', () => {
      expect(routes.home('en')).toBe('/en');
    });
  });

  describe('content routes', () => {
    it('generates articles listing path', () => {
      expect(routes.articles('th')).toBe('/th/articles');
      expect(routes.articles('en')).toBe('/en/articles');
    });

    it('generates article detail path with slug', () => {
      expect(routes.article('th', 'shadow-work')).toBe('/th/articles/shadow-work');
      expect(routes.article('en', 'shadow-work')).toBe('/en/articles/shadow-work');
    });

    it('generates series listing path', () => {
      expect(routes.series('th')).toBe('/th/series');
    });

    it('generates series detail path', () => {
      expect(routes.seriesDetail('en', 'jung-basics')).toBe('/en/series/jung-basics');
    });

    it('generates concepts listing path', () => {
      expect(routes.concepts('th')).toBe('/th/concepts');
    });

    it('generates concept detail path', () => {
      expect(routes.concept('en', 'anima')).toBe('/en/concepts/anima');
    });
  });

  describe('category routes', () => {
    it('generates analytical-psychology paths', () => {
      expect(routes.analyticalPsychology('th')).toBe('/th/analytical-psychology');
      expect(routes.analyticalPsychologyArticle('en', 'archetypes')).toBe(
        '/en/analytical-psychology/archetypes'
      );
    });

    it('generates psychoanalysis paths', () => {
      expect(routes.psychoanalysis('en')).toBe('/en/psychoanalysis');
      expect(routes.psychoanalysisArticle('th', 'ego')).toBe('/th/psychoanalysis/ego');
    });

    it('generates philosophy paths', () => {
      expect(routes.philosophy('th')).toBe('/th/philosophy');
      expect(routes.philosophyArticle('en', 'epistemology')).toBe(
        '/en/philosophy/epistemology'
      );
    });

    it('generates typology paths', () => {
      expect(routes.typology('en')).toBe('/en/typology');
      expect(routes.typologyArticle('th', 'introversion')).toBe(
        '/th/typology/introversion'
      );
    });

    it('generates tpdt paths', () => {
      expect(routes.tpdt('th')).toBe('/th/tpdt');
      expect(routes.tpdtArticle('en', 'overview')).toBe('/en/tpdt/overview');
    });
  });

  describe('static page routes', () => {
    it('generates resources path', () => {
      expect(routes.resources('th')).toBe('/th/resources');
    });
    it('generates about path', () => {
      expect(routes.about('en')).toBe('/en/about');
    });
    it('generates manifesto path', () => {
      expect(routes.manifesto('th')).toBe('/th/manifesto');
    });
    it('generates contact path', () => {
      expect(routes.contact('en')).toBe('/en/contact');
    });
  });
});

describe('getLocaleFromPathname', () => {
  it('returns "th" for Thai paths', () => {
    expect(getLocaleFromPathname('/th')).toBe('th');
    expect(getLocaleFromPathname('/th/articles')).toBe('th');
    expect(getLocaleFromPathname('/th/articles/my-slug')).toBe('th');
  });

  it('returns "en" for English paths', () => {
    expect(getLocaleFromPathname('/en')).toBe('en');
    expect(getLocaleFromPathname('/en/concepts/anima')).toBe('en');
  });

  it('returns null for paths without a valid locale prefix', () => {
    expect(getLocaleFromPathname('/')).toBeNull();
    expect(getLocaleFromPathname('/articles')).toBeNull();
    expect(getLocaleFromPathname('/fr/articles')).toBeNull();
    expect(getLocaleFromPathname('')).toBeNull();
  });
});

describe('removeLocaleFromPathname', () => {
  it('removes /th prefix', () => {
    expect(removeLocaleFromPathname('/th/articles')).toBe('/articles');
    expect(removeLocaleFromPathname('/th/articles/slug')).toBe('/articles/slug');
  });

  it('removes /en prefix', () => {
    expect(removeLocaleFromPathname('/en/concepts')).toBe('/concepts');
  });

  it('returns root path when locale is the only segment', () => {
    expect(removeLocaleFromPathname('/th')).toBe('/');
  });

  it('returns original path when no locale prefix', () => {
    expect(removeLocaleFromPathname('/articles')).toBe('/articles');
    expect(removeLocaleFromPathname('/')).toBe('/');
    expect(removeLocaleFromPathname('/fr/articles')).toBe('/fr/articles');
  });
});

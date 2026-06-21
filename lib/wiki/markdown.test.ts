import { describe, expect, it } from 'vitest';
import {
  extractWikiLinks,
  parseCommaSeparated,
  renderObsidianLinks,
  slugifyWikiValue,
} from './markdown';

describe('slugifyWikiValue', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugifyWikiValue('Shadow Work')).toBe('shadow-work');
  });

  it('handles multiple spaces and special characters', () => {
    expect(slugifyWikiValue('Hello   World!')).toBe('hello-world');
  });

  it('strips leading and trailing hyphens', () => {
    expect(slugifyWikiValue('  --hello--  ')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(slugifyWikiValue('')).toBe('');
  });

  it('preserves unicode letters (Thai)', () => {
    const result = slugifyWikiValue('จิตใต้สำนึก');
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toContain(' ');
  });

  it('normalizes NFKC', () => {
    // ﬁ (U+FB01) should normalize to fi
    expect(slugifyWikiValue('ﬁrst')).toBe('first');
  });

  it('truncates to 180 characters', () => {
    const long = 'a'.repeat(200);
    expect(slugifyWikiValue(long).length).toBe(180);
  });
});

describe('extractWikiLinks', () => {
  it('extracts basic wiki links', () => {
    const content = 'See [[Shadow Work]] for details.';
    const links = extractWikiLinks(content);
    expect(links).toHaveLength(1);
    expect(links[0].slug).toBe('shadow-work');
    expect(links[0].label).toBe('Shadow Work');
    expect(links[0].kind).toBe('article');
  });

  it('extracts links with custom labels', () => {
    const content = 'Read about [[Shadow Work|the shadow]].';
    const links = extractWikiLinks(content);
    expect(links).toHaveLength(1);
    expect(links[0].slug).toBe('shadow-work');
    expect(links[0].label).toBe('the shadow');
  });

  it('extracts concept-typed links', () => {
    const content = 'See [[concept:Anima]].';
    const links = extractWikiLinks(content);
    expect(links).toHaveLength(1);
    expect(links[0].kind).toBe('concept');
    expect(links[0].slug).toBe('anima');
    expect(links[0].label).toBe('Anima');
  });

  it('extracts article-typed links', () => {
    const content = 'Read [[article:Shadow Work]].';
    const links = extractWikiLinks(content);
    expect(links).toHaveLength(1);
    expect(links[0].kind).toBe('article');
    expect(links[0].slug).toBe('shadow-work');
  });

  it('deduplicates links by kind:slug', () => {
    const content = '[[Shadow Work]] and again [[Shadow Work]].';
    const links = extractWikiLinks(content);
    expect(links).toHaveLength(1);
  });

  it('extracts multiple distinct links', () => {
    const content = '[[Shadow Work]] and [[Anima]] and [[concept:Persona]].';
    const links = extractWikiLinks(content);
    expect(links).toHaveLength(3);
  });

  it('returns empty array for content without wiki links', () => {
    expect(extractWikiLinks('No links here.')).toEqual([]);
  });

  it('handles links with heading anchors', () => {
    const content = '[[Shadow Work#introduction]]';
    const links = extractWikiLinks(content);
    expect(links).toHaveLength(1);
    expect(links[0].slug).toBe('shadow-work');
  });

  it('handles links with anchors and custom labels', () => {
    const content = '[[Shadow Work#intro|read the intro]]';
    const links = extractWikiLinks(content);
    expect(links).toHaveLength(1);
    expect(links[0].label).toBe('read the intro');
  });
});

describe('renderObsidianLinks', () => {
  it('converts basic wiki links to markdown links', () => {
    const content = 'See [[Shadow Work]] for more.';
    const result = renderObsidianLinks(content, 'th');
    expect(result).toBe('See [Shadow Work](/th/articles/shadow-work) for more.');
  });

  it('converts links with custom labels', () => {
    const content = '[[Shadow Work|the shadow]]';
    const result = renderObsidianLinks(content, 'en');
    expect(result).toBe('[the shadow](/en/articles/shadow-work)');
  });

  it('converts concept-typed links', () => {
    const content = '[[concept:Anima]]';
    const result = renderObsidianLinks(content, 'th');
    expect(result).toBe('[Anima](/th/concepts/anima)');
  });

  it('converts article-typed links', () => {
    const content = '[[article:Shadow Work]]';
    const result = renderObsidianLinks(content, 'en');
    expect(result).toBe('[Shadow Work](/en/articles/shadow-work)');
  });

  it('handles multiple links in one string', () => {
    const content = '[[Shadow Work]] and [[concept:Anima]]';
    const result = renderObsidianLinks(content, 'th');
    expect(result).toContain('/th/articles/shadow-work');
    expect(result).toContain('/th/concepts/anima');
  });

  it('leaves non-wiki-link content untouched', () => {
    const content = 'Just regular text.';
    expect(renderObsidianLinks(content, 'th')).toBe('Just regular text.');
  });

  it('handles anchors in links', () => {
    const content = '[[Shadow Work#section]]';
    const result = renderObsidianLinks(content, 'en');
    expect(result).toBe('[Shadow Work](/en/articles/shadow-work)');
  });
});

describe('parseCommaSeparated', () => {
  it('splits comma-separated values', () => {
    expect(parseCommaSeparated('a, b, c')).toEqual(['a', 'b', 'c']);
  });

  it('splits newline-separated values', () => {
    expect(parseCommaSeparated('a\nb\nc')).toEqual(['a', 'b', 'c']);
  });

  it('deduplicates values', () => {
    expect(parseCommaSeparated('a, b, a, b')).toEqual(['a', 'b']);
  });

  it('trims whitespace', () => {
    expect(parseCommaSeparated('  hello ,  world  ')).toEqual([
      'hello',
      'world',
    ]);
  });

  it('filters empty values', () => {
    expect(parseCommaSeparated(',,,a,,b,')).toEqual(['a', 'b']);
  });

  it('handles empty string', () => {
    expect(parseCommaSeparated('')).toEqual([]);
  });

  it('limits to 30 items', () => {
    const input = Array.from({ length: 50 }, (_, i) => `item${i}`).join(',');
    expect(parseCommaSeparated(input)).toHaveLength(30);
  });
});

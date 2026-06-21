import { describe, expect, it } from 'vitest';
import {
  formatConceptLinks,
  formatReferences,
  normalizeWikiArticleMeta,
  parseConceptLinks,
  parseReferences,
} from './article-metadata';

describe('parseConceptLinks', () => {
  it('parses slug|title lines', () => {
    const result = parseConceptLinks('anima|Anima\nshadow|Shadow');
    expect(result).toEqual([
      { slug: 'anima', title: 'Anima' },
      { slug: 'shadow', title: 'Shadow' },
    ]);
  });

  it('uses slug as title when title is missing', () => {
    const result = parseConceptLinks('anima');
    expect(result).toEqual([{ slug: 'anima', title: 'anima' }]);
  });

  it('skips empty lines', () => {
    const result = parseConceptLinks('anima|Anima\n\nshadow|Shadow');
    expect(result).toHaveLength(2);
  });

  it('handles Windows-style line endings', () => {
    const result = parseConceptLinks('anima|Anima\r\nshadow|Shadow');
    expect(result).toHaveLength(2);
  });

  it('returns empty array for empty string', () => {
    expect(parseConceptLinks('')).toEqual([]);
  });
});

describe('formatConceptLinks', () => {
  it('formats concept links to slug | title lines', () => {
    const result = formatConceptLinks([
      { slug: 'anima', title: 'Anima' },
      { slug: 'shadow', title: 'Shadow' },
    ]);
    expect(result).toBe('anima | Anima\nshadow | Shadow');
  });

  it('returns empty string for empty array', () => {
    expect(formatConceptLinks([])).toBe('');
  });
});

describe('parseReferences', () => {
  it('parses pipe-delimited reference lines', () => {
    const input = 'Jung, C.G.|1921|Psychological Types|Princeton UP|https://example.com';
    const result = parseReferences(input);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 'studio-reference-1',
      authors: 'Jung, C.G.',
      year: 1921,
      title: 'Psychological Types',
      publication: 'Princeton UP',
      url: 'https://example.com',
    });
  });

  it('handles references without optional fields', () => {
    const input = 'Freud, S.||The Ego and the Id';
    const result = parseReferences(input);
    expect(result).toHaveLength(1);
    expect(result[0].authors).toBe('Freud, S.');
    expect(result[0].title).toBe('The Ego and the Id');
    expect(result[0].year).toBeUndefined();
    expect(result[0].publication).toBeUndefined();
    expect(result[0].url).toBeUndefined();
  });

  it('assigns sequential ids', () => {
    const input = 'Author1||Title1\nAuthor2||Title2';
    const result = parseReferences(input);
    expect(result[0].id).toBe('studio-reference-1');
    expect(result[1].id).toBe('studio-reference-2');
  });

  it('skips lines with missing authors or title', () => {
    const input = '||Title Only\nAuthors Only||';
    const result = parseReferences(input);
    expect(result).toHaveLength(0);
  });

  it('returns empty array for empty string', () => {
    expect(parseReferences('')).toEqual([]);
  });
});

describe('formatReferences', () => {
  it('formats references to pipe-delimited lines', () => {
    const result = formatReferences([
      {
        id: 'ref-1',
        authors: 'Jung, C.G.',
        year: 1921,
        title: 'Psychological Types',
        publication: 'Princeton UP',
        url: 'https://example.com',
      },
    ]);
    expect(result).toBe(
      'Jung, C.G. | 1921 | Psychological Types | Princeton UP | https://example.com'
    );
  });

  it('handles missing optional fields', () => {
    const result = formatReferences([
      {
        id: 'ref-1',
        authors: 'Freud, S.',
        title: 'The Ego and the Id',
      },
    ]);
    expect(result).toBe('Freud, S. |  | The Ego and the Id |  | ');
  });

  it('returns empty string for empty array', () => {
    expect(formatReferences([])).toBe('');
  });
});

describe('normalizeWikiArticleMeta', () => {
  const validInput = {
    id: 'article-1',
    publicId: 'pub-1',
    ownerId: 'user-1',
    authorName: 'Test Author',
    title: 'Test Title',
    subtitle: 'Subtitle',
    slug: 'test-title',
    locale: 'th',
    excerpt: 'An excerpt',
    category: 'analytical-psychology',
    school: 'Analytical Psychology',
    difficulty: 'beginner',
    tags: ['jung', 'psychology'],
    aliases: [],
    outgoingLinks: [],
    relatedConcepts: [{ slug: 'anima', title: 'Anima' }],
    relatedArticles: ['related-1'],
    references: [{ id: 'ref-1', authors: 'Jung', title: 'CW9' }],
    seoTitle: 'SEO Title',
    seoDescription: 'SEO Description',
    translations: { en: 'test-title-en' },
    featured: true,
    status: 'published',
    markdownKey: 'articles/test.md',
    contentHash: 'abc123',
    readingMinutes: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
    publishedAt: '2024-03-01T00:00:00Z',
  };

  it('returns normalized metadata for valid input', () => {
    const result = normalizeWikiArticleMeta(validInput, 'fallback.md');
    expect(result).not.toBeNull();
    expect(result!.id).toBe('article-1');
    expect(result!.title).toBe('Test Title');
    expect(result!.locale).toBe('th');
    expect(result!.status).toBe('published');
    expect(result!.schemaVersion).toBe(3);
    expect(result!.featured).toBe(true);
    expect(result!.readingMinutes).toBe(5);
  });

  it('returns null for null input', () => {
    expect(normalizeWikiArticleMeta(null, 'key.md')).toBeNull();
  });

  it('returns null for non-object input', () => {
    expect(normalizeWikiArticleMeta('string', 'key.md')).toBeNull();
    expect(normalizeWikiArticleMeta(42, 'key.md')).toBeNull();
  });

  it('returns null when required fields are missing', () => {
    expect(normalizeWikiArticleMeta({ title: 'No id' }, 'key.md')).toBeNull();
    expect(
      normalizeWikiArticleMeta(
        { id: '1', publicId: '1', ownerId: '1', slug: 's' },
        'key.md'
      )
    ).toBeNull();
  });

  it('defaults locale to th when invalid', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, locale: 'fr' },
      'key.md'
    );
    expect(result!.locale).toBe('th');
  });

  it('defaults status to draft when invalid', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, status: 'unknown' },
      'key.md'
    );
    expect(result!.status).toBe('draft');
  });

  it('defaults authorName when missing', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, authorName: undefined },
      'key.md'
    );
    expect(result!.authorName).toBeTruthy();
  });

  it('uses fallback markdown key when not provided', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, markdownKey: undefined },
      'fallback.md'
    );
    expect(result!.markdownKey).toBe('fallback.md');
  });

  it('defaults readingMinutes to 1 for invalid values', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, readingMinutes: -1 },
      'key.md'
    );
    expect(result!.readingMinutes).toBe(1);
  });

  it('defaults featured to false when not explicitly true', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, featured: undefined },
      'key.md'
    );
    expect(result!.featured).toBe(false);
  });

  it('uses seoTitle fallback to title', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, seoTitle: '' },
      'key.md'
    );
    expect(result!.seoTitle).toBe('Test Title');
  });

  it('uses seoDescription fallback to excerpt', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, seoDescription: '' },
      'key.md'
    );
    expect(result!.seoDescription).toBe('An excerpt');
  });

  it('handles empty category gracefully', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, category: 'invalid-cat' },
      'key.md'
    );
    expect(result!.category).toBe('');
  });

  it('handles translations correctly', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, translations: { th: 'thai-slug', en: 'en-slug' } },
      'key.md'
    );
    expect(result!.translations).toEqual({ th: 'thai-slug', en: 'en-slug' });
  });

  it('handles empty translations', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, translations: {} },
      'key.md'
    );
    expect(result!.translations).toEqual({});
  });

  it('filters invalid items from tags array', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, tags: ['valid', 42, null, 'also-valid'] },
      'key.md'
    );
    expect(result!.tags).toEqual(['valid', 'also-valid']);
  });

  it('returns empty array for non-array tags', () => {
    const result = normalizeWikiArticleMeta(
      { ...validInput, tags: 'not-an-array' },
      'key.md'
    );
    expect(result!.tags).toEqual([]);
  });

  it('sets publishedContentHash for published articles', () => {
    const result = normalizeWikiArticleMeta(validInput, 'key.md');
    expect(result!.publishedContentHash).toBe('abc123');
  });

  it('sets publishedSlug for published articles', () => {
    const result = normalizeWikiArticleMeta(validInput, 'key.md');
    expect(result!.publishedSlug).toBe('test-title');
  });
});

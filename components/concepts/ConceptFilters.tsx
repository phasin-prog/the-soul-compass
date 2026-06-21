'use client';

import { useMemo, useState } from 'react';
import { ConceptCard } from '@/components/concepts/ConceptCard';
import {
  categories,
  categoryIds,
  type CategoryId,
} from '@/lib/content/categories';
import { normalizeSearch } from '@/lib/search';
import type { Locale } from '@/lib/site';
import type { ConceptDifficulty, ConceptSummary } from '@/types/concept';

interface ConceptFiltersProps {
  concepts: ConceptSummary[];
  locale: Locale;
  initialCategory?: CategoryId;
}

type CategoryFilter = 'all' | CategoryId;
type DifficultyFilter = 'all' | ConceptDifficulty;

const copy = {
  th: {
    searchLabel: 'ค้นหาในคลังแนวคิด',
    searchPlaceholder: 'ค้นหาคำศัพท์ คำไทย สำนัก นักคิด หรือคำอธิบาย',
    allCategories: 'ทุกหมวด',
    difficultyLabel: 'ระดับความลึก',
    allDifficulties: 'ทุกระดับ',
    beginner: 'เริ่มต้น',
    intermediate: 'ระดับกลาง',
    advanced: 'ระดับลึก',
    reset: 'ล้างตัวกรอง',
    count: (value: number) => `${value} แนวคิด`,
    noMatches: 'ไม่พบโหนดแนวคิดที่ตรงกับตัวกรอง',
    noMatchesBody: 'ลองเปลี่ยนคำค้น หมวดหมู่ หรือระดับความลึก',
  },
  en: {
    searchLabel: 'Search the concept index',
    searchPlaceholder: 'Search terms, traditions, thinkers, or definitions',
    allCategories: 'All categories',
    difficultyLabel: 'Difficulty',
    allDifficulties: 'All levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    reset: 'Clear filters',
    count: (value: number) => `${value} concept${value === 1 ? '' : 's'}`,
    noMatches: 'No concept nodes match these filters',
    noMatchesBody: 'Try another term, category, or difficulty level.',
  },
} as const;

function getAlphabetKey(title: string): string {
  const firstCharacter = Array.from(title.trim())[0];
  return firstCharacter ? firstCharacter.toLocaleUpperCase() : '#';
}

export function ConceptFilters({
  concepts,
  locale,
  initialCategory,
}: ConceptFiltersProps) {
  const t = copy[locale];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>(
    initialCategory ?? 'all'
  );
  const [difficulty, setDifficulty] =
    useState<DifficultyFilter>('all');

  const categoryCounts = useMemo(() => {
    const counts = new Map<CategoryId, number>();

    for (const concept of concepts) {
      counts.set(concept.category, (counts.get(concept.category) ?? 0) + 1);
    }

    return counts;
  }, [concepts]);

  const groupedConcepts = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    const filtered = concepts.filter((concept) => {
      if (category !== 'all' && concept.category !== category) return false;
      if (difficulty !== 'all' && concept.difficulty !== difficulty) {
        return false;
      }
      if (!normalizedQuery) return true;

      const searchable = normalizeSearch(
        [
          concept.title,
          concept.originalTerm,
          concept.thaiTerm,
          concept.shortDefinition,
          concept.tradition,
          concept.thinkers.join(' '),
          concept.relatedConcepts
            .map((relation) => `${relation.title} ${relation.relation}`)
            .join(' '),
        ].join(' ')
      );

      return searchable.includes(normalizedQuery);
    });

    const groups = new Map<string, ConceptSummary[]>();

    for (const concept of filtered) {
      const key = getAlphabetKey(concept.title);
      const group = groups.get(key) ?? [];
      group.push(concept);
      groups.set(key, group);
    }

    return Array.from(groups.entries()).sort(([a], [b]) =>
      a.localeCompare(b, 'en')
    );
  }, [category, concepts, difficulty, query]);

  const resultCount = groupedConcepts.reduce(
    (total, [, items]) => total + items.length,
    0
  );
  const hasFilters =
    query.trim().length > 0 || category !== 'all' || difficulty !== 'all';

  function resetFilters() {
    setQuery('');
    setCategory('all');
    setDifficulty('all');
  }

  return (
    <section aria-label={locale === 'th' ? 'ดัชนีแนวคิด' : 'Concept index'}>
      <div className="border-y border-border py-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end">
          <div>
            <label
              htmlFor="concept-search"
              className="mb-2 block text-sm font-medium text-text"
            >
              {t.searchLabel}
            </label>
            <input
              id="concept-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text placeholder:text-muted focus:border-accent"
            />
          </div>

          <div>
            <label
              htmlFor="concept-difficulty"
              className="mb-2 block text-sm font-medium text-text"
            >
              {t.difficultyLabel}
            </label>
            <select
              id="concept-difficulty"
              value={difficulty}
              onChange={(event) =>
                setDifficulty(event.target.value as DifficultyFilter)
              }
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text focus:border-accent"
            >
              <option value="all">{t.allDifficulties}</option>
              <option value="beginner">{t.beginner}</option>
              <option value="intermediate">{t.intermediate}</option>
              <option value="advanced">{t.advanced}</option>
            </select>
          </div>
        </div>

        <div
          className="mt-5 flex flex-wrap gap-2"
          aria-label={locale === 'th' ? 'หมวดหมู่แนวคิด' : 'Concept categories'}
        >
          <button
            type="button"
            onClick={() => setCategory('all')}
            aria-pressed={category === 'all'}
            className={`min-h-11 rounded-full border px-4 text-sm transition-colors duration-200 ${
              category === 'all'
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-border text-muted hover:border-border-strong hover:text-text'
            }`}
          >
            {t.allCategories}
          </button>

          {categoryIds.map((categoryId) => (
            <button
              key={categoryId}
              type="button"
              onClick={() => setCategory(categoryId)}
              aria-pressed={category === categoryId}
              className={`min-h-11 rounded-full border px-4 text-sm transition-colors duration-200 ${
                category === categoryId
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-border text-muted hover:border-border-strong hover:text-text'
              }`}
            >
              {categories[categoryId].name[locale]}{' '}
              <span className="text-faint">
                {categoryCounts.get(categoryId) ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-16 items-center justify-between gap-4">
        <p className="type-meta text-muted" aria-live="polite">
          {t.count(resultCount)}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="min-h-11 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
          >
            {t.reset}
          </button>
        ) : null}
      </div>

      {groupedConcepts.length > 0 ? (
        <div className="space-y-12">
          {groupedConcepts.map(([letter, items]) => (
            <section
              key={letter}
              aria-labelledby={`concept-group-${letter}`}
              className="grid gap-5 md:grid-cols-[4rem_minmax(0,1fr)]"
            >
              <h2
                id={`concept-group-${letter}`}
                className="type-section-title text-accent md:sticky md:top-28 md:self-start"
              >
                {letter}
              </h2>
              <div className="border-b border-border">
                {items.map((concept) => (
                  <ConceptCard
                    key={concept.slug}
                    concept={concept}
                    locale={locale}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="border-y border-border py-14">
          <h2 className="type-section-title text-text">{t.noMatches}</h2>
          <p className="mt-3 max-w-xl text-muted">{t.noMatchesBody}</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 min-h-11 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
          >
            {t.reset}
          </button>
        </div>
      )}
    </section>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { ReferenceCard } from '@/components/resources/ReferenceCard';
import {
  referenceCategoryLabels,
  referenceSourceLevelLabels,
  referenceTypeLabels,
} from '@/lib/content/reference-taxonomy';
import type { Locale } from '@/lib/site';
import {
  referenceCategories,
  referenceSourceLevels,
  referenceTypes,
  type Reference,
  type ReferenceCategory,
  type ReferenceSourceLevel,
  type ReferenceType,
} from '@/types/reference';

interface ReferenceFiltersProps {
  locale: Locale;
  references: Reference[];
}

type TypeFilter = 'all' | ReferenceType;
type CategoryFilter = 'all' | ReferenceCategory;
type SourceLevelFilter = 'all' | ReferenceSourceLevel;

const copy = {
  th: {
    searchLabel: 'ค้นในคลังอ้างอิง',
    searchPlaceholder: 'ค้นชื่อเรื่อง ผู้เขียน นักคิด หรือแนวคิด',
    type: 'ประเภทเอกสาร',
    allTypes: 'ทุกประเภท',
    category: 'หมวดความรู้',
    allCategories: 'ทุกหมวด',
    sourceLevel: 'ระดับแหล่งข้อมูล',
    allSourceLevels: 'ทุกระดับ',
    reset: 'ล้างตัวกรอง',
    count: (value: number) => `${value} ระเบียน`,
    noMatches: 'ไม่พบระเบียนที่ตรงกับตัวกรอง',
    noMatchesBody: 'ลองเปลี่ยนคำค้น ประเภท หมวด หรือระดับแหล่งข้อมูล',
  },
  en: {
    searchLabel: 'Search the reference archive',
    searchPlaceholder: 'Search title, author, thinker, or concept',
    type: 'Resource type',
    allTypes: 'All types',
    category: 'Knowledge area',
    allCategories: 'All categories',
    sourceLevel: 'Source level',
    allSourceLevels: 'All source levels',
    reset: 'Clear filters',
    count: (value: number) => `${value} record${value === 1 ? '' : 's'}`,
    noMatches: 'No reference records match these filters',
    noMatchesBody: 'Try another term, type, category, or source level.',
  },
} as const;

function normalize(value: string): string {
  return value.normalize('NFKC').trim().toLocaleLowerCase();
}

export function ReferenceFilters({
  locale,
  references,
}: ReferenceFiltersProps) {
  const t = copy[locale];
  const [query, setQuery] = useState('');
  const [type, setType] = useState<TypeFilter>('all');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sourceLevel, setSourceLevel] =
    useState<SourceLevelFilter>('all');

  const availableTypes = useMemo(
    () =>
      referenceTypes.filter((value) =>
        references.some((reference) => reference.type === value)
      ),
    [references]
  );
  const availableCategories = useMemo(
    () =>
      referenceCategories.filter((value) =>
        references.some((reference) => reference.category === value)
      ),
    [references]
  );

  const filteredReferences = useMemo(() => {
    const normalizedQuery = normalize(query);

    return references.filter((reference) => {
      if (type !== 'all' && reference.type !== type) return false;
      if (category !== 'all' && reference.category !== category) return false;
      if (
        sourceLevel !== 'all' &&
        reference.sourceLevel !== sourceLevel
      ) {
        return false;
      }
      if (!normalizedQuery) return true;

      return normalize(
        [
          reference.title,
          reference.originalTitle ?? '',
          reference.author,
          reference.year?.toString() ?? '',
          reference.language,
          reference.tradition,
          reference.citationText,
          reference.relatedThinkers.join(' '),
          reference.relatedConcepts.join(' '),
        ].join(' ')
      ).includes(normalizedQuery);
    });
  }, [category, query, references, sourceLevel, type]);

  const hasFilters =
    query.trim().length > 0 ||
    type !== 'all' ||
    category !== 'all' ||
    sourceLevel !== 'all';

  function resetFilters() {
    setQuery('');
    setType('all');
    setCategory('all');
    setSourceLevel('all');
  }

  return (
    <section
      aria-label={locale === 'th' ? 'ดัชนีอ้างอิง' : 'Reference index'}
    >
      <div className="border-y border-border py-6">
        <div>
          <label
            htmlFor="reference-search"
            className="mb-2 block text-sm font-medium text-text"
          >
            {t.searchLabel}
          </label>
          <input
            id="reference-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.searchPlaceholder}
            className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text placeholder:text-muted focus:border-accent"
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="reference-type"
              className="mb-2 block text-sm font-medium text-text"
            >
              {t.type}
            </label>
            <select
              id="reference-type"
              value={type}
              onChange={(event) =>
                setType(event.target.value as TypeFilter)
              }
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text focus:border-accent"
            >
              <option value="all">{t.allTypes}</option>
              {availableTypes.map((value) => (
                <option key={value} value={value}>
                  {referenceTypeLabels[value][locale]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="reference-category"
              className="mb-2 block text-sm font-medium text-text"
            >
              {t.category}
            </label>
            <select
              id="reference-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as CategoryFilter)
              }
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text focus:border-accent"
            >
              <option value="all">{t.allCategories}</option>
              {availableCategories.map((value) => (
                <option key={value} value={value}>
                  {referenceCategoryLabels[value][locale]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="reference-source-level"
              className="mb-2 block text-sm font-medium text-text"
            >
              {t.sourceLevel}
            </label>
            <select
              id="reference-source-level"
              value={sourceLevel}
              onChange={(event) =>
                setSourceLevel(event.target.value as SourceLevelFilter)
              }
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text focus:border-accent"
            >
              <option value="all">{t.allSourceLevels}</option>
              {referenceSourceLevels.map((value) => (
                <option key={value} value={value}>
                  {referenceSourceLevelLabels[value][locale]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex min-h-16 items-center justify-between gap-4">
        <p className="type-meta text-muted" aria-live="polite">
          {t.count(filteredReferences.length)}
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

      {filteredReferences.length > 0 ? (
        <div className="border-b border-border">
          {filteredReferences.map((reference) => (
            <ReferenceCard
              key={reference.id}
              locale={locale}
              reference={reference}
            />
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

import Link from 'next/link';
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
  initialDifficulty?: ConceptDifficulty;
  initialPage?: number;
  initialQuery?: string;
}

const PAGE_SIZE = 16;

const copy = {
  th: {
    searchLabel: 'ค้นหาในคลังแนวคิด',
    searchPlaceholder: 'ค้นหาคำศัพท์ สำนัก นักคิด หรือคำอธิบาย',
    searchAction: 'ค้นหา',
    allCategories: 'ทุกหมวด',
    difficultyLabel: 'ระดับความลึก',
    allDifficulties: 'ทุกระดับ',
    beginner: 'เริ่มต้น',
    intermediate: 'ระดับกลาง',
    advanced: 'ระดับลึก',
    reset: 'ล้างตัวกรอง',
    count: (value: number) => `${value} แนวคิด`,
    page: (current: number, total: number) => `หน้า ${current} จาก ${total}`,
    previous: 'หน้าก่อน',
    next: 'หน้าถัดไป',
    noMatches: 'ไม่พบแนวคิดที่ตรงกับตัวกรอง',
    noMatchesBody: 'ลองเปลี่ยนคำค้น หมวดหมู่ หรือระดับความลึก',
  },
  en: {
    searchLabel: 'Search the concept index',
    searchPlaceholder: 'Search terms, traditions, thinkers, or definitions',
    searchAction: 'Search',
    allCategories: 'All categories',
    difficultyLabel: 'Difficulty',
    allDifficulties: 'All levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    reset: 'Clear filters',
    count: (value: number) => `${value} concept${value === 1 ? '' : 's'}`,
    page: (current: number, total: number) => `Page ${current} of ${total}`,
    previous: 'Previous',
    next: 'Next',
    noMatches: 'No concept nodes match these filters',
    noMatchesBody: 'Try another term, category, or difficulty level.',
  },
} as const;

function getAlphabetKey(title: string): string {
  const firstCharacter = Array.from(title.trim())[0];
  return firstCharacter ? firstCharacter.toLocaleUpperCase() : '#';
}

function conceptSearchText(concept: ConceptSummary): string {
  return normalizeSearch(
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
}

export function ConceptFilters({
  concepts,
  locale,
  initialCategory,
  initialDifficulty,
  initialPage = 1,
  initialQuery = '',
}: ConceptFiltersProps) {
  const t = copy[locale];
  const normalizedQuery = normalizeSearch(initialQuery);
  const filteredConcepts = concepts.filter((concept) => {
    if (initialCategory && concept.category !== initialCategory) return false;
    if (initialDifficulty && concept.difficulty !== initialDifficulty) {
      return false;
    }
    return !normalizedQuery || conceptSearchText(concept).includes(normalizedQuery);
  });

  const categoryCounts = new Map<CategoryId, number>();
  for (const concept of concepts) {
    categoryCounts.set(
      concept.category,
      (categoryCounts.get(concept.category) ?? 0) + 1
    );
  }

  const totalPages = Math.max(1, Math.ceil(filteredConcepts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, initialPage), totalPages);
  const pageConcepts = filteredConcepts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const groups = new Map<string, ConceptSummary[]>();

  for (const concept of pageConcepts) {
    const key = getAlphabetKey(concept.title);
    groups.set(key, [...(groups.get(key) ?? []), concept]);
  }

  const groupedConcepts = Array.from(groups.entries()).sort(([a], [b]) =>
    a.localeCompare(b, locale === 'th' ? 'th' : 'en')
  );
  const hasFilters = Boolean(
    normalizedQuery || initialCategory || initialDifficulty
  );

  function getHref(
    overrides: {
      category?: CategoryId | null;
      difficulty?: ConceptDifficulty | null;
      page?: number | null;
      query?: string | null;
    } = {}
  ) {
    const params = new URLSearchParams();
    const category =
      overrides.category === undefined ? initialCategory : overrides.category;
    const difficulty =
      overrides.difficulty === undefined
        ? initialDifficulty
        : overrides.difficulty;
    const query =
      overrides.query === undefined ? initialQuery.trim() : overrides.query;
    const page = overrides.page === undefined ? currentPage : overrides.page;

    if (category) params.set('category', category);
    if (difficulty) params.set('difficulty', difficulty);
    if (query) params.set('q', query);
    if (page && page > 1) params.set('page', String(page));

    const search = params.toString();
    return `/${locale}/concepts${search ? `?${search}` : ''}`;
  }

  return (
    <section
      aria-label={locale === 'th' ? 'ดัชนีแนวคิด' : 'Concept index'}
    >
      <div className="border-y border-border py-6">
        <form
          action={`/${locale}/concepts`}
          className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem_auto] lg:items-end"
        >
          {initialCategory ? (
            <input type="hidden" name="category" value={initialCategory} />
          ) : null}
          <div>
            <label
              htmlFor="concept-search"
              className="mb-2 block text-sm font-medium text-text"
            >
              {t.searchLabel}
            </label>
            <input
              id="concept-search"
              name="q"
              type="search"
              autoComplete="off"
              defaultValue={initialQuery}
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
              name="difficulty"
              defaultValue={initialDifficulty ?? ''}
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text focus:border-accent"
            >
              <option value="">{t.allDifficulties}</option>
              <option value="beginner">{t.beginner}</option>
              <option value="intermediate">{t.intermediate}</option>
              <option value="advanced">{t.advanced}</option>
            </select>
          </div>

          <button
            type="submit"
            className="min-h-12 rounded-md bg-accent px-5 font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
          >
            {t.searchAction}
          </button>
        </form>

        <nav
          className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-2"
          aria-label={
            locale === 'th' ? 'หมวดหมู่แนวคิด' : 'Concept categories'
          }
        >
          <Link
            href={getHref({ category: null, page: null })}
            aria-current={!initialCategory ? 'page' : undefined}
            className={`flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm transition-colors ${
              !initialCategory
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-border text-muted hover:border-border-strong hover:text-text'
            }`}
          >
            {t.allCategories}
          </Link>

          {categoryIds.map((categoryId) => (
            <Link
              key={categoryId}
              href={getHref({ category: categoryId, page: null })}
              aria-current={
                initialCategory === categoryId ? 'page' : undefined
              }
              className={`flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm transition-colors ${
                initialCategory === categoryId
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-border text-muted hover:border-border-strong hover:text-text'
              }`}
            >
              {categories[categoryId].name[locale]}{' '}
              <span className="ml-2 text-faint">
                {categoryCounts.get(categoryId) ?? 0}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex min-h-16 flex-wrap items-center justify-between gap-4">
        <p className="type-meta text-muted">
          {t.count(filteredConcepts.length)}
          {filteredConcepts.length > 0 ? ` · ${t.page(currentPage, totalPages)}` : ''}
        </p>
        {hasFilters ? (
          <Link
            href={`/${locale}/concepts`}
            className="flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
          >
            {t.reset}
          </Link>
        ) : null}
      </div>

      {groupedConcepts.length > 0 ? (
        <>
          <div className="space-y-10">
            {groupedConcepts.map(([letter, items], index) => (
              <section
                key={letter}
                aria-labelledby={`concept-group-${index}`}
                className="grid gap-3 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-5"
              >
                <h2
                  id={`concept-group-${index}`}
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

          {totalPages > 1 ? (
            <nav
              className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6"
              aria-label={locale === 'th' ? 'หน้าแนวคิด' : 'Concept pages'}
            >
              {currentPage > 1 ? (
                <Link
                  href={getHref({ page: currentPage - 1 })}
                  className="flex min-h-11 items-center font-medium text-accent hover:text-accent-strong"
                >
                  ← {t.previous}
                </Link>
              ) : (
                <span />
              )}
              <span className="type-meta text-muted">
                {t.page(currentPage, totalPages)}
              </span>
              {currentPage < totalPages ? (
                <Link
                  href={getHref({ page: currentPage + 1 })}
                  className="flex min-h-11 items-center font-medium text-accent hover:text-accent-strong"
                >
                  {t.next} →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </>
      ) : (
        <div className="border-y border-border py-14">
          <h2 className="type-section-title text-text">{t.noMatches}</h2>
          <p className="mt-3 max-w-xl text-muted">{t.noMatchesBody}</p>
          <Link
            href={`/${locale}/concepts`}
            className="mt-5 flex min-h-11 w-fit items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
          >
            {t.reset}
          </Link>
        </div>
      )}
    </section>
  );
}

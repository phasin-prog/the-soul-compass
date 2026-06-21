'use client';

import { useMemo, useState } from 'react';
import { ArticleCard } from '@/components/articles/ArticleCard';
import {
  categories,
  categoryIds,
  type CategoryId,
} from '@/lib/content/categories';
import { normalizeSearch } from '@/lib/search';
import type { Locale } from '@/lib/site';
import type { ArticleDifficulty, ArticleSummary } from '@/types/article';

interface ArticleFiltersProps {
  articles: ArticleSummary[];
  locale: Locale;
  initialCategory?: CategoryId;
}

type CategoryFilter = 'all' | CategoryId;
type DifficultyFilter = 'all' | ArticleDifficulty;

const copy = {
  th: {
    searchLabel: 'ค้นหาบทความ',
    searchPlaceholder: 'ค้นหาจากชื่อ คำโปรย แท็ก หรือแนวคิด',
    allCategories: 'ทั้งหมด',
    difficultyLabel: 'ระดับความลึก',
    allDifficulties: 'ทุกระดับ',
    beginner: 'เริ่มต้น',
    intermediate: 'ระดับกลาง',
    advanced: 'ระดับลึก',
    reset: 'ล้างตัวกรอง',
    results: (count: number) => `${count} บทความ`,
    noMatchesTitle: 'ไม่พบบทความที่ตรงกับตัวกรอง',
    noMatchesBody: 'ลองเปลี่ยนคำค้น หมวดหมู่ หรือระดับความลึก',
  },
  en: {
    searchLabel: 'Search articles',
    searchPlaceholder: 'Search titles, excerpts, tags, or concepts',
    allCategories: 'All',
    difficultyLabel: 'Difficulty',
    allDifficulties: 'All levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    reset: 'Clear filters',
    results: (count: number) => `${count} article${count === 1 ? '' : 's'}`,
    noMatchesTitle: 'No articles match these filters',
    noMatchesBody: 'Try another search term, category, or difficulty level.',
  },
} as const;

export function ArticleFilters({
  articles,
  locale,
  initialCategory,
}: ArticleFiltersProps) {
  const t = copy[locale];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>(
    initialCategory ?? 'all'
  );
  const [difficulty, setDifficulty] =
    useState<DifficultyFilter>('all');

  const filteredArticles = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);

    return articles.filter((article) => {
      if (category !== 'all' && article.category !== category) return false;
      if (difficulty !== 'all' && article.difficulty !== difficulty) {
        return false;
      }
      if (!normalizedQuery) return true;

      const haystack = [
        article.title,
        article.subtitle,
        article.excerpt,
        article.tags.join(' '),
        article.relatedConcepts
          .map((concept) => `${concept.title} ${concept.slug}`)
          .join(' '),
      ]
        .join(' ')
        .normalize('NFKC')
        .toLocaleLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [articles, category, difficulty, query]);

  const hasActiveFilters =
    query.trim().length > 0 || category !== 'all' || difficulty !== 'all';

  function resetFilters() {
    setQuery('');
    setCategory('all');
    setDifficulty('all');
  }

  return (
    <section aria-label={locale === 'th' ? 'รายการบทความ' : 'Article library'}>
      <div className="border-y border-border py-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end">
          <div>
            <label
              htmlFor="article-search"
              className="mb-2 block text-sm font-medium text-text"
            >
              {t.searchLabel}
            </label>
            <input
              id="article-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text placeholder:text-muted focus:border-accent"
            />
          </div>

          <div>
            <label
              htmlFor="article-difficulty"
              className="mb-2 block text-sm font-medium text-text"
            >
              {t.difficultyLabel}
            </label>
            <select
              id="article-difficulty"
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
          aria-label={locale === 'th' ? 'หมวดหมู่' : 'Categories'}
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
              {categories[categoryId].name[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-16 items-center justify-between gap-4">
        <p className="type-meta text-muted" aria-live="polite">
          {t.results(filteredArticles.length)}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="min-h-11 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
          >
            {t.reset}
          </button>
        ) : null}
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid gap-x-8 md:grid-cols-2">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={`${article.language}:${article.slug}`}
              article={article}
              locale={locale}
              featured={article.featured}
            />
          ))}
        </div>
      ) : (
        <div className="border-y border-border py-14">
          <h2 className="type-section-title text-text">
            {t.noMatchesTitle}
          </h2>
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

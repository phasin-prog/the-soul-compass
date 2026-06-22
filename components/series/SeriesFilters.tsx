'use client';

import { useMemo, useState } from 'react';
import { SeriesCard } from '@/components/series/SeriesCard';
import {
  seriesCategoryIds,
  seriesCategoryMeta,
  seriesDifficultyLabels,
  seriesStatusLabels,
} from '@/lib/content/series-taxonomy';
import type { Locale } from '@/lib/site';
import type {
  SeriesCategory,
  SeriesDifficulty,
  SeriesStatus,
  SeriesSummary,
} from '@/types/series';

interface SeriesFiltersProps {
  locale: Locale;
  series: SeriesSummary[];
}

type CategoryFilter = 'all' | SeriesCategory;
type DifficultyFilter = 'all' | SeriesDifficulty;
type StatusFilter = 'all' | Extract<SeriesStatus, 'active' | 'completed'>;

const copy = {
  th: {
    category: 'หมวดความรู้',
    allCategories: 'ทุกหมวด',
    difficulty: 'ระดับการอ่าน',
    allDifficulties: 'ทุกระดับ',
    status: 'สถานะเส้นทาง',
    allStatuses: 'ทั้งหมด',
    reset: 'ล้างตัวกรอง',
    count: (value: number) => `${value} เส้นทางการอ่าน`,
    noMatches: 'ไม่พบเส้นทางที่ตรงกับตัวกรอง',
    noMatchesBody: 'ลองเปลี่ยนหมวด ระดับ หรือสถานะของชุดอ่าน',
  },
  en: {
    category: 'Knowledge area',
    allCategories: 'All categories',
    difficulty: 'Reading level',
    allDifficulties: 'All levels',
    status: 'Path status',
    allStatuses: 'All statuses',
    reset: 'Clear filters',
    count: (value: number) => `${value} reading path${value === 1 ? '' : 's'}`,
    noMatches: 'No reading paths match these filters',
    noMatchesBody: 'Try another category, level, or path status.',
  },
} as const;

export function SeriesFilters({ locale, series }: SeriesFiltersProps) {
  const t = copy[locale];
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');

  const availableCategories = useMemo(
    () =>
      seriesCategoryIds.filter((categoryId) =>
        series.some((item) => item.category === categoryId)
      ),
    [series]
  );

  const filteredSeries = useMemo(
    () =>
      series.filter((item) => {
        if (category !== 'all' && item.category !== category) return false;
        if (difficulty !== 'all' && item.difficulty !== difficulty) return false;
        if (status !== 'all' && item.status !== status) return false;
        return true;
      }),
    [category, difficulty, series, status]
  );

  const hasFilters =
    category !== 'all' || difficulty !== 'all' || status !== 'all';

  function resetFilters() {
    setCategory('all');
    setDifficulty('all');
    setStatus('all');
  }

  return (
    <section
      aria-label={locale === 'th' ? 'ดัชนีเส้นทางการอ่าน' : 'Reading path index'}
    >
      <div className="border-y border-border py-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="series-category" className="mb-2 block text-sm font-medium text-text">
              {t.category}
            </label>
            <select
              id="series-category"
              value={category}
              onChange={(event) => setCategory(event.target.value as CategoryFilter)}
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text focus:border-accent"
            >
              <option value="all">{t.allCategories}</option>
              {availableCategories.map((categoryId) => (
                <option key={categoryId} value={categoryId}>
                  {seriesCategoryMeta[categoryId].name[locale]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="series-difficulty" className="mb-2 block text-sm font-medium text-text">
              {t.difficulty}
            </label>
            <select
              id="series-difficulty"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value as DifficultyFilter)}
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text focus:border-accent"
            >
              <option value="all">{t.allDifficulties}</option>
              {(['beginner', 'intermediate', 'advanced'] as const).map((value) => (
                <option key={value} value={value}>
                  {seriesDifficultyLabels[value][locale]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="series-status" className="mb-2 block text-sm font-medium text-text">
              {t.status}
            </label>
            <select
              id="series-status"
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text focus:border-accent"
            >
              <option value="all">{t.allStatuses}</option>
              <option value="active">{seriesStatusLabels.active[locale]}</option>
              <option value="completed">{seriesStatusLabels.completed[locale]}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex min-h-16 items-center justify-between gap-4">
        <p className="type-meta text-muted" aria-live="polite">
          {t.count(filteredSeries.length)}
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

      {filteredSeries.length > 0 ? (
        <div className="border-b border-border">
          {filteredSeries.map((item) => (
            <SeriesCard key={item.id} locale={locale} series={item} />
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

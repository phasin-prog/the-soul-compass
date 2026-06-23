import Link from 'next/link';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import {
  seriesCategoryMeta,
  seriesDifficultyLabels,
  seriesStatusLabels,
  seriesTypeLabels,
} from '@/lib/content/series-taxonomy';
import type { Locale } from '@/lib/site';
import type { SeriesSummary } from '@/types/series';

interface SeriesCardProps {
  locale: Locale;
  series: SeriesSummary;
}

export function SeriesCard({ locale, series }: SeriesCardProps) {
  const category = seriesCategoryMeta[series.category];

  return (
    <article className="border-t border-border">
      <Link
        href={`/${locale}/series/${series.slug}`}
        className="group grid gap-6 py-8 focus-visible:outline-offset-8 md:grid-cols-[minmax(0,1.25fr)_minmax(14rem,0.75fr)] md:items-start"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge
              color={category.color}
              name={category.name}
              locale={locale}
            />
            <span className="type-meta text-muted">
              {seriesTypeLabels[series.type][locale]}
            </span>
          </div>

          <h2 className="type-section-title mt-5 text-text transition-colors duration-200 group-hover:text-accent">
            {series.title}
          </h2>
          <p className="mt-2 text-text-soft">{series.subtitle}</p>
          <p className="mt-5 max-w-3xl leading-7 text-muted">
            {series.description}
          </p>

          <span className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-accent">
            {locale === 'th' ? 'เปิดเส้นทางการอ่าน' : 'Open reading path'}
            <span
              aria-hidden="true"
              className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>

        <dl className="grid grid-cols-2 border-y border-border text-sm">
          <div className="border-b border-r border-border py-4 pr-4">
            <dt className="type-meta text-faint">
              {locale === 'th' ? 'เหมาะสำหรับ' : 'For'}
            </dt>
            <dd className="mt-2 text-text">
              {seriesDifficultyLabels[series.difficulty][locale]}
            </dd>
          </div>
          <div className="border-b border-border py-4 pl-4">
            <dt className="type-meta text-faint">
              {locale === 'th' ? 'สถานะ' : 'Status'}
            </dt>
            <dd className="mt-2 text-text">
              {seriesStatusLabels[series.status][locale]}
            </dd>
          </div>
          <div className="border-r border-border py-4 pr-4">
            <dt className="type-meta text-faint">
              {locale === 'th' ? 'ลำดับการอ่าน' : 'Readings'}
            </dt>
            <dd className="mt-2 text-text">
              {series.itemCount} {locale === 'th' ? 'รายการ' : 'items'}
            </dd>
          </div>
          <div className="py-4 pl-4">
            <dt className="type-meta text-faint">
              {locale === 'th' ? 'เวลาโดยประมาณ' : 'Estimated'}
            </dt>
            <dd className="mt-2 text-text">
              {series.estimatedReadingTime} {locale === 'th' ? 'นาที' : 'min'}
            </dd>
          </div>
          <div className="col-span-2 border-t border-border py-4">
            <dt className="type-meta text-faint">
              {locale === 'th' ? 'องค์ประกอบ' : 'Contents'}
            </dt>
            <dd className="mt-2 text-text-soft">
              {series.articleCount} {locale === 'th' ? 'บทความ' : 'articles'}
              <span className="mx-2 text-faint">·</span>
              {series.conceptCount} {locale === 'th' ? 'แนวคิด' : 'concepts'}
            </dd>
          </div>
        </dl>
      </Link>
    </article>
  );
}

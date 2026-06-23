import Link from 'next/link';
import type { Locale } from '@/lib/site';
import type { ResolvedSeriesItem } from '@/types/series';

interface SeriesItemProps {
  item: ResolvedSeriesItem;
  locale: Locale;
}

const typeLabels = {
  th: {
    article: 'บทความ',
    concept: 'แนวคิด',
    reference: 'เอกสารต้นทาง',
    note: 'บันทึกประกอบ',
  },
  en: {
    article: 'Article',
    concept: 'Concept',
    reference: 'Source text',
    note: 'Editorial note',
  },
} as const;

export function SeriesItem({ item, locale }: SeriesItemProps) {
  const content = (
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="type-meta text-accent">
          {typeLabels[locale][item.type]}
        </span>
        <span className="type-meta text-faint">
          {item.estimatedReadingTime} {locale === 'th' ? 'นาที' : 'min'}
        </span>
        {!item.required ? (
          <span className="type-meta text-muted">
            {locale === 'th' ? 'อ่านเพิ่มเติม' : 'Optional'}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-lg font-medium leading-8 text-text transition-colors duration-200 group-hover:text-accent">
        {item.title}
      </h3>
      <p className="mt-2 max-w-3xl leading-7 text-muted">{item.description}</p>
      {item.href ? (
        <span className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent">
          {locale === 'th'
            ? item.type === 'article'
              ? 'อ่านบทความ'
              : 'เปิดโหนดแนวคิด'
            : item.type === 'article'
              ? 'Read article'
              : 'Open concept node'}
          <span aria-hidden="true" className="ml-2">→</span>
        </span>
      ) : null}
    </div>
  );

  return (
    <li className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 pb-8 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
      <div className="relative z-10 flex size-11 items-center justify-center rounded-full border border-border-strong bg-canvas font-serif text-lg text-text sm:size-12">
        {item.order}
      </div>

      {item.href ? (
        <Link
          href={item.href}
          className="group rounded-lg border border-border bg-surface px-5 py-5 transition-[border-color,background-color] duration-200 hover:border-border-strong hover:bg-surface-raised focus-visible:outline-offset-4 sm:px-6"
        >
          {content}
        </Link>
      ) : (
        <div className="group rounded-lg border border-border bg-surface px-5 py-5 sm:px-6">
          {content}
        </div>
      )}
    </li>
  );
}

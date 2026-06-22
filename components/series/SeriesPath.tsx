import { SeriesItem } from '@/components/series/SeriesItem';
import type { Locale } from '@/lib/site';
import type { ResolvedSeriesItem } from '@/types/series';

interface SeriesPathProps {
  items: ResolvedSeriesItem[];
  locale: Locale;
}

export function SeriesPath({ items, locale }: SeriesPathProps) {
  return (
    <section aria-labelledby="reading-path-title">
      <div className="max-w-3xl">
        <p className="type-meta text-accent">
          {locale === 'th' ? 'ลำดับที่แนะนำ' : 'Recommended order'}
        </p>
        <h2 id="reading-path-title" className="type-section-title mt-2 text-text">
          {locale === 'th' ? 'เส้นทางการอ่าน' : 'Reading path'}
        </h2>
        <p className="mt-4 leading-7 text-muted">
          {locale === 'th'
            ? 'ลำดับนี้ออกแบบให้แนวคิดหนึ่งเตรียมพื้นสำหรับแนวคิดถัดไป คุณสามารถข้ามรายการอ่านเพิ่มเติมและย้อนกลับมาได้ภายหลัง'
            : 'This order lets each idea prepare the ground for the next. Optional readings can be skipped and revisited later.'}
        </p>
      </div>

      <ol className="relative mt-8 before:absolute before:bottom-6 before:left-[1.35rem] before:top-6 before:w-px before:bg-border sm:before:left-[1.48rem]">
        {items.map((item) => (
          <SeriesItem key={item.id} item={item} locale={locale} />
        ))}
      </ol>
    </section>
  );
}

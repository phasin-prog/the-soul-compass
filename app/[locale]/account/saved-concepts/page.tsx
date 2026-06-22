import Link from 'next/link';
import type { Locale } from '@/lib/site';

export default async function SavedConceptsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';

  return (
    <section aria-labelledby="saved-concepts-title">
      <h2 id="saved-concepts-title" className="type-section-title text-text">
        {locale === 'th' ? 'แนวคิดที่บันทึก' : 'Saved concepts'}
      </h2>
      <div className="mt-6 border-y border-border py-10">
        <p className="text-text-soft">
          {locale === 'th'
            ? 'โหนดแนวคิดที่บันทึกจะรวมอยู่ที่นี่เพื่อช่วยเปรียบเทียบสำนักและสร้างเส้นทางการอ่านส่วนตัว'
            : 'Saved concept nodes will collect here for comparing traditions and building a personal reading path.'}
        </p>
        <Link
          href={`/${locale}/concepts`}
          className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4"
        >
          {locale === 'th' ? 'สำรวจคลังแนวคิด' : 'Browse concepts'}
        </Link>
      </div>
    </section>
  );
}

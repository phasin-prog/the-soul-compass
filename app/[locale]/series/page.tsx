import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SeriesFilters } from '@/components/series/SeriesFilters';
import { LocaleAvailabilityNotice } from '@/components/LocaleAvailabilityNotice';
import { SeriesCardSkeleton } from '@/components/ui/Skeleton';
import { getT } from '@/lib/i18n';
import { getAlternateUrls } from '@/lib/metadata';
import { getPublishedSeries } from '@/lib/series';
import type { Locale } from '@/lib/site';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeKey: Locale = locale === 'en' ? 'en' : 'th';
  const t = getT(localeKey);

  return {
    title: t.nav.series,
    description:
      localeKey === 'th'
        ? 'เส้นทางการอ่านแบบมีลำดับสำหรับศึกษาจิต ตัวตน จิตไร้สำนึก ภาษา สังคม และการเปลี่ยนแปลงอย่างเป็นระบบ'
        : 'Structured reading paths for studying psyche, self, unconscious, language, society, and transformation.',
    alternates: {
      canonical: `/${localeKey}/series`,
      languages: getAlternateUrls('/series'),
    },
  };
}

export default async function SeriesListingPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey: Locale = locale === 'en' ? 'en' : 'th';
  const t = getT(localeKey);
  const series = await getPublishedSeries(localeKey);

  return (
    <div className="container mx-auto px-5 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-4xl sm:mb-16">
          <p className="type-meta text-accent">
            {localeKey === 'th'
              ? 'ห้องสมุดตามลำดับความคิด'
              : 'Curated library paths'}
          </p>
          <h1 className="type-page-title mt-3 text-text">{t.nav.series}</h1>
          <p className="type-lead mt-5 text-text-soft">
            {localeKey === 'th'
              ? 'เส้นทางการอ่านสำหรับค่อย ๆ สร้างความเข้าใจเรื่องจิต ตัวตน จิตไร้สำนึก ภาษา และการเปลี่ยนแปลง โดยจัดบทความ แนวคิด และเอกสารต้นทางให้อยู่ในลำดับที่มีเหตุผล'
              : 'Reading paths that build understanding step by step by placing articles, concepts, and source texts in a deliberate order.'}
          </p>
          <p className="mt-5 max-w-3xl text-muted">
            {localeKey === 'th'
              ? 'นี่ไม่ใช่หลักสูตรหรือระบบคะแนน แต่เป็นแผนที่ช่วยให้เห็นว่าอะไรควรอ่านก่อน อะไรควรกลับมาอ่านซ้ำ และแนวคิดแต่ละชิ้นเชื่อมต่อกันอย่างไร'
              : 'These are not courses or scorecards. They are maps for deciding what to read first, what to revisit, and how ideas connect.'}
          </p>
        </header>

        {series.length > 0 ? (
          <Suspense
            fallback={
              <div className="border-b border-border">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SeriesCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <SeriesFilters locale={localeKey} series={series} />
          </Suspense>
        ) : (
          localeKey === 'en' ? (
            <LocaleAvailabilityNotice section="series" />
          ) : (
          <div className="border-y border-border py-14">
            <h2 className="type-section-title text-text">
              {localeKey === 'th'
                ? 'ยังไม่มีเส้นทางการอ่านที่เผยแพร่'
                : 'No published reading paths yet'}
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              {localeKey === 'th'
                ? 'ชุดอ่านจะปรากฏที่นี่เมื่อผ่านการจัดลำดับและตรวจทานแล้ว'
                : 'Reading paths will appear here once ordered and reviewed.'}
            </p>
          </div>
          )
        )}
      </div>
    </div>
  );
}

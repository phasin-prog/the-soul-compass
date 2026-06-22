import Link from 'next/link';
import type { Metadata } from 'next';
import { ReferenceFilters } from '@/components/resources/ReferenceFilters';
import {
  referenceSourceLevelDescriptions,
  referenceSourceLevelLabels,
  referenceSourceLevelStyles,
} from '@/lib/content/reference-taxonomy';
import { getAlternateUrls } from '@/lib/metadata';
import { getPublishedReferences } from '@/lib/references';
import type { Locale } from '@/lib/site';
import { referenceSourceLevels } from '@/types/reference';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';

  return {
    title: locale === 'th' ? 'คลังอ้างอิง' : 'Reference archive',
    description:
      locale === 'th'
        ? 'ฐานข้อมูลหนังสือ บทความ งานต้นทาง งานตีความ และบันทึกทฤษฎีภายในของ The Soul’s Compass'
        : 'A structured archive of books, papers, primary texts, interpretations, and internal theory notes used by The Soul’s Compass.',
    alternates: {
      canonical: `/${locale}/resources`,
      languages: getAlternateUrls('/resources'),
    },
  };
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const references = await getPublishedReferences();

  return (
    <div className="container mx-auto px-5 py-14 sm:px-8 sm:py-18">
      <main className="mx-auto max-w-6xl">
        <header className="max-w-4xl">
          <p className="type-meta text-accent">
            {locale === 'th'
              ? 'ห้องอ่านและระเบียนบรรณานุกรม'
              : 'Reading room and bibliography'}
          </p>
          <h1 className="type-page-title mt-3 text-text">
            {locale === 'th' ? 'คลังอ้างอิง' : 'Reference archive'}
          </h1>
          <p className="type-lead mt-5 text-text-soft">
            {locale === 'th'
              ? 'ฐานข้อมูลแหล่งต้นทาง งานวิชาการ งานตีความ และบันทึกภายในที่รองรับเนื้อหาของ The Soul’s Compass'
              : 'A structured record of primary texts, scholarship, interpretations, and internal notes supporting The Soul’s Compass.'}
          </p>
          <p className="mt-5 max-w-3xl text-muted">
            {locale === 'th'
              ? 'ข้อมูลที่ยังไม่ยืนยันจะเว้นว่างไว้ ระเบียนเหล่านี้ไม่เติมเลขหน้า ฉบับพิมพ์ ผู้แปล สำนักพิมพ์ ISBN DOI หรือคำกล่าวอ้างที่ไม่มีหลักฐาน'
              : 'Unverified fields remain blank. These records do not invent page numbers, editions, translators, publishers, ISBNs, DOIs, or unsupported claims.'}
          </p>
          <Link
            href={`/${locale}/external-links`}
            className="mt-6 inline-flex min-h-11 items-center font-medium text-accent underline decoration-accent/40 underline-offset-4"
          >
            {locale === 'th'
              ? 'เปิดสารบัญลิงก์ภายนอก →'
              : 'Browse external links →'}
          </Link>
        </header>

        <section
          aria-labelledby="source-classification-title"
          className="mt-12 sm:mt-14"
        >
          <h2
            id="source-classification-title"
            className="type-section-title text-text"
          >
            {locale === 'th'
              ? 'การจำแนกระดับแหล่งข้อมูล'
              : 'Source classification'}
          </h2>
          <div className="mt-6 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {referenceSourceLevels.map((level, index) => (
              <div
                key={level}
                className={`py-5 sm:px-5 ${
                  index > 0 ? 'border-t border-border sm:border-t-0' : ''
                } ${
                  index % 2 === 1 ? 'sm:border-l' : ''
                } ${index > 1 ? 'lg:border-l' : ''}`}
              >
                <p
                  className={`type-meta inline-flex min-h-8 items-center rounded-full border px-3 ${referenceSourceLevelStyles[level]}`}
                >
                  {referenceSourceLevelLabels[level][locale]}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {referenceSourceLevelDescriptions[level][locale]}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <ReferenceFilters locale={locale} references={references} />
        </div>
      </main>
    </div>
  );
}

import Link from 'next/link';
import { getPublishedConcepts } from '@/lib/concepts';
import type { Locale } from '@/lib/site';

export default async function AdminConceptsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const concepts = await getPublishedConcepts(locale);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-3xl">
        <p className="type-meta text-accent">
          {concepts.length}{' '}
          {locale === 'th' ? 'โหนดที่เผยแพร่' : 'published nodes'}
        </p>
        <h1 className="type-page-title mt-2 text-text">
          {locale === 'th' ? 'จัดการแนวคิด' : 'Concept management'}
        </h1>
        <p className="mt-5 text-text-soft">
          {locale === 'th'
            ? 'สิทธิ์สำหรับตัวแก้ไขฉบับร่างและความสัมพันธ์ของแนวคิดพร้อมแล้ว ส่วนการเขียนกลับฐานข้อมูลจะเชื่อมในระยะ CMS ถัดไป'
            : 'Role access for concept drafts and relations is ready. Database writing will connect in the next CMS phase.'}
        </p>
      </header>
      <div className="mt-8 border-y border-border py-8">
        <Link
          href={`/${locale}/concepts`}
          className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4"
        >
          {locale === 'th' ? 'เปิดคลังแนวคิดสาธารณะ' : 'Open public concept library'}
        </Link>
      </div>
    </div>
  );
}

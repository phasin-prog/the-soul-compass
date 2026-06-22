import Link from 'next/link';
import type { Locale } from '@/lib/site';

export default async function ReadingHistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';

  return (
    <section aria-labelledby="reading-history-title">
      <h2 id="reading-history-title" className="type-section-title text-text">
        {locale === 'th' ? 'ประวัติการอ่าน' : 'Reading history'}
      </h2>
      <div className="mt-6 border-y border-border py-10">
        <p className="text-text-soft">
          {locale === 'th'
            ? 'ความคืบหน้าจะบันทึกเป็นเปอร์เซ็นต์และเวลาที่อ่านล่าสุดเมื่อชั้นข้อมูลสมาชิกเชื่อมต่อแล้ว'
            : 'Progress percentage and last-read time will appear here once the member data layer is connected.'}
        </p>
        <Link
          href={`/${locale}/articles`}
          className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4"
        >
          {locale === 'th' ? 'กลับไปอ่านบทความ' : 'Return to articles'}
        </Link>
      </div>
    </section>
  );
}

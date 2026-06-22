import Link from 'next/link';
import type { Locale } from '@/lib/site';

export default async function BookmarksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';

  return (
    <section aria-labelledby="bookmarks-title">
      <h2 id="bookmarks-title" className="type-section-title text-text">
        {locale === 'th' ? 'บทความที่บันทึก' : 'Bookmarked articles'}
      </h2>
      <div className="mt-6 border-y border-border py-10">
        <p className="text-text-soft">
          {locale === 'th'
            ? 'ยังไม่มีบทความในรายการ เมื่อเชื่อมระบบจัดเก็บแล้ว บทความที่กดบันทึกจะปรากฏที่นี่'
            : 'No articles are collected yet. Once persistent storage is connected, bookmarked articles will appear here.'}
        </p>
        <Link
          href={`/${locale}/articles`}
          className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4"
        >
          {locale === 'th' ? 'สำรวจบทความ' : 'Browse articles'}
        </Link>
      </div>
    </section>
  );
}

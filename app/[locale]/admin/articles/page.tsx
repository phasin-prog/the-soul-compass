import Link from 'next/link';
import type { Locale } from '@/lib/site';

export default async function AdminArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-3xl">
        <h1 className="type-page-title text-text">
          {locale === 'th' ? 'จัดการบทความ' : 'Article management'}
        </h1>
        <p className="mt-5 text-text-soft">
          {locale === 'th'
            ? 'การเขียนและเผยแพร่บทความยังใช้ Wiki Studio เดิม โดยหน้านี้ทำหน้าที่เป็นประตูที่ตรวจบทบาท Editor และ Admin แล้ว'
            : 'Writing and publication continue in the existing Wiki Studio. This page is the role-checked entrance for Editors and Admins.'}
        </p>
      </header>
      <div className="mt-8 border-y border-border py-8">
        <Link
          href={`/${locale}/studio/articles`}
          className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-ink hover:bg-accent-strong"
        >
          {locale === 'th' ? 'เปิด Wiki Studio' : 'Open Wiki Studio'}
        </Link>
      </div>
    </div>
  );
}

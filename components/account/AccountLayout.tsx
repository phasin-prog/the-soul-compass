import Link from 'next/link';
import type { ReactNode } from 'react';
import { roleLabels } from '@/lib/roles';
import type { Locale } from '@/lib/site';
import type { User } from '@/types/user';

interface AccountLayoutProps {
  children: ReactNode;
  locale: Locale;
  user: User;
}

const accountLinks = {
  th: [
    { href: '', label: 'ภาพรวม' },
    { href: '/bookmarks', label: 'บทความที่บันทึก' },
    { href: '/saved-concepts', label: 'แนวคิดที่บันทึก' },
    { href: '/reading-history', label: 'ประวัติการอ่าน' },
  ],
  en: [
    { href: '', label: 'Overview' },
    { href: '/bookmarks', label: 'Bookmarked articles' },
    { href: '/saved-concepts', label: 'Saved concepts' },
    { href: '/reading-history', label: 'Reading history' },
  ],
} as const;

export function AccountLayout({
  children,
  locale,
  user,
}: AccountLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="border-b border-border pb-8">
        <p className="type-meta text-accent">
          {roleLabels[user.role][locale]}
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="type-page-title text-text">{user.displayName}</h1>
            <p className="mt-2 text-muted">{user.email}</p>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted">
            {locale === 'th'
              ? 'พื้นที่ส่วนตัวสำหรับจัดระเบียบสิ่งที่คุณกำลังอ่าน โดยไม่เปลี่ยนคลังความรู้สาธารณะให้เป็น paywall'
              : 'A private place to organize your reading without turning the public knowledge library into a paywall.'}
          </p>
        </div>
      </header>

      <div className="grid gap-10 pt-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav aria-label={locale === 'th' ? 'บัญชี' : 'Account'}>
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {accountLinks[locale].map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={`/${locale}/account${item.href}`}
                  className="flex min-h-11 items-center rounded-md border border-border px-4 text-sm text-text-soft transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

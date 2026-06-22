import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { requireEditorialUser } from '@/lib/auth';
import { roleLabels } from '@/lib/roles';
import type { Locale } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Editorial administration',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const user = await requireEditorialUser(locale);

  return (
    <div className="min-h-[75vh] bg-[color-mix(in_oklch,var(--background)_90%,var(--surface))]">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href={`/${locale}/admin`}
              className="flex min-h-11 items-center font-serif text-lg text-text hover:text-accent"
            >
              {locale === 'th' ? 'โต๊ะบรรณาธิการ' : 'Editorial desk'}
            </Link>
            <nav
              className="flex flex-wrap items-center gap-1 text-sm"
              aria-label={locale === 'th' ? 'พื้นที่บรรณาธิการ' : 'Editorial'}
            >
              <Link
                href={`/${locale}/admin/articles`}
                className="flex min-h-11 items-center rounded-md px-3 text-muted hover:bg-surface-raised hover:text-text"
              >
                {locale === 'th' ? 'บทความ' : 'Articles'}
              </Link>
              <Link
                href={`/${locale}/admin/concepts`}
                className="flex min-h-11 items-center rounded-md px-3 text-muted hover:bg-surface-raised hover:text-text"
              >
                {locale === 'th' ? 'แนวคิด' : 'Concepts'}
              </Link>
              <Link
                href={`/${locale}/admin/external-links`}
                className="flex min-h-11 items-center rounded-md px-3 text-muted hover:bg-surface-raised hover:text-text"
              >
                {locale === 'th' ? 'ลิงก์ภายนอก' : 'External links'}
              </Link>
            </nav>
          </div>
          <p className="type-meta text-muted">
            {roleLabels[user.role][locale]} · {user.displayName}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}

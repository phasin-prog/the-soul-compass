import Link from 'next/link';
import {
  externalLinkCategoryLabels,
  externalLinkStatusLabels,
} from '@/lib/content/external-link-taxonomy';
import { getAdminExternalLinks } from '@/lib/external-links';
import type { Locale } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function AdminExternalLinksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const links = await getAdminExternalLinks();

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="type-meta text-accent">{links.length} links</p>
          <h1 className="type-page-title mt-2 text-text">
            {locale === 'th' ? 'จัดการลิงก์ภายนอก' : 'External link management'}
          </h1>
        </div>
        <Link href={`/${locale}/admin/external-links/new`} className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-accent-ink">
          {locale === 'th' ? 'เพิ่มลิงก์' : 'Add link'}
        </Link>
      </header>
      <div className="mt-9 divide-y divide-border border-y border-border">
        {links.map((link) => (
          <article key={link.id} className="!max-w-none grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-3">
            <div>
              <div className="flex flex-wrap gap-2 text-xs text-muted">
                <span>{externalLinkCategoryLabels[link.category][locale]}</span>
                <span>·</span>
                <span>{externalLinkStatusLabels[link.status][locale]}</span>
              </div>
              <h2 className="mt-1 text-lg font-medium text-text">
                <Link href={`/${locale}/admin/external-links/${link.id}/edit`} className="hover:text-accent">
                  {link.name}{link.abbreviation ? ` (${link.abbreviation})` : ''}
                </Link>
              </h2>
            </div>
            <time dateTime={link.lastCheckedAt} className="type-meta text-muted">
              {locale === 'th' ? 'ตรวจล่าสุด ' : 'Checked '}
              {new Date(link.lastCheckedAt).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US')}
            </time>
          </article>
        ))}
      </div>
    </div>
  );
}

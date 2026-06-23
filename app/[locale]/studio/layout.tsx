import Link from 'next/link';
import type { ReactNode } from 'react';
import { ActiveLink } from '@/components/ActiveLink';
import { StudioToaster } from '@/components/studio/StudioToaster';
import { requireStudioUser } from '@/lib/auth/studio';
import { parseLocale } from '@/lib/locale';

export default async function StudioLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale = parseLocale(localeValue);
  await requireStudioUser(locale);

  const copy =
    locale === 'th'
      ? {
          navigation: 'พื้นที่จัดการบทความ',
          articles: 'บทความทั้งหมด',
          newArticle: 'บทความใหม่',
        }
      : {
          navigation: 'Article studio',
          articles: 'All articles',
          newArticle: 'New article',
        };

  return (
    <div className="min-h-[75vh] bg-[color-mix(in_oklch,var(--background)_88%,var(--surface))]">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 sm:px-8">
          <Link
            href={`/${locale}/studio/articles`}
            className="flex min-h-11 items-center font-medium text-text hover:text-accent"
          >
            Studio
          </Link>
          <nav
            className="flex flex-wrap items-center gap-2 text-sm"
            aria-label={copy.navigation}
          >
            <ActiveLink
              href={`/${locale}/studio/articles`}
              className="flex min-h-11 items-center rounded-md px-3 text-muted hover:bg-surface-raised hover:text-text"
              activeClassName="bg-surface-raised text-accent"
              exact
            >
              {copy.articles}
            </ActiveLink>
            <ActiveLink
              href={`/${locale}/studio/articles/new`}
              className="flex min-h-11 items-center rounded-md bg-accent-soft px-3 font-medium text-accent hover:bg-accent hover:text-accent-ink"
              activeClassName="bg-accent text-accent-ink"
              exact
            >
              + {copy.newArticle}
            </ActiveLink>
          </nav>
        </div>
      </div>
      {children}
      <StudioToaster />
    </div>
  );
}

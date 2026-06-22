import Link from 'next/link';
import type { Locale } from '@/lib/site';
import { getT } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';
import { MobileMenu } from './MobileMenu';
import { AuthNav } from './AuthNav';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = getT(locale);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/82">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href={`/${locale}`}
          className="group flex min-h-11 items-center gap-3"
          aria-label={t.nav.home}
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full border border-accent/55 text-accent transition-colors duration-200 group-hover:border-accent"
          >
            ◇
          </span>
          <span className="font-serif text-lg leading-none text-text sm:text-xl">
            {siteConfig.name[locale]}
          </span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex" aria-label="Main navigation">
          <Link
            href={`/${locale}/articles`}
            className="flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-text"
          >
            {t.nav.articles}
          </Link>
          <Link
            href={`/${locale}/concepts`}
            className="flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-text"
          >
            {t.nav.concepts}
          </Link>
          <Link
            href={`/${locale}/series`}
            className="flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-text"
          >
            {t.nav.series}
          </Link>
          <Link
            href={`/${locale}/resources`}
            className="flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-text"
          >
            {t.nav.resources}
          </Link>
          <Link
            href={`/${locale}/support`}
            className="flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-accent"
          >
            {t.nav.support}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-text"
          >
            {t.nav.about}
          </Link>

          <Link
            href={locale === 'th' ? '/en' : '/th'}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-text-soft transition-colors duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent"
            aria-label={`Switch to ${locale === 'th' ? 'English' : 'Thai'}`}
            lang={locale === 'th' ? 'en' : 'th'}
          >
            {locale === 'th' ? 'EN' : 'TH'}
          </Link>
          <AuthNav locale={locale} />
        </nav>

        <MobileMenu locale={locale} />
      </div>
    </header>
  );
}

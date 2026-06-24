import Link from 'next/link';
import type { Locale } from '@/lib/site';
import { getT } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';
import { primaryNav } from '@/lib/content/navigation';
import { SoulIcon } from './icons/SoulIcon';
import { ActiveLink } from './ActiveLink';
import { AuthNavigation } from './auth/AuthNavigation';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = getT(locale);

  return (
    <header className="relative z-50 w-full border-b border-border bg-background md:sticky md:top-0">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-18 sm:px-8">
        <Link
          href={`/${locale}`}
          className="group flex min-h-11 items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full border border-accent/55 text-accent transition-colors duration-200 group-hover:border-accent group-hover:bg-accent-soft"
          >
            <SoulIcon name="compass" size={17} />
          </span>
          <span className="font-serif text-lg font-medium leading-none text-text sm:text-xl">
            {siteConfig.name[locale]}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex"
          aria-label={locale === 'th' ? 'เมนูหลัก' : 'Main navigation'}
        >
          {primaryNav.map((item) => (
            <ActiveLink
              key={item.href}
              href={`/${locale}/${item.href}`}
              className="flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-text"
              activeClassName="text-accent"
            >
              <SoulIcon name={item.icon} size={16} className="opacity-70" />
              <span>{item.label[locale]}</span>
            </ActiveLink>
          ))}

          <div
            className="flex items-center rounded-md border border-border p-1"
            aria-label={t.ui.language}
          >
            <Link
              href="/th"
              hrefLang="th"
              lang="th"
              aria-current={locale === 'th' ? 'page' : undefined}
              className={`grid min-h-11 min-w-11 place-items-center rounded-sm px-2 text-xs font-semibold transition-colors duration-200 ${
                locale === 'th'
                  ? 'bg-accent text-accent-ink'
                  : 'text-muted hover:bg-surface-raised hover:text-text'
              }`}
            >
              TH
            </Link>
            <Link
              href="/en"
              hrefLang="en"
              lang="en"
              aria-current={locale === 'en' ? 'page' : undefined}
              className={`grid min-h-11 min-w-11 place-items-center rounded-sm px-2 text-xs font-semibold transition-colors duration-200 ${
                locale === 'en'
                  ? 'bg-accent text-accent-ink'
                  : 'text-muted hover:bg-surface-raised hover:text-text'
              }`}
            >
              EN
            </Link>
          </div>
          <AuthNavigation locale={locale} />
        </nav>

        <MobileMenu locale={locale} />
      </div>
    </header>
  );
}

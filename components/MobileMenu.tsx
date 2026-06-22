'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/site';
import { getT } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';
import { AuthNav } from './AuthNav';

interface MobileMenuProps {
  locale: Locale;
}

export function MobileMenu({ locale }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const t = getT(locale);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="grid size-11 place-items-center rounded-md text-muted transition-colors duration-200 hover:bg-surface hover:text-text xl:hidden"
        aria-label={isOpen ? t.ui.closeMenu : t.ui.openMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        type="button"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(22rem,88vw)] max-w-none overflow-y-auto overscroll-contain border-l border-border bg-surface p-0 text-text backdrop:bg-background/82 backdrop:backdrop-blur-sm xl:hidden"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <nav className="flex min-h-full flex-col p-6" aria-label="Mobile navigation">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-serif text-lg text-text">
              {siteConfig.name[locale]}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="grid size-11 place-items-center rounded-md text-muted transition-colors duration-200 hover:bg-surface-raised hover:text-text"
              aria-label={t.ui.closeMenu}
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              href={`/${locale}/articles`}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent"
            >
              {t.nav.articles}
            </Link>
            <Link
              href={`/${locale}/concepts`}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent"
            >
              {t.nav.concepts}
            </Link>
            <Link
              href={`/${locale}/series`}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent"
            >
              {t.nav.series}
            </Link>
            <Link
              href={`/${locale}/resources`}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent"
            >
              {t.nav.resources}
            </Link>
            <Link
              href={`/${locale}/external-links`}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent"
            >
              {t.externalLinks.title}
            </Link>
            <Link
              href={`/${locale}/support`}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent"
            >
              {t.nav.support}
            </Link>

            <hr className="my-3 border-border" />

            <AuthNav
              locale={locale}
              mobile
              onNavigate={() => setIsOpen(false)}
            />

            <hr className="my-3 border-border" />

            <Link
              href={`/${locale}/about`}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent"
            >
              {t.nav.about}
            </Link>
            <Link
              href={`/${locale}/manifesto`}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent"
            >
              {t.nav.manifesto}
            </Link>

            <hr className="my-3 border-border" />

            <Link
              href={locale === 'th' ? '/en' : '/th'}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-lg font-medium text-accent transition-colors duration-200 hover:bg-accent-soft hover:text-text"
              lang={locale === 'th' ? 'en' : 'th'}
            >
              {locale === 'th' ? 'English' : 'ไทย'}
            </Link>
          </div>
        </nav>
      </dialog>
    </>
  );
}

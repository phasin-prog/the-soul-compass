'use client';

import { useEffect, useRef, useState } from 'react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { isEditor, normalizeUserRole } from '@/lib/roles';
import type { Locale } from '@/lib/site';
import { getT } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';
import { ActiveLink } from './ActiveLink';

interface MobileMenuProps {
  locale: Locale;
}

export function MobileMenu({ locale }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isSignedIn, user } = useUser();
  const canEdit = isEditor(
    normalizeUserRole(user?.publicMetadata.role, 'member')
  );
  const t = getT(locale);
  const primaryLinks = [
    { href: 'articles', label: t.nav.articles },
    { href: 'concepts', label: t.nav.concepts },
    { href: 'series', label: t.nav.series },
    { href: 'resources', label: t.nav.resources },
  ];
  const secondaryLinks = [
    { href: 'external-links', label: locale === 'th' ? 'ลิงก์ภายนอก' : 'External links' },
    { href: 'support', label: t.nav.support },
    { href: 'about', label: t.nav.about },
    { href: 'manifesto', label: t.nav.manifesto },
  ];

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
        className="grid size-11 place-items-center rounded-md text-muted transition-colors duration-200 hover:bg-surface hover:text-text lg:hidden"
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
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(23rem,92vw)] max-w-none overflow-y-auto overscroll-contain border-l border-border bg-surface p-0 text-text backdrop:bg-background/88 lg:hidden"
        onClose={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <nav
          className="flex min-h-full flex-col p-6"
          aria-label={locale === 'th' ? 'เมนูสำหรับมือถือ' : 'Mobile navigation'}
        >
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

          <div className="flex flex-col">
            {primaryLinks.map((item) => (
              <ActiveLink
                key={item.href}
                href={`/${locale}/${item.href}`}
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 items-center border-b border-border px-1 text-lg text-text transition-colors duration-200 hover:text-accent"
                activeClassName="text-accent"
              >
                {item.label}
              </ActiveLink>
            ))}

            <div className="my-6">
              <p className="mb-3 text-sm text-muted">{t.ui.language}</p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/th"
                  hrefLang="th"
                  lang="th"
                  aria-current={locale === 'th' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`grid min-h-11 place-items-center rounded-md border text-sm font-semibold ${
                    locale === 'th'
                      ? 'border-accent bg-accent text-accent-ink'
                      : 'border-border text-muted hover:border-accent hover:text-text'
                  }`}
                >
                  ไทย
                </Link>
                <Link
                  href="/en"
                  hrefLang="en"
                  lang="en"
                  aria-current={locale === 'en' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`grid min-h-11 place-items-center rounded-md border text-sm font-semibold ${
                    locale === 'en'
                      ? 'border-accent bg-accent text-accent-ink'
                      : 'border-border text-muted hover:border-accent hover:text-text'
                  }`}
                >
                  English
                </Link>
              </div>
            </div>

            {isSignedIn ? (
              <>
                {canEdit ? (
                  <ActiveLink
                    href={`/${locale}/studio/articles`}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-12 items-center border-y border-border px-1 text-lg font-medium text-accent transition-colors duration-200 hover:bg-accent-soft"
                    activeClassName="bg-accent-soft"
                  >
                    {locale === 'th' ? 'เขียนบทความ' : 'Write an article'}
                  </ActiveLink>
                ) : null}
                <ActiveLink
                  href={`/${locale}/account`}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-12 items-center border-b border-border px-1 text-lg text-text transition-colors duration-200 hover:text-accent"
                  activeClassName="text-accent"
                >
                  {locale === 'th' ? 'บัญชีผู้อ่าน' : 'Reader account'}
                </ActiveLink>
              </>
            ) : (
              <Link
                href={`/${locale}/login`}
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 items-center border-y border-border px-1 text-lg font-medium text-accent transition-colors duration-200 hover:bg-accent-soft"
              >
                {locale === 'th' ? 'เข้าสู่ระบบ' : 'Sign in'}
              </Link>
            )}

            <hr className="my-3 border-border" />

            {secondaryLinks.map((item) => (
              <ActiveLink
                key={item.href}
                href={`/${locale}/${item.href}`}
                onClick={() => setIsOpen(false)}
                className="flex min-h-11 items-center px-1 text-base text-muted transition-colors duration-200 hover:text-accent"
                activeClassName="text-accent"
              >
                {item.label}
              </ActiveLink>
            ))}

            {isSignedIn ? (
              <SignOutButton redirectUrl={`/${locale}`}>
                <button
                  type="button"
                  className="mt-6 flex min-h-11 items-center px-1 text-sm text-muted transition-colors duration-200 hover:text-text"
                >
                  {locale === 'th' ? 'ออกจากระบบ' : 'Sign out'}
                </button>
              </SignOutButton>
            ) : null}
          </div>
        </nav>
      </dialog>
    </>
  );
}

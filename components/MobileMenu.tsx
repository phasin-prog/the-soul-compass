'use client';

import { useEffect, useRef, useState } from 'react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { isEditor, normalizeUserRole } from '@/lib/roles';
import type { Locale } from '@/lib/site';
import { getT } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';
import { primaryNav, secondaryNav } from '@/lib/content/navigation';
import { SoulIcon, type SoulIconName } from './icons/SoulIcon';
import { ActiveLink } from './ActiveLink';
import { menuGroupConfig, levelIcons, levelLabels, schoolIcons } from '@/lib/icon-registry';
import { categories, categoryIds } from '@/lib/content/categories';

interface MobileMenuProps {
  locale: Locale;
}

function MenuGroupTitle({ icon, title }: { icon: SoulIconName; title: string }) {
  return (
    <div className="mb-2 mt-6 flex items-center gap-2.5 px-1">
      <SoulIcon name={icon} size={16} className="text-accent" />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </span>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  href,
  onClick,
  variant = 'default',
  locale,
}: {
  icon: SoulIconName;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  locale: Locale;
}) {
  const baseClasses = `flex min-h-12 items-center gap-3 border-b border-border px-1 text-lg transition-colors duration-200 ${
    variant === 'danger'
      ? 'text-red-400 hover:bg-red-950/30 hover:text-red-300'
      : 'text-text hover:text-accent'
  }`;

  if (href) {
    return (
      <ActiveLink
        href={`/${locale}${href}`}
        onClick={onClick}
        className={baseClasses}
        activeClassName="text-accent"
      >
        <SoulIcon name={icon} size={20} className="shrink-0" />
        <span>{label}</span>
      </ActiveLink>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      <SoulIcon name={icon} size={20} className="shrink-0" />
      <span>{label}</span>
    </button>
  );
}

export function MobileMenu({ locale }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isSignedIn, user } = useUser();
  const canEdit = isEditor(
    normalizeUserRole(user?.publicMetadata.role, 'member')
  );
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
        className="grid size-11 place-items-center rounded-md text-muted transition-colors duration-200 hover:bg-surface hover:text-text lg:hidden"
        aria-label={isOpen ? t.ui.closeMenu : t.ui.openMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        type="button"
      >
        <SoulIcon name={isOpen ? 'close' : 'menu'} size={24} />
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
              <SoulIcon name="close" size={24} />
            </button>
          </div>

          <div className="flex flex-col">
            <MenuGroupTitle
              icon={menuGroupConfig.content.icon}
              title={menuGroupConfig.content.title[locale]}
            />
            {primaryNav.map((item) => (
              <MenuItem
                key={item.href}
                icon={item.icon}
                label={item.label[locale]}
                href={`/${item.href}`}
                onClick={() => setIsOpen(false)}
                locale={locale}
              />
            ))}

            <MenuGroupTitle
              icon={menuGroupConfig.levels.icon}
              title={menuGroupConfig.levels.title[locale]}
            />
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <MenuItem
                key={level}
                icon={levelIcons[level]}
                label={levelLabels[level][locale]}
                href={`/articles?difficulty=${level}`}
                onClick={() => setIsOpen(false)}
                locale={locale}
              />
            ))}

            <MenuGroupTitle
              icon={menuGroupConfig.schools.icon}
              title={menuGroupConfig.schools.title[locale]}
            />
            {categoryIds.slice(0, 5).map((categoryId) => (
              <MenuItem
                key={categoryId}
                icon={schoolIcons[categories[categoryId].name.en] || 'philosophy'}
                label={categories[categoryId].name[locale]}
                href={`/${categories[categoryId].slug}`}
                onClick={() => setIsOpen(false)}
                locale={locale}
              />
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

            <MenuGroupTitle
              icon={menuGroupConfig.account.icon}
              title={menuGroupConfig.account.title[locale]}
            />
            {isSignedIn ? (
              <>
                {canEdit ? (
                  <MenuItem
                    icon="body"
                    label={locale === 'th' ? 'เขียนบทความ' : 'Write an article'}
                    href="/studio/articles"
                    onClick={() => setIsOpen(false)}
                    locale={locale}
                  />
                ) : null}
                <MenuItem
                  icon="auth"
                  label={locale === 'th' ? 'บัญชีผู้อ่าน' : 'Reader account'}
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  locale={locale}
                />
              </>
            ) : (
              <MenuItem
                icon="auth"
                label={locale === 'th' ? 'เข้าสู่ระบบ' : 'Sign in'}
                href="/login"
                onClick={() => setIsOpen(false)}
                locale={locale}
              />
            )}

            <hr className="my-3 border-border" />

            {secondaryNav.map((item) => (
              <MenuItem
                key={item.href}
                icon={item.icon}
                label={item.label[locale]}
                href={`/${item.href}`}
                onClick={() => setIsOpen(false)}
                locale={locale}
              />
            ))}

            {isSignedIn ? (
              <SignOutButton redirectUrl={`/${locale}`}>
                <MenuItem
                  icon="close"
                  label={locale === 'th' ? 'ออกจากระบบ' : 'Sign out'}
                  variant="danger"
                  locale={locale}
                />
              </SignOutButton>
            ) : null}
          </div>
        </nav>
      </dialog>
    </>
  );
}

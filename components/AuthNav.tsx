'use client';

import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { isEditor, isSupporter, normalizeUserRole } from '@/lib/roles';
import type { Locale } from '@/lib/site';

interface AuthNavProps {
  locale: Locale;
  mobile?: boolean;
  onNavigate?: () => void;
}

export function AuthNav({
  locale,
  mobile = false,
  onNavigate,
}: AuthNavProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const linkClassName = mobile
    ? 'flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent'
    : 'flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-accent';

  if (!isLoaded) {
    return <span className={mobile ? 'min-h-12' : 'min-h-11 min-w-11'} />;
  }

  if (isSignedIn) {
    const role = normalizeUserRole(user.publicMetadata.role, 'member');

    return (
      <>
        <Link
          href={`/${locale}/account`}
          onClick={onNavigate}
          className={linkClassName}
        >
          {locale === 'th' ? 'บัญชี' : 'Account'}
        </Link>
        {isSupporter(role) ? (
          <span
            className={
              mobile
                ? 'mx-3 inline-flex min-h-8 items-center self-start rounded-full border border-accent/45 bg-accent-soft px-3 text-sm text-accent'
                : 'inline-flex min-h-8 items-center rounded-full border border-accent/45 bg-accent-soft px-3 text-xs text-accent'
            }
          >
            {locale === 'th' ? 'ผู้สนับสนุน' : 'Supporter'}
          </span>
        ) : null}
        {isEditor(role) ? (
          <Link
            href={`/${locale}/admin`}
            onClick={onNavigate}
            className={linkClassName}
          >
            {locale === 'th' ? 'จัดการ' : 'Admin'}
          </Link>
        ) : null}
        <div className={mobile ? 'px-3 py-3' : 'grid min-h-11 place-items-center'}>
          <UserButton
            userProfileUrl={`/${locale}/account`}
            appearance={{
              elements: {
                avatarBox: 'size-8',
              },
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Link
        href={`/${locale}/login`}
        onClick={onNavigate}
        className={linkClassName}
      >
        {locale === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
      </Link>
      {mobile ? (
        <Link
          href={`/${locale}/register`}
          onClick={onNavigate}
          className={linkClassName}
        >
          {locale === 'th' ? 'สมัครสมาชิก' : 'Register'}
        </Link>
      ) : null}
    </>
  );
}

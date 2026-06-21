'use client';

import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
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
  const { isLoaded, isSignedIn } = useAuth();
  const linkClassName = mobile
    ? 'flex min-h-12 items-center rounded-md px-3 text-lg text-text transition-colors duration-200 hover:bg-surface-raised hover:text-accent'
    : 'flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-accent';

  if (!isLoaded) {
    return <span className={mobile ? 'min-h-12' : 'min-h-11 min-w-11'} />;
  }

  if (isSignedIn) {
    return (
      <>
        <Link
          href={`/${locale}/studio`}
          onClick={onNavigate}
          className={linkClassName}
        >
          Studio
        </Link>
        <div className={mobile ? 'px-3 py-3' : 'grid min-h-11 place-items-center'}>
          <UserButton
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
    <Link
      href={`/${locale}/sign-in`}
      onClick={onNavigate}
      className={linkClassName}
    >
      {locale === 'th' ? 'เข้าสู่ระบบ' : 'Sign in'}
    </Link>
  );
}

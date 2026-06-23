'use client';

import { Show, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { isEditor, normalizeUserRole } from '@/lib/roles';
import type { Locale } from '@/lib/site';

function AccountIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="3.25" />
      <path strokeLinecap="round" d="M5.75 19c.85-3.25 3-5 6.25-5s5.4 1.75 6.25 5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.75 19.25h4l9.9-9.9a2.12 2.12 0 0 0-3-3l-9.9 9.9v4Z"
      />
      <path strokeLinecap="round" d="m14.5 7.5 2 2" />
    </svg>
  );
}

export function AuthNavigation({ locale }: { locale: Locale }) {
  const { user } = useUser();
  const role = normalizeUserRole(user?.publicMetadata.role, 'member');

  return (
    <div className="flex items-center gap-2">
      <Show when="signed-out">
        <Link
          href={`/${locale}/login`}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-sm text-text-soft transition-colors duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent"
        >
          <AccountIcon />
          {locale === 'th' ? 'เข้าสู่ระบบ' : 'Sign in'}
        </Link>
      </Show>

      <Show when="signed-in">
        {isEditor(role) ? (
          <Link
            href={`/${locale}/studio/articles`}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-soft px-3 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-accent-ink"
          >
            <EditIcon />
            {locale === 'th' ? 'เขียนบทความ' : 'Write'}
          </Link>
        ) : null}
        <Link
          href={`/${locale}/account`}
          className="inline-flex min-h-11 items-center gap-2 px-2 text-sm text-muted transition-colors duration-200 hover:text-accent"
        >
          <AccountIcon />
          {locale === 'th' ? 'บัญชี' : 'Account'}
        </Link>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'size-8',
              userButtonTrigger:
                'grid size-11 place-items-center rounded-md hover:bg-surface-raised focus:shadow-none',
            },
          }}
        />
      </Show>
    </div>
  );
}

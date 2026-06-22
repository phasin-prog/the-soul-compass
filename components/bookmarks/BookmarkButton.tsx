'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import type { Locale } from '@/lib/site';
import type { BookmarkTargetType } from '@/types/user';

interface BookmarkButtonProps {
  locale: Locale;
  targetId: string;
  targetSlug: string;
  targetType: BookmarkTargetType;
}

export function BookmarkButton({
  locale,
  targetId,
  targetSlug,
  targetType,
}: BookmarkButtonProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const [showNotice, setShowNotice] = useState(false);
  const isConcept = targetType === 'concept';
  const label =
    locale === 'th'
      ? isConcept
        ? 'บันทึกแนวคิด'
        : 'บันทึกบทความ'
      : isConcept
        ? 'Save concept'
        : 'Bookmark article';
  const loginLabel =
    locale === 'th' ? `เข้าสู่ระบบเพื่อ${label}` : `Sign in to ${label.toLowerCase()}`;
  const returnPath =
    isConcept
      ? `/${locale}/concepts/${targetSlug}`
      : `/${locale}/articles/${targetSlug}`;
  const loginHref = `/${locale}/login?redirect_url=${encodeURIComponent(returnPath)}`;

  if (!isLoaded) {
    return <span className="block min-h-11 w-40" aria-hidden="true" />;
  }

  if (!isSignedIn) {
    return (
      <Link
        href={loginHref}
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-border-strong bg-surface px-4 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
      >
        {loginLabel}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        data-target-id={targetId}
        data-target-type={targetType}
        onClick={() => setShowNotice(true)}
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-border-strong bg-surface px-4 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
      >
        <span aria-hidden="true" className="mr-2 text-accent">
          ◇
        </span>
        {label}
      </button>
      {showNotice ? (
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted" role="status">
          {locale === 'th'
            ? 'ส่วนจัดเก็บสมาชิกพร้อมแล้ว การบันทึกถาวรจะเชื่อมต่อกับฐานข้อมูลในขั้นถัดไป'
            : 'The member collection is ready. Persistent saving will connect to the database in the next phase.'}
        </p>
      ) : null}
    </div>
  );
}

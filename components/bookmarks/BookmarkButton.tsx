import Link from 'next/link';
import type { Locale } from '@/lib/site';
import type { BookmarkTargetType } from '@/types/user';

interface BookmarkButtonProps {
  locale: Locale;
  targetSlug: string;
  targetType: BookmarkTargetType;
}

export function BookmarkButton({
  locale,
  targetSlug,
  targetType,
}: BookmarkButtonProps) {
  const isConcept = targetType === 'concept';
  const label =
    locale === 'th'
      ? isConcept
        ? 'เก็บแนวคิดไว้ในบัญชี'
        : 'เก็บบทความไว้ในบัญชี'
      : isConcept
        ? 'Keep concept in account'
        : 'Keep article in account';
  const returnPath =
    isConcept
      ? `/${locale}/concepts/${targetSlug}`
      : `/${locale}/articles/${targetSlug}`;
  const accountHref = `/${locale}/account?redirect_url=${encodeURIComponent(returnPath)}`;

  return (
    <Link
      href={accountHref}
      className="inline-flex min-h-11 items-center justify-center rounded-md border border-border-strong bg-surface px-4 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
    >
      <span aria-hidden="true" className="mr-2 text-accent">
        ◇
      </span>
      {label}
    </Link>
  );
}

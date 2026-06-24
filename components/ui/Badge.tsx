import { ReactNode } from 'react';
import type { Locale } from '@/lib/site';
import type { ArticleDifficulty, ArticleSourceStatus } from '@/types/article';
import type { ConceptEntryType } from '@/types/concept';
import { readingLevelMetadata, sourceStatusMetadata, wikiEntryTypeMetadata } from '@/lib/content/metadata-mapping';
import { SoulIcon } from '@/components/icons/SoulIcon';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'border-border bg-surface-raised text-muted',
    accent: 'border-accent/35 bg-accent-soft text-accent',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full border px-3 py-1 text-sm
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

interface ReadingLevelBadgeProps {
  level: ArticleDifficulty;
  locale: Locale;
  className?: string;
}

export function ReadingLevelBadge({
  level,
  locale,
  className = '',
}: ReadingLevelBadgeProps) {
  const meta = readingLevelMetadata[level];
  if (!meta) return null;

  return (
    <span
      className={`group relative inline-flex min-h-8 cursor-help items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-serif text-[0.8125rem] text-text-soft transition-all duration-300 hover:border-accent/40 ${className}`}
    >
      <SoulIcon name={meta.icon} size={13} strokeWidth={1.5} className="text-accent shrink-0" />
      <span>{meta.name[locale]}</span>
      
      {/* Tooltip */}
      <span className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-64 translate-y-1 scale-95 rounded-lg border border-border bg-surface-soft p-3 text-[0.75rem] leading-relaxed text-text-soft opacity-0 shadow-xl transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 font-sans
        before:content-[''] before:absolute before:top-full before:left-6 before:border-[6px] before:border-transparent before:border-t-border
        after:content-[''] after:absolute after:top-full after:left-[25px] after:border-[5px] after:border-transparent after:border-t-surface-soft">
        <span className="block font-semibold text-accent mb-1 flex items-center gap-1.5">
          <SoulIcon name={meta.icon} size={11} className="text-accent" />
          {meta.name[locale]}
        </span>
        {meta.description[locale]}
      </span>
    </span>
  );
}

interface SourceStatusBadgeProps {
  status: ArticleSourceStatus;
  locale: Locale;
  className?: string;
}

export function SourceStatusBadge({
  status,
  locale,
  className = '',
}: SourceStatusBadgeProps) {
  const meta = sourceStatusMetadata[status];
  if (!meta) return null;

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 py-1 font-serif text-[0.8125rem] transition-all duration-300 hover:bg-current/5 ${className}`}
      style={{
        borderColor: `color-mix(in oklch, ${meta.color} 30%, transparent)`,
        backgroundColor: `color-mix(in oklch, ${meta.color} 5%, transparent)`,
        color: meta.color,
      }}
    >
      <SoulIcon name={meta.icon} size={13} strokeWidth={1.5} className="shrink-0" />
      <span>{meta.name[locale]}</span>
    </span>
  );
}

interface WikiEntryTypeBadgeProps {
  type: ConceptEntryType;
  locale: Locale;
  className?: string;
}

export function WikiEntryTypeBadge({
  type,
  locale,
  className = '',
}: WikiEntryTypeBadgeProps) {
  const meta = wikiEntryTypeMetadata[type];
  if (!meta) return null;

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-serif text-[0.8125rem] text-text-soft transition-all duration-300 hover:border-accent/30 ${className}`}
    >
      <SoulIcon name={meta.icon} size={13} strokeWidth={1.5} className="text-muted shrink-0" />
      <span>{meta.name[locale]}</span>
    </span>
  );
}

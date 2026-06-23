import type { Locale } from '@/lib/site';

interface CategoryBadgeProps {
  color: string;
  name: Record<Locale, string>;
  locale: Locale;
  className?: string;
}

export function CategoryBadge({
  color,
  name,
  locale,
  className = '',
}: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full border px-3 text-sm ${className}`}
      style={{
        borderColor: `color-mix(in oklch, ${color} 45%, transparent)`,
        color,
      }}
    >
      {name[locale]}
    </span>
  );
}

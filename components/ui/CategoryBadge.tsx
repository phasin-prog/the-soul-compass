import type { Locale } from '@/lib/site';
import type { CategoryId } from '@/lib/content/categories';
import { categoryMetadata } from '@/lib/content/metadata-mapping';
import { SoulIcon } from '@/components/icons/SoulIcon';

interface CategoryBadgeProps {
  category?: CategoryId;
  color?: string;
  name?: Record<Locale, string>;
  locale: Locale;
  className?: string;
  hideIcon?: boolean;
}

export function CategoryBadge({
  category,
  color,
  name,
  locale,
  className = '',
  hideIcon = false,
}: CategoryBadgeProps) {
  const meta = category ? categoryMetadata[category] : null;
  const badgeColor = meta ? meta.color : (color || 'var(--accent)');
  const badgeName = meta ? meta.name[locale] : (name ? name[locale] : '');
  const badgeIcon = meta ? meta.icon : null;

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 py-1 font-serif text-[0.8125rem] tracking-wide transition-all duration-300 hover:bg-current/5 ${className}`}
      style={{
        borderColor: `color-mix(in oklch, ${badgeColor} 30%, transparent)`,
        backgroundColor: `color-mix(in oklch, ${badgeColor} 5%, transparent)`,
        color: badgeColor,
      }}
    >
      {!hideIcon && badgeIcon && (
        <SoulIcon
          name={badgeIcon}
          size={12}
          strokeWidth={1.5}
          className="shrink-0"
        />
      )}
      <span>{badgeName}</span>
    </span>
  );
}

export { CategoryBadge as KnowledgeCategoryBadge };

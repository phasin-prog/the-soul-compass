import Link from 'next/link';
import type { Locale } from '@/lib/site';
import { getT } from '@/lib/i18n';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: Locale;
}

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const t = getT(locale);

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol
        className="flex items-center gap-2 text-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Home */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            href={`/${locale}`}
            itemProp="item"
            className="text-muted transition-colors hover:text-text"
          >
            <span itemProp="name">{t.ui.home}</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {/* Dynamic items */}
        {items.map((item, index) => (
          <li
            key={item.href}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-2"
          >
            <span className="text-faint">/</span>
            {index === items.length - 1 ? (
              // Last item (current page)
              <span
                itemProp="name"
                className="text-text"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              // Intermediate items
              <Link
                href={item.href}
                itemProp="item"
                className="text-muted transition-colors hover:text-text"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

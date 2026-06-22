import { ExternalLinkCard } from '@/components/external-links/ExternalLinkCard';
import { externalLinkCategoryLabels } from '@/lib/content/external-link-taxonomy';
import type { Locale } from '@/lib/site';
import type {
  ExternalLink,
  ExternalLinkCategory,
} from '@/types/external-link';

export function ExternalLinkCategorySection({
  category,
  links,
  locale,
}: {
  category: ExternalLinkCategory;
  links: ExternalLink[];
  locale: Locale;
}) {
  return (
    <section aria-labelledby={`external-links-${category}`}>
      <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h2
          id={`external-links-${category}`}
          className="type-section-title text-text"
        >
          {externalLinkCategoryLabels[category][locale]}
        </h2>
        <span className="type-meta text-faint">{links.length}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <ExternalLinkCard key={link.id} link={link} locale={locale} />
        ))}
      </div>
    </section>
  );
}

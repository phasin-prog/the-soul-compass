import { ExternalLinkCategorySection } from '@/components/external-links/ExternalLinkCategorySection';
import type { Locale } from '@/lib/site';
import {
  externalLinkCategories,
  type ExternalLink,
} from '@/types/external-link';

export function ExternalLinkGrid({
  links,
  locale,
}: {
  links: ExternalLink[];
  locale: Locale;
}) {
  return (
    <div className="space-y-12">
      {externalLinkCategories.map((category) => {
        const categoryLinks = links.filter((link) => link.category === category);
        return categoryLinks.length > 0 ? (
          <ExternalLinkCategorySection
            key={category}
            category={category}
            links={categoryLinks}
            locale={locale}
          />
        ) : null;
      })}
    </div>
  );
}

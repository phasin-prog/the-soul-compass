import {
  externalLinkCategoryLabels,
  externalLinkTypeLabels,
} from '@/lib/content/external-link-taxonomy';
import type { Locale } from '@/lib/site';
import type { ExternalLink } from '@/types/external-link';

export function ExternalLinkCard({
  link,
  locale,
}: {
  link: ExternalLink;
  locale: Locale;
}) {
  return (
    <article className="!max-w-none border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-border px-2.5 py-1 text-muted">
          {externalLinkTypeLabels[link.linkType][locale]}
        </span>
        {link.isOfficial ? (
          <span className="rounded-full border border-celadon px-2.5 py-1 text-celadon">
            {locale === 'th' ? 'ทางการ' : 'Official'}
          </span>
        ) : null}
        {link.isRecommended ? (
          <span className="rounded-full border border-accent px-2.5 py-1 text-accent">
            {locale === 'th' ? 'แนะนำ' : 'Recommended'}
          </span>
        ) : null}
      </div>

      <h3 className="type-card-title mt-4 text-text">
        {link.name}
        {link.abbreviation ? (
          <span className="ml-2 text-base text-muted">({link.abbreviation})</span>
        ) : null}
      </h3>
      <p className="mt-3 text-sm leading-7 text-muted">
        {link.description[locale]}
      </p>
      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-faint">
        <div>
          <dt className="sr-only">{locale === 'th' ? 'หมวด' : 'Category'}</dt>
          <dd>{externalLinkCategoryLabels[link.category][locale]}</dd>
        </div>
        <div>
          <dt className="sr-only">{locale === 'th' ? 'ภาษา' : 'Language'}</dt>
          <dd>{link.language}</dd>
        </div>
        <div>
          <dt className="sr-only">{locale === 'th' ? 'ประเทศ' : 'Country'}</dt>
          <dd>{link.country}</dd>
        </div>
      </dl>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
      >
        {locale === 'th' ? 'เปิดเว็บไซต์ ↗' : 'Visit website ↗'}
      </a>
    </article>
  );
}

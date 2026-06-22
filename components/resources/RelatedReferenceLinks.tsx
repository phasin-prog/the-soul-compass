import Link from 'next/link';
import type { Locale } from '@/lib/site';
import type { ArticleSummary } from '@/types/article';
import type { ConceptSummary } from '@/types/concept';
import type { SeriesSummary } from '@/types/series';

interface RelatedReferenceLinksProps {
  articles: ArticleSummary[];
  concepts: ConceptSummary[];
  locale: Locale;
  series: SeriesSummary[];
}

export function RelatedReferenceLinks({
  articles,
  concepts,
  locale,
  series,
}: RelatedReferenceLinksProps) {
  const groups = [
    {
      id: 'concepts',
      title: locale === 'th' ? 'แนวคิดที่เกี่ยวข้อง' : 'Related concepts',
      items: concepts.map((concept) => ({
        href: `/${locale}/concepts/${concept.slug}`,
        title: concept.title,
        description: concept.shortDefinition,
      })),
    },
    {
      id: 'articles',
      title: locale === 'th' ? 'บทความที่ใช้อ้างอิงนี้' : 'Related articles',
      items: articles.map((article) => ({
        href: `/${locale}/articles/${article.slug}`,
        title: article.title,
        description: article.excerpt,
      })),
    },
    {
      id: 'series',
      title: locale === 'th' ? 'ชุดอ่านที่เกี่ยวข้อง' : 'Related reading paths',
      items: series.map((item) => ({
        href: `/${locale}/series/${item.slug}`,
        title: item.title,
        description: item.description,
      })),
    },
  ].filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <section aria-labelledby="related-reference-content-title">
      <p className="type-meta text-accent">
        {locale === 'th' ? 'เครือข่ายความรู้' : 'Knowledge graph'}
      </p>
      <h2
        id="related-reference-content-title"
        className="type-section-title mt-2 text-text"
      >
        {locale === 'th'
          ? 'เนื้อหาที่เชื่อมกับแหล่งนี้'
          : 'Archive entries connected to this source'}
      </h2>

      <div className="mt-6 space-y-9">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`related-${group.id}`}>
            <h3
              id={`related-${group.id}`}
              className="type-meta text-muted"
            >
              {group.title}
            </h3>
            <div className="mt-3 border-y border-border">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group grid gap-2 border-t border-border py-4 first:border-t-0 sm:grid-cols-[13rem_minmax(0,1fr)]"
                >
                  <span className="font-medium text-text group-hover:text-accent">
                    {item.title}
                  </span>
                  <span className="text-sm leading-6 text-muted">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

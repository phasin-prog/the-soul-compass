import Link from 'next/link';
import type { Locale } from '@/lib/site';
import type { ArticleConceptLink } from '@/types/article';

interface RelatedConceptsProps {
  concepts: ArticleConceptLink[];
  locale: Locale;
}

export function RelatedConcepts({
  concepts,
  locale,
}: RelatedConceptsProps) {
  if (concepts.length === 0) return null;

  return (
    <section aria-labelledby="related-concepts-title">
      <h2 id="related-concepts-title" className="type-section-title text-text">
        {locale === 'th' ? 'แนวคิดที่เกี่ยวข้อง' : 'Related concepts'}
      </h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {concepts.map((concept) => (
          <Link
            key={concept.slug}
            href={`/${locale}/concepts/${concept.slug}`}
            className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm text-text-soft transition-colors duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent"
          >
            {concept.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

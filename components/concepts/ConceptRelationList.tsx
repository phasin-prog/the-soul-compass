import Link from 'next/link';
import type { Locale } from '@/lib/site';
import type { ConceptRelation } from '@/types/concept';

interface ConceptRelationListProps {
  conceptTitle: string;
  relations: ConceptRelation[];
  locale: Locale;
}

export function ConceptRelationList({
  conceptTitle,
  relations,
  locale,
}: ConceptRelationListProps) {
  if (relations.length === 0) return null;

  return (
    <section aria-labelledby="concept-relations-title">
      <h2 id="concept-relations-title" className="type-section-title text-text">
        {locale === 'th' ? 'แผนที่แนวคิดที่เกี่ยวข้อง' : 'Related concept map'}
      </h2>
      <div className="mt-6 border-y border-border">
        <div className="flex min-h-14 items-center gap-3 bg-surface px-4 py-3">
          <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-medium text-text">{conceptTitle}</span>
          <span className="type-meta text-muted">
            {locale === 'th' ? 'โหนดปัจจุบัน' : 'Current node'}
          </span>
        </div>

        <ul>
          {relations.map((relation) => (
            <li key={relation.slug} className="border-t border-border">
              <Link
                href={`/${locale}/concepts/${relation.slug}`}
                className="group grid min-h-20 gap-2 px-4 py-4 transition-colors duration-200 hover:bg-surface sm:grid-cols-[minmax(9rem,0.55fr)_1.25rem_minmax(0,1fr)] sm:items-center"
              >
                <span className="font-medium text-text transition-colors duration-200 group-hover:text-accent">
                  {relation.title}
                </span>
                <span aria-hidden="true" className="hidden text-faint sm:block">
                  ←
                </span>
                <span className="text-sm leading-6 text-muted">
                  {relation.relation}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

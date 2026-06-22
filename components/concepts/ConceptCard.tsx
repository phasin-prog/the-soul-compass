import Link from 'next/link';
import { categories } from '@/lib/content/categories';
import { getDifficultyLabel } from '@/lib/format';
import type { Locale } from '@/lib/site';
import type { ConceptSummary } from '@/types/concept';

interface ConceptCardProps {
  concept: ConceptSummary;
  locale: Locale;
}

export function ConceptCard({ concept, locale }: ConceptCardProps) {
  const category = categories[concept.category];

  return (
    <article className="border-t border-border">
      <Link
        href={`/${locale}/concepts/${concept.slug}`}
        className="group grid min-h-36 gap-5 py-6 focus-visible:outline-offset-8 md:grid-cols-[minmax(11rem,0.55fr)_minmax(0,1.15fr)_minmax(10rem,0.55fr)] md:items-start"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="type-card-title text-text transition-colors duration-200 group-hover:text-accent">
              {concept.title}
            </h3>
            {concept.thaiTerm !== concept.title ? (
              <span className="text-sm text-muted">{concept.thaiTerm}</span>
            ) : null}
          </div>
          <p className="type-meta mt-2 text-muted">
            {getDifficultyLabel(locale, concept.difficulty)}
          </p>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className="inline-flex min-h-8 items-center rounded-full border px-3 text-sm"
              style={{
                borderColor: `color-mix(in oklch, ${category.color} 45%, transparent)`,
                color: category.color,
              }}
            >
              {category.name[locale]}
            </span>
            <span className="type-meta text-muted">{concept.tradition}</span>
          </div>
          <p className="max-w-3xl text-text-soft">{concept.shortDefinition}</p>
        </div>

        <div>
          <p className="type-meta font-medium text-muted">
            {locale === 'th' ? 'แนวคิดที่เชื่อมโยง' : 'Related concepts'}
          </p>
          {concept.relatedConcepts.length > 0 ? (
            <p className="mt-2 text-sm leading-7 text-text-soft">
              {concept.relatedConcepts
                .slice(0, 3)
                .map((relation) => relation.title)
                .join(' · ')}
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted">
              {locale === 'th' ? 'ยังไม่มีความสัมพันธ์ที่ระบุ' : 'No mapped relations yet'}
            </p>
          )}
          <span className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent">
            {locale === 'th' ? 'เปิดโหนดแนวคิด' : 'Open concept node'}
            <span aria-hidden="true" className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

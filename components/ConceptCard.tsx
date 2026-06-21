import Link from 'next/link';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import type { Locale } from '@/lib/site';
import type { ConceptMeta } from '@/lib/content/concepts';
import { categories } from '@/lib/content/categories';

interface ConceptCardProps {
  concept: ConceptMeta;
  locale: Locale;
}

export function ConceptCard({ concept, locale }: ConceptCardProps) {
  const category = categories[concept.category];

  return (
    <Link href={`/${locale}/concepts/${concept.slug}`}>
      <Card hover className="h-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="type-card-title text-text">
              {concept.term[locale]}
            </h3>
            <Badge variant="default" className="shrink-0">
              {category.name[locale]}
            </Badge>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {concept.definition[locale]}
          </p>
        </div>
      </Card>
    </Link>
  );
}

import {
  ReferenceList as BaseReferenceList,
  type Reference,
} from '@/components/ui/ReferenceList';
import type { Locale } from '@/lib/site';
import type { ConceptReference } from '@/types/concept';

interface ConceptReferenceListProps {
  references: ConceptReference[];
  locale: Locale;
}

export function ConceptReferenceList({
  references,
  locale,
}: ConceptReferenceListProps) {
  const mappedReferences: Reference[] = references.map((ref) => ({
    id: ref.id,
    authors: ref.authors,
    year: ref.year,
    title: ref.title,
    publication: ref.publication,
    url: ref.url,
  }));

  return (
    <BaseReferenceList
      references={mappedReferences}
      locale={locale}
      headingId="concept-references-title"
    />
  );
}

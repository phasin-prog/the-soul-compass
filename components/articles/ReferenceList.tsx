import {
  ReferenceList as BaseReferenceList,
  type Reference,
} from '@/components/ui/ReferenceList';
import type { Locale } from '@/lib/site';
import type { ArticleReference } from '@/types/article';

interface ReferenceListProps {
  references: ArticleReference[];
  locale: Locale;
}

export function ReferenceList({ references, locale }: ReferenceListProps) {
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
      useSectionHeading
    />
  );
}

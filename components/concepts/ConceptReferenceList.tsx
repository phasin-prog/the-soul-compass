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
  if (references.length === 0) return null;

  return (
    <section aria-labelledby="concept-references-title">
      <h2 id="concept-references-title" className="type-section-title text-text">
        {locale === 'th' ? 'เอกสารอ้างอิง' : 'References'}
      </h2>
      <ol className="mt-5 space-y-4">
        {references.map((reference, index) => {
          const content = (
            <>
              <span className="text-text">{reference.authors}</span>
              {reference.year ? ` (${reference.year}).` : '.'}{' '}
              <cite className="text-text-soft">{reference.title}</cite>
              {reference.publication ? `. ${reference.publication}.` : '.'}
            </>
          );

          return (
            <li
              key={reference.id}
              className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 text-sm leading-7 text-muted"
            >
              <span className="text-faint" aria-hidden="true">
                {index + 1}.
              </span>
              {reference.url ? (
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-border-strong underline-offset-4 hover:text-accent"
                >
                  {content}
                </a>
              ) : (
                <span>{content}</span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

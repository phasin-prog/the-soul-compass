import Link from 'next/link';
import { getReferenceSlugById } from '@/lib/references';
import type { Locale } from '@/lib/site';
import type { ArticleReference } from '@/types/article';

interface ReferenceListProps {
  references: ArticleReference[];
  locale: Locale;
}

export function ReferenceList({ references, locale }: ReferenceListProps) {
  if (references.length === 0) return null;

  return (
    <section aria-labelledby="references-title">
      <h2 id="references-title" className="type-section-title text-text">
        {locale === 'th' ? 'เอกสารอ้างอิง' : 'References'}
      </h2>
      <ol className="mt-5 space-y-4">
        {references.map((reference, index) => {
          const referenceSlug = getReferenceSlugById(reference.id);
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
              {referenceSlug ? (
                <Link
                  href={`/${locale}/resources/${referenceSlug}`}
                  className="underline decoration-border-strong underline-offset-4 hover:text-accent"
                >
                  {content}
                </Link>
              ) : reference.url ? (
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

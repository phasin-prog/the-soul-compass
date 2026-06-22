import Link from 'next/link';
import { ReferenceMeta } from '@/components/resources/ReferenceMeta';
import type { Locale } from '@/lib/site';
import type { Reference } from '@/types/reference';

interface ReferenceCardProps {
  locale: Locale;
  reference: Reference;
}

export function ReferenceCard({ locale, reference }: ReferenceCardProps) {
  return (
    <article className="!max-w-none border-t border-border">
      <Link
        href={`/${locale}/resources/${reference.slug}`}
        className="group block py-7 focus-visible:outline-offset-8 sm:py-8"
      >
        <ReferenceMeta compact locale={locale} reference={reference} />

        <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-8">
          <div>
            <h2 className="type-card-title text-text transition-colors group-hover:text-accent">
              {reference.title}
            </h2>
            {reference.originalTitle &&
            reference.originalTitle !== reference.title ? (
              <p className="mt-1 text-sm text-muted">
                {reference.originalTitle}
              </p>
            ) : null}
          </div>

          <p className="text-sm leading-6 text-muted">
            {reference.description[locale]}
          </p>
        </div>
      </Link>
    </article>
  );
}

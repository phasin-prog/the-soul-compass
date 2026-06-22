import Link from 'next/link';

interface LocaleAvailabilityNoticeProps {
  section: 'articles' | 'concepts' | 'series';
}

export function LocaleAvailabilityNotice({
  section,
}: LocaleAvailabilityNoticeProps) {
  const labels = {
    articles: 'articles',
    concepts: 'concept nodes',
    series: 'reading paths',
  };

  return (
    <div className="border-y border-border py-14">
      <h2 className="type-section-title text-text">
        English translations are in progress
      </h2>
      <p className="mt-4 max-w-2xl text-text-soft">
        The interface is available in English, but the published {labels[section]} currently
        live in the Thai archive. No machine-generated translations are shown as finished work.
      </p>
      <Link
        href={`/th/${section}`}
        hrefLang="th"
        className="mt-6 inline-flex min-h-11 items-center font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
      >
        Browse the Thai archive →
      </Link>
    </div>
  );
}

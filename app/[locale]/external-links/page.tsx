import type { Metadata } from 'next';
import { ExternalLinkDisclaimer } from '@/components/external-links/ExternalLinkDisclaimer';
import { ExternalLinkFilters } from '@/components/external-links/ExternalLinkFilters';
import { getActiveExternalLinks } from '@/lib/external-links';
import { getAlternateUrls } from '@/lib/metadata';
import { getT } from '@/lib/i18n';
import type { Locale } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const t = getT(locale);
  return {
    title: t.externalLinks.title,
    description:
      locale === 'th'
        ? 'สารบัญองค์กร สมาคม สถาบัน สารานุกรม และแหล่งเรียนรู้ภายนอกที่คัดสรร'
        : 'A curated directory of organizations, associations, institutes, encyclopedias, and learning resources.',
    alternates: {
      canonical: `/${locale}/external-links`,
      languages: getAlternateUrls('/external-links'),
    },
  };
}

export default async function ExternalLinksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const t = getT(locale);
  const links = await getActiveExternalLinks();

  return (
    <div className="container mx-auto px-5 py-14 sm:px-8 sm:py-18">
      <main className="mx-auto max-w-6xl">
        <header className="max-w-4xl">
          <p className="type-meta text-accent">
            {locale === 'th' ? 'สารบัญแหล่งศึกษาต่อ' : 'Further study directory'}
          </p>
          <h1 className="type-page-title mt-3 text-text">
            {t.externalLinks.title}
          </h1>
          <p className="type-lead mt-5 text-text-soft">
            {locale === 'th'
              ? 'องค์กร สมาคม สถาบัน สารานุกรม และศูนย์การเรียนรู้ที่คัดสรรเพื่อช่วยให้ผู้อ่านค้นคว้าต่อ'
              : 'Curated organizations, associations, institutes, encyclopedias, and learning centers for further study.'}
          </p>
        </header>
        <div className="mt-8">
          <ExternalLinkDisclaimer locale={locale} />
        </div>
        <div className="mt-10">
          <ExternalLinkFilters links={links} locale={locale} />
        </div>
      </main>
    </div>
  );
}

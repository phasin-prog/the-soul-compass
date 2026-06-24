import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Layout/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CitationBox } from '@/components/resources/CitationBox';
import { ReferenceMeta } from '@/components/resources/ReferenceMeta';
import { RelatedReferenceLinks } from '@/components/resources/RelatedReferenceLinks';
import {
  referenceSourceLevelDescriptions,
  referenceSourceLevelLabels,
  referenceSourceLevelStyles,
} from '@/lib/content/reference-taxonomy';
import { getPublishedArticles } from '@/lib/articles';
import { getPublishedConcepts } from '@/lib/concepts';
import {
  getReferenceBySlug,
  getStaticReferenceParams,
} from '@/lib/references';
import { getPublishedSeries } from '@/lib/series';
import type { Locale } from '@/lib/site';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getStaticReferenceParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const reference = await getReferenceBySlug(slug);

  if (!reference) {
    return {
      title: locale === 'th' ? 'ไม่พบระเบียนอ้างอิง' : 'Reference not found',
    };
  }

  const canonical = `/${locale}/resources/${reference.slug}`;

  return {
    title: reference.seoTitle[locale],
    description: reference.seoDescription[locale],
    alternates: {
      canonical,
      languages: {
        'x-default': `/th/resources/${reference.slug}`,
        th: `/th/resources/${reference.slug}`,
        en: `/en/resources/${reference.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title: reference.seoTitle[locale],
      description: reference.seoDescription[locale],
      modifiedTime: reference.updatedAt,
      authors: [reference.author],
      tags: [
        reference.category,
        reference.tradition,
        reference.sourceLevel,
        reference.type,
      ],
    },
  };
}

export default async function ReferenceDetailPage({ params }: PageProps) {
  const { locale: localeValue, slug } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const reference = await getReferenceBySlug(slug);

  if (!reference) notFound();

  const [allConcepts, allArticles, allSeries] = await Promise.all([
    getPublishedConcepts(locale),
    getPublishedArticles(locale),
    getPublishedSeries(locale),
  ]);
  const conceptSlugs = new Set(reference.relatedConcepts);
  const articleSlugs = new Set(reference.relatedArticles);
  const seriesSlugs = new Set(reference.relatedSeries);
  const concepts = allConcepts.filter((concept) =>
    conceptSlugs.has(concept.slug)
  );
  const articles = allArticles.filter((article) =>
    articleSlugs.has(article.slug)
  );
  const series = allSeries.filter((item) => seriesSlugs.has(item.slug));
  const relatedCount = concepts.length + articles.length + series.length;
  const formattedUpdatedAt = new Date(reference.updatedAt).toLocaleDateString(
    locale === 'th' ? 'th-TH' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
  const optionalBibliography = [
    [
      locale === 'th' ? 'ชื่อเดิม' : 'Original title',
      reference.originalTitle,
    ],
    [locale === 'th' ? 'ผู้แปล' : 'Translator', reference.translator],
    [locale === 'th' ? 'บรรณาธิการ' : 'Editor', reference.editor],
    [locale === 'th' ? 'สำนักพิมพ์' : 'Publisher', reference.publisher],
    ['ISBN', reference.isbn],
    ['DOI', reference.doi],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <Container className="py-10 sm:py-14">
      <article className="mx-auto !max-w-6xl">
        <Breadcrumbs
          locale={locale}
          items={[
            {
              label: locale === 'th' ? 'คลังอ้างอิง' : 'References',
              href: `/${locale}/resources`,
            },
            { label: reference.title, href: '' },
          ]}
        />

        <header className="border-b border-border pb-10 sm:pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex min-h-8 items-center rounded-full border px-3 text-sm ${referenceSourceLevelStyles[reference.sourceLevel]}`}
            >
              {referenceSourceLevelLabels[reference.sourceLevel][locale]}
            </span>
            <span className="type-meta text-muted">{reference.tradition}</span>
          </div>

          <h1 className="type-page-title mt-6 max-w-5xl text-text">
            {reference.title}
          </h1>
          {reference.originalTitle &&
          reference.originalTitle !== reference.title ? (
            <p className="mt-3 font-serif text-xl text-text-soft">
              {reference.originalTitle}
            </p>
          ) : null}

          <div className="mt-7">
            <ReferenceMeta compact locale={locale} reference={reference} />
          </div>

          {reference.sourceLevel === 'internal' ? (
            <div className="mt-8 border-y border-clay/45 bg-surface px-5 py-4">
              <p className="font-medium text-clay">
                {locale === 'th'
                  ? 'พัฒนาการทฤษฎีภายใน'
                  : 'Internal theoretical development'}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {referenceSourceLevelDescriptions.internal[locale]}
              </p>
            </div>
          ) : null}
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div className="space-y-14">
            <section aria-labelledby="why-reference-matters-title">
              <p className="type-meta text-accent">
                {locale === 'th' ? 'บทบาทในคลัง' : 'Archive role'}
              </p>
              <h2
                id="why-reference-matters-title"
                className="type-section-title mt-2 text-text"
              >
                {locale === 'th'
                  ? 'เหตุผลที่แหล่งนี้สำคัญต่อคลัง'
                  : 'Why this source matters here'}
              </h2>
              <p className="mt-5 max-w-[68ch] leading-[1.82] text-text-soft">
                {reference.description[locale]}
              </p>
              {relatedCount > 0 ? (
                <p className="mt-4 max-w-[68ch] leading-7 text-muted">
                  {locale === 'th'
                    ? `ขณะนี้ระเบียนนี้เชื่อมกับเนื้อหาที่เผยแพร่แล้ว ${relatedCount} รายการในภาษานี้`
                    : `This record currently connects to ${relatedCount} published archive entr${relatedCount === 1 ? 'y' : 'ies'} in this language.`}
                </p>
              ) : null}
            </section>

            <section
              aria-labelledby="bibliographic-notes-title"
              className="border-y border-border py-8"
            >
              <h2
                id="bibliographic-notes-title"
                className="type-section-title text-text"
              >
                {locale === 'th'
                  ? 'หมายเหตุทางบรรณานุกรม'
                  : 'Bibliographic note'}
              </h2>
              <p className="mt-5 max-w-[68ch] leading-[1.82] text-text-soft">
                {reference.notes[locale]}
              </p>
            </section>

            <RelatedReferenceLinks
              articles={articles}
              concepts={concepts}
              locale={locale}
              series={series}
            />

            <CitationBox locale={locale} reference={reference} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="type-meta mb-3 text-muted">
              {locale === 'th'
                ? 'ข้อมูลบรรณานุกรม'
                : 'Bibliographic information'}
            </h2>
            <ReferenceMeta locale={locale} reference={reference} />

            {optionalBibliography.length > 0 ? (
              <dl className="border-b border-border">
                {optionalBibliography.map(([label, value]) => (
                  <div
                    key={label}
                    className="border-t border-border py-4"
                  >
                    <dt className="type-meta text-muted">{label}</dt>
                    <dd className="mt-1 break-words text-text-soft">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {reference.externalUrl ? (
              <a
                href={reference.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
              >
                {locale === 'th' ? 'เปิดแหล่งภายนอก' : 'Open external source'}
              </a>
            ) : null}

            <div className="mt-5 border-t border-border pt-5">
              <p className="type-meta text-muted">
                {locale === 'th' ? 'ปรับปรุงระเบียน' : 'Record updated'}
              </p>
              <time
                dateTime={reference.updatedAt}
                className="mt-1 block text-text-soft"
              >
                {formattedUpdatedAt}
              </time>
            </div>

            <Link
              href={`/${locale}/resources`}
              className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
            >
              {locale === 'th'
                ? 'กลับไปคลังอ้างอิง'
                : 'Back to reference archive'}
            </Link>
          </aside>
        </div>
      </article>
    </Container>
  );
}

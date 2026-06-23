import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { ConceptReferenceList } from '@/components/concepts/ConceptReferenceList';
import { SeriesCard } from '@/components/series/SeriesCard';
import { SeriesPath } from '@/components/series/SeriesPath';
import { SeriesProgressPlaceholder } from '@/components/series/SeriesProgressPlaceholder';
import {
  seriesCategoryMeta,
  seriesDifficultyLabels,
  seriesStatusLabels,
  seriesTypeLabels,
} from '@/lib/content/series-taxonomy';
import {
  getSeriesBySlug,
  getSeriesReferences,
  getSeriesRelatedConcepts,
  getStaticSeriesParams,
  getSuggestedSeries,
  resolveSeriesItems,
} from '@/lib/series';
import type { Locale } from '@/lib/site';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getStaticSeriesParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const series = await getSeriesBySlug(locale, slug);

  if (!series) {
    return {
      title: locale === 'th' ? 'ไม่พบเส้นทางการอ่าน' : 'Reading path not found',
    };
  }

  const canonical = `/${locale}/series/${series.slug}`;
  const languages: Record<string, string> = { [locale]: canonical };

  for (const [translationLocale, translationSlug] of Object.entries(
    series.translations
  )) {
    if (translationSlug) {
      languages[translationLocale] =
        `/${translationLocale}/series/${translationSlug}`;
    }
  }

  return {
    title: series.seoTitle,
    description: series.seoDescription,
    alternates: { canonical, languages },
    openGraph: {
      type: 'article',
      url: canonical,
      title: series.seoTitle,
      description: series.seoDescription,
      publishedTime: series.publishedAt,
      modifiedTime: series.updatedAt,
      tags: [series.category, series.type, series.difficulty],
    },
    twitter: {
      card: 'summary_large_image',
      title: series.seoTitle,
      description: series.seoDescription,
    },
  };
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { locale: localeValue, slug } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const series = await getSeriesBySlug(locale, slug);

  if (!series) notFound();

  const [items, relatedConcepts, suggestedSeries] = await Promise.all([
    resolveSeriesItems(series),
    getSeriesRelatedConcepts(series),
    getSuggestedSeries(series),
  ]);
  const references = getSeriesReferences(series);
  const category = seriesCategoryMeta[series.category];
  const formattedUpdatedAt = new Date(series.updatedAt).toLocaleDateString(
    locale === 'th' ? 'th-TH' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="container mx-auto px-5 py-10 sm:px-8 sm:py-14">
      <article className="mx-auto !max-w-6xl">
        <Breadcrumbs
          locale={locale}
          items={[
            {
              label: locale === 'th' ? 'ชุดอ่าน' : 'Series',
              href: `/${locale}/series`,
            },
            { label: series.title, href: '' },
          ]}
        />

        <header className="border-b border-border pb-10 sm:pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge
              color={category.color}
              name={category.name}
              locale={locale}
            />
            <span className="type-meta text-muted">
              {seriesTypeLabels[series.type][locale]}
            </span>
            <span className="text-faint" aria-hidden="true">·</span>
            <span className="type-meta text-muted">
              {seriesStatusLabels[series.status][locale]}
            </span>
          </div>

          <h1 className="type-page-title mt-6 max-w-5xl text-text">
            {series.title}
          </h1>
          <p className="type-lead mt-4 max-w-4xl text-text-soft">
            {series.subtitle}
          </p>
          <p className="mt-6 max-w-3xl leading-8 text-muted">
            {series.description}
          </p>

          <dl className="mt-8 grid max-w-4xl grid-cols-2 border-y border-border text-sm sm:grid-cols-4">
            <div className="border-b border-r border-border py-4 pr-4 sm:border-b-0">
              <dt className="type-meta text-faint">
                {locale === 'th' ? 'ระดับ' : 'Level'}
              </dt>
              <dd className="mt-2 text-text">
                {seriesDifficultyLabels[series.difficulty][locale]}
              </dd>
            </div>
            <div className="border-b border-border py-4 pl-4 sm:border-b-0 sm:border-r sm:pr-4">
              <dt className="type-meta text-faint">
                {locale === 'th' ? 'เวลา' : 'Time'}
              </dt>
              <dd className="mt-2 text-text">
                {series.estimatedReadingTime} {locale === 'th' ? 'นาที' : 'min'}
              </dd>
            </div>
            <div className="border-r border-border py-4 pr-4 sm:pl-4">
              <dt className="type-meta text-faint">
                {locale === 'th' ? 'บทความ' : 'Articles'}
              </dt>
              <dd className="mt-2 text-text">{series.articleCount}</dd>
            </div>
            <div className="py-4 pl-4">
              <dt className="type-meta text-faint">
                {locale === 'th' ? 'แนวคิด' : 'Concepts'}
              </dt>
              <dd className="mt-2 text-text">{series.conceptCount}</dd>
            </div>
          </dl>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="space-y-14">
            <section aria-labelledby="series-introduction-title">
              <p className="type-meta text-accent">
                {locale === 'th' ? 'บทนำ' : 'Introduction'}
              </p>
              <h2
                id="series-introduction-title"
                className="type-section-title mt-2 text-text"
              >
                {locale === 'th' ? 'เหตุผลของลำดับนี้' : 'Why this sequence'}
              </h2>
              <p className="mt-5 max-w-[68ch] leading-[1.82] text-text-soft">
                {series.introduction}
              </p>
            </section>

            <SeriesProgressPlaceholder
              itemCount={items.length}
              locale={locale}
              seriesSlug={series.slug}
            />

            <SeriesPath items={items} locale={locale} />

            {relatedConcepts.length > 0 ? (
              <section
                aria-labelledby="series-concepts-title"
                className="border-t border-border pt-10"
              >
                <p className="type-meta text-accent">
                  {locale === 'th' ? 'แผนที่แนวคิด' : 'Concept map'}
                </p>
                <h2
                  id="series-concepts-title"
                  className="type-section-title mt-2 text-text"
                >
                  {locale === 'th' ? 'แนวคิดในเส้นทางนี้' : 'Concepts in this path'}
                </h2>
                <div className="mt-5 border-y border-border">
                  {relatedConcepts.map((concept) => (
                    <Link
                      key={concept.id}
                      href={`/${locale}/concepts/${concept.slug}`}
                      className="group grid gap-2 border-t border-border py-4 first:border-t-0 sm:grid-cols-[12rem_minmax(0,1fr)]"
                    >
                      <span className="font-medium text-text group-hover:text-accent">
                        {concept.title}
                      </span>
                      <span className="text-sm leading-6 text-muted">
                        {concept.shortDefinition}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <ConceptReferenceList references={references} locale={locale} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <dl className="border-y border-border">
              <div className="border-b border-border py-5">
                <dt className="type-meta text-muted">
                  {locale === 'th' ? 'ผู้เรียบเรียง' : 'Curated by'}
                </dt>
                <dd className="mt-2 text-text">{series.author}</dd>
              </div>
              <div className="border-b border-border py-5">
                <dt className="type-meta text-muted">
                  {locale === 'th' ? 'หลักการอ่าน' : 'Reading principle'}
                </dt>
                <dd className="mt-2 leading-7 text-text-soft">
                  {locale === 'th'
                    ? 'อ่านตามลำดับเพื่อให้คำศัพท์และกรอบคิดสะสมความหมาย'
                    : 'Follow the order so terms and frameworks accumulate meaning.'}
                </dd>
              </div>
              <div className="py-5">
                <dt className="type-meta text-muted">
                  {locale === 'th' ? 'แก้ไขล่าสุด' : 'Last updated'}
                </dt>
                <dd className="mt-2 text-text">
                  <time dateTime={series.updatedAt}>{formattedUpdatedAt}</time>
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {suggestedSeries.length > 0 ? (
          <aside className="mt-16 border-t border-border pt-10">
            <p className="type-meta text-accent">
              {locale === 'th' ? 'อ่านต่อ' : 'Continue reading'}
            </p>
            <h2 className="type-section-title mt-2 text-text">
              {locale === 'th' ? 'เส้นทางที่แนะนำถัดไป' : 'Suggested next paths'}
            </h2>
            <div className="mt-6 border-b border-border">
              {suggestedSeries.map((suggested) => (
                <SeriesCard
                  key={suggested.id}
                  locale={locale}
                  series={suggested}
                />
              ))}
            </div>
          </aside>
        ) : null}
      </article>
    </div>
  );
}

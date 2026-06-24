import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { ReadingLevelBadge, WikiEntryTypeBadge } from '@/components/ui/Badge';
import { ConceptRelationList } from '@/components/concepts/ConceptRelationList';
import { ReferenceList } from '@/components/ui/ReferenceList';
import {
  getConceptArticles,
  getConceptBySlug,
  getStaticConceptParams,
} from '@/lib/concepts';
import { categories } from '@/lib/content/categories';
import { formatDate, getDifficultyLabel } from '@/lib/format';
import { parseLocale } from '@/lib/locale';
import { getConceptJsonLd } from '@/lib/metadata';
import { safeJsonLdStringify } from '@/lib/safe-json-ld';
import type { Locale } from '@/lib/site';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getStaticConceptParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const locale: Locale = parseLocale(localeValue);
  const concept = await getConceptBySlug(locale, slug);

  if (!concept) {
    return {
      title: locale === 'th' ? 'ไม่พบแนวคิด' : 'Concept not found',
    };
  }

  const canonical = `/${locale}/concepts/${concept.slug}`;
  const languages: Record<string, string> = {
    [locale]: canonical,
  };

  for (const [translationLocale, translationSlug] of Object.entries(
    concept.translations
  )) {
    if (translationSlug) {
      languages[translationLocale] =
        `/${translationLocale}/concepts/${translationSlug}`;
    }
  }

  return {
    title: concept.seoTitle,
    description: concept.seoDescription,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title: concept.seoTitle,
      description: concept.seoDescription,
      modifiedTime: concept.updatedAt,
      tags: [
        concept.category,
        concept.tradition,
        ...concept.thinkers,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: concept.seoTitle,
      description: concept.seoDescription,
    },
  };
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { locale: localeValue, slug } = await params;
  const locale: Locale = parseLocale(localeValue);
  const concept = await getConceptBySlug(locale, slug);

  if (!concept) notFound();

  const [relatedArticles] = await Promise.all([
    getConceptArticles(concept),
  ]);
  const category = categories[concept.category];
  const formattedUpdatedAt = formatDate(locale, concept.updatedAt);
  const conceptJsonLd = getConceptJsonLd(locale, {
    title: concept.title,
    description: concept.seoDescription,
    slug: concept.slug,
    category: category.name[locale],
    tradition: concept.tradition,
    updatedAt: concept.updatedAt,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(conceptJsonLd) }}
      />

      <div className="container mx-auto px-5 py-10 sm:px-8 sm:py-14">
        <article className="mx-auto !max-w-6xl">
          <Breadcrumbs
            locale={locale}
            items={[
              {
                label: locale === 'th' ? 'คลังแนวคิด' : 'Concepts',
                href: `/${locale}/concepts`,
              },
              { label: concept.title, href: '' },
            ]}
          />

          <header className="border-b border-border pb-10 sm:pb-12">
            <div className="flex flex-wrap items-center gap-3">
              <CategoryBadge
                category={concept.category}
                locale={locale}
              />
              <WikiEntryTypeBadge type={concept.entryType || 'concept'} locale={locale} />
              <ReadingLevelBadge level={concept.difficulty} locale={locale} />
              <span className="type-meta text-muted">{concept.tradition}</span>
            </div>

            <h1 className="type-page-title mt-6 max-w-4xl text-text">
              {concept.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-text-soft">
              <p>
                <span className="text-muted">
                  {locale === 'th' ? 'คำเดิม:' : 'Original term:'}
                </span>{' '}
                {concept.originalTerm}
              </p>
              <p>
                <span className="text-muted">
                  {locale === 'th' ? 'คำไทย:' : 'Thai term:'}
                </span>{' '}
                {concept.thaiTerm}
              </p>
            </div>

            <p className="type-lead mt-7 max-w-4xl text-text">
              {concept.shortDefinition}
            </p>

            <div className="mt-7">
              <BookmarkButton
                locale={locale}
                targetSlug={concept.slug}
                targetType="concept"
              />
            </div>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div className="space-y-14">
              <section aria-labelledby="human-explanation-title">
                <h2
                  id="human-explanation-title"
                  className="type-section-title text-text"
                >
                  {locale === 'th'
                    ? 'คำอธิบายให้เห็นภาพ'
                    : 'Human explanation'}
                </h2>
                <p className="mt-5 max-w-[68ch] leading-[1.82] text-text-soft">
                  {concept.humanExplanation}
                </p>
              </section>

              <section
                aria-labelledby="technical-explanation-title"
                className="border-y border-border py-8"
              >
                <h2
                  id="technical-explanation-title"
                  className="type-section-title text-text"
                >
                  {locale === 'th'
                    ? 'ความหมายทางวิชาการ / เทคนิค'
                    : 'Academic / technical explanation'}
                </h2>
                <p className="mt-5 max-w-[68ch] leading-[1.82] text-text-soft">
                  {concept.technicalExplanation}
                </p>
              </section>

              <section aria-labelledby="misunderstandings-title">
                <h2
                  id="misunderstandings-title"
                  className="type-section-title text-text"
                >
                  {locale === 'th'
                    ? 'ความเข้าใจผิดที่พบบ่อย'
                    : 'Common misunderstandings'}
                </h2>
                <ul className="mt-5 border-y border-border">
                  {concept.commonMisunderstandings.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-t border-border py-4 first:border-t-0"
                    >
                      <span className="font-serif text-xl text-accent" aria-hidden="true">
                        ≠
                      </span>
                      <span className="leading-7 text-text-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="examples-title">
                <h2 id="examples-title" className="type-section-title text-text">
                  {locale === 'th'
                    ? 'ตัวอย่างในชีวิตจริง'
                    : 'Examples in real life'}
                </h2>
                <ul className="mt-5 space-y-4">
                  {concept.examples.map((example) => (
                    <li
                      key={example}
                      className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-4"
                    >
                      <span
                        className="mt-[0.8rem] size-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span className="leading-7 text-text-soft">{example}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <ConceptRelationList
                conceptTitle={concept.title}
                relations={concept.relatedConcepts}
                locale={locale}
              />

              <ReferenceList
                references={concept.references}
                locale={locale}
                headingId="concept-references-title"
              />
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="border-y border-border">
                <div className="border-b border-border py-5">
                  <dt className="type-meta text-muted">
                    {locale === 'th' ? 'สำนัก / กรอบทฤษฎี' : 'Tradition'}
                  </dt>
                  <dd className="mt-2 text-text">{concept.tradition}</dd>
                </div>
                <div className="border-b border-border py-5">
                  <dt className="type-meta text-muted">
                    {locale === 'th' ? 'นักคิดที่เกี่ยวข้อง' : 'Related thinkers'}
                  </dt>
                  <dd className="mt-3">
                    <ul className="space-y-2 text-text-soft">
                      {concept.thinkers.map((thinker) => (
                        <li key={thinker}>{thinker}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="border-b border-border py-5">
                  <dt className="type-meta text-muted">
                    {locale === 'th' ? 'ระดับความลึก' : 'Difficulty'}
                  </dt>
                  <dd className="mt-2 text-text flex items-center">
                    <ReadingLevelBadge level={concept.difficulty} locale={locale} />
                  </dd>
                </div>
                <div className="py-5">
                  <dt className="type-meta text-muted">
                    {locale === 'th' ? 'แก้ไขล่าสุด' : 'Last updated'}
                  </dt>
                  <dd className="mt-2 text-text">
                    <time dateTime={concept.updatedAt}>
                      {formattedUpdatedAt}
                    </time>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          {relatedArticles.length > 0 ? (
            <aside className="mt-16 border-t border-border pt-10">
              <h2 className="type-section-title text-text">
                {locale === 'th'
                  ? 'บทความที่ใช้แนวคิดนี้'
                  : 'Articles using this concept'}
              </h2>
              <div className="mt-4 grid gap-x-8 md:grid-cols-2">
                {relatedArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    locale={locale}
                    headingLevel="h3"
                  />
                ))}
              </div>
            </aside>
          ) : null}
        </article>
      </div>
    </>
  );
}

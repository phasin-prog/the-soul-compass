import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/articles/ArticleBody';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ReferenceList } from '@/components/articles/ReferenceList';
import { RelatedConcepts } from '@/components/articles/RelatedConcepts';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ReadingProgress } from '@/components/ReadingProgress';
import { Container } from '@/components/Layout/Container';
import { ArticleMetadataPanel } from '@/components/ui/ArticleMetadata';
import { ArticleEndCTA } from '@/components/cta/ArticleEndCTA';
import { StickyServiceCTA } from '@/components/cta/StickyServiceCTA';
import {
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/articles';
import { categories } from '@/lib/content/categories';
import { getArticleJsonLd } from '@/lib/metadata';
import { safeJsonLdStringify } from '@/lib/safe-json-ld';
import type { Locale } from '@/lib/site';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const difficultyLabels = {
  th: {
    beginner: 'เริ่มต้น',
    intermediate: 'ระดับกลาง',
    advanced: 'ระดับลึก',
    academic: 'วิชาการเข้มข้น',
  },
  en: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    academic: 'Academic Study',
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const article = await getArticleBySlug(locale, slug);

  if (!article) {
    return { title: locale === 'th' ? 'ไม่พบบทความ' : 'Article not found' };
  }

  const canonical = `/${locale}/articles/${article.slug}`;
  const languages: Record<string, string> = {
    [locale]: canonical,
  };

  for (const [translationLocale, translationSlug] of Object.entries(
    article.translations
  )) {
    if (translationSlug) {
      languages[translationLocale] =
        `/${translationLocale}/articles/${translationSlug}`;
    }
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title: article.seoTitle,
      description: article.seoDescription,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
      images: article.coverImage
        ? [
            {
              url: article.coverImage.src,
              width: article.coverImage.width,
              height: article.coverImage.height,
              alt: article.coverImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle,
      description: article.seoDescription,
      images: article.coverImage ? [article.coverImage.src] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { locale: localeValue, slug } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const article = await getArticleBySlug(locale, slug);

  if (!article) notFound();

  const category = categories[article.category];
  const relatedArticles = await getRelatedArticles(article);
  const formattedPublishedAt = new Date(article.publishedAt).toLocaleDateString(
    locale === 'th' ? 'th-TH' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
  const formattedUpdatedAt = new Date(article.updatedAt).toLocaleDateString(
    locale === 'th' ? 'th-TH' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
  const otherLocale: Locale = locale === 'th' ? 'en' : 'th';
  const translatedSlug = article.translations[otherLocale];
  const articleJsonLd = getArticleJsonLd(locale, {
    title: article.title,
    description: article.seoDescription,
    slug: article.slug,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    author: article.author,
    category: category.name[locale],
  });

  return (
    <>
      <ReadingProgress locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(articleJsonLd) }}
      />

      <Container className="py-10 sm:py-14">
        <article className="mx-auto !max-w-none">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs
              locale={locale}
              items={[
                {
                  label: locale === 'th' ? 'บทความ' : 'Articles',
                  href: `/${locale}/articles`,
                },
                { label: article.title, href: '' },
              ]}
            />

            <header className="pb-8">
              <h1 className="type-page-title mt-6 max-w-4xl text-text">
                {article.title}
              </h1>

              {article.subtitle ? (
                <p className="type-lead mt-5 max-w-3xl text-text-soft">
                  {article.subtitle}
                </p>
              ) : null}

              <ArticleMetadataPanel article={article} locale={locale} className="mt-8" />
            </header>

            {article.coverImage ? (
              <figure className="mt-10 overflow-hidden rounded-xl">
                <Image
                  src={article.coverImage.src}
                  alt={article.coverImage.alt}
                  width={article.coverImage.width}
                  height={article.coverImage.height}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="h-auto w-full"
                  priority
                  unoptimized
                />
              </figure>
            ) : null}
          </div>

          <div className="mx-auto mt-10 max-w-[var(--width-article)] sm:mt-14">
            <ArticleBody content={article.body} locale={locale} />

            <div className="mt-14 space-y-12 border-t border-border pt-10">
              <RelatedConcepts
                concepts={article.relatedConcepts}
                locale={locale}
              />
              <ReferenceList references={article.references} locale={locale} />
            </div>

            <footer className="type-meta mt-12 border-t border-border pt-7 text-muted">
              <p>
                {locale === 'th' ? 'เผยแพร่ครั้งแรก' : 'First published'}{' '}
                {formattedPublishedAt}
                {article.updatedAt !== article.publishedAt
                  ? ` · ${locale === 'th' ? 'แก้ไขล่าสุด' : 'Updated'} ${formattedUpdatedAt}`
                  : ''}
              </p>
            </footer>

            <ArticleEndCTA locale={locale} />
          </div>

          {relatedArticles.length > 0 ? (
            <aside className="mx-auto mt-16 max-w-5xl border-t border-border pt-10">
              <h2 className="type-section-title text-text">
                {locale === 'th' ? 'อ่านต่อ' : 'Continue reading'}
              </h2>
              <div className="mt-4 grid gap-x-8 md:grid-cols-2">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard
                    key={relatedArticle.slug}
                    article={relatedArticle}
                    locale={locale}
                    headingLevel="h3"
                  />
                ))}
              </div>
            </aside>
          ) : null}
        </article>
      </Container>

      <StickyServiceCTA locale={locale} />
    </>
  );
}

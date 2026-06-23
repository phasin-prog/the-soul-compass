import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ConceptCard } from '@/components/concepts/ConceptCard';
import { getArticlesByCategory } from '@/lib/articles';
import { getConceptsByCategory } from '@/lib/concepts';
import type { Category } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';

interface CategoryPageProps {
  category: Category;
  locale: Locale;
  children?: ReactNode;
}

export async function CategoryPage({
  category,
  locale,
  children,
}: CategoryPageProps) {
  const [articles, concepts] = await Promise.all([
    getArticlesByCategory(locale, category.id),
    getConceptsByCategory(locale, category.id),
  ]);
  const copy =
    locale === 'th'
      ? {
          archive: 'แฟ้มความรู้',
          articles: 'บทความ',
          concepts: 'แนวคิด',
          latestArticles: 'บทความในหมวดนี้',
          conceptIndex: 'ดัชนีแนวคิด',
          allArticles: 'ดูบทความทั้งหมด',
          allConcepts: 'ดูแนวคิดทั้งหมด',
          noArticles: 'ยังไม่มีบทความที่เผยแพร่ในหมวดนี้',
          noConcepts: 'ยังไม่มีแนวคิดที่เผยแพร่ในหมวดนี้',
        }
      : {
          archive: 'Knowledge file',
          articles: 'articles',
          concepts: 'concepts',
          latestArticles: 'Essays in this field',
          conceptIndex: 'Concept index',
          allArticles: 'View all articles',
          allConcepts: 'View all concepts',
          noArticles: 'No published articles in this field yet.',
          noConcepts: 'No published concepts in this field yet.',
        };

  return (
    <div className="container mx-auto px-5 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-8 border-b border-border pb-10 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="max-w-4xl">
            <p className="type-meta text-accent">{copy.archive}</p>
            <div
              aria-hidden="true"
              className="mt-5 h-px w-16"
              style={{ backgroundColor: category.color }}
            />
            <h1 className="type-page-title mt-6 text-text">
              {category.name[locale]}
            </h1>
            <p className="type-lead mt-5 max-w-3xl text-text-soft">
              {category.description[locale]}
            </p>
          </div>
          <dl className="grid grid-cols-2 border-y border-border text-center lg:grid-cols-1 lg:text-left">
            <div className="py-4 lg:flex lg:items-baseline lg:justify-between">
              <dt className="type-meta text-muted">{copy.articles}</dt>
              <dd className="font-serif text-2xl text-text">{articles.length}</dd>
            </div>
            <div className="border-l border-border py-4 lg:flex lg:items-baseline lg:justify-between lg:border-t lg:border-l-0">
              <dt className="type-meta text-muted">{copy.concepts}</dt>
              <dd className="font-serif text-2xl text-text">{concepts.length}</dd>
            </div>
          </dl>
        </header>

        {children ? <div className="mt-10">{children}</div> : null}

        <section className="mt-14 sm:mt-18" aria-labelledby="category-articles">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
            <h2 id="category-articles" className="type-section-title text-text">
              {copy.latestArticles}
            </h2>
            <Link
              href={`/${locale}/articles?category=${category.id}`}
              className="flex min-h-11 items-center text-sm font-medium text-accent hover:text-accent-strong"
            >
              {copy.allArticles} →
            </Link>
          </div>
          {articles.length > 0 ? (
            <div className="grid gap-x-8 md:grid-cols-2">
              {articles.slice(0, 4).map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={locale}
                  headingLevel="h3"
                />
              ))}
            </div>
          ) : (
            <p className="border-b border-border py-8 text-muted">
              {copy.noArticles}
            </p>
          )}
        </section>

        <section className="mt-14 sm:mt-18" aria-labelledby="category-concepts">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
            <h2 id="category-concepts" className="type-section-title text-text">
              {copy.conceptIndex}
            </h2>
            <Link
              href={`/${locale}/concepts?category=${category.id}`}
              className="flex min-h-11 items-center text-sm font-medium text-accent hover:text-accent-strong"
            >
              {copy.allConcepts} →
            </Link>
          </div>
          {concepts.length > 0 ? (
            <div className="border-b border-border">
              {concepts.slice(0, 8).map((concept) => (
                <ConceptCard
                  key={concept.slug}
                  concept={concept}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <p className="border-b border-border py-8 text-muted">
              {copy.noConcepts}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

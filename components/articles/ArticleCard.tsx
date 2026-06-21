import Link from 'next/link';
import { categories } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import type { ArticleSummary } from '@/types/article';

interface ArticleCardProps {
  article: ArticleSummary;
  locale: Locale;
  featured?: boolean;
}

const difficultyLabels = {
  th: {
    beginner: 'เริ่มต้น',
    intermediate: 'ระดับกลาง',
    advanced: 'ระดับลึก',
  },
  en: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  },
} as const;

export function ArticleCard({
  article,
  locale,
  featured = false,
}: ArticleCardProps) {
  const category = categories[article.category];
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    locale === 'th' ? 'th-TH' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );

  return (
    <article
      className={
        featured
          ? 'border-y border-border py-8 md:col-span-2 md:py-10'
          : 'border-t border-border py-7'
      }
    >
      <Link
        href={`/${locale}/articles/${article.slug}`}
        className="group block h-full rounded-sm focus-visible:outline-offset-8"
      >
        <div
          className={
            featured
              ? 'grid gap-7 md:grid-cols-[minmax(0,1.45fr)_minmax(15rem,0.55fr)] md:items-end'
              : 'flex h-full flex-col'
          }
        >
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                className="inline-flex min-h-8 items-center rounded-full border px-3 text-sm"
                style={{
                  borderColor: `color-mix(in oklch, ${category.color} 45%, transparent)`,
                  color: category.color,
                }}
              >
                {category.name[locale]}
              </span>
              <span className="type-meta text-muted">
                {difficultyLabels[locale][article.difficulty]}
              </span>
            </div>

            <h2
              className={
                featured
                  ? 'type-page-title max-w-4xl text-text transition-colors duration-200 group-hover:text-accent'
                  : 'type-section-title text-text transition-colors duration-200 group-hover:text-accent'
              }
            >
              {article.title}
            </h2>

            {article.subtitle ? (
              <p
                className={
                  featured
                    ? 'mt-4 max-w-3xl text-lg leading-8 text-text-soft'
                    : 'mt-3 line-clamp-2 text-text-soft'
                }
              >
                {article.subtitle}
              </p>
            ) : null}

            <p
              className={
                featured
                  ? 'mt-5 max-w-3xl text-muted'
                  : 'mt-4 line-clamp-3 text-muted'
              }
            >
              {article.excerpt}
            </p>
          </div>

          <div
            className={
              featured
                ? 'border-t border-border pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-7'
                : 'mt-auto pt-6'
            }
          >
            <div className="type-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <time dateTime={article.publishedAt}>{formattedDate}</time>
              <span aria-hidden="true">·</span>
              <span>
                {article.readingTime}{' '}
                {locale === 'th' ? 'นาที' : 'min read'}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
              {article.tags.slice(0, featured ? 5 : 3).map((tag) => (
                <span key={tag} className="type-meta text-faint">
                  #{tag}
                </span>
              ))}
            </div>

            <span className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-accent">
              {locale === 'th' ? 'อ่านบทความ' : 'Read article'}
              <span
                aria-hidden="true"
                className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

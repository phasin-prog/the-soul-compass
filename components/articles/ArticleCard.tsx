import Link from 'next/link';
import { SoulIcon } from '@/components/icons/SoulIcon';
import { categories } from '@/lib/content/categories';
import { formatDate, getDifficultyLabel } from '@/lib/format';
import type { Locale } from '@/lib/site';
import type { ArticleSummary } from '@/types/article';

interface ArticleCardProps {
  article: ArticleSummary;
  locale: Locale;
  featured?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function ArticleCard({
  article,
  locale,
  featured = false,
  headingLevel = 'h2',
}: ArticleCardProps) {
  const category = categories[article.category];
  const formattedDate = formatDate(locale, article.publishedAt, 'short');
  const Heading = headingLevel;

  return (
    <article
      className={
        featured
          ? 'border-y border-border py-9 md:col-span-2 md:py-12'
          : 'border-b border-border py-8'
      }
    >
      <Link
        href={`/${locale}/articles/${article.slug}`}
        className="group block h-full rounded-sm focus-visible:outline-offset-8"
      >
        <div
          className={
            featured
              ? 'grid gap-8 md:grid-cols-[minmax(0,1.28fr)_minmax(16rem,0.72fr)] md:items-end'
              : 'flex h-full flex-col'
          }
        >
          <div>
            <div className="type-meta mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span
                className="font-semibold"
                style={{ color: category.color }}
              >
                {category.name[locale]}
              </span>
              <span aria-hidden="true">/</span>
              <span>
                {getDifficultyLabel(locale, article.difficulty)}
              </span>
              <span aria-hidden="true">/</span>
              <time dateTime={article.publishedAt}>{formattedDate}</time>
              <span aria-hidden="true">/</span>
              <span>
                {article.readingTime}{' '}
                {locale === 'th' ? 'นาที' : 'min read'}
              </span>
            </div>

            <Heading
              className={
                featured
                  ? 'type-page-title max-w-4xl text-text transition-colors duration-200 group-hover:text-accent'
                  : 'type-section-title text-text transition-colors duration-200 group-hover:text-accent'
              }
            >
              {article.title}
            </Heading>

            {article.subtitle ? (
              <p
                className={
                  featured
                    ? 'mt-5 max-w-3xl text-lg leading-9 text-text-soft'
                    : 'mt-3 line-clamp-2 text-text-soft'
                }
              >
                {article.subtitle}
              </p>
            ) : null}

            {!featured ? (
              <p className="mt-4 line-clamp-3 text-muted">
                {article.excerpt}
              </p>
            ) : null}
          </div>

          <div
            className={
              featured
                ? 'border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8'
                : 'mt-auto pt-6'
            }
          >
            {featured ? (
              <p className="text-base leading-8 text-muted">{article.excerpt}</p>
            ) : null}

            <span className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-accent">
              {locale === 'th' ? 'อ่านบทความ' : 'Read article'}
              <SoulIcon
                name="arrowRight"
                size={16}
                className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

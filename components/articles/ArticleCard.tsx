import Link from 'next/link';
import { SoulIcon } from '@/components/icons/SoulIcon';
import { categories } from '@/lib/content/categories';
import { categoryMetadata } from '@/lib/content/metadata-mapping';
import { ReadingLevelBadge, SourceStatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';
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
            <div className="type-meta mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span
                className="inline-flex items-center gap-1.5 font-serif text-sm font-semibold tracking-wide"
                style={{ color: category.color }}
              >
                <SoulIcon
                  name={categoryMetadata[article.category]?.icon || 'compass'}
                  size={14}
                  className="shrink-0"
                />
                <span>{category.name[locale]}</span>
              </span>
              <span aria-hidden="true" className="text-border/60">/</span>
              <time dateTime={article.publishedAt}>{formattedDate}</time>
              <span aria-hidden="true" className="text-border/60">/</span>
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
                    ? 'mt-4 max-w-3xl text-lg leading-8 text-text-soft'
                    : 'mt-2.5 line-clamp-2 text-text-soft'
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

            {/* Reading Level, Source Status, and Tags */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <ReadingLevelBadge level={article.difficulty} locale={locale} />
              {article.sourceStatus && (
                <SourceStatusBadge status={article.sourceStatus} locale={locale} />
              )}
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="type-meta text-xs rounded-full bg-surface border border-border/40 px-2.5 py-0.5 text-muted transition-colors duration-200 group-hover:border-accent/20"
                >
                  #{tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="type-meta text-xs text-muted font-medium ml-1">
                  +{article.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          <div
            className={
              featured
                ? 'border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8'
                : 'mt-auto pt-5'
            }
          >
            {featured ? (
              <p className="text-base leading-8 text-muted">{article.excerpt}</p>
            ) : null}

            <span className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-accent">
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

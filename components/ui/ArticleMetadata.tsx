import Link from 'next/link';
import type { Locale } from '@/lib/site';
import type { Article } from '@/types/article';
import { CategoryBadge } from './CategoryBadge';
import { ReadingLevelBadge, SourceStatusBadge } from './Badge';
import { formatDate } from '@/lib/format';
import { SoulIcon } from '@/components/icons/SoulIcon';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

interface ArticleMetadataProps {
  article: Article;
  locale: Locale;
  className?: string;
}

export function ArticleMetadataRow({
  article,
  locale,
  className = '',
}: ArticleMetadataProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 text-text-soft ${className}`}>
      <CategoryBadge category={article.category} locale={locale} />
      <ReadingLevelBadge level={article.difficulty} locale={locale} />
      {article.sourceStatus && (
        <SourceStatusBadge status={article.sourceStatus} locale={locale} />
      )}
    </div>
  );
}

export function ArticleMetadataPanel({
  article,
  locale,
  className = '',
}: ArticleMetadataProps) {
  const formattedPublished = formatDate(locale, article.publishedAt, 'long');
  const formattedUpdated = formatDate(locale, article.updatedAt, 'long');
  const otherLocale: Locale = locale === 'th' ? 'en' : 'th';
  const translatedSlug = article.translations[otherLocale];

  return (
    <div className={`my-8 border border-border bg-surface/50 rounded-xl p-6 sm:p-8 backdrop-blur-[2px] transition-all duration-300 hover:border-accent/20 ${className}`}>
      {/* Top badges row */}
      <div className="flex flex-wrap items-center gap-3">
        <CategoryBadge category={article.category} locale={locale} />
        <ReadingLevelBadge level={article.difficulty} locale={locale} />
        {article.sourceStatus && (
          <SourceStatusBadge status={article.sourceStatus} locale={locale} />
        )}
      </div>

      <div className="mt-6 grid gap-6 border-t border-border/60 pt-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tradition / School */}
        <div className="space-y-1">
          <span className="type-meta text-muted block text-xs tracking-wider uppercase font-semibold">
            {locale === 'th' ? 'สำนัก / กรอบทฤษฎี' : 'Tradition / School'}
          </span>
          <span className="font-serif text-sm text-text-soft">
            {article.school}
          </span>
        </div>

        {/* Author / Reading Time */}
        <div className="space-y-1">
          <span className="type-meta text-muted block text-xs tracking-wider uppercase font-semibold">
            {locale === 'th' ? 'ข้อมูลผู้เขียน & เวลาอ่าน' : 'Author & Read Time'}
          </span>
          <div className="font-serif text-sm text-text-soft flex items-center gap-1.5">
            <span>{article.author}</span>
            <span className="text-muted">·</span>
            <span>
              {article.readingTime} {locale === 'th' ? 'นาที' : 'min read'}
            </span>
          </div>
        </div>

        {/* Date Published / Modified */}
        <div className="space-y-1">
          <span className="type-meta text-muted block text-xs tracking-wider uppercase font-semibold">
            {locale === 'th' ? 'วันเผยแพร่ & อัปเดต' : 'Dates'}
          </span>
          <div className="font-serif text-xs text-text-soft space-y-0.5">
            <div>
              <span className="text-muted">{locale === 'th' ? 'เผยแพร่: ' : 'Published: '}</span>
              <time dateTime={article.publishedAt}>{formattedPublished}</time>
            </div>
            {article.updatedAt !== article.publishedAt && (
              <div>
                <span className="text-muted">{locale === 'th' ? 'ปรับปรุง: ' : 'Updated: '}</span>
                <time dateTime={article.updatedAt}>{formattedUpdated}</time>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tags section */}
      {article.tags.length > 0 && (
        <div className="mt-6 border-t border-border/60 pt-5">
          <span className="type-meta text-muted block text-xs tracking-wider uppercase font-semibold mb-2">
            {locale === 'th' ? 'แนวคิดย่อย' : 'Tags'}
          </span>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/${locale}/articles?tag=${encodeURIComponent(tag)}`}
                className="type-meta text-[0.8125rem] rounded-full bg-surface-raised border border-border/60 px-3 py-1 text-text-soft transition-all duration-300 hover:border-accent/40 hover:bg-surface-soft hover:text-accent"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Action / Translations row */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5">
        <BookmarkButton
          locale={locale}
          targetSlug={article.slug}
          targetType="article"
        />

        {translatedSlug && (
          <Link
            href={`/${otherLocale}/articles/${translatedSlug}`}
            className="inline-flex min-h-10 items-center gap-1.5 text-xs font-serif font-medium text-accent hover:text-accent-strong transition-colors duration-200"
            hrefLang={otherLocale}
          >
            <SoulIcon name="language" size={14} />
            <span>
              {locale === 'th'
                ? 'Read this article in English'
                : 'อ่านบทความนี้เป็นภาษาไทย'}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

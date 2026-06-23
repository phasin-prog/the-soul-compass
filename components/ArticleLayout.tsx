import type { ReactNode } from 'react';
import { Badge } from './ui/Badge';
import { ReadingProgress } from './ReadingProgress';
import { Breadcrumbs } from './Breadcrumbs';
import { getT } from '@/lib/i18n';

interface ArticleLayoutProps {
  children: ReactNode;
  title: string;
  category: string;
  categoryColor: string;
  publishedAt: string;
  readingTime: number;
  locale: 'th' | 'en';
  categorySlug?: string;
}

export function ArticleLayout({
  children,
  title,
  category,
  categoryColor,
  publishedAt,
  readingTime,
  locale,
  categorySlug,
}: ArticleLayoutProps) {
  const date = new Date(publishedAt);
  const formattedDate = date.toLocaleDateString(
    locale === 'th' ? 'th-TH' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
  const t = getT(locale);

  // Build breadcrumbs
  const breadcrumbItems = [
    { label: t.nav.articles, href: `/${locale}/articles` },
  ];

  if (categorySlug) {
    breadcrumbItems.push({
      label: category,
      href: `/${locale}/${categorySlug}`,
    });
  }

  breadcrumbItems.push({ label: title, href: '' });

  return (
    <>
      <ReadingProgress locale={locale} />
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} locale={locale} />

          {/* Article Header */}
          <header className="mb-12">
            <div
              className="w-16 h-1 rounded-full mb-6"
              style={{ backgroundColor: categoryColor }}
            />
            <Badge variant="accent" className="mb-4">
              {category}
            </Badge>
            <h1 className="type-page-title mb-6 text-text">
              {title}
            </h1>
            <div className="type-meta flex flex-wrap items-center gap-4 text-muted">
              <time dateTime={publishedAt}>{formattedDate}</time>
              <span>·</span>
              <span>
                {readingTime} {locale === 'th' ? 'นาที' : 'min read'}
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose-reading">
            {children}
          </div>

          {/* Article Footer */}
          <footer className="mt-16 border-t border-border pt-8">
            <p className="type-meta text-muted">
              {locale === 'th'
                ? "บทความนี้เป็นส่วนหนึ่งของ The Soul's Compass — พื้นที่สำหรับศึกษาจิตใจมนุษย์อย่างจริงจัง"
                : "This article is part of The Soul's Compass — a serious knowledge platform for studying the human psyche"}
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}

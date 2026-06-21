import Link from 'next/link';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import type { Locale } from '@/lib/site';
import type { ArticleMeta } from '@/lib/content/articles';
import { categories } from '@/lib/content/categories';

interface ArticleCardProps {
  article: ArticleMeta;
  locale: Locale;
}

export function ArticleCard({ article, locale }: ArticleCardProps) {
  const category = categories[article.category];

  return (
    <Link href={`/${locale}/articles/${article.slug}`}>
      <Card hover className="h-full">
        <div className="flex flex-col gap-3">
          <Badge variant="accent">{category.name[locale]}</Badge>
          <h3 className="type-card-title text-text">
            {article.title[locale]}
          </h3>
          <p className="line-clamp-3 text-muted">
            {article.excerpt[locale]}
          </p>
          <div className="type-meta mt-auto flex items-center gap-3 pt-3 text-muted">
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString(
                locale === 'th' ? 'th-TH' : 'en-US',
                { year: 'numeric', month: 'short', day: 'numeric' }
              )}
            </time>
            <span>·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

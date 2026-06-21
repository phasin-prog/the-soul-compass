import { MarkdownContent } from '@/components/wiki/MarkdownContent';
import type { Locale } from '@/lib/site';

interface ArticleBodyProps {
  content: string;
  locale: Locale;
}

export function ArticleBody({ content, locale }: ArticleBodyProps) {
  return (
    <div className="article-body prose-reading">
      <MarkdownContent content={content} locale={locale} />
    </div>
  );
}

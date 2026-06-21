import { notFound } from 'next/navigation';
import { ArticleStudioEditor } from '@/components/studio/ArticleStudioEditor';
import { requireStudioUser } from '@/lib/auth/studio';
import { getWikiArticle, listWikiArticles } from '@/lib/r2/wiki-store';
import type { Locale } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function EditStudioArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: localeValue, id } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const userId = await requireStudioUser(locale);
  const [article, allArticles] = await Promise.all([
    getWikiArticle(userId, id),
    listWikiArticles(userId),
  ]);

  if (!article) notFound();

  const backlinks = allArticles
    .filter((candidate) =>
      candidate.outgoingLinks.some((link) => link.slug === article.slug)
    )
    .map((candidate) => ({
      id: candidate.id,
      title: candidate.title,
    }));

  return (
    <ArticleStudioEditor
      article={article}
      backlinks={backlinks}
      locale={locale}
    />
  );
}

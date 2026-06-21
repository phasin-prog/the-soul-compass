import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/site';
import { WikiEditor } from '@/components/wiki/WikiEditor';
import { requireStudioUser } from '@/lib/auth/studio';
import { getWikiArticle, listWikiArticles } from '@/lib/r2/wiki-store';
import { deleteWikiArticleAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditArticlePage({
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

  const backlinks = allArticles.filter((candidate) =>
    candidate.outgoingLinks.some((link) => link.slug === article.slug)
  );
  const deleteAction = deleteWikiArticleAction.bind(null, article.id, locale);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href={`/${locale}/studio`}
            className="inline-flex min-h-11 items-center text-sm text-muted hover:text-accent"
          >
            ← กลับไปคลังบทความ
          </Link>
          <p className="text-sm text-faint">
            R2 · {article.markdownKey}
          </p>
        </div>
        {article.status === 'published' ? (
          <Link
            href={`/${article.locale}/articles/${article.slug}`}
            target="_blank"
            className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm text-text-soft hover:border-accent hover:text-accent"
          >
            เปิดหน้าบทความ ↗
          </Link>
        ) : null}
      </div>

      <WikiEditor article={article} locale={locale} />

      <div className="mt-10 grid gap-8 border-t border-border pt-8 lg:grid-cols-[1fr_auto]">
        <section>
          <h2 className="text-lg font-semibold text-text">Backlinks</h2>
          {backlinks.length === 0 ? (
            <p className="mt-2 text-sm text-muted">
              ยังไม่มีบทความอื่นเชื่อมมาที่โน้ตนี้
            </p>
          ) : (
            <ul className="mt-3 flex flex-wrap gap-2">
              {backlinks.map((backlink) => (
                <li key={backlink.id}>
                  <Link
                    href={`/${locale}/studio/${backlink.id}`}
                    className="inline-flex min-h-10 items-center rounded-full bg-surface-raised px-4 text-sm text-text-soft hover:text-accent"
                  >
                    {backlink.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <form action={deleteAction}>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-md border border-clay/45 px-4 text-sm text-clay hover:bg-clay/10"
          >
            ลบบทความ
          </button>
        </form>
      </div>
    </div>
  );
}

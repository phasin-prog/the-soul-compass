import Link from 'next/link';
import { requireStudioUser } from '@/lib/auth/studio';
import { formatDate } from '@/lib/format';
import { parseLocale } from '@/lib/locale';
import { listWikiArticles } from '@/lib/r2/wiki-store';

export const dynamic = 'force-dynamic';

const statusLabels = {
  draft: 'ฉบับร่าง',
  review: 'ตรวจทาน',
  published: 'เผยแพร่',
  archived: 'เก็บถาวร',
} as const;

export default async function StudioArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale = parseLocale(localeValue);
  const userId = await requireStudioUser(locale);
  const articles = await listWikiArticles(userId);
  const counts = {
    published: articles.filter((article) => article.status === 'published')
      .length,
    review: articles.filter((article) => article.status === 'review').length,
    draft: articles.filter((article) => article.status === 'draft').length,
    archived: articles.filter((article) => article.status === 'archived')
      .length,
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <header className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-3xl font-medium tracking-[-0.025em] text-text">
            บทความใน Studio
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            เริ่มจากการเขียน แล้วค่อยจัดระเบียบและเผยแพร่เมื่อเนื้อหาพร้อม
          </p>
        </div>
        <Link
          href={`/${locale}/studio/articles/new`}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong"
        >
          สร้างบทความ
        </Link>
      </header>

      <dl className="mb-8 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-4 text-sm">
        <div className="flex gap-2">
          <dt className="text-muted">ทั้งหมด</dt>
          <dd className="font-semibold text-text">{articles.length}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">เผยแพร่</dt>
          <dd className="font-semibold text-celadon">{counts.published}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">ตรวจทาน</dt>
          <dd className="font-semibold text-clay">{counts.review}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">ฉบับร่าง</dt>
          <dd className="font-semibold text-accent">{counts.draft}</dd>
        </div>
        {counts.archived > 0 ? (
          <div className="flex gap-2">
            <dt className="text-muted">เก็บถาวร</dt>
            <dd className="font-semibold text-text-soft">{counts.archived}</dd>
          </div>
        ) : null}
      </dl>

      {articles.length === 0 ? (
        <div className="max-w-2xl border-y border-border py-12">
          <h2 className="text-xl font-medium text-text">
            ยังไม่มีบทความ
          </h2>
          <p className="mt-3 text-muted">
            เริ่มจากการสร้างบทความแรก
          </p>
          <Link
            href={`/${locale}/studio/articles/new`}
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-ink hover:bg-accent-strong"
          >
            สร้างฉบับร่างแรก
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {articles.map((article) => (
            <article
              key={article.id}
              className="grid gap-3 py-5 transition-colors duration-200 hover:bg-surface/45 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-3"
            >
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`rounded-full px-2.5 py-1 font-medium ${
                      article.status === 'published'
                        ? 'bg-celadon/12 text-celadon'
                        : article.status === 'review'
                          ? 'bg-clay/12 text-clay'
                          : article.status === 'archived'
                            ? 'bg-surface-soft text-muted'
                            : 'bg-accent-soft text-accent'
                    }`}
                  >
                    {statusLabels[article.status]}
                  </span>
                  <span className="text-muted">
                    {article.locale.toUpperCase()}
                  </span>
                  <span className="text-faint">/{article.slug}</span>
                </div>
                <h2 className="truncate text-lg font-medium text-text">
                  <Link
                    href={`/${locale}/studio/articles/${article.id}/edit`}
                    className="hover:text-accent"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-1 line-clamp-2 max-w-3xl text-sm text-muted">
                  {article.excerpt || 'ยังไม่มีคำโปรย'}
                </p>
              </div>
              <div className="flex items-center gap-5 text-sm text-muted sm:text-right">
                <span>{article.outgoingLinks.length} links</span>
                <time dateTime={article.updatedAt}>
                  {formatDate(locale, article.updatedAt, 'short')}
                </time>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

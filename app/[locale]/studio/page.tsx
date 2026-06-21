import Link from 'next/link';
import type { Locale } from '@/lib/site';
import { requireStudioUser } from '@/lib/auth/studio';
import { listWikiArticles } from '@/lib/r2/wiki-store';

export const dynamic = 'force-dynamic';

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const userId = await requireStudioUser(locale);
  const articles = await listWikiArticles(userId);
  const publishedCount = articles.filter(
    (article) => article.status === 'published'
  ).length;
  const reviewCount = articles.filter(
    (article) => article.status === 'review'
  ).length;
  const draftCount = articles.filter(
    (article) => article.status === 'draft'
  ).length;
  const linkedSlugs = new Set(
    articles.flatMap((article) => article.outgoingLinks.map((link) => link.slug))
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <header className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.025em] text-text">
            คลังบทความ
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            ต้นฉบับทั้งหมดอยู่ใน R2 แบบ private และจะถูกเพิ่มเข้า Supabase
            เมื่อคุณเลือกสถานะเผยแพร่
          </p>
        </div>
        <Link
          href={`/${locale}/studio/new`}
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
          <dd className="font-semibold text-celadon">{publishedCount}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">ตรวจทาน</dt>
          <dd className="font-semibold text-clay">{reviewCount}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">ฉบับร่าง</dt>
          <dd className="font-semibold text-accent">
            {draftCount}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">โน้ตที่ถูกอ้างถึง</dt>
          <dd className="font-semibold text-text">{linkedSlugs.size}</dd>
        </div>
      </dl>

      {articles.length === 0 ? (
        <div className="max-w-2xl rounded-xl bg-surface p-8">
          <h2 className="text-xl font-semibold text-text">เริ่มจากโน้ตหนึ่งใบ</h2>
          <p className="mt-3 text-muted">
            เขียนความคิดหนึ่งเรื่อง แล้วใช้ <code className="text-celadon">{'[[wiki link]]'}</code>{' '}
            เชื่อมไปยังเรื่องถัดไป ระบบจะเก็บ backlinks ให้คุณอัตโนมัติ
          </p>
          <Link
            href={`/${locale}/studio/new`}
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-ink hover:bg-accent-strong"
          >
            สร้างฉบับร่างแรก
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {articles.map((article) => {
            const backlinks = articles.filter((candidate) =>
              candidate.outgoingLinks.some((link) => link.slug === article.slug)
            ).length;

            return (
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
                            : 'bg-accent-soft text-accent'
                      }`}
                    >
                      {article.status === 'published'
                        ? 'เผยแพร่'
                        : article.status === 'review'
                          ? 'ตรวจทาน'
                          : 'ฉบับร่าง'}
                    </span>
                    <span className="text-muted">{article.locale.toUpperCase()}</span>
                    <span className="text-faint">/{article.slug}</span>
                  </div>
                  <h2 className="truncate text-lg font-semibold text-text">
                    <Link
                      href={`/${locale}/studio/${article.id}`}
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
                  <span>{backlinks} backlinks</span>
                  <time dateTime={article.updatedAt}>
                    {new Date(article.updatedAt).toLocaleDateString(
                      locale === 'th' ? 'th-TH' : 'en-US'
                    )}
                  </time>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

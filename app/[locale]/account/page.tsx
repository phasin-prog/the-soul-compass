import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { isEditor, isSupporter, roleLabels } from '@/lib/roles';
import type { Locale } from '@/lib/site';

export default async function AccountPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ notice?: string }>;
}) {
  const [{ locale: localeValue }, query, user] = await Promise.all([
    params,
    searchParams,
    getCurrentUser(),
  ]);
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';

  if (!user) return null;

  const collections = [
    {
      href: `/${locale}/account/bookmarks`,
      title: locale === 'th' ? 'บทความที่บันทึก' : 'Bookmarked articles',
      description:
        locale === 'th'
          ? 'เก็บบทความสำหรับกลับมาอ่าน ทบทวน หรือใช้เป็นเส้นทางศึกษาต่อ'
          : 'Keep articles for return visits, review, and longer study paths.',
    },
    {
      href: `/${locale}/account/saved-concepts`,
      title: locale === 'th' ? 'แนวคิดที่บันทึก' : 'Saved concepts',
      description:
        locale === 'th'
          ? 'รวบรวมโหนดแนวคิดที่ต้องการเปรียบเทียบหรือเชื่อมเข้าด้วยกัน'
          : 'Collect concept nodes you want to compare and connect.',
    },
    {
      href: `/${locale}/account/reading-history`,
      title: locale === 'th' ? 'ประวัติการอ่าน' : 'Reading history',
      description:
        locale === 'th'
          ? 'กลับไปยังบทความที่อ่านค้างไว้ โดยไม่ใช้คะแนนหรือระบบแข่งขัน'
          : 'Return to unfinished reading without scores or competitive mechanics.',
    },
  ];

  return (
    <div>
      {query.notice === 'editor-access-required' ? (
        <div className="mb-8 border-y border-clay/50 bg-clay/8 py-4 text-sm leading-6 text-text-soft">
          {locale === 'th'
            ? 'พื้นที่บรรณาธิการเปิดเฉพาะบัญชีที่มีบทบาท Editor หรือ Admin'
            : 'The editorial area is available only to Editor and Admin accounts.'}
        </div>
      ) : null}

      <section aria-labelledby="account-overview-title">
        <p className="type-meta text-muted">
          {locale === 'th' ? 'สถานะบัญชี' : 'Account status'}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 id="account-overview-title" className="type-section-title text-text">
            {roleLabels[user.role][locale]}
          </h2>
          {isSupporter(user.role) ? (
            <span className="rounded-full border border-accent/45 bg-accent-soft px-3 py-1 text-sm text-accent">
              {locale === 'th' ? 'ผู้สนับสนุน' : 'Supporter'}
            </span>
          ) : null}
        </div>
        <p className="mt-4 max-w-2xl text-text-soft">
          {locale === 'th'
            ? 'ระบบสมาชิกอยู่ในระยะวางรากฐาน บัญชีของคุณพร้อมสำหรับการเชื่อมการบันทึกและความคืบหน้ากับฐานข้อมูลโดยไม่จำกัดการอ่านสาธารณะ'
            : 'The member system is in its foundation phase. Your account is ready for database-backed collections and progress without restricting public reading.'}
        </p>
      </section>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {collections.map((collection) => (
          <Link
            key={collection.href}
            href={collection.href}
            className="group grid min-h-28 gap-2 py-5 transition-colors hover:bg-surface/40 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-4"
          >
            <div>
              <h2 className="type-card-title text-text group-hover:text-accent">
                {collection.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                {collection.description}
              </p>
            </div>
            <span className="text-accent" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>

      {isEditor(user.role) ? (
        <aside className="mt-10 border-y border-border py-6">
          <p className="type-meta text-muted">
            {locale === 'th' ? 'สิทธิ์บรรณาธิการ' : 'Editorial access'}
          </p>
          <h2 className="type-card-title mt-2 text-text">
            {locale === 'th'
              ? 'จัดการบทความและแนวคิด'
              : 'Manage articles and concepts'}
          </h2>
          <Link
            href={`/${locale}/admin`}
            className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4"
          >
            {locale === 'th' ? 'เปิดพื้นที่บรรณาธิการ' : 'Open editorial area'}
          </Link>
        </aside>
      ) : null}
    </div>
  );
}

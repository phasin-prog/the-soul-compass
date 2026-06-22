import Link from 'next/link';
import type { Locale } from '@/lib/site';

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const sections = [
    {
      href: `/${locale}/admin/articles`,
      title: locale === 'th' ? 'บทความ' : 'Articles',
      description:
        locale === 'th'
          ? 'สร้างฉบับร่าง ตรวจทาน metadata และส่งเนื้อหาเข้าสู่กระบวนการเผยแพร่'
          : 'Create drafts, review metadata, and move writing through publication.',
    },
    {
      href: `/${locale}/admin/concepts`,
      title: locale === 'th' ? 'แนวคิด' : 'Concepts',
      description:
        locale === 'th'
          ? 'ดูแลโหนดความรู้ ความสัมพันธ์ระหว่างแนวคิด สำนัก นักคิด และเอกสารอ้างอิง'
          : 'Maintain knowledge nodes, relations, traditions, thinkers, and references.',
    },
    {
      href: `/${locale}/admin/external-links`,
      title: locale === 'th' ? 'ลิงก์ภายนอก' : 'External links',
      description:
        locale === 'th'
          ? 'ตรวจสถานะ เพิ่ม และแก้ไของค์กรหรือแหล่งเรียนรู้ภายนอก'
          : 'Review, add, and edit external organizations and learning resources.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-3xl">
        <p className="type-meta text-accent">
          {locale === 'th' ? 'พื้นที่ทำงานภายใน' : 'Internal workspace'}
        </p>
        <h1 className="type-page-title mt-2 text-text">
          {locale === 'th' ? 'โต๊ะบรรณาธิการ' : 'Editorial desk'}
        </h1>
        <p className="type-lead mt-5 text-text-soft">
          {locale === 'th'
            ? 'พื้นที่สงบสำหรับดูแลโครงสร้างความรู้และคุณภาพการเผยแพร่ ไม่ใช่แดชบอร์ดวัดการแข่งขัน'
            : 'A quiet workspace for knowledge structure and publishing quality, not a performance dashboard.'}
        </p>
      </header>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group grid min-h-32 gap-3 py-6 transition-colors hover:bg-surface/50 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5"
          >
            <div>
              <h2 className="type-section-title text-text group-hover:text-accent">
                {section.title}
              </h2>
              <p className="mt-3 max-w-2xl text-muted">{section.description}</p>
            </div>
            <span className="text-accent" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

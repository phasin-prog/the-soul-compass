import Link from 'next/link';
import type { Locale } from '@/lib/site';

interface SeriesProgressPlaceholderProps {
  itemCount: number;
  locale: Locale;
  seriesSlug: string;
}

export function SeriesProgressPlaceholder({
  itemCount,
  locale,
  seriesSlug,
}: SeriesProgressPlaceholderProps) {
  return (
    <aside className="border-y border-border py-6">
      <p className="type-meta text-accent">
        {locale === 'th' ? 'การติดตามการอ่าน' : 'Reading progress'}
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div>
          <p className="font-medium text-text">
            {locale === 'th'
              ? `เส้นทางนี้มี ${itemCount} รายการตามลำดับ`
              : `This path contains ${itemCount} ordered items`}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            {locale === 'th'
              ? 'เนื้อหาทั้งหมดยังอ่านได้โดยไม่ต้องมีบัญชี พื้นที่สมาชิกจะใช้จัดเก็บเส้นทางอ่านเมื่อระบบบันทึกความคืบหน้าพร้อม'
              : 'All content remains public. Reader accounts will organize paths when progress storage is ready.'}
          </p>
        </div>

        <Link
          href={`/${locale}/account?redirect_url=${encodeURIComponent(`/${locale}/series/${seriesSlug}`)}`}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-border-strong px-4 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
        >
          {locale === 'th' ? 'เปิดบัญชีผู้อ่าน' : 'Open reader account'}
        </Link>
      </div>
    </aside>
  );
}

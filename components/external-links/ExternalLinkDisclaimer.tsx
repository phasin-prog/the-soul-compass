import type { Locale } from '@/lib/site';

export function ExternalLinkDisclaimer({ locale }: { locale: Locale }) {
  return (
    <aside className="border-y border-border bg-surface px-5 py-4 text-sm leading-7 text-muted">
      {locale === 'th'
        ? 'ลิงก์เหล่านี้เป็นแหล่งภายนอกสำหรับศึกษาต่อ The Soul’s Compass ไม่ได้เป็นเจ้าของหรือควบคุมเนื้อหาในเว็บไซต์เหล่านี้'
        : 'These links lead to external sources for further study. The Soul’s Compass does not own or control their content.'}
    </aside>
  );
}

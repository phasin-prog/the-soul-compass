import type { Locale } from '@/lib/site';
import type { Reference } from '@/types/reference';

interface CitationBoxProps {
  locale: Locale;
  reference: Reference;
}

export function CitationBox({ locale, reference }: CitationBoxProps) {
  return (
    <section
      aria-labelledby="reference-citation-title"
      className="border-y border-border py-8"
    >
      <p className="type-meta text-accent">
        {locale === 'th' ? 'การอ้างอิง' : 'Citation'}
      </p>
      <h2
        id="reference-citation-title"
        className="type-section-title mt-2 text-text"
      >
        {locale === 'th' ? 'ข้อความอ้างอิงขั้นต่ำ' : 'Minimal citation text'}
      </h2>
      <p className="mt-5 select-all rounded-lg border border-border bg-surface px-5 py-4 font-serif leading-8 text-text">
        {reference.citationText}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">
        {locale === 'th'
          ? 'โปรดตรวจสอบฉบับพิมพ์ ผู้แปล สำนักพิมพ์ และเลขหน้าก่อนใช้ในงานวิชาการอย่างเป็นทางการ'
          : 'Verify edition, translator, publisher, and page details before formal academic use.'}
      </p>
    </section>
  );
}

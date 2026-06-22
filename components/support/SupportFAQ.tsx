import type { Locale } from '@/lib/site';

interface SupportFAQProps {
  locale: Locale;
}

const faq = {
  th: [
    {
      question: 'บทความสาธารณะจะถูกย้ายไปอยู่หลัง paywall หรือไม่',
      answer:
        'ไม่ ระบบสนับสนุนมีเป้าหมายช่วยรักษาเนื้อหาหลักให้เข้าถึงได้ บางสิ่งในอนาคตอาจเป็นบันทึกฉบับร่างหรือวัสดุเบื้องหลัง แต่บทความและโหนดความรู้หลักยังคงเป็นสาธารณะ',
    },
    {
      question: 'ต้องมีบัญชีจึงจะสนับสนุนได้หรือไม่',
      answer:
        'ไม่จำเป็น การสนับสนุนแบบไม่ใช้บัญชีและแบบไม่เปิดเผยชื่อจะรองรับได้ เมื่อระบบชำระเงินจริงถูกเชื่อมต่อ',
    },
    {
      question: 'สิทธิประโยชน์ทั้งหมดพร้อมใช้แล้วหรือไม่',
      answer:
        'ยังไม่ทั้งหมด รายการที่ระบุว่า “ในอนาคต” เป็นทิศทางที่โครงสร้างระบบเตรียมรองรับ ไม่ใช่คำสัญญาว่าจะพร้อมทันที',
    },
    {
      question: 'การสนับสนุนใช้ขอคำปรึกษาส่วนตัวได้หรือไม่',
      answer:
        'ไม่ได้ The Soul’s Compass ไม่ได้ให้บริการบำบัด วินิจฉัย หรือคำปรึกษาทางคลินิกผ่านระบบสนับสนุน',
    },
  ],
  en: [
    {
      question: 'Will public articles move behind a paywall?',
      answer:
        'No. Support is intended to keep the core archive accessible. Future draft notes or behind-the-scenes material may differ, but the main articles and concept nodes remain public.',
    },
    {
      question: 'Will an account be required to support?',
      answer:
        'No. Guest and anonymous support can be accommodated when a real payment provider is connected.',
    },
    {
      question: 'Are all listed benefits available now?',
      answer:
        'Not yet. Anything marked as future access describes what the architecture is preparing for, not an immediate promise.',
    },
    {
      question: 'Does support include personal consultation?',
      answer:
        'No. The Soul’s Compass does not provide therapy, diagnosis, or clinical consultation through this support system.',
    },
  ],
} as const;

export function SupportFAQ({ locale }: SupportFAQProps) {
  return (
    <section aria-labelledby="support-faq-title">
      <h2 id="support-faq-title" className="type-section-title text-text">
        {locale === 'th' ? 'คำถามเกี่ยวกับการสนับสนุน' : 'Support FAQ'}
      </h2>
      <div className="mt-6 border-y border-border">
        {faq[locale].map((item) => (
          <details key={item.question} className="group border-t border-border first:border-t-0">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-text">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="text-accent transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-3xl pb-5 text-sm leading-7 text-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

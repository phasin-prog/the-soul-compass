import type { Locale } from '@/lib/site';

interface SupportDisclaimerProps {
  locale: Locale;
}

export function SupportDisclaimer({ locale }: SupportDisclaimerProps) {
  return (
    <section
      aria-labelledby="support-disclaimer-title"
      className="border-y border-clay/45 bg-clay/6 px-5 py-8 sm:px-8"
    >
      <p className="type-meta text-clay">
        {locale === 'th' ? 'ขอบเขตทางจริยธรรม' : 'Ethical boundary'}
      </p>
      <h2
        id="support-disclaimer-title"
        className="type-section-title mt-2 text-text"
      >
        {locale === 'th'
          ? 'การสนับสนุนไม่ใช่การซื้อบริการทางจิตวิทยา'
          : 'Support does not purchase psychological services'}
      </h2>
      <div className="mt-5 max-w-4xl space-y-3 text-sm leading-7 text-text-soft">
        <p>
          {locale === 'th'
            ? 'เว็บไซต์นี้ให้เนื้อหาเพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางคลินิก การวินิจฉัย การรักษา หรือการดูแลทางการแพทย์'
            : 'This website provides educational material only. It is not clinical advice, diagnosis, treatment, or medical care.'}
        </p>
        <p>
          {locale === 'th'
            ? 'เนื้อหาไม่ทดแทนการบำบัด การดูแลจากจิตแพทย์ นักจิตวิทยา หรือผู้เชี่ยวชาญสุขภาพจิต และเงินสนับสนุนไม่ได้ให้สิทธิ์รับคำปรึกษาส่วนบุคคล'
            : 'The material does not replace therapy, psychiatric care, psychology services, or other qualified mental-health support. Contributions do not entitle anyone to personal consultation.'}
        </p>
      </div>
    </section>
  );
}

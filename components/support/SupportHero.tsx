import type { Locale } from '@/lib/site';
import { SupportAction } from '@/components/support/SupportAction';

interface SupportHeroProps {
  locale: Locale;
}

export function SupportHero({ locale }: SupportHeroProps) {
  return (
    <header className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:pb-16">
      <div className="max-w-4xl">
        <p className="type-meta text-accent">
          {locale === 'th'
            ? 'คลังความรู้อิสระ'
            : 'An independent knowledge archive'}
        </p>
        <h1 className="type-page-title mt-3 text-text">
          {locale === 'th'
            ? 'สนับสนุน The Soul’s Compass'
            : 'Support The Soul’s Compass'}
        </h1>
        <p className="type-lead mt-6 text-text-soft">
          {locale === 'th'
            ? 'ช่วยให้คลังความรู้จิตวิทยาเชิงลึกและปรัชญาภาษาไทยเติบโตต่อได้'
            : 'Help an independent Thai-language archive of depth psychology and philosophy continue to grow.'}
        </p>
        <p className="mt-6 max-w-3xl text-muted">
          {locale === 'th'
            ? 'การสนับสนุนช่วยซื้อเวลาให้กับการอ่าน การเขียน การแปลศัพท์ และการตรวจเอกสารอ้างอิง ไม่ใช่การซื้อคำปรึกษาหรือคำตอบสำเร็จรูปเกี่ยวกับชีวิต'
            : 'Support buys time for reading, writing, terminology work, and reference checking. It does not purchase consultation or ready-made answers about life.'}
        </p>
      </div>

      <aside className="border-y border-accent/45 py-5">
        <p className="font-serif text-xl text-text">
          {locale === 'th'
            ? 'ความรู้หลักยังคงเปิดให้อ่าน'
            : 'Core knowledge stays public'}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          {locale === 'th'
            ? 'ระบบสนับสนุนมีไว้ช่วยรักษาคลัง ไม่ได้สร้าง paywall รอบบทความและแนวคิดสาธารณะ'
            : 'Support maintains the archive; it does not place a paywall around public articles and concepts.'}
        </p>
      </aside>

      <div className="lg:col-span-2">
        <SupportAction locale={locale} />
      </div>
    </header>
  );
}

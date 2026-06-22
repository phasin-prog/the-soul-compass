import type { Locale } from '@/lib/site';
import type { SupporterProfile } from '@/types/support';

interface SupporterWallProps {
  locale: Locale;
  supporters: SupporterProfile[];
}

export function SupporterWall({
  locale,
  supporters,
}: SupporterWallProps) {
  const visibleSupporters = supporters.filter(
    (supporter) =>
      supporter.active &&
      supporter.displayOnWall &&
      !supporter.anonymous &&
      supporter.publicName.trim().length > 0
  );

  return (
    <section aria-labelledby="supporter-wall-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="type-meta text-accent">
            {locale === 'th' ? 'ด้วยความยินยอมเท่านั้น' : 'Consent only'}
          </p>
          <h2
            id="supporter-wall-title"
            className="type-section-title mt-2 text-text"
          >
            {locale === 'th' ? 'กำแพงผู้สนับสนุน' : 'Supporter wall'}
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-6 text-muted">
          {locale === 'th'
            ? 'จะแสดงเฉพาะชื่อหรือนามแฝงของผู้ที่เลือกให้แสดงต่อสาธารณะ การสนับสนุนแบบไม่เปิดเผยชื่อได้รับการเคารพเท่าเทียมกัน'
            : 'Only opted-in public names or aliases appear here. Anonymous support is respected equally.'}
        </p>
      </div>

      {visibleSupporters.length > 0 ? (
        <ul className="mt-7 grid gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {visibleSupporters.map((supporter) => (
            <li key={supporter.userId} className="bg-background px-5 py-4">
              <p className="font-medium text-text">{supporter.publicName}</p>
              {supporter.message ? (
                <p className="mt-2 text-sm leading-6 text-muted">
                  {supporter.message}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-7 border-y border-border py-8">
          <p className="max-w-2xl text-text-soft">
            {locale === 'th'
              ? 'พื้นที่นี้ยังไม่มีรายชื่อสาธารณะ เราจะไม่สร้างรายชื่อจำลองและจะเพิ่มชื่อเมื่อมีผู้สนับสนุนจริงที่ให้ความยินยอมแล้วเท่านั้น'
              : 'There are no public names yet. We will not invent a supporter list; names will appear only after real, explicit consent.'}
          </p>
        </div>
      )}
    </section>
  );
}

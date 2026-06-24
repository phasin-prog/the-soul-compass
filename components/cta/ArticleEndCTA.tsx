import { SoulIcon } from '@/components/icons/SoulIcon';
import type { Locale } from '@/lib/site';

interface ArticleEndCTAProps {
  locale: Locale;
}

const copy = {
  th: {
    title: 'สนใจให้ช่วยอ่านโครงสร้างจิตของคุณไหม?',
    description:
      'บริการ Jungian Type Analysis ช่วยสำรวจรูปแบบการรับรู้ บุคลิก เงา และทิศทางการเติบโตของคุณอย่างเป็นระบบ',
    linkLabel: 'อ่านรายละเอียดบริการ',
  },
  en: {
    title: 'Interested in understanding your psychic structure?',
    description:
      'Jungian Type Analysis helps you explore perception patterns, personality, shadow, and your growth direction systematically.',
    linkLabel: 'Read service details',
  },
} as const;

export function ArticleEndCTA({ locale }: ArticleEndCTAProps) {
  const t = copy[locale];
  const serviceHref = `/${locale}/support`;

  return (
    <div className="mt-12 border-t border-border pt-10">
      <div className="flex items-start gap-4">
        <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent-soft text-accent">
          <SoulIcon name="compass" size={18} />
        </span>
        <div>
          <h3 className="text-lg font-medium text-text">{t.title}</h3>
          <p className="mt-2 max-w-lg text-sm leading-7 text-text-soft">
            {t.description}
          </p>
          <a
            href={serviceHref}
            className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
          >
            {t.linkLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

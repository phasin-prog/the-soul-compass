'use client';

import Link from 'next/link';
import { SoulIcon } from '@/components/icons/SoulIcon';
import type { Locale } from '@/lib/site';

interface ServiceCTAProps {
  locale: Locale;
  variant?: 'inline' | 'card' | 'compact';
  className?: string;
}

const copy = {
  th: {
    title: 'สนใจให้ช่วยอ่านโครงสร้างจิตของคุณไหม?',
    description:
      'บริการ Jungian Type Analysis ช่วยสำรวจรูปแบบการรับรู้ บุคลิก เงา และทิศทางการเติบโตของคุณอย่างเป็นระบบ',
    primaryLabel: 'ติดต่อรับบริการ',
    secondaryLabel: 'อ่านรายละเอียดบริการ',
  },
  en: {
    title: 'Interested in understanding your psychic structure?',
    description:
      'Jungian Type Analysis helps you explore perception patterns, personality, shadow, and your growth direction systematically.',
    primaryLabel: 'Contact for service',
    secondaryLabel: 'Read service details',
  },
} as const;

export function ServiceCTA({
  locale,
  variant = 'card',
  className = '',
}: ServiceCTAProps) {
  const t = copy[locale];
  const serviceHref = `/${locale}/support`;

  if (variant === 'compact') {
    return (
      <div
        className={`flex items-center gap-4 rounded-lg border border-accent/20 bg-surface px-5 py-4 ${className}`}
      >
        <SoulIcon name="compass" size={20} className="shrink-0 text-accent" />
        <span className="text-sm text-text-soft">{t.title}</span>
        <Link
          href={serviceHref}
          className="ml-auto shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-colors duration-200 hover:bg-accent-strong"
        >
          {t.primaryLabel}
        </Link>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={`border-y border-border bg-surface px-5 py-10 sm:px-8 ${className}`}
      >
        <div className="mx-auto max-w-3xl text-center">
          <SoulIcon
            name="compass"
            size={28}
            className="mx-auto mb-4 text-accent"
          />
          <h3 className="type-section-title text-text">{t.title}</h3>
          <p className="type-lead mx-auto mt-4 max-w-xl text-text-soft">
            {t.description}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={serviceHref}
              className="inline-flex min-h-12 items-center rounded-md bg-accent px-6 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong"
            >
              {t.primaryLabel}
            </Link>
            <Link
              href={serviceHref}
              className="inline-flex min-h-12 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
            >
              {t.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 ${className}`}
    >
      <div className="relative overflow-hidden rounded-xl border border-accent/20 bg-surface">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        <div className="relative px-6 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <SoulIcon
              name="compass"
              size={32}
              className="mx-auto mb-5 text-accent"
            />
            <h3 className="type-section-title text-text">{t.title}</h3>
            <p className="type-lead mx-auto mt-4 max-w-xl text-text-soft">
              {t.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={serviceHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-7 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong"
              >
                <SoulIcon name="compass" size={16} />
                {t.primaryLabel}
              </Link>
              <Link
                href={serviceHref}
                className="inline-flex min-h-12 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
              >
                {t.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

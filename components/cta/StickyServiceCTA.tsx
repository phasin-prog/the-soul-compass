'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SoulIcon } from '@/components/icons/SoulIcon';
import type { Locale } from '@/lib/site';

interface StickyServiceCTAProps {
  locale: Locale;
}

const copy = {
  th: {
    label: 'สนใจรับบริการวิเคราะห์บุคลิก?',
    buttonLabel: 'ติดต่อ',
  },
  en: {
    label: 'Interested in type analysis?',
    buttonLabel: 'Contact',
  },
} as const;

function getInitialDismissed(): boolean {
  if (typeof window === 'undefined') return true;
  return sessionStorage.getItem('service-cta-dismissed') === 'true';
}

export function StickyServiceCTA({ locale }: StickyServiceCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(getInitialDismissed);
  const t = copy[locale];
  const serviceHref = `/${locale}/support`;

  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setIsVisible(scrollPercent > 0.15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('service-cta-dismissed', 'true');
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur-sm"
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      role="complementary"
      aria-label={t.label}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <SoulIcon name="compass" size={18} className="shrink-0 text-accent" />
          <span className="text-sm text-text-soft">{t.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={serviceHref}
            className="inline-flex min-h-10 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-ink transition-colors duration-200 hover:bg-accent-strong"
          >
            {t.buttonLabel}
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="grid size-10 place-items-center rounded-md text-muted transition-colors duration-200 hover:bg-surface-raised hover:text-text"
            aria-label="Close"
          >
            <SoulIcon name="close" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

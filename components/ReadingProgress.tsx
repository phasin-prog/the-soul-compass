'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/site';

export function ReadingProgress({ locale }: { locale: Locale }) {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      frame.current = null;
      const availableScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        availableScroll > 0 ? (window.scrollY / availableScroll) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };
    const requestUpdate = () => {
      if (frame.current === null) {
        frame.current = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      className="fixed top-16 left-0 z-40 h-0.5 w-full bg-border sm:top-18"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={locale === 'th' ? 'ความคืบหน้าการอ่าน' : 'Reading progress'}
    >
      <div
        className="h-full origin-left bg-accent transition-transform duration-150 ease-out motion-reduce:transition-none"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}

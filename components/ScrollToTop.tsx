'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/site';

export function ScrollToTop({ locale }: { locale: Locale }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const toggleVisibility = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 300);
        frame = 0;
      });
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // Initial check

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-accent text-accent-ink transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-strong sm:right-8 sm:bottom-8"
      aria-label={locale === 'th' ? 'กลับไปด้านบน' : 'Scroll to top'}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}

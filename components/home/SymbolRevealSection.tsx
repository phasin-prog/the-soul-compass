'use client';

import { ReactNode } from 'react';

export interface SymbolData {
  id: string;
  name: { th: string; en: string };
  description: { th: string; en: string };
  svg: ReactNode;
}

interface SymbolRevealSectionProps {
  symbol: SymbolData;
  locale: 'th' | 'en';
  index: number;
}

export function SymbolRevealSection({
  symbol,
  locale,
  index,
}: SymbolRevealSectionProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      data-symbol-section={symbol.id}
      className={`border-b border-border px-5 py-16 sm:px-8 md:py-24 ${
        isEven ? 'bg-surface' : 'bg-background'
      }`}
    >
      <div
        className={`mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 ${
          isEven ? '' : 'lg:[direction:rtl]'
        }`}
      >
        <div className="symbol-text reveal-text" data-speed="0.8">
          <p className="type-meta mb-3 text-accent">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="type-section-title text-text">
            {symbol.name[locale]}
          </h3>
          <p className="type-lead mt-4 max-w-lg text-text-soft">
            {symbol.description[locale]}
          </p>
        </div>

        <div className="flex justify-center lg:[direction:ltr]">
          <div
            className="symbol-glyph reveal-symbol"
            data-speed="1.2"
            aria-hidden="true"
          >
            {symbol.svg}
          </div>
        </div>
      </div>
    </section>
  );
}

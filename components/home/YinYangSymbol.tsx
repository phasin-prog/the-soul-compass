'use client';

interface YinYangSymbolProps {
  className?: string;
}

export function YinYangSymbol({ className = '' }: YinYangSymbolProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="yin-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--soul-gold)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--soul-gold)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="yin-rose" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--soul-rose)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--soul-rose)" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle
        cx="100"
        cy="100"
        r="96"
        stroke="url(#yin-gold)"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Yin-Yang S-curve - Gold current */}
      <path
        d="M100 4
           A96 96 0 0 1 100 196
           A48 48 0 0 1 100 100
           A48 48 0 0 0 100 4"
        fill="url(#yin-gold)"
        opacity="0.15"
      />

      {/* Yin-Yang S-curve - Rose current */}
      <path
        d="M100 196
           A96 96 0 0 1 100 4
           A48 48 0 0 1 100 100
           A48 48 0 0 0 100 196"
        fill="url(#yin-rose)"
        opacity="0.12"
      />

      {/* Center point */}
      <circle
        cx="100"
        cy="100"
        r="3"
        fill="var(--soul-gold)"
        opacity="0.8"
      />

      {/* Inner orbit rings */}
      <circle
        cx="100"
        cy="100"
        r="60"
        stroke="var(--soul-gold)"
        strokeWidth="0.5"
        opacity="0.25"
        strokeDasharray="4 8"
      />
      <circle
        cx="100"
        cy="100"
        r="40"
        stroke="var(--soul-rose)"
        strokeWidth="0.5"
        opacity="0.2"
        strokeDasharray="3 6"
      />

      {/* Pisces-like crescent marks */}
      <path
        d="M100 20 Q120 50 100 80 Q80 50 100 20"
        stroke="var(--soul-gold)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M100 120 Q120 150 100 180 Q80 150 100 120"
        stroke="var(--soul-rose)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}

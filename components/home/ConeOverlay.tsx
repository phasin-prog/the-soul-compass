'use client';

/**
 * ConeOverlay — two fixed diagonal lines that converge from top-left/right
 * toward a vanishing point at center-bottom of the page.
 * Purely decorative (pointer-events: none, aria-hidden).
 * GSAP drives the narrowing in HomeMotionLayer.
 */
export function ConeOverlay() {
  return (
    <div
      className="cone-overlay"
      aria-hidden="true"
    >
      <svg
        className="cone-overlay__svg"
        viewBox="0 0 1000 3000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cone-line-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--soul-gold)" stopOpacity="0.06" />
            <stop offset="30%" stopColor="var(--soul-gold)" stopOpacity="0.18" />
            <stop offset="70%" stopColor="var(--soul-gold)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--soul-gold)" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Left converging edge */}
        <line
          className="cone-edge cone-edge--left"
          x1="0" y1="0"
          x2="500" y2="3000"
          stroke="url(#cone-line-fade)"
          strokeWidth="1.2"
        />

        {/* Right converging edge */}
        <line
          className="cone-edge cone-edge--right"
          x1="1000" y1="0"
          x2="500" y2="3000"
          stroke="url(#cone-line-fade)"
          strokeWidth="1.2"
        />

        {/* Faint secondary traces (inner) */}
        <line
          x1="80" y1="0"
          x2="500" y2="3000"
          stroke="var(--soul-gold)"
          strokeWidth="0.4"
          strokeOpacity="0.08"
          strokeDasharray="8 24"
        />
        <line
          x1="920" y1="0"
          x2="500" y2="3000"
          stroke="var(--soul-gold)"
          strokeWidth="0.4"
          strokeOpacity="0.08"
          strokeDasharray="8 24"
        />
      </svg>
    </div>
  );
}

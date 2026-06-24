'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroSymbolProps {
  className?: string;
}

export function HeroSymbol({ className = '' }: HeroSymbolProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<SVGGElement>(null);
  const innerRingRef = useRef<SVGGElement>(null);
  const pisces1Ref = useRef<SVGPathElement>(null);
  const pisces2Ref = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (reducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.6, scale: 1, duration: 2 }
      )
        .fromTo(
          outerRingRef.current,
          { opacity: 0, rotation: -90 },
          { opacity: 1, rotation: 0, duration: 2.5 },
          '-=1.8'
        )
        .fromTo(
          innerRingRef.current,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 2 },
          '-=2'
        )
        .fromTo(
          [pisces1Ref.current, pisces2Ref.current],
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 1.8, stagger: 0.3 },
          '-=1.5'
        );

      gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 48,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(innerRingRef.current, {
        rotation: -360,
        duration: 36,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(pisces1Ref.current, {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });

      gsap.to(pisces2Ref.current, {
        rotation: -360,
        duration: 24,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient
            id="hero-glow"
            cx="50%"
            cy="50%"
            r="50%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--soul-gold)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--soul-gold)" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="pisces-gradient-1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--soul-gold)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--soul-rose)" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient
            id="pisces-gradient-2"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--soul-ivory)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--soul-parchment)" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <circle
          ref={glowRef}
          cx="200"
          cy="200"
          r="180"
          fill="url(#hero-glow)"
          opacity="0"
        />

        {/* Outer ring with decorative marks */}
        <g ref={outerRingRef} opacity="0">
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="var(--soul-gold)"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 200 + 155 * Math.cos(rad);
            const y = 200 + 155 * Math.sin(rad);
            return (
              <circle
                key={angle}
                cx={x}
                cy={y}
                r="2"
                fill="var(--soul-gold)"
                fillOpacity="0.5"
              />
            );
          })}
        </g>

        {/* Inner ring */}
        <g ref={innerRingRef} opacity="0">
          <circle
            cx="200"
            cy="200"
            r="100"
            stroke="var(--soul-parchment)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <circle
            cx="200"
            cy="200"
            r="80"
            stroke="var(--soul-gold)"
            strokeWidth="0.5"
            strokeOpacity="0.25"
          />
        </g>

        {/* Pisces / Yin-Yang crescent forms */}
        <g ref={pisces1Ref} opacity="0">
          <path
            d="M200 120 C240 120 280 160 280 200 C280 240 240 280 200 280 C200 280 200 240 200 200 C200 160 200 120 200 120 Z"
            fill="url(#pisces-gradient-1)"
            fillOpacity="0.8"
          />
        </g>
        <g ref={pisces2Ref} opacity="0">
          <path
            d="M200 280 C160 280 120 240 120 200 C120 160 160 120 200 120 C200 120 200 160 200 200 C200 240 200 280 200 280 Z"
            fill="url(#pisces-gradient-2)"
            fillOpacity="0.8"
          />
        </g>

        {/* Center point */}
        <circle
          cx="200"
          cy="200"
          r="4"
          fill="var(--soul-ivory)"
          fillOpacity="0.9"
        />
        <circle
          cx="200"
          cy="200"
          r="8"
          stroke="var(--soul-gold)"
          strokeWidth="0.5"
          strokeOpacity="0.6"
          fill="none"
        />
      </svg>
    </div>
  );
}

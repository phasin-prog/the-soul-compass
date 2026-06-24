'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroSymbolProps {
  className?: string;
}

// Semantic fragments — opposites from psyche, language, belief
const DARK_FRAGMENTS = ['Shadow', 'อัตตา', 'id', 'Eros', 'ψ', 'ตัณหา', 'Chaos', 'Anima'];
const LIGHT_FRAGMENTS = ['Logos', 'Self', 'สติ', 'Ego', 'Λ', 'ศรัทธา', 'Cosmos', 'Animus'];

export function HeroSymbol({ className = '' }: HeroSymbolProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const darkOrbRef = useRef<SVGGElement>(null);
  const lightOrbRef = useRef<SVGGElement>(null);
  const fieldLinesRef = useRef<SVGGElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([darkOrbRef.current, lightOrbRef.current, fieldLinesRef.current, particlesRef.current, coreRef.current], { opacity: 1 });
        return;
      }

      // ─── Entrance ──────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(fieldLinesRef.current, { opacity: 0 }, { opacity: 1, duration: 2.5 })
        .fromTo(darkOrbRef.current, { opacity: 0, scale: 0.6, x: 0, y: 0 }, { opacity: 1, scale: 1, duration: 2 }, '-=2')
        .fromTo(lightOrbRef.current, { opacity: 0, scale: 0.6, x: 0, y: 0 }, { opacity: 1, scale: 1, duration: 2 }, '-=1.8')
        .fromTo(coreRef.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1,0.5)' }, '-=1')
        .fromTo(particlesRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 }, '-=0.8');

      // ─── Dark orb orbits counter-clockwise ─────────────────────
      gsap.to(darkOrbRef.current, {
        rotation: -360,
        duration: 32,
        repeat: -1,
        ease: 'none',
        transformOrigin: '200px 200px',
      });

      // ─── Light orb orbits clockwise (opposite pole) ────────────
      gsap.to(lightOrbRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
        transformOrigin: '200px 200px',
      });

      // ─── Field lines breathe ───────────────────────────────────
      gsap.to(fieldLinesRef.current, {
        opacity: 0.4,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // ─── Core pulses ───────────────────────────────────────────
      gsap.to(coreRef.current, {
        scale: 1.08,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '200px 200px',
      });

      // ─── Animate each particle independently ───────────────────
      const particles = svg.querySelectorAll('.psyche-particle');
      particles.forEach((p, i) => {
        const even = i % 2 === 0;
        const baseDelay = i * 0.18;
        gsap.to(p, {
          opacity: even ? 0.15 : 0.65,
          duration: 2.2 + i * 0.3,
          yoyo: true,
          repeat: -1,
          delay: baseDelay,
          ease: 'sine.inOut',
        });
        gsap.to(p, {
          y: even ? -6 : 6,
          duration: 3 + i * 0.4,
          yoyo: true,
          repeat: -1,
          delay: baseDelay,
          ease: 'sine.inOut',
        });
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  // Orbit radius for the two poles
  const R = 80; // distance from center
  const cx = 200;
  const cy = 200;

  // Dark pole sits at top-left of orbit, light at bottom-right
  const darkX = cx - R;
  const darkY = cy - R * 0.4;
  const lightX = cx + R;
  const lightY = cy + R * 0.4;

  // Field line bezier control points
  const fieldLines = [
    { d: `M${darkX},${darkY} C${cx - 20},${cy - 50} ${cx + 20},${cy + 50} ${lightX},${lightY}` },
    { d: `M${darkX + 10},${darkY - 20} C${cx},${cy - 80} ${cx + 10},${cy + 80} ${lightX - 10},${lightY + 20}` },
    { d: `M${darkX - 10},${darkY + 20} C${cx - 40},${cy - 20} ${cx + 40},${cy + 20} ${lightX + 10},${lightY - 20}` },
    { d: `M${darkX + 20},${darkY + 30} C${cx + 10},${cy - 30} ${cx - 10},${cy + 30} ${lightX - 20},${lightY - 30}` },
  ];

  return (
    <div className={className}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Dark orb gradient — shadow / unconscious */}
          <radialGradient id="dark-orb-grad" cx="50%" cy="40%" r="55%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#6b3fa0" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#3a1a6e" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0.2" />
          </radialGradient>

          {/* Light orb gradient — ego / consciousness */}
          <radialGradient id="light-orb-grad" cx="50%" cy="60%" r="55%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#c4a35a" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#8a6e30" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0.1" />
          </radialGradient>

          {/* Outer dark halo */}
          <radialGradient id="dark-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7b4fc4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7b4fc4" stopOpacity="0" />
          </radialGradient>

          {/* Outer light halo */}
          <radialGradient id="light-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4a35a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c4a35a" stopOpacity="0" />
          </radialGradient>

          {/* Ambient center glow */}
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8e4d9" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#e8e4d9" stopOpacity="0" />
          </radialGradient>

          <filter id="orb-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>

          <filter id="text-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Ambient scene glow ───────────────────────────────── */}
        <circle cx={cx} cy={cy} r="195" fill="url(#center-glow)" />

        {/* ── Outer orbit path (faint) ─────────────────────────── */}
        <ellipse
          cx={cx} cy={cy}
          rx="130" ry="80"
          stroke="var(--soul-gold)"
          strokeWidth="0.35"
          strokeOpacity="0.18"
          strokeDasharray="4 8"
        />

        {/* ── Field lines — tension between poles ─────────────── */}
        <g ref={fieldLinesRef} opacity="0.7">
          {fieldLines.map((line, i) => (
            <path
              key={i}
              d={line.d}
              stroke={i < 2 ? '#7b4fc4' : '#c4a35a'}
              strokeWidth={i === 0 ? 0.6 : 0.35}
              strokeOpacity={0.55 - i * 0.08}
              strokeDasharray={i === 0 ? 'none' : '3 6'}
            />
          ))}
        </g>

        {/* ── Dark pole — Shadow / Unconscious ─────────────────── */}
        <g ref={darkOrbRef} opacity="0">
          {/* Halo */}
          <circle cx={darkX} cy={darkY} r="52" fill="url(#dark-halo)" filter="url(#orb-blur)" />
          {/* Core orb */}
          <circle cx={darkX} cy={darkY} r="30" fill="url(#dark-orb-grad)" />
          {/* Hard rim */}
          <circle cx={darkX} cy={darkY} r="30" stroke="#7b4fc4" strokeWidth="0.6" strokeOpacity="0.7" fill="none" />
          {/* Inner glow dot */}
          <circle cx={darkX - 6} cy={darkY - 6} r="5" fill="#b08ae0" fillOpacity="0.6" />

          {/* Floating dark fragments */}
          {DARK_FRAGMENTS.map((word, i) => {
            const angle = (i / DARK_FRAGMENTS.length) * Math.PI * 2;
            const rx = 54 + (i % 2) * 18;
            const ry = 40 + (i % 3) * 10;
            const fx = darkX + rx * Math.cos(angle);
            const fy = darkY + ry * Math.sin(angle);
            return (
              <text
                key={word}
                className="psyche-particle"
                x={fx}
                y={fy}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={i % 3 === 0 ? '8' : '6'}
                fontFamily="var(--font-serif), serif"
                fill="#b08ae0"
                fillOpacity="0.5"
                letterSpacing="0.05em"
                filter="url(#text-glow)"
              >
                {word}
              </text>
            );
          })}
        </g>

        {/* ── Light pole — Ego / Consciousness ─────────────────── */}
        <g ref={lightOrbRef} opacity="0">
          {/* Halo */}
          <circle cx={lightX} cy={lightY} r="52" fill="url(#light-halo)" filter="url(#orb-blur)" />
          {/* Core orb */}
          <circle cx={lightX} cy={lightY} r="30" fill="url(#light-orb-grad)" />
          {/* Hard rim */}
          <circle cx={lightX} cy={lightY} r="30" stroke="#c4a35a" strokeWidth="0.6" strokeOpacity="0.7" fill="none" />
          {/* Inner glow dot */}
          <circle cx={lightX + 6} cy={lightY - 6} r="5" fill="#e8c97a" fillOpacity="0.6" />

          {/* Floating light fragments */}
          {LIGHT_FRAGMENTS.map((word, i) => {
            const angle = Math.PI + (i / LIGHT_FRAGMENTS.length) * Math.PI * 2;
            const rx = 54 + (i % 2) * 18;
            const ry = 40 + (i % 3) * 10;
            const fx = lightX + rx * Math.cos(angle);
            const fy = lightY + ry * Math.sin(angle);
            return (
              <text
                key={word}
                className="psyche-particle"
                x={fx}
                y={fy}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={i % 3 === 0 ? '8' : '6'}
                fontFamily="var(--font-serif), serif"
                fill="#e8c97a"
                fillOpacity="0.5"
                letterSpacing="0.05em"
                filter="url(#text-glow)"
              >
                {word}
              </text>
            );
          })}
        </g>

        {/* ── Nexus — the tension-point at center ──────────────── */}
        <g ref={coreRef} opacity="0">
          {/* Core breath rings */}
          <circle cx={cx} cy={cy} r="18" stroke="#e8e4d9" strokeWidth="0.4" strokeOpacity="0.18" fill="none" />
          <circle cx={cx} cy={cy} r="12" stroke="#e8e4d9" strokeWidth="0.4" strokeOpacity="0.28" fill="none" />

          {/* Split — dark half / light half */}
          <path
            d={`M${cx},${cy - 7} A 7 7 0 0 0 ${cx},${cy + 7} Z`}
            fill="#7b4fc4"
            fillOpacity="0.75"
          />
          <path
            d={`M${cx},${cy - 7} A 7 7 0 0 1 ${cx},${cy + 7} Z`}
            fill="#c4a35a"
            fillOpacity="0.75"
          />
          {/* Center dot */}
          <circle cx={cx} cy={cy} r="1.5" fill="#e8e4d9" fillOpacity="0.9" />
        </g>
      </svg>
    </div>
  );
}

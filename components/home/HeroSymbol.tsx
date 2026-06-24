'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSymbolProps {
  className?: string;
  controlled?: boolean;
}

// Concept particles orbiting the gravity well
const ORBIT_CONCEPTS = [
  { label: 'Shadow', ring: 0, offset: 0 },
  { label: 'Ego', ring: 0, offset: 0.25 },
  { label: 'สติ', ring: 0, offset: 0.55 },
  { label: 'Persona', ring: 0, offset: 0.78 },
  { label: 'Anima', ring: 1, offset: 0.1 },
  { label: 'อัตตา', ring: 1, offset: 0.38 },
  { label: 'Logos', ring: 1, offset: 0.62 },
  { label: 'ศรัทธา', ring: 1, offset: 0.85 },
  { label: 'Self', ring: 2, offset: 0.05 },
  { label: 'Psyche', ring: 2, offset: 0.42 },
  { label: 'จิตใต้สำนึก', ring: 2, offset: 0.7 },
];

// Three Saturn-like rings — each has inclination (tilt) and a radius
const RINGS = [
  { rx: 72, ry: 22, tilt: -18, strokeOpacity: 0.55, dasharray: 'none', duration: 22 },
  { rx: 108, ry: 32, tilt: 12,  strokeOpacity: 0.38, dasharray: '6 10',  duration: 34 },
  { rx: 148, ry: 44, tilt: -6,  strokeOpacity: 0.22, dasharray: '3 14',  duration: 50 },
];

export function HeroSymbol({ className = '', controlled = false }: HeroSymbolProps) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const coreRef  = useRef<SVGGElement>(null);
  const ring0Ref = useRef<SVGGElement>(null);
  const ring1Ref = useRef<SVGGElement>(null);
  const ring2Ref = useRef<SVGGElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const glowRef  = useRef<SVGCircleElement>(null);

  const ringRefs = [ring0Ref, ring1Ref, ring2Ref];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) {
        gsap.set(
          [coreRef.current, ring0Ref.current, ring1Ref.current, ring2Ref.current, particlesRef.current, glowRef.current],
          { opacity: 1 }
        );
        return;
      }

      if (!controlled) {
        // ── Entrance sequence ─────────────────────────────────────
        const enter = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Ambient glow fades in first
        enter.fromTo(glowRef.current,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 2.8, transformOrigin: '200px 200px' }
        );

        // Core nucleus appears — elastic-lite, not bounce
        enter.fromTo(coreRef.current,
          { opacity: 0, scale: 0.2 },
          { opacity: 1, scale: 1, duration: 1.4, ease: 'power4.out', transformOrigin: '200px 200px' },
          '-=2'
        );

        // Rings stagger in from center outward
        enter.fromTo(ring0Ref.current,
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out', transformOrigin: '200px 200px' },
          '-=0.6'
        );
        enter.fromTo(ring1Ref.current,
          { opacity: 0, scale: 0.2 },
          { opacity: 1, scale: 1, duration: 2.0, ease: 'power2.out', transformOrigin: '200px 200px' },
          '-=1.4'
        );
        enter.fromTo(ring2Ref.current,
          { opacity: 0, scale: 0.1 },
          { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out', transformOrigin: '200px 200px' },
          '-=1.6'
        );

        // Particles drift in last
        enter.fromTo(particlesRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5 },
          '-=1'
        );
      }

      // ── Continuous ring rotations ─────────────────────────────
      // Each ring spins on its own elliptical plane — opposite directions
      gsap.to(ring0Ref.current, {
        rotation: 360,
        duration: RINGS[0].duration,
        repeat: -1,
        ease: 'none',
        transformOrigin: '200px 200px',
      });
      gsap.to(ring1Ref.current, {
        rotation: -360,
        duration: RINGS[1].duration,
        repeat: -1,
        ease: 'none',
        transformOrigin: '200px 200px',
      });
      gsap.to(ring2Ref.current, {
        rotation: 360,
        duration: RINGS[2].duration,
        repeat: -1,
        ease: 'none',
        transformOrigin: '200px 200px',
      });

      // ── Core nucleus pulses ───────────────────────────────────
      gsap.to(coreRef.current, {
        scale: 1.06,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '200px 200px',
      });

      // ── Ambient glow breathes ─────────────────────────────────
      gsap.to(glowRef.current, {
        scale: 1.12,
        opacity: 0.65,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '200px 200px',
      });

      // ── Concept particles drift independently ─────────────────
      const particles = svg.querySelectorAll('.concept-particle');
      particles.forEach((p, i) => {
        // Gentle float
        gsap.to(p, {
          y: i % 2 === 0 ? -5 : 5,
          x: i % 3 === 0 ? -3 : 3,
          duration: 3 + i * 0.28,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.15,
        });
        // Fade flicker
        gsap.to(p, {
          opacity: 0.2 + (i % 3) * 0.15,
          duration: 4 + i * 0.35,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.22,
        });
      });

    }, svg);

    return () => ctx.revert();
  }, []);

  const cx = 200;
  const cy = 200;

  // Compute particle positions on their ring ellipses
  function getParticlePos(ring: number, offset: number) {
    const r = RINGS[ring];
    const angle = offset * Math.PI * 2;
    const tiltRad = (r.tilt * Math.PI) / 180;
    // Ellipse in its own tilted plane
    const ex = r.rx * Math.cos(angle);
    const ey = r.ry * Math.sin(angle);
    // Apply tilt (rotate in 2D around center)
    const x = cx + ex * Math.cos(tiltRad) - ey * Math.sin(tiltRad);
    const y = cy + ex * Math.sin(tiltRad) + ey * Math.cos(tiltRad);
    return { x, y };
  }

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
          {/* Singularity core — dark center, bright hot rim */}
          <radialGradient id="core-grad" cx="38%" cy="35%" r="65%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#e8dccb" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#b99555" stopOpacity="0.80" />
            <stop offset="70%" stopColor="#3a2a14" stopOpacity="0.60" />
            <stop offset="100%" stopColor="#0a0f1a" stopOpacity="0.10" />
          </radialGradient>

          {/* Outer ambient glow — deep blue-gold */}
          <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b99555" stopOpacity="0.14" />
            <stop offset="55%" stopColor="#263048" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#101827" stopOpacity="0" />
          </radialGradient>

          {/* Ring gradient — gold fading inward */}
          <linearGradient id="ring-grad-0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b99555" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d0b06e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#b99555" stopOpacity="0.85" />
          </linearGradient>

          {/* Glow filter for nucleus */}
          <filter id="core-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft blur for ambient glow circle */}
          <filter id="ambient-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
          </filter>

          {/* Text glow for particles */}
          <filter id="text-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── 1. Ambient gravity glow ───────────────────────────── */}
        <circle
          ref={glowRef}
          cx={cx} cy={cy} r="175"
          fill="url(#glow-grad)"
          filter="url(#ambient-blur)"
          opacity="0"
        />

        {/* ── 2. Saturn ring 2 (outermost, behind core) ─────────── */}
        <g ref={ring2Ref} opacity="0" className="symbol-ring-2">
          <ellipse
            cx={cx} cy={cy}
            rx={RINGS[2].rx} ry={RINGS[2].ry}
            stroke="#b99555"
            strokeWidth="0.6"
            strokeOpacity={RINGS[2].strokeOpacity}
            strokeDasharray={RINGS[2].dasharray}
            transform={`rotate(${RINGS[2].tilt} ${cx} ${cy})`}
            fill="none"
          />
          {/* Second, slightly offset trace ring */}
          <ellipse
            cx={cx} cy={cy}
            rx={RINGS[2].rx - 4} ry={RINGS[2].ry - 1.5}
            stroke="#344052"
            strokeWidth="0.4"
            strokeOpacity="0.45"
            strokeDasharray="2 16"
            transform={`rotate(${RINGS[2].tilt + 3} ${cx} ${cy})`}
            fill="none"
          />
        </g>

        {/* ── 3. Saturn ring 1 (mid) ────────────────────────────── */}
        <g ref={ring1Ref} opacity="0" className="symbol-ring-1">
          <ellipse
            cx={cx} cy={cy}
            rx={RINGS[1].rx} ry={RINGS[1].ry}
            stroke="#d0b06e"
            strokeWidth="0.8"
            strokeOpacity={RINGS[1].strokeOpacity}
            strokeDasharray={RINGS[1].dasharray}
            transform={`rotate(${RINGS[1].tilt} ${cx} ${cy})`}
            fill="none"
          />
          <ellipse
            cx={cx} cy={cy}
            rx={RINGS[1].rx + 5} ry={RINGS[1].ry + 2}
            stroke="#b99555"
            strokeWidth="0.35"
            strokeOpacity="0.20"
            transform={`rotate(${RINGS[1].tilt - 4} ${cx} ${cy})`}
            fill="none"
          />
        </g>

        {/* ── 4. Saturn ring 0 (innermost) ─────────────────────── */}
        <g ref={ring0Ref} opacity="0" className="symbol-ring-0">
          <ellipse
            cx={cx} cy={cy}
            rx={RINGS[0].rx} ry={RINGS[0].ry}
            stroke="#e8dccb"
            strokeWidth="1.0"
            strokeOpacity={RINGS[0].strokeOpacity}
            transform={`rotate(${RINGS[0].tilt} ${cx} ${cy})`}
            fill="none"
          />
          {/* Hot inner edge */}
          <ellipse
            cx={cx} cy={cy}
            rx={RINGS[0].rx - 3} ry={RINGS[0].ry - 1}
            stroke="#b99555"
            strokeWidth="0.4"
            strokeOpacity="0.6"
            strokeDasharray="4 6"
            transform={`rotate(${RINGS[0].tilt + 8} ${cx} ${cy})`}
            fill="none"
          />
        </g>

        {/* ── 5. Concept particles on ring orbits ──────────────── */}
        <g ref={particlesRef} opacity="0" className="symbol-particles">
          {ORBIT_CONCEPTS.map((c, i) => {
            const { x, y } = getParticlePos(c.ring, c.offset);
            const fontSize = c.ring === 0 ? 7 : c.ring === 1 ? 6.5 : 5.5;
            const opacity  = c.ring === 0 ? 0.72 : c.ring === 1 ? 0.55 : 0.38;
            return (
              <text
                key={c.label}
                className="concept-particle"
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={fontSize}
                fontFamily="var(--font-serif, serif)"
                letterSpacing="0.04em"
                fill="#e8dccb"
                fillOpacity={opacity}
                filter="url(#text-glow)"
              >
                {c.label}
              </text>
            );
          })}
        </g>

        {/* ── 6. Ego nucleus — singularity ─────────────────────── */}
        <g ref={coreRef} opacity="0" filter="url(#core-glow)" className="symbol-core">
          {/* Accretion disk shadow */}
          <circle cx={cx} cy={cy} r="24" fill="#0a0f1a" fillOpacity="0.85" />
          {/* Hot corona rim */}
          <circle cx={cx} cy={cy} r="22" stroke="#b99555" strokeWidth="0.8" strokeOpacity="0.9" fill="none" />
          <circle cx={cx} cy={cy} r="18" stroke="#e8dccb" strokeWidth="0.4" strokeOpacity="0.5" fill="none" />
          {/* Core body */}
          <circle cx={cx} cy={cy} r="14" fill="url(#core-grad)" />
          {/* Singularity point */}
          <circle cx={cx} cy={cy} r="3" fill="#f4efe7" fillOpacity="0.95" />
          {/* Label */}
          <text
            x={cx} y={cy + 33}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="6"
            fontFamily="var(--font-serif, serif)"
            letterSpacing="0.12em"
            fill="#b99555"
            fillOpacity="0.7"
          >
            EGO
          </text>
        </g>
      </svg>
    </div>
  );
}

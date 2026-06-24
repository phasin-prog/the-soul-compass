'use client';

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HomeMotionLayerProps {
  children: ReactNode;
}

export function HomeMotionLayer({ children }: HomeMotionLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (reducedMotion) {
        gsap.set('[data-reveal]', { opacity: 1, y: 0 });
        return;
      }

      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      heroTl
        .fromTo(
          '.home-kicker',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 }
        )
        .fromTo(
          '.type-display',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.6'
        )
        .fromTo(
          '.type-lead',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          '.home-hero .flex.flex-col.gap-3',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        );

      gsap.fromTo(
        '.home-compass',
        { opacity: 0, scale: 0.9, rotation: -30 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 2.5,
          ease: 'power2.out',
          delay: 0.3,
        }
      );

      const sections = document.querySelectorAll('[data-symbol-section]');
      sections.forEach((section) => {
        const symbol = section.querySelector('.symbol-glyph');
        const text = section.querySelector('.symbol-text');

        if (symbol) {
          gsap.fromTo(
            symbol,
            { opacity: 0, scale: 0.94, rotation: -5 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: symbol,
                start: 'top 85%',
                end: 'top 40%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                end: 'top 45%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      const categoryLinks = document.querySelectorAll('.category-compass-link');
      gsap.fromTo(
        categoryLinks,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.category-compass-grid',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.category-compass-link .category-compass-arrow',
        { x: 0 },
        {
          x: 4,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.category-compass-grid',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef} className="contents">{children}</div>;
}

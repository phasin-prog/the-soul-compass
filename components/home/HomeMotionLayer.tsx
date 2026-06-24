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
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (reducedMotion) {
        gsap.set('[data-reveal], .home-reveal-section', { opacity: 1, y: 0 });
        gsap.set('.hero-symbol-wrapper', { scale: 1, opacity: 1 });
        gsap.set('.symbol-glow, .symbol-core, .symbol-ring-0, .symbol-ring-1, .symbol-ring-2, .symbol-particles', { opacity: 1 });
        gsap.set('.home-kicker, .type-display, .type-lead, .home-buttons', { opacity: 1, y: 0 });
        return;
      }

      // Scene 1: Pre-collision of energy particles
      const heroTl = gsap.timeline();

      heroTl
        // Ensure initial states
        .set('.energy-left, .energy-right', { opacity: 0, scale: 1 })
        .set('.hero-symbol-wrapper', { scale: 0, opacity: 0 })
        .set('.symbol-glow, .symbol-core, .symbol-ring-0, .symbol-ring-1, .symbol-ring-2, .symbol-particles', { opacity: 0 })
        .set('.home-kicker, .type-display, .type-lead, .home-buttons', { opacity: 0, y: 20 })
        
        // Scene 1: Collision motion
        .fromTo('.energy-left', 
          { x: -250, opacity: 0 }, 
          { x: 0, opacity: 0.9, duration: 1.6, ease: 'power3.inOut' }
        )
        .fromTo('.energy-right', 
          { x: 250, opacity: 0 }, 
          { x: 0, opacity: 0.9, duration: 1.6, ease: 'power3.inOut' },
          '<'
        )
        
        // Scene 2: The Mandala expansion (burst upon collision)
        .to('.energy-left', { x: 10, scale: 1.8, opacity: 0, duration: 0.3, ease: 'power2.out' }, '+=0.1')
        .to('.energy-right', { x: -10, scale: 1.8, opacity: 0, duration: 0.3, ease: 'power2.out' }, '<')
        
        .fromTo('.hero-symbol-wrapper',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.6, ease: 'expo.out' },
          '<'
        )
        // SVG interior details stagger and burst
        .fromTo('.symbol-glow', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 2.2, transformOrigin: '200px 200px', ease: 'expo.out' }, '<')
        .fromTo('.symbol-core', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 1.5, transformOrigin: '200px 200px', ease: 'expo.out' }, '<+=0.1')
        .fromTo('.symbol-ring-0', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 1.8, transformOrigin: '200px 200px', ease: 'expo.out' }, '<+=0.15')
        .fromTo('.symbol-ring-1', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 2.0, transformOrigin: '200px 200px', ease: 'expo.out' }, '<+=0.2')
        .fromTo('.symbol-ring-2', { opacity: 0, scale: 0.1 }, { opacity: 1, scale: 1, duration: 2.2, transformOrigin: '200px 200px', ease: 'expo.out' }, '<+=0.25')
        .fromTo('.symbol-particles', { opacity: 0 }, { opacity: 1, duration: 1.4 }, '<+=0.4')
        
        // Scene 3: Text reveal (stately, deep ease)
        .fromTo(
          ['.home-kicker', '.type-display', '.type-lead', '.home-buttons'],
          { opacity: 0, y: 24 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.8, 
            stagger: 0.24, 
            ease: 'expo.out'
          },
          '-=1.4'
        );

      // Subtle scroll-driven expansion of the hero symbol as user scrolls down
      gsap.to('.hero-symbol-wrapper', {
        scale: 1.08,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

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
      const revealSections = document.querySelectorAll('.home-reveal-section');
      revealSections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
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

      // Infinite horizontal marquee logic for featured articles slider
      const track = document.querySelector('.featured-slider-track');
      const viewport = document.querySelector('.featured-slider-viewport');
      if (track && viewport) {
        gsap.set(track, { xPercent: 0 });
        const autoSlide = gsap.to(track, {
          xPercent: -50,
          ease: 'none',
          duration: 38, // Slow, contemplative speed
          repeat: -1,
        });

        const handleMouseEnter = () => autoSlide.pause();
        const handleMouseLeave = () => autoSlide.play();

        viewport.addEventListener('mouseenter', handleMouseEnter);
        viewport.addEventListener('mouseleave', handleMouseLeave);

        cleanups.push(() => {
          viewport.removeEventListener('mouseenter', handleMouseEnter);
          viewport.removeEventListener('mouseleave', handleMouseLeave);
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return <div ref={containerRef} className="contents">{children}</div>;
}

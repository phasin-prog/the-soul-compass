'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useHomeGsapAnimations() {
  const heroRef = useRef<HTMLDivElement>(null);
  const symbolRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([heroRef.current, symbolRef.current], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      heroTl
        .fromTo(
          '.home-compass',
          { opacity: 0, scale: 0.8, rotate: -30 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.8 }
        )
        .fromTo(
          '.home-kicker',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=1.2'
        )
        .fromTo(
          '.home-hero h1',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.6'
        )
        .fromTo(
          '.home-hero .type-lead',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.home-hero .flex',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );

      // Continuous compass rotation (slower than CSS)
      gsap.to('.home-compass__ring--outer', {
        rotate: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });

      // Yin-Yang symbol orbit
      gsap.to('.yin-yang-orbit', {
        rotate: 360,
        duration: 45,
        repeat: -1,
        ease: 'none',
      });

      // Scroll-triggered section reveals
      const revealSections = gsap.utils.toArray('.home-reveal-section');

      revealSections.forEach((section) => {
        const el = section as HTMLElement;

        gsap.fromTo(
          el.querySelector('.reveal-symbol'),
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          el.querySelector('.reveal-heading'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          el.querySelector('.reveal-body'),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.15,
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Category grid stagger reveal
      gsap.fromTo(
        '.category-compass-link',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.category-compass-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Featured articles stagger
      gsap.fromTo(
        '#featured-heading',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#featured-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return { heroRef, symbolRef, sectionsRef };
}

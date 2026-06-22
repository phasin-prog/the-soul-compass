'use client';

import { useEffect, useRef } from 'react';

export function HomeMotion() {
  const symbolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const symbol = symbolRef.current;
    const root = symbol?.closest<HTMLElement>('[data-home-motion]');

    if (!symbol || !root) return;

    let cancelled = false;
    let cleanup = () => {};

    void import('gsap').then(
      ({ gsap }) => {
        if (cancelled) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
          gsap.set(root.querySelectorAll('[data-motion-reveal], [data-motion-item]'), {
            clearProps: 'all',
          });
          return;
        }

        const styles = getComputedStyle(root);
        const numberToken = (name: string) =>
          Number.parseFloat(styles.getPropertyValue(name));
        const distanceToken = (name: string) => {
          const value = styles.getPropertyValue(name).trim();
          return value.endsWith('rem')
            ? Number.parseFloat(value) *
                Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
            : Number.parseFloat(value);
        };
        const intensity = numberToken('--motion-intensity');
        const duration = {
          medium: numberToken('--motion-duration-medium'),
          slow: numberToken('--motion-duration-slow'),
          orbit: numberToken('--motion-duration-orbit'),
        };
        const distance = {
          small: distanceToken('--motion-distance-sm') * intensity,
          medium: distanceToken('--motion-distance-md') * intensity,
          large: distanceToken('--motion-distance-lg') * intensity,
        };
        const delay = numberToken('--motion-delay-step');
        const ease = {
          standard: styles.getPropertyValue('--motion-ease-standard').trim(),
          gentle: styles.getPropertyValue('--motion-ease-gentle').trim(),
        };

        const observers: IntersectionObserver[] = [];
        let symbolVisible = true;
        let orbitTween: ReturnType<typeof gsap.to> | undefined;
        let coreTween: ReturnType<typeof gsap.to> | undefined;
        const setOrbitPlayback = (shouldPlay: boolean) => {
          if (shouldPlay) {
            orbitTween?.play();
            coreTween?.play();
          } else {
            orbitTween?.pause();
            coreTween?.pause();
          }
        };

        const context = gsap.context(() => {
          gsap
            .timeline({ defaults: { ease: ease.standard } })
            .from('[data-motion-hero]', {
              autoAlpha: 0,
              y: distance.medium,
              duration: duration.slow,
              stagger: delay,
            })
            .from(
              symbol,
              {
                autoAlpha: 0,
                scale: 0.92,
                rotate: -8,
                duration: duration.orbit,
              },
              0.16,
            );

          orbitTween = gsap.to('[data-motion-orbit]', {
            rotate: 360,
            duration: 42,
            ease: 'none',
            repeat: -1,
            transformOrigin: '50% 50%',
          });

          coreTween = gsap.to('[data-motion-core]', {
            rotate: -360,
            duration: 58,
            ease: 'none',
            repeat: -1,
            transformOrigin: '50% 50%',
          });

          const revealObserver = new IntersectionObserver(
            (entries, observer) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                const target = entry.target as HTMLElement;
                if (target.hasAttribute('data-motion-group')) {
                  gsap.from(target.querySelectorAll('[data-motion-item]'), {
                    autoAlpha: 0,
                    y: distance.small,
                    duration: duration.medium,
                    ease: ease.gentle,
                    stagger: delay,
                  });
                } else {
                  gsap.from(target, {
                    autoAlpha: 0,
                    y: distance.large,
                    duration: duration.slow,
                    ease: ease.standard,
                  });
                }

                observer.unobserve(target);
              }
            },
            { rootMargin: '0px 0px -14% 0px' },
          );

          root
            .querySelectorAll<HTMLElement>('[data-motion-reveal], [data-motion-group]')
            .forEach((element) => revealObserver.observe(element));
          observers.push(revealObserver);

          const symbolObserver = new IntersectionObserver(([entry]) => {
            symbolVisible = entry.isIntersecting;
            setOrbitPlayback(
              symbolVisible && document.visibilityState === 'visible',
            );
          });
          symbolObserver.observe(symbol);
          observers.push(symbolObserver);
        }, root);

        const handleVisibility = () => {
          setOrbitPlayback(
            symbolVisible && document.visibilityState === 'visible',
          );
        };
        document.addEventListener('visibilitychange', handleVisibility);

        cleanup = () => {
          observers.forEach((observer) => observer.disconnect());
          document.removeEventListener('visibilitychange', handleVisibility);
          context.revert();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={symbolRef} className="soul-compass-symbol" aria-hidden="true">
      <div className="soul-compass-symbol__orbit" data-motion-orbit>
        <span className="soul-compass-symbol__moon" />
      </div>
      <div className="soul-compass-symbol__axis" />
      <div className="soul-compass-symbol__axis soul-compass-symbol__axis--horizontal" />
      <div className="soul-compass-symbol__core" data-motion-core>
        <span />
        <span />
      </div>
      <div className="soul-compass-symbol__centre" />
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MotionEngine() {
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    let lenis;
    let gsap;
    let ScrollTrigger;
    let ticker;
    let context;
    const carouselListeners = [];

    async function boot() {
      const [lenisModule, gsapModule, triggerModule] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      const Lenis = lenisModule.default;
      gsap = gsapModule.gsap || gsapModule.default;
      ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reducedMotion) {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: .82, touchMultiplier: 1.25, anchors: true });
        lenis.on('scroll', ScrollTrigger.update);
        ticker = (time) => lenis?.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
      }

      document.querySelectorAll('[data-carousel]').forEach((rail) => {
        const controls = rail.closest('.container-shell') || rail.parentElement;
        const scrollByDirection = (direction) => rail.scrollBy({ left: direction * Math.max(rail.clientWidth * .78, 260), behavior: reducedMotion ? 'auto' : 'smooth' });
        const prev = controls?.querySelector('[data-carousel-prev]');
        const next = controls?.querySelector('[data-carousel-next]');
        if (prev) { const handler = () => scrollByDirection(-1); prev.addEventListener('click', handler); carouselListeners.push([prev, 'click', handler]); }
        if (next) { const handler = () => scrollByDirection(1); next.addEventListener('click', handler); carouselListeners.push([next, 'click', handler]); }
      });

      context = gsap.context(() => {
        if (!reducedMotion) {
          gsap.utils.toArray('[data-reveal]').forEach((element) => {
            gsap.fromTo(element,
              { autoAlpha: 0, y: 34, scale: .992 },
              { autoAlpha: 1, y: 0, scale: 1, duration: .95, ease: 'power3.out', immediateRender: false,
                scrollTrigger: { trigger: element, start: 'top 87%', once: true } },
            );
          });
          gsap.utils.toArray('[data-mask-line]').forEach((element, index) => {
            gsap.fromTo(element, { yPercent: 120, rotate: 1.5 }, { yPercent: 0, rotate: 0, duration: 1.25, delay: .25 + index * .12, ease: 'power4.out' });
          });
          gsap.utils.toArray('[data-parallax]').forEach((element) => {
            gsap.fromTo(element, { yPercent: 0 }, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: .8 } });
          });
          gsap.utils.toArray('[data-hero-image]').forEach((element) => {
            gsap.fromTo(element, { scale: 1.12 }, { scale: 1.035, duration: 12, ease: 'none' });
          });
          gsap.utils.toArray('[data-count-to]').forEach((element) => {
            const target = Number(element.dataset.countTo || 0);
            const suffix = element.dataset.suffix || '';
            const counter = { value: 0 };
            gsap.to(counter, { value: target, duration: 1.5, ease: 'power2.out', snap: { value: 1 },
              scrollTrigger: { trigger: element, start: 'top 90%', once: true },
              onUpdate: () => { element.textContent = `${Math.round(counter.value)}${suffix}`; },
            });
          });
        }
      }, document.body);
      ScrollTrigger.refresh();
    }

    boot().catch((error) => console.error('Motion setup failed:', error));
    return () => {
      cancelled = true;
      context?.revert();
      if (ticker && gsap) gsap.ticker.remove(ticker);
      lenis?.destroy();
      carouselListeners.forEach(([element, eventName, handler]) => element.removeEventListener(eventName, handler));
      ScrollTrigger?.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return null;
}

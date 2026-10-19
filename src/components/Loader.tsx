'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from '@/lib/gsap';
import { useLenis } from '@/lib/lenis';
import { markIntroDone } from '@/lib/intro';
import { prefersReducedMotion } from '@/lib/motion';
import { PROFILE } from '@/data/profile';

/**
 * Intro loader: counts 0 → 100, then wipes the curtain upward to reveal the
 * hero. Skipped to a quick fade under reduced motion.
 */
export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();
  const lenisRef = useRef<typeof lenis>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const num = numRef.current;
    const bar = barRef.current;
    if (!root || !num || !bar) return;

    // Lock scrolling for the duration of the intro.
    document.documentElement.style.overflow = 'hidden';
    lenisRef.current?.stop();
    window.scrollTo(0, 0);

    const finish = () => {
      document.documentElement.style.overflow = '';
      lenisRef.current?.start();
      setDone(true);
      markIntroDone();
    };

    if (prefersReducedMotion()) {
      const t = gsap.timeline({ onComplete: finish });
      t.to(root, { autoAlpha: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 });
      return () => t.kill();
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });

    tl.set(bar, { scaleX: 0, transformOrigin: 'left center' })
      .to(counter, {
        v: 100,
        duration: 1.7,
        ease: 'power2.inOut',
        onUpdate: () => {
          num.textContent = String(Math.round(counter.v)).padStart(3, '0');
        },
      }, 0)
      .to(bar, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
      .to([num, bar], { autoAlpha: 0, duration: 0.4, ease: 'power2.out' }, '>-0.1')
      .to(root, {
        yPercent: -100,
        duration: 1,
        ease: 'expo.inOut',
      }, '>-0.1');

    return () => {
      tl.kill();
      document.documentElement.style.overflow = '';
      lenisRef.current?.start();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-void px-5 py-6 md:px-10 md:py-8"
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow">{PROFILE.name}</span>
        <span className="eyebrow">Portfolio · 2026</span>
      </div>

      <div className="flex items-end justify-center">
        <span
          ref={numRef}
          className="display text-[22vw] leading-none text-ink md:text-[16vw]"
        >
          000
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="h-px w-full bg-line">
          <div ref={barRef} className="h-full w-full bg-accent" />
        </div>
        <div className="flex items-center justify-between">
          <span className="eyebrow">Loading</span>
          <span className="eyebrow">{PROFILE.role}</span>
        </div>
      </div>
    </div>
  );
}

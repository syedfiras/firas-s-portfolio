'use client';

import { useEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import { isTouch, prefersReducedMotion } from '@/lib/motion';

/**
 * Custom cursor: a small dot that grows over interactive elements and
 * reads "View" over project cards ([data-cursor="view"]).
 * Hidden entirely on touch devices and reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.body.dataset.cursor = 'on';

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const grow = (mode: 'link' | 'view') => {
      gsap.to(dot, { scale: 0, duration: 0.3, ease: 'power3.out' });
      gsap.to(ring, {
        scale: mode === 'view' ? 3.4 : 2.1,
        backgroundColor: mode === 'view' ? 'rgba(198,255,61,0.92)' : 'rgba(198,255,61,0.14)',
        borderColor: 'rgba(198,255,61,0.9)',
        duration: 0.35,
        ease: 'power3.out',
      });
      if (mode === 'view') gsap.to(label, { opacity: 1, duration: 0.25 });
    };

    const shrink = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power3.out' });
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'rgba(198,255,61,0)',
        borderColor: 'rgba(243,243,239,0.4)',
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor], input, textarea, [role="button"]',
      ) as HTMLElement | null;
      if (!target) return;
      const mode = target.dataset.cursor === 'view' ? 'view' : 'link';
      grow(mode);
    };

    const onOut = (e: PointerEvent) => {
      const related = (e.relatedTarget as HTMLElement)?.closest(
        'a, button, [data-cursor], input, textarea, [role="button"]',
      );
      if (!related) shrink();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, true);
    document.addEventListener('pointerout', onOut, true);

    return () => {
      delete document.body.dataset.cursor;
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver, true);
      document.removeEventListener('pointerout', onOut, true);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={dotRef}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className="absolute -ml-4 -mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-ink/40"
      >
        <span
          ref={labelRef}
          className="font-mono text-[7px] font-bold uppercase tracking-widest text-void opacity-0"
        >
          View
        </span>
      </div>
    </div>
  );
}

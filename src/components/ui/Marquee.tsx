'use client';

import { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  /** Base loop duration in seconds for one full cycle. */
  duration?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
}

/**
 * Infinite marquee whose speed (and direction) is modulated by scroll velocity.
 * Renders two identical copies and loops xPercent 0 → -50 for a seamless seam.
 */
export default function Marquee({
  items,
  direction = 'left',
  duration = 26,
  className,
  itemClassName,
  separator = '·',
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const from = direction === 'left' ? 0 : -50;
    const to = direction === 'left' ? -50 : 0;

    const tween = gsap.fromTo(
      track,
      { xPercent: from },
      { xPercent: to, duration, ease: 'none', repeat: -1 },
    );

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const boost = gsap.utils.clamp(-6, 6, self.getVelocity() / 420);
        tween.timeScale(gsap.utils.clamp(-8, 12, 1 + boost));
      },
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, [direction, duration, items]);

  const row = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className ?? ''}`} aria-hidden>
      <div ref={trackRef} className="marquee-track">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`inline-flex items-center whitespace-nowrap ${itemClassName ?? ''}`}
          >
            {item}
            <span className="mx-6 text-accent/50 md:mx-10">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

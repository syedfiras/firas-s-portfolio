'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from '@/lib/gsap';
import { isTouch, prefersReducedMotion } from '@/lib/motion';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** How far the element is pulled toward the cursor (px). */
  strength?: number;
}

/**
 * Magnetic hover: the wrapped element eases toward the pointer, then springs
 * back on leave. No-op on touch / reduced-motion.
 */
export default function Magnetic({
  children,
  className,
  as: Tag = 'span',
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return (
    <Tag ref={ref} className={className} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </Tag>
  );
}

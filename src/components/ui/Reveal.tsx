'use client';

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  start?: string;
  once?: boolean;
}

/** Generic fade/slide-up reveal for non-heading blocks. */
export default function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  y = 26,
  start = 'top 88%',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    const anim = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start, once },
        clearProps: 'willChange',
      },
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay, y, start, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

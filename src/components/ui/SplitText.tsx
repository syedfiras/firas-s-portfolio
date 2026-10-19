'use client';

import { useLayoutEffect, useRef, type CSSProperties, type ElementType } from 'react';
import gsap, { SplitText as GSAPSplitText } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  by?: 'lines' | 'words' | 'chars';
  play?: 'scroll' | 'mount';
  start?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

/**
 * Masked, y-translate reveal for headings. Splits `text` into lines/words/chars
 * with GSAP SplitText and animates them up from behind an overflow mask.
 * Respects reduced motion (plain fade) and reverts on unmount.
 */
export default function SplitText({
  text,
  as: Tag = 'h2',
  className,
  style,
  by = 'lines',
  play = 'scroll',
  start = 'top 85%',
  delay = 0,
  stagger = 0.07,
  duration = 1.05,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' });
      return;
    }

    let split: GSAPSplitText | null = null;
    let tl: gsap.core.Timeline | null = null;
    let killed = false;

    const run = () => {
      if (killed || !el) return;
      split = new GSAPSplitText(el, {
        type: by,
        mask: by === 'chars' ? undefined : by,
        aria: 'hidden',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
      });
      const targets =
        by === 'lines' ? split.lines : by === 'words' ? split.words : split.chars;

      gsap.set(el, { autoAlpha: 1 });
      tl = gsap.timeline({
        delay,
        scrollTrigger:
          play === 'scroll'
            ? { trigger: el, start, once }
            : undefined,
      });

      if (by === 'chars') {
        tl.from(targets, {
          yPercent: 60,
          autoAlpha: 0,
          duration: duration * 0.7,
          ease: 'power3.out',
          stagger: stagger * 0.5,
        });
      } else {
        tl.from(targets, {
          yPercent: 115,
          duration,
          ease: 'expo.out',
          stagger,
        });
      }
    };

    gsap.set(el, { autoAlpha: 0 });
    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      killed = true;
      tl?.scrollTrigger?.kill();
      tl?.kill();
      split?.revert();
    };
  }, [text, by, play, start, delay, stagger, duration, once]);

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {text}
    </Tag>
  );
}

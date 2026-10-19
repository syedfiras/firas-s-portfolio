'use client';

import { useEffect, useRef, useState } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { SECTIONS } from '@/data/profile';

/**
 * Fixed scroll progress: a hairline bar across the top plus a mono counter
 * (01 / 10) that tracks the active section landmark.
 */
export default function ProgressBar() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const triggers: ScrollTrigger[] = [];

    const pageTrigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => {
        gsap.set(line, { scaleX: self.progress, transformOrigin: 'left center' });
      },
    });
    triggers.push(pageTrigger);

    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const t = ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) setActive(i + 1);
        },
      });
      triggers.push(t);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-px bg-line/40">
        <div ref={lineRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
      </div>

      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[80] flex items-center gap-2 md:bottom-6 md:right-6"
        aria-hidden
      >
        <span className="font-mono text-xs tabular-nums text-ink">{pad(active)}</span>
        <span className="font-mono text-xs text-smoke">/</span>
        <span className="font-mono text-xs tabular-nums text-smoke">
          {pad(SECTIONS.length)}
        </span>
      </div>
    </>
  );
}

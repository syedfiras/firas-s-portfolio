'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import Reveal from '@/components/ui/Reveal';
import SplitText from '@/components/ui/SplitText';
import { EXPERIENCE } from '@/data/experience';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    const dots = items
      .map((item) => item.querySelector('[data-dot]'))
      .filter(Boolean) as HTMLElement[];

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(items, { autoAlpha: 0.2, y: 28 });
      gsap.set(dots, { scale: 0 });

      const step = 1 / items.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: list,
          start: 'top 78%',
          end: 'bottom 72%',
          scrub: 0.6,
        },
      });

      tl.to(lineRef.current, { scaleY: 1, ease: 'none', duration: 1 }, 0);
      items.forEach((item, i) => {
        const at = 0.05 + i * step * 0.9;
        tl.to(item, { autoAlpha: 1, y: 0, duration: step * 0.55, ease: 'power2.out' }, at);
        if (dots[i]) tl.to(dots[i], { scale: 1, duration: step * 0.3, ease: 'back.out(2)' }, at);
      });

      return () => tl.scrollTrigger?.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} aria-label="Experience" className="relative bg-void py-24 md:py-32">
      <div className="container-x">
        <Reveal className="mb-14 flex items-center gap-4 md:mb-20">
          <span className="eyebrow">04 / Experience</span>
          <span className="h-px flex-1 bg-line" />
        </Reveal>

        <SplitText
          as="h2"
          text="Where I've built"
          className="display mb-16 max-w-[16ch] text-ink md:mb-24"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', lineHeight: 0.9 }}
          by="lines"
        />

        <div ref={listRef} className="relative">
          {/* Self-drawing line */}
          <div className="absolute left-[3px] top-2 h-full w-px bg-line md:left-[5px]">
            <div ref={lineRef} className="h-full w-full origin-top bg-accent" />
          </div>

          <ul className="flex flex-col gap-12 pl-8 md:gap-16 md:pl-12">
            {EXPERIENCE.map((job, i) => (
              <li
                key={`${job.company}-${i}`}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="relative"
              >
                <span
                  data-dot
                  className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full bg-accent md:-left-12"
                  aria-hidden
                />
                <div className="flex flex-col gap-3 border-b border-line pb-8 md:flex-row md:items-baseline md:justify-between md:gap-10">
                  <div className="flex flex-col gap-2">
                    <span className="eyebrow">{job.period}</span>
                    <h3
                      className="display text-ink"
                      style={{ fontSize: 'clamp(1.6rem, 3.4vw, 3rem)', lineHeight: 0.95 }}
                    >
                      {job.company}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {job.role}
                      {job.location ? ` · ${job.location}` : ''}
                    </span>
                  </div>
                  <div className="md:max-w-[46ch]">
                    <p className="text-sm leading-relaxed text-ash md:text-base">{job.description}</p>
                    {job.bullets && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {job.bullets.map((b) => (
                          <li
                            key={b}
                            className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

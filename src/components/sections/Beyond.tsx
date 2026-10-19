'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { MEDIA, prefersReducedMotion } from '@/lib/motion';
import { BEYOND } from '@/data/certs';

export default function Beyond() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.full, () => {
        const triggers: ScrollTrigger[] = [];
        items.forEach((item, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          const t = gsap.fromTo(
            item,
            { x: 70 * dir },
            {
              x: -70 * dir,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            },
          );
          if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        });
        return () => triggers.forEach((t) => t.kill());
      });

      mm.add(MEDIA.lite, () => {
        const tweens = items.map((item) =>
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 88%', once: true },
            },
          ),
        );
        return () => tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
      });

      return () => {
        mm.revert();
        ScrollTrigger.refresh();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="beyond"
      ref={sectionRef}
      aria-label="Beyond the screen"
      className="relative overflow-hidden border-y border-[#211d16] bg-[#0d0c0a] py-24 md:py-36"
    >
      <div className="container-x">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <span className="eyebrow text-[#a89a80]">08 / Beyond the Screen</span>
            <h2
              className="display text-[#f4ece0]"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', lineHeight: 0.9 }}
            >
              Off the clock
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm leading-relaxed text-[#a89a80] md:text-base">
            Football taught me to read pressure. Hackathons taught me to ship anyway. The rest is
            curiosity.
          </p>
        </div>

        <div className="flex flex-col gap-14 md:gap-20">
          {BEYOND.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="will-change-transform md:pl-[8%]"
              style={{ marginLeft: i % 2 === 1 ? '8%' : '0%' }}
            >
              <div className="flex flex-col gap-2 border-b border-[#211d16] pb-6 md:flex-row md:items-baseline md:gap-8">
                <span className="font-mono text-xs text-[#a89a80]">{item.index}</span>
                <div className="flex flex-col gap-2">
                  <h3
                    className="display text-[#f4ece0]"
                    style={{ fontSize: 'clamp(1.6rem, 4vw, 3.4rem)', lineHeight: 0.95 }}
                  >
                    {item.title}
                  </h3>
                  <p className="max-w-[48ch] text-sm text-[#a89a80] md:text-base">{item.detail}</p>
                </div>
                {item.href && (
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group ml-auto inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
                  >
                    GitHub
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

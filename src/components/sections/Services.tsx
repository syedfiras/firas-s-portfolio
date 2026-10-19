'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { MEDIA, prefersReducedMotion } from '@/lib/motion';
import { SERVICES } from '@/data/services';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.full, () => {
        const amount = () => track.scrollWidth - window.innerWidth + 80;

        const tween = gsap.to(track, {
          x: () => -amount(),
          ease: 'none',
        });

        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 0.8,
          animation: tween,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
            if (countRef.current) {
              const n = Math.min(cards.length, Math.floor(self.progress * cards.length) + 1);
              countRef.current.textContent = String(n).padStart(2, '0');
            }
          },
        });

        // Each card brightens as it crosses the center, dims toward the edges.
        const cardTweens = cards.map((card) => {
          const inner = card.querySelector('[data-card-inner]');
          if (!inner) return null;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left 92%',
              end: 'right 8%',
              scrub: true,
            },
          });
          tl.fromTo(
            inner,
            { autoAlpha: 0.58, scale: 0.94 },
            { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'none' },
          ).to(inner, { autoAlpha: 0.58, scale: 0.94, duration: 0.5, ease: 'none' });
          return tl;
        });

        return () => {
          cardTweens.forEach((t) => {
            t?.scrollTrigger?.kill();
            t?.kill();
          });
          st.kill();
          tween.kill();
        };
      });

      mm.add(MEDIA.lite, () => {
        const tweens = cards.map((card) =>
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 88%', once: true },
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
    <section id="services" ref={sectionRef} aria-label="What I Do" className="relative bg-void">
      <div className="services-viewport flex min-h-screen flex-col justify-center md:h-screen md:flex-row md:items-center md:justify-start md:overflow-hidden">
        <div
          ref={trackRef}
          className="services-track flex flex-col gap-6 px-5 py-24 md:h-full md:flex-row md:flex-nowrap md:items-center md:gap-8 md:px-10 md:py-0"
        >
          {/* Leading panel */}
          <div className="flex shrink-0 flex-col justify-center md:h-full md:w-[34vw] md:min-w-[34vw] md:pr-10">
            <span className="eyebrow mb-6">03 / What I Do</span>
            <h2
              className="display text-ink"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.9 }}
            >
              Capabilities
            </h2>
            <p className="mt-6 max-w-[34ch] text-ash">
              Six ways I help teams and founders ship software that holds up in production.
            </p>

            <div className="mt-8 hidden flex-col gap-3 md:flex">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
                Scroll → to explore
              </span>
              <div className="flex items-center gap-4">
                <span ref={countRef} className="font-mono text-xs tabular-nums text-ink">
                  01
                </span>
                <div className="h-px w-40 overflow-hidden bg-line">
                  <div
                    ref={progressRef}
                    className="h-full w-full origin-left scale-x-0 bg-accent"
                  />
                </div>
                <span className="font-mono text-xs text-smoke">
                  {String(SERVICES.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {SERVICES.map((service, i) => (
            <div
              key={service.index}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="w-full shrink-0 md:h-[64vh] md:w-[40vw] md:min-w-[40vw] lg:w-[32vw] lg:min-w-[32vw]"
            >
              <div
                data-card-inner
                className="flex h-full min-h-[360px] flex-col justify-between border border-line bg-carbon/40 p-7 md:p-9"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="display text-accent"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                  >
                    {service.index}
                  </span>
                  <span className="eyebrow">{String(SERVICES.length).padStart(2, '0')}</span>
                </div>

                <div className="flex flex-col gap-5">
                  <h3
                    className="display text-ink"
                    style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.6rem)', lineHeight: 0.95 }}
                  >
                    {service.title}
                  </h3>
                  <p className="max-w-[38ch] text-sm leading-relaxed text-ash">
                    {service.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ash"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

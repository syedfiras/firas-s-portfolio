'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { MEDIA, prefersReducedMotion } from '@/lib/motion';
import Reveal from '@/components/ui/Reveal';
import {
  ABOUT_BIO,
  ABOUT_SNAPSHOT,
  ABOUT_STATEMENT,
  PROFILE,
  STATS,
} from '@/data/profile';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Identity() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    const words = wordsRef.current.filter(Boolean);
    const stats = statRefs.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      const countUp = () => {
        STATS.forEach((stat, i) => {
          const el = stats[i];
          if (!el) return;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: stat.value,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onUpdate: () => {
              el.textContent = `${pad(Math.round(obj.v))}${stat.suffix}`;
            },
          });
        });
      };

      if (prefersReducedMotion()) {
        gsap.set(words, { autoAlpha: 1 });
        stats.forEach((el, i) => {
          el.textContent = `${pad(STATS[i].value)}${STATS[i].suffix}`;
        });
        return;
      }

      gsap.set(words, { autoAlpha: 0.15 });
      countUp();

      const mm = gsap.matchMedia();

      mm.add(MEDIA.full, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: '+=90%',
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.to(words, { autoAlpha: 1, duration: 0.2, stagger: 0.14, ease: 'none' });
        return () => tl.scrollTrigger?.kill();
      });

      mm.add([MEDIA.lite, MEDIA.reduce], () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        });
        tl.to(words, { autoAlpha: 1, duration: 0.2, stagger: 0.14, ease: 'none' });
        return () => tl.scrollTrigger?.kill();
      });

      return () => {
        mm.revert();
        ScrollTrigger.refresh();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const statementWords = ABOUT_STATEMENT.split(' ');

  return (
    <section id="about" ref={sectionRef} aria-label="Identity" className="relative bg-void">
      {/* Statement — pinned, words fill 15% → 100% opacity */}
      <div ref={wrapRef} className="flex min-h-screen items-center">
        <div className="container-x w-full">
          <Reveal className="mb-8 flex items-center gap-4">
            <span className="eyebrow">02 / Identity</span>
            <span className="h-px flex-1 bg-line" />
          </Reveal>

          <h2
            className="display max-w-[18ch] text-ink"
            style={{ fontSize: 'clamp(2rem, 5.6vw, 5.5rem)', lineHeight: 0.95 }}
          >
            {statementWords.map((w, i) => (
              <span key={`${w}-${i}`}>
                <span
                  ref={(el) => {
                    if (el) wordsRef.current[i] = el;
                  }}
                  className="inline"
                >
                  {w}
                </span>{' '}
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Portrait + bio + facts */}
      <div className="container-x grid grid-cols-1 gap-16 pb-28 md:grid-cols-12 md:gap-12 md:pb-40">
        <Reveal className="md:col-span-3">
          <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden border border-line bg-carbon md:max-w-none">
            <Image
              src="/profile.png"
              alt={`${PROFILE.name} — portrait`}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              quality={78}
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={0.06} className="md:col-span-4">
          <p className="max-w-[46ch] text-lg leading-relaxed text-ash md:text-xl">{ABOUT_BIO}</p>
        </Reveal>

        <div className="md:col-span-4 md:col-start-9">
          <dl className="border-t border-line">
            {ABOUT_SNAPSHOT.map((row, i) => (
              <Reveal
                key={row.label}
                delay={i * 0.05}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4"
              >
                <dt className="eyebrow shrink-0">{row.label}</dt>
                <dd className="text-right text-sm text-ink md:text-base">{row.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      {/* Stats count-up */}
      <div className="container-x grid grid-cols-1 gap-10 border-t border-line py-16 sm:grid-cols-3 md:py-24">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <span
              ref={(el) => {
                statRefs.current[i] = el;
              }}
              className="display text-ink"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              {pad(stat.value)}
              {stat.suffix}
            </span>
            <span className="eyebrow max-w-[22ch]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

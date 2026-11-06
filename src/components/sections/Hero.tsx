'use client';

import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { useLenis } from '@/lib/lenis';
import { onIntroDone } from '@/lib/intro';
import { MEDIA, prefersReducedMotion } from '@/lib/motion';
import Particles from '@/components/ui/Particles';
import HeroVideo from '@/components/ui/HeroVideo';
import Magnetic from '@/components/ui/Magnetic';
import { HERO_WORDS, PROFILE } from '@/data/profile';

const NAME = PROFILE.firstName.toUpperCase();
const NAME_SIZE = 'clamp(2.8rem, 14vw, 15rem)';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitZoomRef = useRef<HTMLDivElement>(null);
  const portraitFadeRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const maskRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { scrollTo } = useLenis();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const masks = maskRefs.current.filter(Boolean) as HTMLSpanElement[];
    const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 115 });
      gsap.set(words, { autoAlpha: 0, y: 20 });
      gsap.set(portraitRef.current, { yPercent: 115 });
      gsap.set(portraitFadeRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(uiRef.current, { autoAlpha: 0, y: 18 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to(chars, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.045 })
        .to(portraitRef.current, { yPercent: 0, duration: 1.1, ease: 'expo.out' }, 0.2)
        .to(uiRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

      const stop = onIntroDone(() => intro.play());

      if (prefersReducedMotion()) {
        gsap.set(chars, { autoAlpha: 1, yPercent: 0 });
        gsap.set(words, { autoAlpha: 1, y: 0 });
        gsap.set(portraitRef.current, { yPercent: 0 });
        gsap.set(uiRef.current, { autoAlpha: 1, y: 0 });
        return stop;
      }

      const mm = gsap.matchMedia();

      mm.add(MEDIA.full, () => {
        const spreadX = (i: number) => (i - (NAME.length - 1) / 2) * 30;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=200%',
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(masks, { x: (i: number) => spreadX(i), duration: 0.5, ease: 'none' }, 0)
          .to(nameRef.current, { scale: 1.7, duration: 1, ease: 'none' }, 0)
          .to(portraitZoomRef.current, { scale: 1.3, duration: 0.6, ease: 'none' }, 0)
          .to(bgRef.current, { scale: 1.32, yPercent: -8, duration: 1, ease: 'none' }, 0)
          .to(nameRef.current, { autoAlpha: 0.12, duration: 0.5, ease: 'none' }, 0.42)
          .to(portraitFadeRef.current, { autoAlpha: 0, y: -36, duration: 0.3, ease: 'none' }, 0.4)
          .to(uiRef.current, { autoAlpha: 0, y: -24, duration: 0.22, ease: 'none' }, 0.12)
          .to(bgRef.current, { autoAlpha: 0.45, duration: 0.55, ease: 'none' }, 0.42)
          .to(words[0], { autoAlpha: 1, y: 0, duration: 0.2, ease: 'none' }, 0.46)
          .to(words[1], { autoAlpha: 1, y: 0, duration: 0.2, ease: 'none' }, 0.64)
          .to(words[2], { autoAlpha: 1, y: 0, duration: 0.2, ease: 'none' }, 0.82)
          .to(nameRef.current, { autoAlpha: 0, duration: 0.3, ease: 'none' }, 0.6)
          .to(uiRef.current, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'none' }, 0.9);

        return () => tl.scrollTrigger?.kill();
      });

      mm.add([MEDIA.lite, MEDIA.reduce], () => {
        gsap.set(nameRef.current, { autoAlpha: 1 });
        const t = gsap.to(words, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.3,
          ease: 'power3.out',
        });
        return () => t.kill();
      });

      return () => {
        stop();
        mm.revert();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Intro"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-void pb-8 pt-24 md:pb-10 md:pt-28"
    >
      {/* Background video */}
      <div ref={bgRef} className="absolute inset-0 z-10 will-change-transform">
        <HeroVideo />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-20">
        <Particles />
      </div>

      {/* Name + word row */}
      <div className="pointer-events-none relative z-30 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <div
          className="relative flex w-full items-center justify-center"
          style={{ '--name-size': NAME_SIZE } as CSSProperties}
        >
          <h1
            ref={nameRef}
            className="display font-hero select-none text-ink"
            style={{ fontSize: 'var(--name-size)', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            {NAME.split('').map((c, i) =>
              c === ' ' ? (
                <span key={`sp-${i}`} className="inline-block w-[0.2em]" aria-hidden />
              ) : (
                <span
                  key={`m-${i}`}
                  ref={(el) => {
                    maskRefs.current[i] = el;
                  }}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <span
                    ref={(el) => {
                      charRefs.current[i] = el;
                    }}
                    className="inline-block will-change-transform"
                  >
                    {c}
                  </span>
                </span>
              ),
            )}
          </h1>

          <figure
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <div ref={portraitZoomRef} className="will-change-transform">
              <div className="overflow-hidden p-4 md:p-6">
                <div ref={portraitRef} className="relative will-change-transform">
                  <div ref={portraitFadeRef} className="relative">
                    <div className="absolute left-1/2 top-1/2 -z-10 h-[74%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[64px]" />
                    <Image
                      src="/firasanimitaed.png"
                      alt=""
                      width={1024}
                      height={1536}
                      priority
                      sizes="(min-width: 768px) 36vw, 60vw"
                      className="h-[clamp(10rem,30vh,16rem)] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] md:h-[clamp(18rem,50vh,34rem)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>

        <div className="relative z-20 mt-6 flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1 md:mt-10 md:gap-x-12">
          {HERO_WORDS.map((w, i) => (
            <span
              key={w}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="display font-hero text-ink"
              style={{ fontSize: 'clamp(1.6rem, 7vw, 7rem)', letterSpacing: '0.02em', lineHeight: 1 }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Status chip + CTAs */}
      <div
        ref={uiRef}
        className="relative z-40 flex flex-col gap-5 px-5 md:flex-row md:items-end md:justify-between md:px-10"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => scrollTo('#work', { offset: 0, duration: 1.4 })}
                className="group inline-flex items-center gap-3 border border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-void"
              >
                View Work
                <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ash transition-colors hover:border-accent hover:text-accent"
              >
                Start a Project
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="hidden flex-col items-end gap-1 md:flex">
          <span className="eyebrow">{PROFILE.role}</span>
          <span className="eyebrow text-smoke">{PROFILE.location}</span>
        </div>
      </div>
    </section>
  );
}

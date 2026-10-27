'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { MEDIA, prefersReducedMotion } from '@/lib/motion';
import Reveal from '@/components/ui/Reveal';
import SplitText from '@/components/ui/SplitText';
import { Github } from '@/components/icons';
import { PROJECTS } from '@/data/projects';

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const wrappers = wrapRefs.current.filter(Boolean) as HTMLDivElement[];
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const imgs = imgRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.full, () => {
        const triggers: ScrollTrigger[] = [];

        // Stack: each previous card scales down + dims as the next covers it.
        for (let i = 0; i < cards.length - 1; i += 1) {
          const t = gsap.to(cards[i], {
            scale: 0.92,
            autoAlpha: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: wrappers[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          });
          if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        }

        // Inner-image parallax.
        imgs.forEach((img, i) => {
          const t = gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: wrappers[i],
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
          if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        });

        return () => triggers.forEach((t) => t.kill());
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
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
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
    <section id="work" ref={sectionRef} aria-label="Selected work" className="relative bg-void">
      <div className="container-x pt-24 pb-14 md:pt-32 md:pb-20">
        <Reveal className="flex items-center gap-4">
          <span className="eyebrow">
            {String(PROJECTS.length).padStart(2, '0')} / Selected Work
          </span>
          <span className="h-px flex-1 bg-line" />
          <span className="eyebrow hidden sm:block">
            {String(PROJECTS.length).padStart(2, '0')} Projects
          </span>
        </Reveal>
        <SplitText
          as="h2"
          text="Selected Work"
          className="display mt-8 text-ink"
          style={{ fontSize: 'clamp(2.4rem, 6.5vw, 6rem)', lineHeight: 0.9 }}
          by="lines"
        />
      </div>

      <div>
        {PROJECTS.map((project, i) => (
          <div
            key={project.slug}
            ref={(el) => {
              wrapRefs.current[i] = el;
            }}
            className="relative md:sticky md:top-0 md:h-screen"
          >
            <div className="h-full px-3 py-3 md:px-6 md:py-6">
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group relative h-auto min-h-[70vh] overflow-hidden border border-line bg-carbon md:h-full md:min-h-0"
              >
                <div
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  className="absolute inset-0 scale-110 will-change-transform"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — project interface`}
                    fill
                    sizes="(min-width: 768px) 100vw, 100vw"
                    quality={78}
                    className="object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/85 to-void/35" />
                <div className="absolute inset-0 bg-void/20" />

                <div className="relative z-20 flex h-full min-h-[70vh] flex-col justify-between p-6 md:min-h-0 md:p-10">
                  <div className="flex items-start justify-between">
                    {project.live ? (
                      <span className="inline-flex items-center gap-2 border border-line bg-void/50 px-3 py-1.5 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                          Live
                        </span>
                      </span>
                    ) : (
                      <span aria-hidden />
                    )}
                    <span className="eyebrow text-ink">{project.category}</span>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-accent">{project.id}</span>
                      <h3
                        className="display max-w-[16ch] text-ink"
                        style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', lineHeight: 0.9 }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <p className="max-w-[52ch] text-sm text-ash md:text-base">
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-5 pt-1 md:flex-row md:items-center md:justify-between">
                      <ul className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-6">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
                          >
                            Live <ArrowUpRight size={13} />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
                          >
                            GitHub <Github size={13} />
                          </a>
                        )}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
                        >
                          Case Study <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container-x py-16 md:py-24">
        <Reveal>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-4 border-t border-line pt-6 font-display text-2xl uppercase text-ink transition-colors hover:text-accent md:text-4xl"
          >
            View All Projects
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

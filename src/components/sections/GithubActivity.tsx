'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import Reveal from '@/components/ui/Reveal';
import { Github } from '@/components/icons';
import { buildSnapshot, type ContribDay } from '@/data/github';
import { PROFILE } from '@/data/profile';

const LEVEL_BG = [
  'rgba(255,255,255,0.06)',
  'rgba(198,255,61,0.28)',
  'rgba(198,255,61,0.5)',
  'rgba(198,255,61,0.74)',
  '#c6ff3d',
];

export default function GithubActivity() {
  const [days, setDays] = useState<ContribDay[]>(() => buildSnapshot());
  const [source, setSource] = useState<'github' | 'fallback'>('fallback');
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ac = new AbortController();
    fetch('/api/github', { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad response'))))
      .then((data: { days: ContribDay[]; source: 'github' | 'fallback' }) => {
        if (Array.isArray(data.days) && data.days.length) {
          setDays(data.days);
          setSource(data.source);
        }
      })
      .catch(() => {});
    return () => ac.abort();
  }, []);

  const total = useMemo(
    () => days.reduce((sum, d) => sum + (d.count || 0), 0),
    [days],
  );

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cells = grid.querySelectorAll('[data-cell]');
    if (!cells.length) return;

    if (prefersReducedMotion()) {
      gsap.set(cells, { autoAlpha: 1, scale: 1 });
      return;
    }

    const anim = gsap.fromTo(
      cells,
      { scale: 0.2, autoAlpha: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: { each: 0.006, grid: [7, Math.ceil(cells.length / 7)], from: 'start', axis: 'x' },
        scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
      },
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [days]);

  return (
    <section id="github" aria-label="GitHub activity" className="relative border-t border-line bg-void py-24 md:py-32">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">09 / Activity</span>
            <h2
              className="display text-ink"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', lineHeight: 0.9 }}
            >
              Days I ship.
            </h2>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <span className="font-mono text-4xl text-ink tabular-nums md:text-5xl">
              {total > 0 ? total.toLocaleString() : '—'}
            </span>
            <span className="eyebrow">contributions this year</span>
          </div>
        </div>

        <Reveal>
          <div className="no-scrollbar overflow-x-auto pb-2">
            <div
              ref={gridRef}
              className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
              role="img"
              aria-label={`GitHub contribution calendar for @${PROFILE.githubHandle}`}
            >
              {days.map((day) => (
                <span
                  key={day.date}
                  data-cell
                  title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                  className="h-[11px] w-[11px] rounded-[2px]"
                  style={{ backgroundColor: LEVEL_BG[day.level] ?? LEVEL_BG[0] }}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-5 md:flex-row md:items-center md:justify-between">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
            <Github size={13} /> @{PROFILE.githubHandle} ·{' '}
            {source === 'github' ? 'Live from GitHub' : 'Cached snapshot'}
          </span>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
          >
            View on GitHub
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

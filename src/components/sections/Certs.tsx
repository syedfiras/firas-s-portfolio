'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { CERTIFICATIONS, EDUCATION } from '@/data/certs';
import { PROFILE } from '@/data/profile';

export default function Certs() {
  return (
    <section id="certs" aria-label="Certifications and education" className="relative bg-void py-24 md:py-32">
      <div className="container-x">
        <Reveal className="mb-14 flex items-center gap-4 md:mb-20">
          <span className="eyebrow">07 / Certifications</span>
          <span className="h-px flex-1 bg-line" />
        </Reveal>

        <div className="border-t border-line">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.05}>
              <div className="group grid grid-cols-1 items-baseline gap-2 border-b border-line py-6 transition-colors duration-300 hover:bg-carbon/50 md:grid-cols-12 md:gap-6 md:py-8">
                <span className="eyebrow md:col-span-2">{cert.year}</span>

                <span
                  className="font-display text-xl uppercase leading-none text-ink transition-transform duration-300 md:col-span-6 md:text-3xl group-hover:translate-x-2 group-hover:text-accent"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cert.title}
                </span>

                <span className="text-sm text-ash md:col-span-3">{cert.issuer}</span>

                <span className="flex flex-wrap gap-2 md:col-span-1 md:justify-end">
                  <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-smoke transition-all duration-500 group-hover:max-w-[16rem] md:inline-block">
                    {cert.tags.join(' · ')}
                  </span>
                  <span className="flex flex-wrap gap-2 md:hidden">
                    {cert.tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-[0.12em] text-smoke">
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Education */}
        <Reveal className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 gap-6 border border-line p-7 md:grid-cols-12 md:items-center md:p-10">
            <span className="eyebrow md:col-span-2">{EDUCATION.period}</span>
            <div className="flex flex-col gap-1 md:col-span-7">
              <h3
                className="display text-ink"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)' }}
              >
                {EDUCATION.degree}
              </h3>
              <span className="text-sm text-ash">
                {EDUCATION.school} · {EDUCATION.note}
              </span>
            </div>
            <span className="eyebrow md:col-span-3 md:text-right">Education</span>
          </div>
        </Reveal>

        {/* Always learning */}
        <div className="mt-24 flex flex-col gap-8 md:mt-32 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2
              className="display text-ink"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 6.5rem)', lineHeight: 0.88 }}
            >
              Always learning.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              View Resume
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

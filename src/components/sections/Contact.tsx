'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useLenis } from '@/lib/lenis';
import Magnetic from '@/components/ui/Magnetic';
import Reveal from '@/components/ui/Reveal';
import { Github, Linkedin } from '@/components/icons';
import { CONTACT_LINKS, PROFILE } from '@/data/profile';

export default function Contact() {
  const { scrollTo } = useLenis();

  return (
    <footer id="contact" aria-label="Contact" className="relative overflow-hidden border-t border-line bg-void pt-24 md:pt-32">
      <div className="container-x">
        <Reveal className="mb-10 flex items-center gap-4">
          <span className="eyebrow">10 / Contact</span>
          <span className="h-px flex-1 bg-line" />
          <span className="eyebrow hidden sm:block">{PROFILE.status}</span>
        </Reveal>

        <Reveal>
          <h2
            className="display max-w-[14ch] text-ink"
            style={{ fontSize: 'clamp(2.6rem, 9vw, 9rem)', lineHeight: 0.88 }}
          >
            Let&rsquo;s make something{' '}
            <span className="relative inline-block text-accent">
              good
              <span className="absolute inset-x-0 bottom-[0.04em] h-[0.06em] bg-accent" />
            </span>
            .
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-12 md:mt-20 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${PROFILE.email}`}
                className="group inline-flex items-center gap-4 bg-accent px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-void"
              >
                Let&rsquo;s Talk
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="flex flex-col gap-4">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group flex items-baseline gap-4 border-b border-line pb-3 transition-colors hover:border-accent"
                  >
                    <span className="eyebrow w-16 shrink-0">{link.label}</span>
                    <span className="text-base text-ink transition-colors group-hover:text-accent md:text-lg">
                      {link.value}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="ml-auto text-smoke transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Footer bar */}
        <div className="mt-20 flex flex-col gap-6 border-t border-line py-8 md:mt-28 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
            © 2026 {PROFILE.name}
          </span>

          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
            {PROFILE.role} · {PROFILE.location}
          </span>

          <div className="flex items-center gap-5">
            <Link
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-smoke transition-colors hover:text-ink"
            >
              <Github size={16} />
            </Link>
            <Link
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-smoke transition-colors hover:text-ink"
            >
              <Linkedin size={16} />
            </Link>
            <button
              type="button"
              onClick={() => scrollTo(0, { duration: 1.6 })}
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-accent"
            >
              Back to top
              <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Oversized name watermark */}
      <div
        aria-hidden
        className="display pointer-events-none select-none whitespace-nowrap px-5 text-center leading-none text-ink/[0.04] md:px-10"
        style={{ fontSize: 'clamp(4rem, 22vw, 20rem)' }}
      >
        {PROFILE.name}
      </div>
    </footer>
  );
}

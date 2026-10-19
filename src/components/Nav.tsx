'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLenis } from '@/lib/lenis';
import { onIntroDone } from '@/lib/intro';
import { NAV, PROFILE } from '@/data/profile';

export default function Nav() {
  const { scrollTo } = useLenis();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setShown(true);
      return;
    }
    return onIntroDone(() => setShown(true));
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith('#') || !isHome) return;
    e.preventDefault();
    setOpen(false);
    scrollTo(href, { offset: 0, duration: 1.4 });
  };

  const resolve = (href: string) => (href.startsWith('#') && !isHome ? `/${href}` : href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-[opacity,transform] duration-700 ${
        shown ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
    >
      <div
        className={`flex justify-center px-4 transition-[padding] duration-500 ${
          scrolled ? 'pt-3' : 'pt-0'
        }`}
      >
        <motion.nav
          layout
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 32 }}
          className={`flex items-center transition-colors duration-500 ${
            scrolled
              ? 'h-12 w-auto max-w-fit gap-5 rounded-full border border-line bg-carbon/80 px-5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.75)] backdrop-blur-md'
              : 'h-16 w-full max-w-[96rem] justify-between gap-8 bg-transparent px-5 md:h-20 md:px-10 xl:px-16'
          }`}
          aria-label="Primary"
        >
          <motion.div layout="position">
            <Link
              href="/"
              className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink"
            >
              {PROFILE.firstName} {PROFILE.lastName}
            </Link>
          </motion.div>

          <motion.div layout="position" className="hidden items-center gap-8 md:flex">
            {NAV.filter((n) => !n.external).map((item) => (
              <a
                key={item.label}
                href={resolve(item.href)}
                onClick={(e) => go(e, item.href)}
                className="group relative font-mono text-xs uppercase tracking-[0.18em] text-ash transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-accent"
            >
              Resume <ArrowUpRight size={12} />
            </a>
          </motion.div>

          <motion.div layout="position" className="flex md:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center justify-center"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="nav-menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-2 border border-line bg-carbon/95 p-6 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={resolve(item.href)}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    onClick={(e) => go(e, item.href)}
                    className="flex items-center justify-between font-display text-2xl uppercase text-ink"
                  >
                    {item.label}
                    <ArrowUpRight size={16} className="text-smoke" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

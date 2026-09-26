'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function ProjectNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'nav-open' : ''}`}>
      <div className="container nav-inner">
        <Link href="/" className="nav-logo" onClick={closeMenu}>Syed Firas</Link>
        <div className="nav-links">
          <Link href="/#work"    className="nav-link">Work</Link>
          <Link href="/#about"   className="nav-link">About</Link>
          <Link href="/#contact" className="nav-link">Contact</Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-resume"
          >
            Resume <ArrowRight size={11} />
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="nav-mobile"
              className="nav-mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/#work" className="nav-mobile-link" onClick={closeMenu}>
                Work <ArrowRight size={13} />
              </Link>
              <Link href="/#about" className="nav-mobile-link" onClick={closeMenu}>
                About <ArrowRight size={13} />
              </Link>
              <Link href="/#contact" className="nav-mobile-link" onClick={closeMenu}>
                Contact <ArrowRight size={13} />
              </Link>
              <span className="nav-mobile-sep" aria-hidden />
              <Link href="/projects" className="nav-mobile-link" onClick={closeMenu}>
                All Projects <ArrowRight size={13} />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="nav-mobile-link"
                onClick={closeMenu}
              >
                Resume <ArrowRight size={13} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

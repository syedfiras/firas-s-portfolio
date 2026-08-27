'use client';

import { useState } from 'react';

interface NavProps {
  s: (index: number) => string;
}

export default function Nav({ s }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav ${s(0)}`} data-index={0}>
      <a href="#hero" className="nav__logo" onClick={closeMenu}>
        Syed Firas Peerzada
        <span className="nav__cursor" />
      </a>

      <button
        className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
        <a href="/#work" className="nav__link" onClick={closeMenu}>
          Work
        </a>
        <a href="/#identity" className="nav__link" onClick={closeMenu}>
          About
        </a>
        <a href="/#contact" className="nav__link" onClick={closeMenu}>
          Contact
        </a>
      </div>
    </nav>
  );
}
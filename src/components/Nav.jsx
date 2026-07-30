import React from "react";

export default function Nav({ s }) {
  return (
    <nav className={`nav ${s(0)}`} data-index={0}>
      <a href="#hero" className="nav__logo">
        Syed Firas Peerzada
        <span className="nav__cursor" />
      </a>
      <div className="nav__links">
        <a href="#work" className="nav__link">
          Work
        </a>
        <a href="#identity" className="nav__link">
          About
        </a>
        <a href="#contact" className="nav__link">
          Contact
        </a>
      </div>
    </nav>
  );
}

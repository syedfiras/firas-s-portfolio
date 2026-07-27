import React from 'react';

export default function Footer({ s }) {
  return (
    <footer className={`footer ${s(6)}`} data-index={6}>
      <span className="footer__copy">© {new Date().getFullYear()} SYED FIRAS.</span>
      <span className="footer__tagline">Built with raw code. No templates.</span>
      <span className="footer__location">SYS.ARCH.001 // NO RIGHTS RESERVED</span>
    </footer>
  );
}

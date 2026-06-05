import React from 'react';
import { CONTACT_LINKS } from '../data';

export default function Contact({ s }) {
  return (
    <section className={`contact ${s(5)}`} id="contact">
      <div className="contact__left">
        <h2 className="contact__headline">
          LET'S<br />
          <span className="contact__headline-rust">BUILD</span><br />
          <span className="contact__headline-hollow">TOGETHER.</span>
        </h2>
        <a href="mailto:syedfiras@email.com" className="contact__cta-btn">
          Initiate Contact →
        </a>
      </div>

      <div className="contact__right">
        <div className="contact__links">
          {CONTACT_LINKS.map((link, i) => (
            <a href={link.href} className="contact__link-row" key={i} target="_blank" rel="noopener noreferrer">
              <span className="contact__link-label">{link.label}</span>
              <span className="contact__link-value">{link.value}</span>
            </a>
          ))}
        </div>
        <div className="contact__avail">
          <div className="contact__avail-text">CURRENTLY ACCEPTING NEW PROJECTS</div>
          <div className="contact__avail-sub">Available for Q3-Q4 2025 engagements</div>
        </div>
      </div>
    </section>
  );
}

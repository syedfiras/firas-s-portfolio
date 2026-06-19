import React, { useState, useEffect } from 'react';
import profilePhoto from '../assets/profile.png';
import resumeFile from '../assets/Syed_Firas_Resume (1).docx?url';

export default function Hero({ s }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  return (
    <section className={`hero ${s(1)}`} id="hero">
      <div className="hero__left">
        <div className="hero__avail">
          <div className="hero__avail-bar" />
          <span className="hero__avail-text">Available for Freelance // Q3 2025</span>
        </div>

        <div className="hero__headline">
          <div className="hero__headline-line">BUILD</div>
          <div className="hero__headline-line hero__headline-line--rust">SHIP</div>
          <div className="hero__headline-line hero__headline-line--hollow">REPEAT</div>
        </div>

        <div className="hero__widgets">
          <div className="hero__widget">
            <span className="hero__widget-label">SYS_STATUS</span>
            <span className="hero__widget-val hero__widget-val--acid">ONLINE</span>
          </div>
          <div className="hero__widget">
            <span className="hero__widget-label">LOCATION</span>
            <span className="hero__widget-val">KARNATAKA, IN</span>
          </div>
          <div className="hero__widget">
            <span className="hero__widget-label">LOCAL_TIME</span>
            <span className="hero__widget-val">{formattedTime} HRS</span>
          </div>
        </div>

        <div className="hero__bottom">
          <p className="hero__desc">
            App developer and frontend engineer building functional, high-performance digital products.
            Native mobile. Web interfaces. No fluff.
          </p>
          <div className="hero__ctas">
            <a href="#contact" className="hero__cta hero__cta--primary">Start a Project →</a>
            <a href="#work" className="hero__cta hero__cta--secondary">View Work →</a>
            <a href={resumeFile} download="Syed_Firas_Resume.docx" className="hero__cta hero__cta--secondary">Download Resume ↓</a>
          </div>
        </div>
      </div>

      <div className="hero__right">
        <div className="hero__quote-container">
          <blockquote className="hero__quote">
            "Design is not just what it looks like and feels like. Design is how it works."
          </blockquote>
          <div className="hero__quote-author">— Syed Firas Peerzada</div>
        </div>
        <div className="hero__stats-row">
          <div className="hero__stat">
            <span className="hero__stat-label">Years of Experience</span>
            <div className="hero__stat-number">03+</div>
            <span className="hero__stat-sub">Building Digital Products</span>
            <span className="hero__stat-ghost" aria-hidden="true">03</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-label">Projects Delivered</span>
            <div className="hero__stat-number">20+</div>
            <span className="hero__stat-sub">Mobile & Web Applications</span>
            <span className="hero__stat-ghost" aria-hidden="true">20</span>
          </div>
        </div>
      </div>
    </section>
  );
}

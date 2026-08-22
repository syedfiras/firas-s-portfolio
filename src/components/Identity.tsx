'use client';

import { useState } from 'react';
import { EXPERIENCE, SKILLS } from '@/data';

interface IdentityProps {
  s: (index: number) => string;
}

type Tab = 'ABOUT' | 'EXPERIENCE' | 'TOOLKIT';

export default function Identity({ s }: IdentityProps) {
  const [activeTab, setActiveTab] = useState<Tab>('ABOUT');
  const [openExp, setOpenExp] = useState<number | null>(null);

  return (
    <section className={`identity ${s(4)}`} id="identity" data-index={4}>
      <div className="section-header">
        <h2 className="section-header__title">Identity</h2>
        <div className="section-header__rule" />
        <span className="section-header__count">Profile</span>
      </div>

      <div className="identity__tabs">
        <button
          className={`identity__tab ${activeTab === 'ABOUT' ? 'active' : ''}`}
          onClick={() => setActiveTab('ABOUT')}
        >
          // ABOUT
        </button>
        <button
          className={`identity__tab ${activeTab === 'EXPERIENCE' ? 'active' : ''}`}
          onClick={() => setActiveTab('EXPERIENCE')}
        >
          // EXPERIENCE
        </button>
        <button
          className={`identity__tab ${activeTab === 'TOOLKIT' ? 'active' : ''}`}
          onClick={() => setActiveTab('TOOLKIT')}
        >
          // TOOLKIT
        </button>
      </div>

      {activeTab === 'ABOUT' && (
        <div className="identity__about">
          <div className="identity__about-copy">
          <div className="identity__about-tag">// About Me</div>
          <h3 className="identity__about-headline">
            I BUILD THINGS THAT <span>WORK.</span> NO DECORATION FOR
            DECORATION&apos;S SAKE.
          </h3>
          <p className="identity__about-body">
            I&apos;m Syed Firas Peerzada — a full stack developer currently
            interning as an SDE at Dream Space Interiors, Bangalore. I build
            mobile applications and web systems that are fast, accessible, and
            built to last. Every pixel is intentional. Every component earns its
            place. I ship products that people actually use, not prototypes that
            collect dust.
          </p>
          <div className="identity__about-tag" style={{ marginTop: 40 }}>
            // Extracurricular
          </div>
          <ul className="identity__extra-list">
            <li className="identity__extra-item">
              <strong>AIFF Certified Referee</strong> — Certified by the All
              India Football Federation, reflecting sharp decision-making, rule
              mastery, and composure under pressure.
            </li>
            <li className="identity__extra-item">
              <strong>4× State Level Football Player</strong> — Represented at
              the state level in football across four tournaments.
            </li>
          </ul>
          </div>
          <div className="identity__contributions">
            <div className="identity__about-tag">GitHub contributions</div>
            <a
              href="https://github.com/syedfiras"
              target="_blank"
              rel="noopener noreferrer"
              className="identity__contributions-link"
            >
              <img
                src="https://ghchart.rshah.org/3f7068/syedfiras"
                alt="GitHub contribution graph for Syed Firas"
                className="identity__contributions-graph"
              />
              <span>View my activity on GitHub →</span>
            </a>
          </div>
        </div>
      )}

      {activeTab === 'EXPERIENCE' && (
        <div className="identity__experience">
          {EXPERIENCE.map((exp, i) => {
            const isOpen = openExp === i;
            return (
              <div
                className={`identity__exp-card ${isOpen ? 'identity__exp-card--open' : ''}`}
                key={i}
              >
                <button
                  className="identity__exp-row"
                  onClick={() => setOpenExp(isOpen ? null : i)}
                >
                  <span className="identity__exp-year">{exp.year}</span>
                  <div className="identity__exp-info">
                    <div className="identity__exp-role">{exp.role}</div>
                    <div className="identity__exp-company">{exp.company}</div>
                  </div>
                  <span className="identity__exp-badge">{exp.type}</span>
                  <span className="identity__exp-toggle">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`identity__exp-collapse ${isOpen ? 'identity__exp-collapse--open' : ''}`}
                >
                  <p className="identity__exp-desc">{exp.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'TOOLKIT' && (
        <div className="identity__skills">
          {SKILLS.map((col, i) => (
            <div className="identity__skill-col" key={i}>
              <div className="identity__skill-cat">{col.category}</div>
              <ul className="identity__skill-list">
                {col.items.map((skill, j) => (
                  <li className="identity__skill-item" key={j}>
                    {skill}
                  </li>
                ))}
              </ul>
              <span className="identity__skill-ghost" aria-hidden="true">
                {col.ghost}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

import React, { useState } from 'react';
import { PROJECTS } from '../data';

export default function Work({ s }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`work ${s(3)}`} id="work">
      <div className="section-header">
        <h2 className="section-header__title">Selected Work</h2>
        <div className="section-header__rule" />
        <span className="section-header__count">Missions [{String(PROJECTS.length).padStart(2, '0')}]</span>
      </div>

      <div className="work__cards">
        {PROJECTS.map((proj) => {
          const isOpen = openId === proj.id;
          return (
            <div className={`work__card ${isOpen ? 'work__card--open' : ''}`} key={proj.id}>
              <button
                className="work__card-header"
                onClick={() => toggle(proj.id)}
                aria-expanded={isOpen}
              >
                <span className="work__card-id">MISSION_ID: {proj.id}</span>
                <span className="work__card-title-preview">{proj.title}</span>
                <span className="work__card-type">{proj.type}</span>
                <span className="work__card-toggle">{isOpen ? '−' : '+'}</span>
              </button>

              <div className={`work__card-collapse ${isOpen ? 'work__card-collapse--open' : ''}`}>
                <div className="work__card-body">
                  <div className="work__card-info">
                    <h3 className="work__card-title">{proj.title}</h3>
                    <p className="work__card-desc">{proj.desc}</p>
                  </div>

                  <div className="work__card-metrics">
                    <div className="work__metrics-title">// Key Metrics & Features:</div>
                    <ul className="work__metrics-list">
                      {proj.metrics.map((metric, j) => (
                        <li key={j}><span>{metric}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="work__card-footer">
                  <div className="work__card-stack">
                    {proj.stack.map((tech, j) => (
                      <span className="work__card-tech" key={j}>{tech}</span>
                    ))}
                  </div>
                  <div className="work__card-actions">
                    <a href={proj.links.source} className="work__card-action work__card-action--primary">GET_SOURCE</a>
                    {proj.links.preview && (
                      <a href={proj.links.preview} className="work__card-action work__card-action--secondary">LAUNCH_PREVIEW</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

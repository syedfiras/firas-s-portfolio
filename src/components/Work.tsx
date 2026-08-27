'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FEATURED_PROJECTS, Project } from '@/data';
import WorkCard from './WorkCard';
import ProjectModal from './ProjectModal';

interface WorkProps {
  s: (index: number) => string;
}

export default function Work({ s }: WorkProps) {
  const [modalProj, setModalProj] = useState<Project | null>(null);
  const [privateProj, setPrivateProj] = useState<Project | null>(null);

  return (
    <>
      <section className={`work ${s(3)}`} id="work" data-index={3}>
        <div className="section-header">
          <h2 className="section-header__title">Selected Work</h2>
          <div className="section-header__rule" />
          <span className="section-header__count">
            Missions [{String(FEATURED_PROJECTS.length).padStart(2, '0')}]
          </span>
          <Link href="/projects" className="section-header__action">
            View All Projects →
          </Link>
        </div>

        <div className="work__grid">
          {FEATURED_PROJECTS.map((proj) => (
            <WorkCard key={proj.id} proj={proj} variant="home" onInProgress={setModalProj} onPrivate={setPrivateProj} />
          ))}
        </div>
      </section>

      <ProjectModal open={!!modalProj} title={modalProj?.title} onClose={() => setModalProj(null)} />
      <ProjectModal open={!!privateProj} title={privateProj?.title} variant="private" onClose={() => setPrivateProj(null)} />
    </>
  );
}
'use client';

import { useState } from 'react';
import { PROJECTS, Project } from '@/data';
import WorkCard from './WorkCard';
import ProjectModal from './ProjectModal';

export default function ProjectsGrid() {
  const [modalProj, setModalProj] = useState<Project | null>(null);
  const [privateProj, setPrivateProj] = useState<Project | null>(null);

  return (
    <>
      <div className="work__grid projects__grid">
        {PROJECTS.map((proj) => (
          <WorkCard key={proj.id} proj={proj} variant="projects" onInProgress={setModalProj} onPrivate={setPrivateProj} />
        ))}
      </div>

      <ProjectModal open={!!modalProj} title={modalProj?.title} onClose={() => setModalProj(null)} />
      <ProjectModal open={!!privateProj} title={privateProj?.title} variant="private" onClose={() => setPrivateProj(null)} />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data';
import ProjectsGrid from '@/components/ProjectsGrid';

export const metadata: Metadata = {
  title: 'All Projects',
  description: 'All projects by Syed Firas Peerzada — BIFA, GymNet, IJESTM, Auction Football, FootballCoachAI and more.',
};

export default function ProjectsPage() {
  return (
    <main className="projects">
      <div className="projects__header">
        <div className="section-header projects__section-header">
          <h1 className="section-header__title">All Projects</h1>
          <div className="section-header__rule" />
          <span className="section-header__count">Missions [{String(PROJECTS.length).padStart(2, '0')}]</span>
          <Link href="/#work" className="section-header__action">
            ← Back to Home
          </Link>
        </div>
        <p className="projects__intro">
          A complete archive of builds — featured work plus experiments and in-progress explorations.
        </p>
      </div>

      <ProjectsGrid />
    </main>
  );
}

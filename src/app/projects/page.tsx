import type { Metadata } from 'next';
import Nav from '@/components/ProjectNav';
import ProjectsGrid from '@/components/ProjectsGrid';
import { PROJECTS } from '@/data';

export const metadata: Metadata = {
  title: 'All Projects',
  description:
    'All projects by Syed Firas Peerzade — BIFA, Auction Football, GymNet, IJESTM, FootballCoach AI, Sahaya, QR Restaurant and more.',
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <div className="noise" aria-hidden />
      <main className="portfolio-root">
        <div className="container">
          <div className="proj-index-hero">
            <div className="proj-eyebrow">
              Archive — {String(PROJECTS.length).padStart(2, '0')} Projects
            </div>
            <h1 className="proj-index-title">All Projects</h1>
            <p className="proj-index-intro">
              A complete archive of builds — featured work plus experiments and
              in-progress explorations. Select any project to open its case study.
            </p>
          </div>

          <ProjectsGrid />
        </div>

        <footer className="footer">
          <div className="container footer-inner">
            <span>© {new Date().getFullYear()} Syed Firas Peerzade</span>
            <span>Full Stack Developer · Karnataka, India</span>
          </div>
        </footer>
      </main>
    </>
  );
}

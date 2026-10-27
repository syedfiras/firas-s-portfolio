import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import ProjectsGrid from '@/components/ProjectsGrid';
import { PROJECTS, PROJECTS_ALL_URL } from '@/data/projects';

const HIGHLIGHTED_PROJECTS = PROJECTS.slice(0, 5)
  .map((project) => project.title)
  .join(', ');

export const metadata: Metadata = {
  title: 'All Projects',
  description: `All projects by Syed Firas Peerzade — ${HIGHLIGHTED_PROJECTS} and more.`,
  alternates: { canonical: PROJECTS_ALL_URL },
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-void pt-32 md:pt-40">
        <div className="container-x">
          <div className="mb-16 flex items-center gap-4 md:mb-24">
            <span className="eyebrow">Archive</span>
            <span className="h-px flex-1 bg-line" />
            <span className="eyebrow">{String(PROJECTS.length).padStart(2, '0')} Projects</span>
          </div>

          <h1
            className="display mb-8 max-w-[12ch] text-ink"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 9rem)', lineHeight: 0.86 }}
          >
            All Projects
          </h1>
          <p className="mb-20 max-w-[52ch] text-base text-ash md:text-lg">
            A complete archive of builds — production apps, platforms, and AI tooling. Select any
            project to open its case study.
          </p>

          <ProjectsGrid />
        </div>

        <footer className="mt-28 border-t border-line py-8">
          <div className="container-x flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
              © 2026 Syed Firas Peerzade
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
              Full-Stack Developer · Bhatkal, Karnataka, India
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}

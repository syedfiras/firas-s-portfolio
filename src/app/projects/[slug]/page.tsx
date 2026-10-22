import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Reveal from '@/components/ui/Reveal';
import { Github } from '@/components/icons';
import { PROJECTS, SLUG_TO_PROJECT } from '@/data/projects';
import { CASE_STUDIES } from '@/data/caseStudies';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = SLUG_TO_PROJECT[slug];
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} — Syed Firas Peerzade`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = SLUG_TO_PROJECT[slug];
  if (!project) notFound();

  const cs = CASE_STUDIES[slug];
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-void pt-28 md:pt-36">
        <div className="container-x">
          <Reveal>
            <Link
              href="/#work"
              className="mb-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} /> Back to Work
            </Link>
          </Reveal>

          <Reveal className="flex items-center gap-4">
            <span className="eyebrow">
              Project {project.id} — {project.category}
            </span>
            <span className="h-px flex-1 bg-line" />
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              className="display mt-6 max-w-[16ch] text-ink"
              style={{ fontSize: 'clamp(2.6rem, 8vw, 8rem)', lineHeight: 0.86 }}
            >
              {project.title}
            </h1>
            <p className="mt-6 max-w-[56ch] text-base text-ash md:text-lg">
              {project.description}
            </p>
          </Reveal>

          <Reveal className="mt-12 flex flex-wrap items-center gap-6">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
              >
                Live <ArrowUpRight size={13} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
              >
                GitHub <Github size={13} />
              </a>
            )}
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-16 md:mt-20">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-line bg-carbon">
              <Image
                src={project.image}
                alt={`${project.title} — interface`}
                fill
                priority
                sizes="100vw"
                quality={85}
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          {cs && (
            <div className="mt-24 grid grid-cols-1 gap-16 md:mt-32 md:grid-cols-2 md:gap-12">
              <Reveal>
                <h2 className="eyebrow mb-4">Problem</h2>
                <p className="text-base leading-relaxed text-ash">{cs.problem}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="eyebrow mb-4">Solution</h2>
                <p className="text-base leading-relaxed text-ash">{cs.solution}</p>
              </Reveal>
            </div>
          )}

          {cs && (
            <Reveal className="mt-20">
              <h2 className="eyebrow mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                {cs.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 border-b border-line py-3 text-sm text-ink"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {cs && (
            <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
              {[
                { title: 'My Role', body: cs.role },
                { title: 'Challenge', body: cs.challenge },
                { title: 'Result', body: cs.result },
              ].map((block, i) => (
                <Reveal key={block.title} delay={i * 0.05}>
                  <h2 className="eyebrow mb-4">{block.title}</h2>
                  <p className="text-sm leading-relaxed text-ash">{block.body}</p>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-24 md:mt-32">
            <h2 className="eyebrow mb-5">Next Project</h2>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-between gap-6 border-t border-line pt-8"
            >
              <div className="flex flex-col gap-2">
                <span className="eyebrow">{next.category}</span>
                <span
                  className="display text-ink transition-colors group-hover:text-accent"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 3.4rem)' }}
                >
                  {next.title}
                </span>
              </div>
              <ArrowRight
                size={28}
                className="shrink-0 text-smoke transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>
          </Reveal>
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

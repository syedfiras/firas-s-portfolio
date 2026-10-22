import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Github } from '@/components/icons';
import { PROJECTS } from '@/data/projects';

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((project) => (
        <article key={project.slug} className="group flex flex-col">
          <Link
            href={`/projects/${project.slug}`}
            className="relative block aspect-[4/3] overflow-hidden border border-line bg-carbon"
            aria-label={`View ${project.title} case study`}
          >
            <Image
              src={project.image}
              alt={`${project.title} — project interface`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              quality={75}
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            {project.live && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-line bg-void/60 px-2.5 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Live</span>
              </span>
            )}
          </Link>

          <div className="flex flex-1 flex-col gap-3 pt-5">
            <div className="flex items-center justify-between">
              <span className="eyebrow">{project.id}</span>
              <span className="eyebrow">{project.category}</span>
            </div>
            <h2
              className="display text-ink transition-colors group-hover:text-accent"
              style={{ fontSize: 'clamp(1.3rem, 2vw, 1.9rem)', lineHeight: 0.95 }}
            >
              {project.title}
            </h2>
            <p className="text-sm leading-relaxed text-ash">{project.description}</p>
            <ul className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-6 pt-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
                >
                  Live <ArrowUpRight size={13} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
                >
                  GitHub <Github size={13} />
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

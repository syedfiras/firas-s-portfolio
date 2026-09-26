import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { PROJECTS, PROJECT_ID_TO_SLUG } from '@/data';
import { Github } from './icons';

function statusLabel(status: string) {
  if (status === 'live') return '● LIVE';
  if (status === 'paused') return '◌ PAUSED';
  return '◌ WIP';
}

export default function ProjectsGrid() {
  return (
    <div className="projects-grid">
      {PROJECTS.map((project) => {
        const slug = PROJECT_ID_TO_SLUG[project.id];
        return (
          <article key={project.id} className="card proj-card">
            <Image
              src={`/projects/${project.image}`}
              alt={project.title}
              fill
              className="card-work-img"
              quality={75}
            />
            <div className="card-work-content">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="work-num">PROJECT {project.id}</span>
                  <span className="work-num">{statusLabel(project.status ?? '')}</span>
                </div>
                <div className="work-type">{project.type}</div>
                <h3 className="work-title">{project.title}</h3>
                <p className="work-desc">{project.desc}</p>
              </div>
              <div className="work-footer">
                <div className="tech-tags">
                  {project.stack.slice(0, 3).map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="tech-tag">+{project.stack.length - 3}</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  {project.links.preview && (
                    <a
                      href={project.links.preview}
                      target="_blank"
                      rel="noreferrer"
                      className="work-link"
                    >
                      Live <ExternalLink size={11} />
                    </a>
                  )}
                  {project.links.source && (
                    <a
                      href={project.links.source}
                      target="_blank"
                      rel="noreferrer"
                      className="work-link"
                    >
                      GitHub <Github size={11} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {slug && (
              <Link
                href={`/projects/${slug}`}
                className="proj-card-link"
                aria-label={`View ${project.title} case study`}
              />
            )}
          </article>
        );
      })}
    </div>
  );
}

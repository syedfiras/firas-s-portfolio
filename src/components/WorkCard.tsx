import Image from 'next/image';
import { Project } from '@/data';

export default function WorkCard({
  proj,
  variant = 'home',
  onInProgress,
  onPrivate,
}: {
  proj: Project;
  variant?: 'home' | 'projects';
  onInProgress?: (proj: Project) => void;
  onPrivate?: (proj: Project) => void;
}) {
  const isInProgress = proj.status === 'in-progress';
  const isPaused = proj.status === 'paused';
  const isLive = proj.status === 'live';
  const isBadged = isInProgress || isPaused || isLive;
  const badgeText = isPaused ? 'Paused' : isInProgress ? 'In Progress' : isLive ? 'Live' : null;
  const isFootballPrivate = proj.id === '05';

  const handleInProgressClick = (e: React.MouseEvent) => {
    if (isInProgress && onInProgress) {
      e.preventDefault();
      e.stopPropagation();
      onInProgress(proj);
    }
  };

  const handlePrivateClick = (e: React.MouseEvent) => {
    if (onPrivate) {
      e.preventDefault();
      e.stopPropagation();
      onPrivate(proj);
    } else if (onInProgress) {
      e.preventDefault();
      e.stopPropagation();
      onInProgress(proj);
    }
  };

  return (
    <div
      className={`work__card ${isInProgress ? 'work__card--in-progress' : ''} ${isPaused ? 'work__card--paused' : ''} ${isLive ? 'work__card--live' : ''}`}
      key={proj.id}
      onClick={isInProgress && onInProgress ? () => onInProgress(proj) : undefined}
      role={isInProgress && onInProgress ? 'button' : undefined}
      tabIndex={isInProgress && onInProgress ? 0 : undefined}
      onKeyDown={
        isInProgress && onInProgress
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onInProgress(proj);
              }
            }
          : undefined
      }
    >
      {proj.image ? (
        <div className="work__card-image-wrap">
          {proj.links.preview ? (
            isInProgress && onInProgress ? (
              <a href={proj.links.preview} className="work__card-image-link work__card-image-link--in-progress" onClick={handleInProgressClick}>
                <Image
                  src={`/projects/${proj.image}`}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 850px) 50vw, 33vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  quality={90}
                  priority={!!proj.featured}
                />
              </a>
            ) : (
              <a href={proj.links.preview} className="work__card-image-link" target="_blank" rel="noopener noreferrer">
                <Image
                  src={`/projects/${proj.image}`}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 850px) 50vw, 33vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  quality={90}
                  priority={!!proj.featured}
                />
              </a>
            )
          ) : (
            <Image
              src={`/projects/${proj.image}`}
              alt={proj.title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 850px) 50vw, 33vw"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
              quality={90}
              priority={!!proj.featured}
            />
          )}
          <span className="work__card-id">{proj.id}</span>
          {isBadged && <span className={`work__card-badge ${isPaused ? 'work__card-badge--paused' : isLive ? 'work__card-badge--live' : ''}`}>{badgeText}</span>}
        </div>
      ) : (
        <div className="work__card-image-wrap work__card-image-wrap--placeholder">
          <span className="work__card-id">{proj.id}</span>
          {isBadged && <span className={`work__card-badge ${isPaused ? 'work__card-badge--paused' : isLive ? 'work__card-badge--live' : ''}`}>{badgeText}</span>}
          <div className="work__card-placeholder-text">{proj.type}</div>
        </div>
      )}

      <div className="work__card-body">
        <div className="work__card-header-row">
          <h3 className="work__card-title">{proj.title}</h3>
          <span className="work__card-type">{proj.type}</span>
        </div>

        <p className="work__card-desc">{proj.desc}</p>

        <div className="work__card-stack">
          {proj.stack.map((tech, j) => (
            <span className="work__card-tech" key={j}>
              {tech}
            </span>
          ))}
        </div>

        {variant === 'projects' && (
          <div className="work__card-actions">
            {/* GitHub — show link if available; private repo handling; hide for live projects without source per spec */}
            {isFootballPrivate ? (
              <button className="work__card-btn work__card-btn--github" onClick={handlePrivateClick}>
                GitHub →
              </button>
            ) : proj.links.source ? (
              <a
                href={proj.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="work__card-btn work__card-btn--github"
                onClick={isInProgress && onInProgress ? handleInProgressClick : undefined}
              >
                GitHub →
              </a>
            ) : isInProgress || isPaused ? (
              <button className="work__card-btn work__card-btn--disabled" onClick={handleInProgressClick}>
                GitHub →
              </button>
            ) : null}

            {/* Live Demo / Preview — Live Demo label for Interiora Studio per spec */}
            {proj.id === '06' ? null : proj.links.preview ? (
              <a
                href={proj.links.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="work__card-btn work__card-btn--preview"
                onClick={isInProgress && onInProgress ? handleInProgressClick : undefined}
              >
                {proj.id === '08' ? 'Live Demo →' : 'Live Preview →'}
              </a>
            ) : (
              <button className="work__card-btn work__card-btn--disabled" onClick={handleInProgressClick}>
                {proj.id === '08' ? 'Live Demo →' : 'Live Preview →'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { PROJECTS } from '@/data';

interface WorkProps {
  s: (index: number) => string;
}

export default function Work({ s }: WorkProps) {
  return (
    <section className={`work ${s(3)}`} id="work" data-index={3}>
      <div className="section-header">
        <h2 className="section-header__title">Selected Work</h2>
        <div className="section-header__rule" />
        <span className="section-header__count">
          Missions [{String(PROJECTS.length).padStart(2, '0')}]
        </span>
      </div>

      <div className="work__grid">
        {PROJECTS.map((proj) => (
          <div className="work__card" key={proj.id}>
            {proj.image && (
              <div className="work__card-image-wrap">
                {proj.links.preview ? (
                  <a href={proj.links.preview} className="work__card-image-link">
                    <img
                      src={`/projects/${proj.image}`}
                      alt={proj.title}
                      className="work__card-image"
                    />
                  </a>
                ) : (
                  <img
                    src={`/projects/${proj.image}`}
                    alt={proj.title}
                    className="work__card-image"
                  />
                )}
                <span className="work__card-id">{proj.id}</span>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
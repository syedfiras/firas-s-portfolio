'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, ExternalLink, Flag, Trophy, Zap, Menu, X } from 'lucide-react';
import { Github, Linkedin } from './icons';
import Loader from './Loader';
import ContributionsCard from './GitHubContributions';
import { PROJECTS } from '@/data';

// ─── Animation helpers ───────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
};

// ─── Sub-components ──────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'nav-open' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-logo" onClick={closeMenu}>Syed Firas</a>
        <div className="nav-links">
          <a href="#work" className="nav-link">Work</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-resume"
          >
            Resume <ArrowRight size={11} />
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="nav-mobile"
              className="nav-mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#work" className="nav-mobile-link" onClick={closeMenu}>
                Work <ArrowRight size={13} />
              </a>
              <a href="#about" className="nav-mobile-link" onClick={closeMenu}>
                About <ArrowRight size={13} />
              </a>
              <a href="#contact" className="nav-mobile-link" onClick={closeMenu}>
                Contact <ArrowRight size={13} />
              </a>
              <span className="nav-mobile-sep" aria-hidden />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="nav-mobile-link"
                onClick={closeMenu}
              >
                Resume <ArrowRight size={13} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

function HeroCard({ ready }: { ready: boolean }) {
  return (
    <motion.div
      className="card card-hero"
      initial="hidden"
      animate={ready ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={0.05}
    >
      {/* subtle grid pattern */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />
      <div className="card-inner">
        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--green)', boxShadow: '0 0 8px var(--green-glow)',
            display: 'inline-block', flexShrink: 0,
          }} />
          Full Stack Developer — Available for Projects
        </div>

        {/* Headline */}
        <div className="hero-headline">
          <span>Syed</span>
          <span>Firas</span>
          <span className="hl-dim">Peerzade</span>
        </div>

        {/* Motto */}
        <div className="hero-motto">
          <span className="hero-motto-word">Build</span>
          <span className="hero-motto-word">Create</span>
          <span className="hero-motto-word">Impact</span>
        </div>

        {/* CTAs */}
        <div className="hero-ctas">
          <a href="#work" className="btn btn-white">
            View Work <ArrowRight size={14} />
          </a>
          <a href="#contact" className="btn btn-ghost">
            Start a Project
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileCard({ ready }: { ready: boolean }) {
  return (
    <motion.div
      className="card card-profile"
      initial="hidden"
      animate={ready ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={0.1}
    >
      <Image
        src="/profile.png"
        alt="Syed Firas Peerzade"
        fill
        className="profile-img"
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
        priority
        quality={85}
      />
      <div className="profile-overlay" />
      <div className="profile-content">
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
          Syed Firas Peerzade
        </div>
      </div>
    </motion.div>
  );
}

function StatusCard({ ready }: { ready: boolean }) {
  return (
    <motion.div
      className="card card-status card-p"
      initial="hidden"
      animate={ready ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={0.15}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="status-top">
        <div className="status-indicator" style={{ marginBottom: 0 }}>
          <span className="status-dot" />
          <span className="status-label">Online</span>
        </div>
        <span className="now-label">Now</span>
      </div>
      <div className="now-eyebrow">Currently building</div>
      <div className="now-title">Interiora Studio</div>
      <p className="now-desc">
        Interior design management platform — frontend, backend &amp; database at Dream Space Interiors.
      </p>
      <div className="now-footer">
        <div className="tech-tags">
          <span className="tech-tag">Next.js</span>
          <span className="tech-tag">Supabase</span>
          <span className="tech-tag">Tailwind</span>
        </div>
        <a href="#work" className="now-link">
          See work <ArrowRight size={12} />
        </a>
      </div>
    </motion.div>
  );
}

function StatsCard() {
  return (
    <motion.div
      className="card card-stats card-p"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={0.2}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div>
        <div className="stat-num">03+</div>
        <div className="stat-label">Years building digital products</div>
      </div>
      <div className="stat-divider" />
      <div>
        <div className="stat-num">20+</div>
        <div className="stat-label">Mobile & web applications shipped</div>
      </div>
      <div className="stat-divider" />
      <div>
        <div className="stat-num">03</div>
        <div className="stat-label">Current highlighted projects</div>
      </div>
    </motion.div>
  );
}

function AboutCard() {
  return (
    <motion.div
      id="about"
      className="card card-about card-p"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={0}
    >
      <div
        style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1rem',
        }}
      >
        Identity
      </div>
      <h2 className="about-heading">
        I build things that work.<br />No decoration for decoration's sake.
      </h2>
      <p className="about-body" style={{ marginBottom: '1rem' }}>
        I'm <strong>Syed Firas Peerzade</strong> — a full stack developer and{' '}
        <strong>SDE Intern at Dream Space Interiors</strong>, Bangalore. I build mobile
        applications and web systems that are fast, accessible, and built to last.
      </p>
      <p className="about-body">
        Every pixel is intentional. Every component earns its place.
        I ship products people actually use.
      </p>
    </motion.div>
  );
}

function FeaturedProjectCard() {
  const featured = PROJECTS.find((p) => p.id === '05') ?? PROJECTS[4];
  return (
    <motion.div
      className="card card-featured"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={0}
    >
      <div className="featured-img-wrap">
        <Image
          src={`/projects/${featured.image}`}
          alt={featured.title}
          fill
          className="featured-img"
          quality={80}
        />
      </div>
      <Link href="/projects/footballcoach-ai" className="featured-content">
        <div>
          <div className="featured-num">Featured Project — {featured.id}</div>
          <div className="featured-type-badge">{featured.type}</div>
          <h2 className="featured-title">FootballCoach<br />AI</h2>
          <p className="featured-desc">{featured.desc}</p>
        </div>
        <div className="featured-footer">
          <div className="tech-tags">
            {featured.stack.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
          <span className="featured-link">
            View Case Study <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ExperienceCard() {
  return (
    <motion.div
      className="card card-exp card-p"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={0.05}
    >
      <div
        style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.25rem',
        }}
      >
        Experience
      </div>

      {/* Current */}
      <div>
        <div className="exp-company">Dream Space Interiors</div>
        <div className="exp-role">SDE Intern · Bangalore</div>
        <div className="exp-period">Jul 2026 — Present</div>
        <p className="exp-desc">
          Building and scaling <strong style={{ color: 'var(--text-1)' }}>Interiora Studio</strong> — a
          production-ready interior design management platform — end-to-end: frontend,
          backend, and database.
        </p>
        <div className="exp-features">
          {['Authentication', 'Project Management', 'Responsive Tailwind UI', 'Vercel Deployment', 'Internal Tooling'].map((f) => (
            <div key={f} className="exp-feature">
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--green)', flexShrink: 0,
              }} />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="exp-divider" />

      {/* Previous */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {[
          { period: 'May – Jul 2026', role: 'Frontend Intern', co: 'Omnimate' },
          { period: 'Mar – Jun 2025', role: 'Frontend Intern', co: 'iTecz Solutions, Australia' },
          { period: '2025', role: 'Web Dev Intern', co: 'My Job Grow & IIT Hyderabad' },
        ].map(({ period, role, co }) => (
          <div key={co} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-1)' }}>{role}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-2)', marginTop: '0.1rem' }}>{co}</div>
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-3)', whiteSpace: 'nowrap', marginTop: '0.2rem' }}>{period}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ToolkitCard() {
  const row1 = ['React', 'React Native', 'Next.js', 'TypeScript', 'Node.js', 'Supabase', 'Python', 'PyTorch', 'Ionic Angular', 'MongoDB'];
  const row2 = ['Tailwind CSS', 'NativeWind', 'Git', 'GitHub', 'OpenRouter', 'Vercel', 'Expo', 'Express', 'MySQL', 'Framer Motion'];
  const dup = (arr: string[]) => [...arr, ...arr]; // duplicate for seamless scroll

  return (
    <motion.div
      className="card card-toolkit"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={0}
    >
      <div className="toolkit-label">Toolkit</div>
      <div className="marquee-wrap">
        <div className="marquee-track">
          {dup(row1).map((t, i) => (
            <span key={i} className={`marquee-pill${i % 3 === 0 ? ' lit' : ''}`}>{t}</span>
          ))}
        </div>
        <div className="marquee-track marquee-track-reverse">
          {dup(row2).map((t, i) => (
            <span key={i} className={`marquee-pill${i % 4 === 0 ? ' lit' : ''}`}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

type WorkCardProps = {
  project: typeof PROJECTS[number];
  colClass: string;
  rowClass: string;
  delay?: number;
};
function WorkCard({ project, colClass, rowClass, delay = 0 }: WorkCardProps) {
  return (
    <motion.div
      className={`card card-work ${colClass} ${rowClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={delay}
    >
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
            <span className="work-num">{project.status === 'live' ? '● LIVE' : '◌ WIP'}</span>
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
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
              >
                GitHub <Github size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExtrasSection() {
  const extras = [
    {
      Icon: Flag,
      heading: 'AIFF Certified Referee',
      body: 'Certified by the All India Football Federation — sharp decision-making, rule mastery, and composure under pressure.',
    },
    {
      Icon: Trophy,
      heading: '4× State Level Football',
      body: 'Represented at the state level across four football tournaments.',
    },
    {
      Icon: Zap,
      heading: '6+ Hackathons',
      body: 'Built end-to-end prototypes under tight deadlines and shipped functional demos at 6+ national hackathons.',
    },
  ];

  return (
    <>
      {extras.map(({ Icon, heading, body }, i) => (
        <motion.div
          key={heading}
          className="card card-extra card-p"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          custom={i * 0.07}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className="extra-icon">
            <Icon size={20} style={{ color: 'var(--text-1)' }} />
          </div>
          <div className="extra-heading">{heading}</div>
          <p className="extra-body">{body}</p>
        </motion.div>
      ))}
    </>
  );
}

function GitHubCard() {
  return (
    <motion.div
      className="card card-github card-p"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={0.21}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Github size={32} style={{ color: 'var(--text-2)', marginBottom: '1rem' }} />
      <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>
        Open Source
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', lineHeight: 1.65 }}>
        Exploring ideas, shipping experiments, and contributing to the web ecosystem.
      </p>
      <a
        href="https://github.com/syedfiras"
        target="_blank"
        rel="noreferrer"
        className="github-link-pill"
      >
        <Github size={13} /> View Activity <ArrowRight size={12} />
      </a>
    </motion.div>
  );
}

function ContactCard() {
  return (
    <motion.div
      id="contact"
      className="card card-contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={0}
    >
      <div className="contact-inner">
        <h2 className="contact-headline">
          Let's make<br />something<br />good.
        </h2>
        <div className="contact-side">
          <a href="mailto:workwithfiras@gmail.com" className="contact-cta">
            Let's Talk <ArrowRight size={22} />
          </a>
          <div style={{ fontSize: '0.78rem', fontWeight: 500, color: 'rgba(10,10,11,0.55)' }}>
            workwithfiras@gmail.com
          </div>
          <div className="contact-links">
            <a href="https://github.com/syedfiras" target="_blank" rel="noreferrer" className="contact-icon-btn" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/syedfiras7" target="_blank" rel="noreferrer" className="contact-icon-btn" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:workwithfiras@gmail.com" className="contact-icon-btn" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Strip({ label }: { label: string }) {
  return (
    <div className="strip">
      <span className="strip-label">{label}</span>
      <span className="strip-line" />
    </div>
  );
}

// ─── Main Site ────────────────────────────────────────────────
export default function Site() {
  const [loading, setLoading] = useState(true);

  // Lock scroll while the intro loader is visible
  useEffect(() => {
    if (!loading) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [loading]);

  // Cursor glow
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Card spotlight — track mouse per-card
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.card');
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void]> = [];
    cards.forEach((card) => {
      const fn = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      };
      card.addEventListener('mousemove', fn);
      handlers.push([card, fn]);
    });
    return () => {
      handlers.forEach(([card, fn]) => card.removeEventListener('mousemove', fn));
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <div className="noise" aria-hidden />
      <div ref={glowRef} className="cursor-glow" aria-hidden />
      <Nav />

      <main id="top" className="portfolio-root">
        <div className="container">
          <div className="bento">

            {/* ── Row 1–3: Hero + Profile + Status ── */}
            <HeroCard ready={!loading} />
            <ProfileCard ready={!loading} />
            <StatusCard ready={!loading} />

            {/* ── Stats + About ── */}
            <StatsCard />
            <AboutCard />

            {/* ── Featured + Experience ── */}
            <Strip label="Featured Project" />
            <FeaturedProjectCard />
            <ExperienceCard />

            {/* ── Toolkit ── */}
            <Strip label="Toolkit" />
            <ToolkitCard />

            {/* ── Selected Work ── */}
            <div id="work" className="strip"><span className="strip-label">Selected Work</span><span className="strip-line" /></div>

            {/* BIFA — large */}
            <WorkCard
              project={PROJECTS[0]}
              colClass="g-c5"
              rowClass="g-r4"
              delay={0}
            />
            {/* GymNet — medium */}
            <WorkCard
              project={PROJECTS[2]}
              colClass="g-c4"
              rowClass="g-r3"
              delay={0.06}
            />
            {/* IJESTM — narrow tall */}
            <WorkCard
              project={PROJECTS[3]}
              colClass="g-c3"
              rowClass="g-r4"
              delay={0.1}
            />
            {/* FootballCoach AI — wide */}
            <WorkCard
              project={PROJECTS[4]}
              colClass="g-c9"
              rowClass="g-r3"
              delay={0.04}
            />
            {/* Auction — medium */}
            <WorkCard
              project={PROJECTS[1]}
              colClass="g-c3"
              rowClass="g-r3"
              delay={0.08}
            />

            {/* ── View all ── */}
            <motion.div
              className="g-c12"
              style={{ display: 'flex', justifyContent: 'center' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={0.12}
            >
              <Link href="/projects" className="work-view-all">
                View All Projects <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* ── Extras + GitHub ── */}
            <Strip label="Beyond the Screen" />
            <ExtrasSection />
            <GitHubCard />

            {/* ── Open Source Activity ── */}
            <Strip label="Open Source Activity" />
            <ContributionsCard />

            {/* ── Contact ── */}
            <ContactCard />

          </div>
        </div>

        {/* Footer */}
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
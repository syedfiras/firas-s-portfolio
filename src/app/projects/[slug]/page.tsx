'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Github } from '@/components/icons';
import { PROJECTS, SLUG_TO_PROJECT_ID as slugMap } from '@/data';
import Nav from '@/components/ProjectNav';

// Rich case-study data per project
const CASE_STUDIES: Record<string, {
  problem: string;
  solution: string;
  role: string;
  features: string[];
  challenge: string;
  result: string;
}> = {
  '01': {
    problem: 'BIFA Football Club had no centralized system to manage players, track match results, or handle club administration. Everything was done manually via spreadsheets and WhatsApp, making it error-prone and slow.',
    solution: 'Built a cross-platform mobile app and web portal that unifies player registration, match scheduling, and club administration into a single system accessible by coaches, admins, and players.',
    role: 'Sole developer — architected the full-stack system, designed the UI with NativeWind, built the REST API with Node.js, and set up the Supabase database with row-level security.',
    features: ['Player registration & profile management', 'Match scheduling & result tracking', 'Club admin dashboard', 'Real-time notifications', 'Registration portal (web)', 'Role-based access control'],
    challenge: 'Ensuring the app performed well across both Android and iOS while keeping the codebase unified was the primary challenge. NativeWind allowed design consistency across platforms without maintaining separate stylesheets.',
    result: 'Live in production, actively used by BIFA Football Club for player and match management.',
  },
  '02': {
    problem: 'Football clubs needed a digital platform to conduct player transfer auctions with transparency and real-time bidding.',
    solution: 'A web-based auction platform with real-time updates, secure bid management, and a clean bidding interface for club representatives.',
    role: 'Full-stack developer — React frontend, Node.js backend, Supabase for real-time data.',
    features: ['Real-time bidding', 'Club authentication', 'Player listing & auction rooms', 'Bid history tracking', 'Admin controls'],
    challenge: 'Implementing real-time bid synchronization across multiple simultaneous users without race conditions or stale state.',
    result: 'Live and used for conducting football player auctions.',
  },
  '03': {
    problem: 'A gym had no digital infrastructure — member check-ins, billing, and scheduling were all paper-based, causing errors and inefficiency.',
    solution: 'A full gym management platform covering member tracking, work scheduling, automated billing, and monthly performance logs.',
    role: 'Sole developer — Ionic Angular frontend, Node.js API, Supabase database. Delivered as a freelance project.',
    features: ['Member registration & tracking', 'Automated billing system', 'Work & class scheduling', 'Monthly performance logs', 'Admin dashboard', 'Mobile-responsive UI'],
    challenge: 'Building a complex multi-module system solo under tight freelance timelines while keeping the UI accessible to non-technical gym staff.',
    result: 'Live in production at gymnetsolutions.netlify.app, actively used by gym staff.',
  },
  '04': {
    problem: 'AITM college needed a professional online presence for its IJESTM research journal with proper SEO to help academics discover published papers.',
    solution: 'A Next.js journal website with TypeScript, tailored metadata, structured data, and SEO features specifically for academic publications.',
    role: 'Full-stack developer — built the entire site, implemented academic SEO patterns, and deployed it for the institution.',
    features: ['Academic SEO optimization', 'Structured data for research papers', 'Responsive editorial layout', 'Volume & issue management', 'Author submission guidelines', 'Fast static rendering'],
    challenge: 'Academic SEO has unique requirements — structured data for research papers, proper canonical handling, and indexing signals differ from standard web pages.',
    result: 'Live at ijestm.aitm.edu.in, indexed and discoverable on Google Scholar and other academic search engines.',
  },
  '05': {
    problem: 'Football coaches needed AI-assisted tactical analysis and drill planning but existing AI tools were too generic and not football-specific.',
    solution: 'An AI-powered football coaching assistant that generates tactical breakdowns, drill plans, and performance insights using LLM capabilities via OpenRouter.',
    role: 'Full-stack developer — React frontend, Node.js backend, OpenRouter LLM integration, Supabase for session management.',
    features: ['Tactical analysis generation', 'AI drill plan creation', 'Performance insights', 'Chat-style interface', 'Session persistence', 'Coach profile system'],
    challenge: 'Prompt engineering for domain-specific football knowledge — making the AI output tactically sound rather than generic coaching advice.',
    result: 'Live at footballcoachai.netlify.app, available for coaches to explore AI-assisted coaching workflows.',
  },
  '06': {
    problem: 'In real-world emergencies, women often cannot unlock a phone, open an app, and navigate menus to call for help. Existing safety apps were too slow when seconds mattered — help needed to be one gesture away.',
    solution: 'A women-safety mobile app built for real emergencies — shake-to-alert that instantly notifies trusted contacts with live location, plus geofencing alerts when entering or leaving marked zones.',
    role: 'Sole developer — React Native frontend with NativeWind, Supabase backend for contacts, location sharing, and alert delivery.',
    features: ['Shake-to-alert SOS trigger', 'Live location tracking & sharing', 'Geofencing alerts', 'Trusted contacts management', 'One-tap emergency flow', 'Real-time alert delivery'],
    challenge: 'Balancing shake-detection sensitivity to avoid false triggers while keeping background location reliable without draining the battery — the core tension of the whole app.',
    result: 'Built as a working end-to-end prototype demonstrating the full emergency flow. Currently paused and not in production.',
  },
  '07': {
    problem: 'Dine-in ordering meant waiting for staff to take orders, handling physical menus, and slow billing — friction for guests and load for restaurant staff during peak hours.',
    solution: 'A restaurant web app where each table gets a QR code — guests scan it, browse the live menu, place orders, and pay from their phones, while the kitchen sees incoming orders in real time.',
    role: 'Full-stack developer — Next.js frontend, Node.js API, Supabase for menu, order, and session state.',
    features: ['QR-per-table sessions', 'Live digital menu', 'Cart & order placement', 'Payment flow', 'Kitchen order view', 'Mobile-first responsive UI'],
    challenge: 'Scoping every session to the right table and keeping order state in sync between the guest view and the kitchen view without stale or duplicated orders.',
    result: 'Built as a working prototype covering the full scan-to-payment flow. Currently paused and not in production.',
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] as const, delay: d } }),
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const id = slugMap[slug];
  if (!id) notFound();

  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  const cs = CASE_STUDIES[id];
  const currentIdx = PROJECTS.findIndex((p) => p.id === id);
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];
  const nextSlug = Object.entries(slugMap).find(([, v]) => v === nextProject.id)?.[0];

  return (
    <>
      <Nav />
      <div className="noise" aria-hidden />
      <main className="proj-root">
        <div className="container">

          {/* Back link */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <Link href="/#work" className="proj-back">
              <ArrowLeft size={14} /> Back to Work
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div className="proj-hero" initial="hidden" animate="visible" variants={fadeUp} custom={0.05}>
            <div className="proj-eyebrow">Project {project.id} — {project.type}</div>
            <h1 className="proj-title">{project.title}</h1>
            <p className="proj-desc">{project.desc}</p>

            {/* Meta */}
            <div className="proj-meta-grid">
              <div className="proj-meta-item">
                <label>Type</label>
                <span>{project.type}</span>
              </div>
              <div className="proj-meta-item">
                <label>Stack</label>
                <span>{project.stack.join(', ')}</span>
              </div>
              <div className="proj-meta-item">
                <label>Status</label>
                <span style={{ color: project.status === 'live' ? 'var(--green)' : 'var(--text-2)' }}>
                  {project.status === 'live' ? '● Live' : '◌ In Progress'}
                </span>
              </div>
              <div className="proj-meta-item">
                <label>Links</label>
                <span style={{ display: 'flex', gap: '0.75rem' }}>
                  {project.links.preview && (
                    <a href={project.links.preview} target="_blank" rel="noreferrer"
                      style={{ color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      Live <ExternalLink size={13} />
                    </a>
                  )}
                  {project.links.source && (
                    <a href={project.links.source} target="_blank" rel="noreferrer"
                      style={{ color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      GitHub <Github size={13} />
                    </a>
                  )}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Screenshot */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Image
              src={`/projects/${project.image}`}
              alt={project.title}
              width={1280}
              height={720}
              className="proj-screenshot"
              quality={85}
            />
          </motion.div>

          {/* Content grid */}
          <div className="proj-split">
            
            {cs && (
              <>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="proj-section-title">Problem</div>
                  <p className="proj-body">{cs.problem}</p>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.05}>
                  <div className="proj-section-title">Solution</div>
                  <p className="proj-body">{cs.solution}</p>
                </motion.div>
              </>
            )}
          </div>

          {/* Key Features */}
          {cs && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="proj-section-title">Key Features</div>
              <div className="proj-feature-list">
                {cs.features.map((f) => (
                  <div key={f} className="proj-feature-item">
                    <span className="proj-feature-dot" />
                    <span className="proj-feature-text">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Role + Challenge + Result */}
          {cs && (
            <div className="proj-split proj-split-3">
              {[
                { title: 'My Role', body: cs.role },
                { title: 'Challenge', body: cs.challenge },
                { title: 'Result', body: cs.result },
              ].map(({ title, body }) => (
                <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="proj-section-title">{title}</div>
                  <p className="proj-body">{body}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tech Stack pills */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '3rem' }}>
            <div className="proj-section-title">Tech Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {project.stack.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: '0.45rem 1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--r-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-1)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Next Project */}
          {nextSlug && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="proj-section-title">Next Project</div>
              <Link href={`/projects/${nextSlug}`} className="proj-next">
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '0.35rem' }}>
                    {nextProject.type}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text-1)' }}>
                    {nextProject.title}
                  </div>
                </div>
                <ArrowRight size={24} style={{ color: 'var(--text-2)', flexShrink: 0 }} />
              </Link>
            </motion.div>
          )}

        </div>
      </main>
    </>
  );
}

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  live?: string;
  github?: string;
  slug: string;
}

/** Selected work — stacked sticky cards, in order. */
export const PROJECTS: Project[] = [
  {
    id: '01',
    category: 'Web App',
    title: 'Interiora Studio',
    description:
      'An interior design management platform featuring authentication, project management, and a responsive application interface — built and extended during my SDE internship at Dream Space Interiors and deployed on a Hostinger KVM 1 VPS.',
    image: '/projects/interiora.png',
    tags: ['Next.js', 'Supabase', 'Tailwind CSS', 'Hostinger VPS'],
    slug: 'interiora-studio',
  },
  {
    id: '02',
    category: 'Mobile & Web',
    title: 'BIFA Football Club Manager',
    description:
      'A football club management mobile application built with React Native, Node.js, NativeWind, and Supabase — player registration, match scheduling, and role-based administration.',
    image: '/projects/bifa.png',
    tags: ['React Native', 'Node.js', 'NativeWind', 'Supabase'],
    live: 'https://bifa-registration-portal.netlify.app/',
    github: 'https://github.com/syedfiras/bifa',
    slug: 'bifa-football-club-manager',
  },
  {
    id: '03',
    category: 'Web App',
    title: 'Auction Football System',
    description:
      'A football auction platform built with React, Node.js, Supabase, Stripe, and WebSockets — real-time bidding, countdown timers, payment integration, and notifications.',
    image: '/projects/auction.png',
    tags: ['React', 'Node.js', 'Supabase', 'Stripe', 'WebSockets'],
    live: 'https://auction-six-virid.vercel.app/login',
    github: 'https://github.com/syedfiras/auction',
    slug: 'auction-football-system',
  },
  {
    id: '04',
    category: 'Mobile & Web',
    title: 'GymNet Solutions Portal',
    description:
      'A gym management application built with Ionic, Angular, Node.js, and Supabase — member management, scheduling, trainer planning, administrative workflows, and automated billing.',
    image: '/projects/gymnet.png',
    tags: ['Ionic', 'Angular', 'Node.js', 'Supabase'],
    live: 'https://gymnetsolutions.netlify.app/',
    github: 'https://github.com/syedfiras/gym',
    slug: 'gymnet-solutions-portal',
  },
  {
    id: '05',
    category: 'Web App',
    title: 'IJESTM Journal Platform',
    description:
      'AITM college journal platform built with advanced SEO for academic publications.',
    image: '/projects/ijestm.png',
    tags: ['Next.js', 'TypeScript'],
    live: 'https://ijestm.aitm.edu.in/',
    slug: 'ijestm-journal-platform',
  },
  {
    id: '06',
    category: 'AI Platform',
    title: 'FootballCoach AI',
    description:
      'AI-powered football coaching assistant — tactical analysis, drill generation, and performance insights.',
    image: '/projects/footballcoachai.png',
    tags: ['React.js', 'Node.js', 'Supabase', 'OpenRouter'],
    live: 'https://footballcoachai.netlify.app/',
    slug: 'footballcoach-ai',
  },
];

export const SLUG_TO_PROJECT: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p]),
);

export const PROJECTS_ALL_URL = '/projects';

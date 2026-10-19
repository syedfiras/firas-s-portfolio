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
    category: 'Mobile & Web',
    title: 'BIFA Football Club Manager',
    description:
      'Team management for BIFA Football Club — player tracking, match scheduling, and club administration in one system.',
    image: '/projects/bifa.png',
    tags: ['React Native', 'Node.js', 'NativeWind'],
    live: 'https://bifa-registration-portal.netlify.app/',
    github: 'https://github.com/syedfiras/bifa',
    slug: 'bifa-football-club-manager',
  },
  {
    id: '02',
    category: 'Web App',
    title: 'Auction Football System',
    description:
      'An auction platform for clubs to bid on player transfers — real-time updates and secure payments.',
    image: '/projects/auction.png',
    tags: ['React', 'Node.js', 'Supabase'],
    live: 'https://auction-six-virid.vercel.app/login',
    github: 'https://github.com/syedfiras/auction',
    slug: 'auction-football-system',
  },
  {
    id: '03',
    category: 'Mobile & Web',
    title: 'GymNet Solutions Portal',
    description:
      'Gym management — member tracking, work scheduling, automated billing, and monthly performance logs.',
    image: '/projects/gymnet.png',
    tags: ['Ionic', 'Angular', 'Node.js'],
    live: 'https://gymnetsolutions.netlify.app/',
    github: 'https://github.com/syedfiras/gym',
    slug: 'gymnet-solutions-portal',
  },
  {
    id: '04',
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
    id: '05',
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

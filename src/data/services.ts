export interface Service {
  index: string;
  title: string;
  description: string;
  tags: string[];
}

export const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Mobile App Development',
    description:
      'Cross-platform iOS and Android apps that feel native — fast, offline-first, and store-ready.',
    tags: ['React Native', 'Expo', 'NativeWind'],
  },
  {
    index: '02',
    title: 'Web App Development',
    description:
      'Performant, SEO-friendly web apps — from landing pages to dashboards and journal platforms.',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    index: '03',
    title: 'Backend & APIs',
    description:
      'Auth, databases, real-time subscriptions, and payments — backend architecture that scales.',
    tags: ['Node.js', 'Supabase', 'Express'],
  },
  {
    index: '04',
    title: 'UI / Frontend Systems',
    description:
      'Design systems and responsive interfaces with motion that earns its place.',
    tags: ['Tailwind', 'Framer Motion'],
  },
  {
    index: '05',
    title: 'AI Integration',
    description:
      'LLM-powered features — chat, analysis, recommendations — wired into real products.',
    tags: ['OpenRouter', 'Python', 'PyTorch'],
  },
  {
    index: '06',
    title: 'Freelance & Consulting',
    description:
      'End-to-end ownership from requirements to deployment — direct with clients, fast shipping.',
    tags: ['MVP', 'Deployment', 'Client Work'],
  },
];

/** Two marquee rows for the Toolkit section. */
export const TOOLKIT_ROW_ONE = [
  'React',
  'React Native',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Supabase',
  'Python',
  'PyTorch',
  'Ionic Angular',
  'MongoDB',
];

export const TOOLKIT_ROW_TWO = [
  'Tailwind CSS',
  'NativeWind',
  'Git',
  'GitHub',
  'OpenRouter',
  'Vercel',
  'Expo',
  'Express',
  'MySQL',
  'Framer Motion',
];

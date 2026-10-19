export interface Certification {
  year: string;
  title: string;
  issuer: string;
  tags: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    year: '2024',
    title: 'AIFF Certified Referee',
    issuer: 'All India Football Federation',
    tags: ['Decision Making', 'Rule Mastery'],
  },
  {
    year: '2025',
    title: 'Full-Stack Web Development',
    issuer: 'IIT Hyderabad · My Job Grow',
    tags: ['React', 'Node.js', 'Supabase'],
  },
  {
    year: '2025',
    title: 'Frontend Development',
    issuer: 'iTecz Solutions',
    tags: ['Ionic', 'Angular', 'UI Systems'],
  },
  {
    year: '2026',
    title: 'AI-Powered App Builder',
    issuer: 'Omnimate',
    tags: ['AI Integration', 'Frontend'],
  },
];

export interface Education {
  period: string;
  degree: string;
  school: string;
  note: string;
}

export const EDUCATION: Education = {
  period: '2024 – 2028',
  degree: 'B.Tech — Computer Science',
  school: 'AITM',
  note: 'Building production systems alongside coursework.',
};

export interface BeyondItem {
  index: string;
  title: string;
  detail: string;
  href?: string;
}

/** "Beyond the Screen" — warmer, more human tone. */
export const BEYOND: BeyondItem[] = [
  {
    index: '01',
    title: 'AIFF Certified Referee',
    detail: 'Certified by the All India Football Federation — reading the game from the middle.',
  },
  {
    index: '02',
    title: '4× State Level Football',
    detail: 'Four state-level tournaments. Teamwork under pressure is muscle memory.',
  },
  {
    index: '03',
    title: '13 Hackathons',
    detail: 'Thirteen hackathons — shipping under a clock is where I do my best work.',
  },
  {
    index: '04',
    title: 'Open Source',
    detail: 'Contributing in the open whenever I can.',
    href: 'https://github.com/syedfiras',
  },
];

export interface Experience {
  company: string;
  role: string;
  location?: string;
  period: string;
  description: string;
  bullets?: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: 'Dream Space Interiors',
    role: 'SDE Intern',
    location: 'Bangalore',
    period: 'Jul 2026 – Present',
    description:
      'Building and scaling Interiora Studio end-to-end — frontend, backend, and deployment.',
    bullets: [
      'Authentication',
      'Project Management',
      'Responsive Tailwind UI',
      'Vercel Deployment',
      'Internal Tooling',
    ],
  },
  {
    company: 'Omnimate',
    role: 'Frontend Intern',
    period: 'May – Jul 2026',
    description:
      'Contributed to modern frontend systems, UI architecture, and scalable components.',
  },
  {
    company: 'iTecz Solutions, Australia',
    role: 'Frontend Intern',
    period: 'Mar – Jun 2025',
    description:
      'Built a School Management App and an Accounting System with Ionic and Angular — admissions, attendance, fee management, invoicing, and reporting.',
  },
  {
    company: 'My Job Grow & IIT Hyderabad',
    role: 'Web Dev Intern',
    period: '2025',
    description:
      'Focused on full-stack integration and responsive client interfaces.',
  },
];

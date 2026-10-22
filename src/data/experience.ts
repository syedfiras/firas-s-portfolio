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
    location: 'Remote',
    period: 'Jul 2026 – Present',
    description:
      'Independently develop and ship features for Interiora Studio, an interior design management platform. Implement application interfaces and project management functionality, develop responsive frontend features, integrate application services, and maintain and extend the existing production platform alongside the design team and supervisor. Deployed on a Hostinger KVM 1 VPS.',
    bullets: [
      'Authentication',
      'Project Management',
      'Responsive Frontend',
      'Application Services',
      'Hostinger KVM 1 VPS',
    ],
  },
  {
    company: 'Digiscrypt Technologies',
    role: 'Frontend Developer',
    period: 'Mar – Jun 2025',
    description:
      'Contributed to frontend development for a school management system — student records, attendance workflows, and administrative interfaces. Improved responsive UI components and helped debug application issues.',
  },
  {
    company: 'OMNIMATE AI',
    role: 'Frontend Developer',
    period: 'May – Jul 2026',
    description:
      'Developed frontend features for an AI-powered student-internship matching platform, contributing to user-facing interfaces and recommendation workflows.',
  },
  {
    company: 'Freelance',
    role: 'Freelance Developer',
    period: '2025',
    description:
      'Built a gym management application for a paying client using Ionic, Angular, Node.js, and Supabase — member management, scheduling, and administrative functionality, from requirements through deployment.',
  },
];

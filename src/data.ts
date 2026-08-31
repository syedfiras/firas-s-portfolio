export interface Project { id: string; type: string; title: string; image: string; desc: string; metrics: string[]; stack: string[]; links: { source: string; preview: string }; featured?: boolean; status?: 'live' | 'in-progress' | 'paused'; }
export interface Experience { year: string; role: string; company: string; type: string; desc: string; }
export interface SkillCategory { category: string; items: string[]; ghost: string; }
export interface ContactLink { label: string; value: string; href: string; }

export const PROJECTS: Project[] = [
  { id: '01', type: 'MOBILE & WEB', title: 'BIFA Football Club Manager', image: 'bifa.png', desc: 'A comprehensive team management system for BIFA Football Club, streamlining player tracking, match scheduling, and club administration.', metrics: [], stack: ['React Native', 'Node.js', 'NativeWind', 'Supabase'], links: { source: 'https://github.com/syedfiras/bifa', preview: 'https://bifa-registration-portal.netlify.app/' }, featured: true, status: 'live' },
  { id: '02', type: 'WEB APPLICATION', title: 'Auction Football System', image: 'auction.png', desc: 'A high-performance auction platform for football clubs to bid on player transfers with real-time updates and secure payments.', metrics: [], stack: ['React', 'Node.js', 'Supabase', 'Stripe'], links: { source: 'https://github.com/syedfiras/auction', preview: 'https://https://auction-six-virid.vercel.app//login' }, featured: false, status: 'live' },
  { id: '03', type: 'MOBILE & WEB', title: 'GymNet Solutions Portal', image: 'gymnet.png', desc: 'A gym management platform for member tracking, work scheduling, automated billing, and monthly performance logs.', metrics: [], stack: ['Ionic', 'Angular', 'Node.js', 'Supabase'], links: { source: 'https://github.com/syedfiras/gym', preview: 'https://gymnetsolutions.netlify.app/' }, featured: true, status: 'live' },
  { id: '04', type: 'WEB APPLICATION', title: 'IJESTM Journal Platform', image: 'ijestm.png', desc: 'A college journal website for AITM with advanced SEO features tailored for academic publications and research papers.', metrics: [], stack: [ 'Next.js', 'TypeScript'], links: { source: 'https://github.com/codingclub-aitm/IJESTM', preview: 'https://ijestm.aitm.edu.in/' }, featured: true, status: 'live' },
  { id: '05', type: 'AI PLATFORM', title: 'FootballCoach AI', image: 'footballcoachai.png', desc: 'AI-powered football coaching assistant — tactical analysis, drill generation, and performance insights. Currently in active development.', metrics: [], stack: ['React.js', 'Node.js','Supabase', 'Openrouter'], links: { source: '', preview: '' }, featured: true, status: 'in-progress' },
  { id: '06', type: 'MOBILE APPLICATION', title: 'Sahaya', image: 'sahaya.png', desc: 'Women safety app built for real-world emergencies — geofencing alerts, live location tracking, and shake-to-alert that instantly notifies close contacts.', metrics: [], stack: ['React Native', 'NativeWind', 'Supabase'], links: { source: 'https://github.com/syedfiras/sahaya', preview: '' }, featured: false, status: 'paused' },
  { id: '07', type: 'WEB APPLICATION', title: 'QR Restaurant', image: 'qrcafe.png', desc: 'Restaurant web app where customers scan a QR, browse the menu, place orders and pay — streamlining dine-in ordering for staff and guests.', metrics: [], stack: ['Next.js', 'Node.js', 'Supabase'], links: { source: 'https://github.com/syedfiras/QR-CAFE-ORDERING', preview: 'https://qr-cafe-ordering.vercel.app/' }, featured: false, status: 'paused' },
];

export const FEATURED_PROJECTS: Project[] = PROJECTS.filter((p) => p.featured);

export const EXPERIENCE: Experience[] = [
  { year: '2026 - Present', role: 'SDE Intern', company: 'Dream Space Interior, Bangalore', type: 'Internship', desc: 'Building and scaling full-stack web applications end-to-end — frontend, backend, and database.' },
  { year: 'May - Jul 2026', role: 'Frontend Intern', company: 'Omnimate', type: 'Internship', desc: 'Contributed to modern frontend systems, UI architectures, and scalable components.' },
  { year: '2025', role: 'Web Development Intern', company: 'My Job Grow & IIT Hyderabad', type: 'Internship', desc: 'Focused on full-stack integration and responsive client interfaces.' },
  { year: 'Mar - Jun 2025', role: 'Frontend Intern', company: 'iTecz Solutions', type: 'Internship', desc: 'Developed mobile and web systems using Ionic and Angular.' },
  { year: '2024 - Present', role: 'Frontend & App Developer', company: 'Freelance', type: 'Freelance', desc: 'Building production-grade mobile applications and web interfaces for clients.' },
];

export const SKILLS: SkillCategory[] = [
  { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'HTML / CSS', 'Tailwind CSS', 'Angular', 'Ionic'], ghost: '01' },
  { category: 'Mobile', items: ['React Native', 'NativeWind', 'Expo', 'iOS / Android'], ghost: '02' },
  { category: 'Backend', items: ['Node.js', 'Express', 'Supabase'], ghost: '03' },
  {
    category: 'ML & Tools',
    items: [
      'Python',
      'Machine Learning',
      'PyTorch',
      'Pandas',
      'Jupyter Notebook',
      'Git',
      'VS Code',
      'Vercel',
      'Render',
    ],
    ghost: '04',
  },
];

export const TICKER_ITEMS = ['Mobile Apps', 'Web Interfaces', 'Machine Learning', 'PyTorch', 'Python', 'Frontend Systems', 'API Integration', 'Performance'];

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'EMAIL', value: 'workwithfiras@gmail.com', href: 'mailto:workwithfiras@gmail.com' },
  { label: 'GITHUB', value: 'github.com/syedfiras', href: 'https://github.com/syedfiras' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/syedfiras7', href: 'https://linkedin.com/in/syedfiras7' },
];

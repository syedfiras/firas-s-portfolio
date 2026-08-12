export const PROJECTS = [
  {
    id: '01',
    type: 'MOBILE APPLICATION',
    title: 'BIFA Football Club Manager',
    image: 'bifa.png',
    desc: 'A comprehensive team management system designed for BIFA Football Club. Streamlines player tracking, match scheduling, and club administration dashboards.',
    metrics: [
      'Real-time player registration portal',
      'Dynamic match schedule calendars',
      'Club administration metrics graphs',
      'Secure user roles for admins & players'
    ],
    stack: ['React Native', 'Node.js', 'NativeWind', 'Supabase'],
    links: { source: 'https://github.com/syedfiras/bifa', preview: 'https://bifa-registration-portal.netlify.app/' }
  },
  {
    id: '02',
    type: 'WEB APPLICATION',
    title: 'Auction Football System',
    image: 'auction.png',
    desc: 'A high-performance auction platform for football clubs to bid on player transfers with real-time updates and secure payments.',
    metrics: [
      'Live auction bidding with countdown timers',
      'Player profile cards with stats',
      'Secure Stripe payments integration',
      'Real-time notifications via websockets'
    ],
    stack: ['React', 'Node.js', 'Supabase', 'Stripe'],
    links: { source: 'https://github.com/syedfiras/auction', preview: 'https://auction-football.netlify.app/login' }
  },
  {
    id: '03',
    type: 'WEB APPLICATION',
    title: 'QR Code Cafe Ordering System',
    image: 'qrcafe.png',
    desc: 'A modern ordering web app for a tech-themed café, featuring menu browsing, cart, and order tracking.',
    metrics: [
      'Interactive menu with categories',
      'Cart management and checkout',
      'Order status tracking for baristas',
      'Responsive design for tablets and phones'
    ],
    stack: ['React', 'Node.js', 'Supabase', 'Tailwind CSS'],
    links: { source: 'https://github.com/syedfiras/QR-CAFE-ORDERING', preview: 'https://qr-cafe-ordering.vercel.app/' }
  },
  {
    id: '04',
    type: 'MOBILE APPLICATION',
    title: 'Sahaya Women Safety App',
    image: 'sahaya.png',
    desc: 'A safety application utilizing geolocation features to trigger immediate emergency alerts, helping women in distress broadcast security warnings.',
    metrics: [
      'One-tap emergency broadcast signals',
      'Active geofenced location updates',
      'Offline emergency message fallback options'
    ],
    stack: ['React Native', 'Geofencing', 'Node.js', 'Express'],
    links: { source: 'https://github.com/syedfiras/sahaya', preview: 'no perview' }
  },
  {
    id: '05',
    type: 'MOBILE & WEB',
    title: 'GymNet Solutions Portal',
    image: 'gymnet.png',
    desc: 'A full-featured gym management platform supporting member tracking, work scheduling, automated invoice billing, and monthly performance logs.',
    metrics: [
      'Interactive class scheduler timelines',
      'Automated PDF invoice generation',
      'Trainer tracking and training planners',
      'Supabase real-time backend updates'
    ],
    stack: ['Ionic', 'Angular', 'Node.js', 'Supabase'],
    links: { source: 'https://github.com/syedfiras/gym', preview: 'https://gymnetsolutions.netlify.app/' }
  },
  {
    id: '06',
    type: 'WEB APPLICATION',
    title: 'IJESTM Journal Platform',
    image: 'ijestm.png',
    desc: 'College journal website built for AITM with advanced SEO features tailored for academic publications and research papers.',
    metrics: [
      'Advanced SEO for academic publications',
      'Research paper submission system',
      'Modern, accessible user interface'
    ],
    stack: ['React', 'Next.js', 'TypeScript'],
    links: { source: 'https://github.com/codingclub-aitm/IJESTM', preview: 'https://ijestm.aitm.edu.in/' }
  }
];

export const EXPERIENCE = [
  {
    year: '2026 - Present',
    role: 'SDE Intern',
    company: 'Dream Space Interior, Bangalore',
    type: 'Internship',
    desc: 'Working as a Software Development Engineer Intern, building and scaling full-stack web applications for Dream Space Interiors end-to-end — frontend, backend, and database.',
  },
  {
    year: 'May - Jul 2026',
    role: 'Frontend Intern',
    company: 'Omnimate',
    type: 'Internship',
    desc: 'Completed this internship as a Frontend Intern contributing to modern frontend systems, UI architectures, and scalable components.',
  },
  {
    year: '2025',
    role: 'Web Development Internship',
    company: 'My Job Grow & IIT Hyderabad',
    type: 'Internship',
    desc: 'Completed internship in collaboration with E&N IIT Hyderabad, focusing on full-stack integration and responsive client interfaces.',
  },
  {
    year: 'Mar - Jun 2025',
    role: 'Frontend Internship',
    company: 'iTecz Solutions',
    type: 'Internship',
    desc: 'Developed mobile/web client systems using Ionic and Angular frameworks, focusing on component-driven architectures.',
  },
  {
    year: '2024 - Present',
    role: 'Frontend & App Developer',
    company: 'Freelance',
    type: 'Freelance',
    desc: 'Building production-grade mobile applications and web interfaces for clients across multiple industries. React Native, React, and full-stack delivery.',
  },
];

export const SKILLS = [
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'TypeScript', 'HTML / CSS', 'TailwindCSS', 'Vite', 'Angular', 'Ionic', 'JavaScript',],
    ghost: '01',
  },
  {
    category: 'Mobile',
    items: ['React Native', 'NativeWind', 'Expo', 'iOS / Android',],
    ghost: '02',
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Supabase'],
    ghost: '03',
  },
  {
    category: 'Tools',
    items: ['Git', 'VS Code', 'Vercel', 'Render',],
    ghost: '04',
  },
];

export const TICKER_ITEMS = [
  'Mobile Apps', 'Web Interfaces', 'UI Engineering', 'React Native',
  'Frontend Systems', 'Design to Code', 'API Integration', 'Performance',
  'Cross-Platform', 'Component Architecture',
];

export const CONTACT_LINKS = [
  { label: 'EMAIL', value: 'syedfiras06@gmail.com', href: 'mailto:syedfiras06@gmail.com' },
  { label: 'GITHUB', value: 'github.com/syedfiras', href: 'https://github.com/syedfiras' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/syedfiras7', href: 'https://linkedin.com/in/syedfiras7' },
];

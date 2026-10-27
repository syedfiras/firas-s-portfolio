export interface CaseStudy {
  problem: string;
  solution: string;
  role: string;
  features: string[];
  challenge: string;
  result: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'dream-space-interior-storefront': {
    problem:
      'Dream Space Interiors needed a direct-to-consumer storefront for its modular interior products, where customers could browse categories, understand pricing upfront, and order without relying entirely on a sales call.',
    solution:
      'Built a Next.js storefront backed by Supabase and deployed on Vercel — category browsing, product pages with transparent pricing, cart and customer login, order tracking, a professionals section with bulk pricing, and WhatsApp ordering for assisted purchases.',
    role: 'SDE Intern at Dream Space Interiors, Bangalore (Jul 2026 – present) — worked across the Next.js frontend, Supabase data layer, and Vercel deployment to build and ship the storefront.',
    features: [
      'Category browsing for modular interiors',
      'Product pages with transparent pricing',
      'Cart and customer login',
      'Order tracking',
      'Professionals & bulk-pricing section',
      'WhatsApp ordering',
      'Next.js, Supabase & Vercel deployment',
    ],
    challenge:
      'Presenting modular interior products with clear, upfront pricing and a simple purchase path while supporting both individual customers and bulk professional buyers.',
    result:
      'Live production storefront, built during my SDE internship at Dream Space Interiors.',
  },
  'fatti-tours-travels': {
    problem:
      'Fatti Tours & Travels needed a polished online presence to present its domestic and international journeys, group departures, and tailor-made itineraries to prospective travelers.',
    solution:
      'Designed and built a responsive marketing website with a destination-led hero, package and itinerary sections, gallery, contact and plan-your-trip flows, and WhatsApp enquiry.',
    role: 'Freelance developer — built the React and Vite site and deployed it on Vercel as a client demo.',
    features: [
      'Domestic & international journey sections',
      'Group departures',
      'Tailor-made itineraries',
      'Package & destination browsing',
      'Gallery and contact sections',
      'WhatsApp enquiry',
    ],
    challenge:
      'Translating a broad range of travel services into a clear, visually rich marketing site that feels personal and works across devices.',
    result: 'Live client demo deployed on Vercel.',
  },
  'bifa-football-club-manager': {
    problem:
      'BIFA Football Club had no centralized system to manage players, track match results, or handle club administration. Everything was done manually via spreadsheets and messaging apps, making it error-prone and slow.',
    solution:
      'Built a cross-platform mobile app and web portal that unifies player registration, match scheduling, and club administration into a single system accessible by coaches, admins, and players.',
    role: 'Sole developer — architected the full-stack system, designed the UI with NativeWind, built the REST API with Node.js, and set up the backend with row-level security.',
    features: [
      'Player registration & profile management',
      'Match scheduling & result tracking',
      'Club admin dashboard',
      'Real-time notifications',
      'Registration portal (web)',
      'Role-based access control',
    ],
    challenge:
      'Ensuring the app performed well across both Android and iOS while keeping a unified codebase. NativeWind allowed design consistency across platforms without maintaining separate stylesheets.',
    result:
      'Live in production, actively used by BIFA Football Club for player and match management.',
  },
  'auction-football-system': {
    problem:
      'Football clubs needed a digital platform to conduct player transfer auctions with transparency and real-time bidding.',
    solution:
      'A web-based auction platform with real-time updates, secure bid management, and a clean bidding interface for club representatives.',
    role: 'Full-stack developer — React frontend, Node.js backend, Supabase for real-time data.',
    features: [
      'Real-time bidding',
      'Club authentication',
      'Player listing & auction rooms',
      'Bid history tracking',
      'Admin controls',
    ],
    challenge:
      'Implementing real-time bid synchronization across multiple simultaneous users without race conditions or stale state.',
    result: 'Live and used for conducting football player auctions.',
  },
  'gymnet-solutions-portal': {
    problem:
      'A gym had no digital infrastructure — member check-ins, billing, and scheduling were all paper-based, causing errors and inefficiency.',
    solution:
      'A full gym management platform covering member tracking, work scheduling, automated billing, and monthly performance logs.',
    role: 'Sole developer — Ionic Angular frontend, Node.js API, Supabase backend. Delivered as a freelance project.',
    features: [
      'Member registration & tracking',
      'Automated billing system',
      'Work & class scheduling',
      'Monthly performance logs',
      'Admin dashboard',
      'Mobile-responsive UI',
    ],
    challenge:
      'Building a complex multi-module system solo under tight freelance timelines while keeping the UI accessible to non-technical gym staff.',
    result: 'Live in production, actively used by gym staff.',
  },
  'ijestm-journal-platform': {
    problem:
      'AITM college needed a professional online presence for its IJESTM research journal with proper SEO to help academics discover published papers.',
    solution:
      'A Next.js journal website with TypeScript, tailored metadata, structured data, and SEO features specifically for academic publications.',
    role: 'Full-stack developer — built the entire site, implemented academic SEO patterns, and deployed it for the institution.',
    features: [
      'Academic SEO optimization',
      'Structured data for research papers',
      'Responsive editorial layout',
      'Volume & issue management',
      'Author submission guidelines',
      'Fast static rendering',
    ],
    challenge:
      'Academic SEO has unique requirements — structured data for research papers, proper canonical handling, and indexing signals differ from standard web pages.',
    result:
      'Live and indexed, discoverable on academic search engines.',
  },
  'footballcoach-ai': {
    problem:
      'Football coaches needed AI-assisted tactical analysis and drill planning, but existing AI tools were too generic and not football-specific.',
    solution:
      'An AI-powered football coaching assistant that generates tactical breakdowns, drill plans, and performance insights using LLM capabilities via OpenRouter.',
    role: 'Full-stack developer — React frontend, Node.js backend, OpenRouter LLM integration, Supabase for session management.',
    features: [
      'Tactical analysis generation',
      'AI drill plan creation',
      'Performance insights',
      'Chat-style interface',
      'Session persistence',
      'Coach profile system',
    ],
    challenge:
      'Prompt engineering for domain-specific football knowledge — making the AI output tactically sound rather than generic coaching advice.',
    result:
      'Live and available for coaches to explore AI-assisted coaching workflows.',
  },
  'interiora-studio': {
    problem:
      'Interior design teams needed a centralized platform to manage projects and day-to-day studio operations.',
    solution:
      'Interiora Studio is an interior design management platform featuring authentication, project management, and a responsive application interface. I develop and ship features for the platform during my SDE internship at Dream Space Interiors.',
    role: 'SDE Intern — independently developed and shipped application features, implemented interfaces and project management functionality, integrated application services, and maintained the existing production platform alongside the design team and supervisor.',
    features: [
      'Authentication',
      'Project management',
      'Responsive application interface',
      'Application service integration',
      'Production platform maintenance',
      'Hostinger KVM 1 VPS deployment',
    ],
    challenge:
      'Extending and maintaining an existing production platform while continuing to ship new features.',
    result:
      'Deployed on a Hostinger KVM 1 VPS and actively maintained as a production interior design management platform.',
  },
};

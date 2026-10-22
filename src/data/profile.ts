export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SnapshotRow {
  label: string;
  value: string;
}

export const PROFILE = {
  name: "Syed Firas Peerzade",
  firstName: "Syed Firas",
  lastName: "Peerzade",
  role: "Full-Stack Developer | Frontend & Mobile Developer",
  status: "Available for Projects",
  job: "SDE Intern at Dream Space Interiors",
  location: "Bhatkal, Karnataka, India",
  education: "B.Tech in Computer Science and Engineering, AITM, class of 2028",
  email: "workwithfiras@gmail.com",
  github: "https://github.com/syedfiras",
  githubHandle: "syedfiras",
  linkedin: "https://linkedin.com/in/syedfiras7",
  website: "https://syedfiras.dev/",
  resume: "/syedfiras.docx",
  currentlyBuilding: {
    name: "Interiora Studio",
    stack: ["Next.js", "Supabase", "Tailwind"],
  },
} as const;

export const NAV: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Certs", href: "#certs" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/syedfiras.docx", external: true },
];

/** Ordered registry — powers the nav dots and the fixed progress counter. */
export interface SectionMeta {
  id: string;
  label: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "Identity" },
  { id: "services", label: "What I Do" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "work", label: "Selected Work" },
  { id: "certs", label: "Certifications" },
  { id: "beyond", label: "Beyond" },
  { id: "github", label: "Activity" },
  { id: "contact", label: "Contact" },
];

export const HERO_WORDS = ["Build", "Create", "Impact"] as const;

export const STATS: Stat[] = [
  { value: 3, suffix: "+", label: "Years building digital products" },
  { value: 20, suffix: "+", label: "Mobile & web apps shipped" },
  { value: 13, suffix: "", label: "Hackathons" },
];

export const ABOUT_STATEMENT =
  "I build things that work. No decoration for decoration’s sake.";

export const ABOUT_BIO =
  "I am a Computer Science undergraduate and full-stack developer with hands-on experience building web applications, mobile applications, and backend-integrated products. I have worked on production features during internships, developed applications for freelance clients, and participated in 13 national hackathons. My technical experience includes React, Next.js, React Native, Angular, Ionic, Node.js, and Supabase. I enjoy building practical digital products, implementing application features, integrating backend services, and taking projects from development through deployment.";

export const ABOUT_SNAPSHOT: SnapshotRow[] = [
  { label: "Based in", value: "Bhatkal, Karnataka, India" },
  { label: "Education", value: "B.Tech CSE, AITM — 2028" },
  { label: "Currently", value: "SDE Intern at Dream Space Interiors (Remote)" },
  { label: "Focus", value: "Full-Stack · Web · Mobile · Backend" },
  { label: "Availability", value: "Available for Projects" },
];

export const CONTACT_LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "Website", value: "syedfiras.dev", href: PROFILE.website },
  { label: "GitHub", value: "github.com/syedfiras", href: PROFILE.github },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/syedfiras7",
    href: PROFILE.linkedin,
  },
] as const;

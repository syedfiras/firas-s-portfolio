import type { Metadata } from 'next';
import { Bebas_Neue, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
});

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex',
});

const SITE_URL = 'https://www.syedfiras.dev';
const SITE_NAME = 'Syed Firas Peerzada';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Syed Firas Peerzada | Full Stack Developer — Former SDE Intern @ Dream Space Interiors (Open to Work)',
    template: '%s | Syed Firas Peerzada',
  },
  description:
    'Portfolio of Syed Firas Peerzada — Full Stack Developer, Former SDE Intern at Dream Space Interiors (Jul–Sep 2026), now open to work. React Native, Next.js, Node.js.',
  keywords: [
    'Syed Firas Peerzada',
    'full stack developer',
    'open to work',
    'frontend developer',
    'react native developer',
    'next.js developer',
    'portfolio',
    'mobile app developer',
    'dream space interiors',
  ],
  authors: [{ name: 'Syed Firas Peerzada', url: SITE_URL }],
  creator: 'Syed Firas Peerzada',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Syed Firas Peerzada | Full Stack Developer — Former SDE Intern @ Dream Space Interiors (Open to Work)',
    description:
      'Full Stack Developer, Former SDE Intern at Dream Space Interiors (Jul–Sep 2026), now open to work. Building functional, high-performance digital products. Native mobile. Web interfaces. No fluff.',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        secureUrl: `${SITE_URL}/og.png`,
        width: 1983,
        height: 793,
        alt: 'Syed Firas Peerzada — Full Stack Developer (Open to Work)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syed Firas Peerzada | Full Stack Developer (Open to Work)',
    description:
      'Full Stack Developer, Former SDE Intern at Dream Space Interiors (Jul–Sep 2026), now open to work building functional digital products.',
    images: [`${SITE_URL}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          'Portfolio of Syed Firas Peerzada — Full Stack Developer, Former SDE Intern at Dream Space Interiors (Jul–Sep 2026), now open to work.',
        inLanguage: 'en',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'Full Stack Developer (Open to Work)',
        email: 'mailto:workwithfiras@gmail.com',
        image: `${SITE_URL}/og.png`,
        sameAs: [
          'https://github.com/syedfiras',
          'https://linkedin.com/in/syedfiras7',
        ],
        knowsAbout: [
          'React Native',
          'Next.js',
          'React',
          'TypeScript',
          'Node.js',
          'UI Engineering',
        ],
        alumniOf: {
          '@type': 'Organization',
          name: 'Dream Space Interiors',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bangalore',
            addressCountry: 'IN',
          },
        },
        seeks: 'Full-time and freelance opportunities in full-stack web and mobile development',
      },
    ],
  };

  return (
    <html lang="en" className={`${bebas.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

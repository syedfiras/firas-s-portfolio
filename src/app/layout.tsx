import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const SITE_URL = 'https://www.syedfiras.dev';
const SITE_NAME = 'Syed Firas Peerzade';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Syed Firas Peerzade | Full Stack Developer — SDE Intern @ Dream Space Interiors',
    template: '%s | Syed Firas Peerzade',
  },
  description:
    'Portfolio of Syed Firas Peerzade — Full Stack Developer & SDE Intern at Dream Space Interiors, Bangalore (Jul 2026 – Present). React Native, Next.js, Node.js, Supabase.',
  keywords: [
    'Syed Firas Peerzade',
    'full stack developer',
    'SDE Intern',
    'frontend developer',
    'react native developer',
    'next.js developer',
    'portfolio',
    'mobile app developer',
    'dream space interiors',
  ],
  authors: [{ name: 'Syed Firas Peerzade', url: SITE_URL }],
  creator: 'Syed Firas Peerzade',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Syed Firas Peerzade | Full Stack Developer — SDE Intern @ Dream Space Interiors',
    description:
      'SDE Intern at Dream Space Interiors (Jul 2026 – Present), Bangalore. Building Interiora Studio — React Native, Next.js, Node.js, Supabase.',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Syed Firas Peerzade — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syed Firas Peerzade | Full Stack Developer',
    description:
      'SDE Intern at Dream Space Interiors — building Interiora Studio and functional digital products.',
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
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          'Portfolio of Syed Firas Peerzade — Full Stack Developer, SDE Intern at Dream Space Interiors.',
        inLanguage: 'en',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'SDE Intern @ Dream Space Interiors | Full Stack Developer',
        email: 'mailto:workwithfiras@gmail.com',
        image: `${SITE_URL}/og.png`,
        sameAs: [
          'https://github.com/syedfiras',
          'https://linkedin.com/in/syedfiras7',
        ],
        knowsAbout: ['React Native', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Supabase'],
        worksFor: {
          '@type': 'Organization',
          name: 'Dream Space Interiors',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bangalore',
            addressCountry: 'IN',
          },
        },
        description:
          'SDE Intern at Dream Space Interiors (Jul 2026 – Present) — building Interiora Studio and internal tooling.',
      },
    ],
  };

  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
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

import type { Metadata, Viewport } from 'next';
import { Freckle_Face, Syne_Mono } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/lib/lenis';
import Cursor from '@/components/ui/Cursor';

const freckle = Freckle_Face({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-freckle',
});

const syne = Syne_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
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
    default: 'Syed Firas Peerzade | Full-Stack Developer | Frontend & Mobile Developer',
    template: '%s | Syed Firas Peerzade',
  },
  description:
    'Portfolio of Syed Firas Peerzade — Full-Stack Developer and Frontend & Mobile Developer. React, Next.js, React Native, Node.js, Supabase.',
  keywords: [
    'Syed Firas Peerzade',
    'full-stack developer',
    'frontend developer',
    'mobile developer',
    'react native developer',
    'next.js developer',
    'angular developer',
    'ionic developer',
    'portfolio',
    'mobile app developer',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Syed Firas Peerzade | Full-Stack Developer | Frontend & Mobile Developer',
    description:
      'Full-Stack Developer and Frontend & Mobile Developer building with React, Next.js, React Native, Node.js, and Supabase.',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Syed Firas Peerzade — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syed Firas Peerzade | Full-Stack Developer | Frontend & Mobile Developer',
    description:
      'Full-Stack Developer and Frontend & Mobile Developer building functional web, mobile, and backend products.',
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
        inLanguage: 'en',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'Full-Stack Developer | Frontend & Mobile Developer',
        email: 'mailto:workwithfiras@gmail.com',
        image: `${SITE_URL}/og.png`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bhatkal',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
        sameAs: [
          'https://github.com/syedfiras',
          'https://linkedin.com/in/syedfiras7',
          'https://syedfiras.dev/',
        ],
        knowsAbout: [
          'React',
          'Next.js',
          'React Native',
          'Angular',
          'Ionic',
          'TypeScript',
          'Node.js',
          'Supabase',
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'AITM',
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${freckle.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LenisProvider>
          {children}
          <Cursor />
          <div className="grain" aria-hidden />
        </LenisProvider>
      </body>
    </html>
  );
}

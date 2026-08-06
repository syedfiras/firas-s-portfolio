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
    default: 'Syed Firas Peerzada | App Developer & Frontend Engineer',
    template: '%s | Syed Firas Peerzada',
  },
  description:
    'Portfolio of Syed Firas Peerzada — App Developer and Frontend Engineer specializing in building bold, functional digital experiences. React Native, Next.js, Node.js.',
  keywords: [
    'Syed Firas Peerzada',
    'app developer',
    'frontend developer',
    'react native developer',
    'next.js developer',
    'portfolio',
    'mobile app developer',
    'frontend engineer',
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
    title: 'Syed Firas Peerzada | App Developer & Frontend Engineer',
    description:
      'App developer and frontend engineer building functional, high-performance digital products. Native mobile. Web interfaces. No fluff.',
    images: [
      {
        url: '/og.png',
        width: 1020,
        height: 1542,
        alt: 'Syed Firas Peerzada — App Developer & Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syed Firas Peerzada | App Developer & Frontend Engineer',
    description:
      'App developer and frontend engineer building functional, high-performance digital products.',
    images: ['/og.png'],
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
          'Portfolio of Syed Firas Peerzada — App Developer and Frontend Engineer.',
        inLanguage: 'en',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'App Developer & Frontend Engineer',
        email: 'mailto:syedfiras06@gmail.com',
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
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${bebas.variable} ${plexMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

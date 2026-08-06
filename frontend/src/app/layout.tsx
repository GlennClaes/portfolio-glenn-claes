import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';

import { LanguageProvider } from '@/i18n/LanguageProvider';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://127.0.0.1:3000';
const siteOrigin = new URL(siteUrl).origin;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const assetPath = (path: string) => `${basePath}${path}`;
const title = 'Glenn Claes - Developer Portfolio';
const description =
  'Glenn Claes — developer portfolio. Custom websites with Next.js, React and TypeScript, AI features with Python, and practical automations. Based in Belgium.';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title,
  description,
  applicationName: 'Glenn Claes Portfolio',
  authors: [{ name: 'Glenn Claes', url: siteUrl }],
  creator: 'Glenn Claes',
  keywords: [
    'Glenn Claes',
    'developer portfolio',
    'Next.js developer',
    'React developer',
    'TypeScript',
    'Python developer',
    'AI',
    'automation',
    'web development',
    'GitHub Pages',
    'Belgium',
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Glenn Claes',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  icons: {
    icon: [
      { url: assetPath('/favicon.ico') },
      { url: assetPath('/favicon.svg'), type: 'image/svg+xml' },
    ],
  },
  manifest: assetPath('/site.webmanifest'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F8FAFC',
  colorScheme: 'light',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Glenn Claes',
      url: siteUrl,
      email: 'mailto:contact@glennclaes.be',
      jobTitle: 'Web Developer',
      description,
      address: { '@type': 'PostalAddress', addressCountry: 'BE' },
      sameAs: [
        'https://www.linkedin.com/in/glenn-claes-ai/',
        'https://github.com/GlennClaes',
      ],
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Python',
        'Artificial Intelligence',
        'Automation',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: title,
      publisher: { '@id': `${siteUrl}/#person` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

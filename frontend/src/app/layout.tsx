import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, JetBrains_Mono, Outfit } from 'next/font/google';
import type { ReactNode } from 'react';

import { LanguageProvider } from '@/i18n/LanguageProvider';
import '@/app/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
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
  'Developer portfolio for Glenn Claes. Websites with Next.js, React and TypeScript, AI features with Python, and practical automations.';

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
    images: [
      {
        url: assetPath('/og-image.svg'),
        width: 1200,
        height: 630,
        alt: 'Glenn Claes - Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [assetPath('/og-image.svg')],
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

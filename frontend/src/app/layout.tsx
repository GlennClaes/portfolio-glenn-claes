import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, JetBrains_Mono, Manrope, Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

import '@/app/globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
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
  'Developer portfolio for Glenn Claes. Clean websites, practical app interfaces, automation and deployable frontend work.';

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
    'frontend developer',
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
        className={`${manrope.variable} ${jakarta.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

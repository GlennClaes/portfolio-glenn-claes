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

const title = 'Ben Baeyens — Freelance Unity Developer';
const description =
  "Freelance IT'er specialised in Unity development. I build Unity games, apps, and teach Unity through practical lessons.";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.benbaeyens.com'),
  title,
  description,
  applicationName: 'Ben Baeyens Portfolio',
  authors: [{ name: 'Ben Baeyens', url: 'https://www.benbaeyens.com' }],
  creator: 'Ben Baeyens',
  keywords: [
    'Unity developer',
    'Freelance Unity developer',
    'Unity lessons',
    'Unity app development',
    'Unity game development',
    'Belgium',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Ben Baeyens',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Ben Baeyens — Freelance Unity Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF8F4',
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

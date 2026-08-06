import type { MetadataRoute } from 'next';

import { LOCALES } from '@/i18n/messages';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://127.0.0.1:3000';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((locale) => [locale, siteUrl])),
      },
    },
  ];
}

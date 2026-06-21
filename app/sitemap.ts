import type { MetadataRoute } from 'next';
import { locales } from '@/lib/site';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoulscompass.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Root redirects to /th
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // For each locale
  locales.forEach((locale) => {
    // Home
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Core pages
    routes.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    routes.push({
      url: `${baseUrl}/${locale}/manifesto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    routes.push({
      url: `${baseUrl}/${locale}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });

    routes.push({
      url: `${baseUrl}/${locale}/concepts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    routes.push({
      url: `${baseUrl}/${locale}/series`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    routes.push({
      url: `${baseUrl}/${locale}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });

    // Categories
    const categories = [
      'analytical-psychology',
      'psychoanalysis',
      'philosophy',
      'typology',
      'tpdt',
    ];

    categories.forEach((category) => {
      routes.push({
        url: `${baseUrl}/${locale}/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  return routes;
}

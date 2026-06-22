import type { MetadataRoute } from 'next';
import { getPublishedArticles } from '@/lib/articles';
import { getPublishedConcepts } from '@/lib/concepts';
import { getPublishedReferences } from '@/lib/references';
import { getPublishedSeries } from '@/lib/series';
import { locales } from '@/lib/site';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoulscompass.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // Root redirects to /th
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // For each locale
  for (const locale of locales) {
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

    routes.push({
      url: `${baseUrl}/${locale}/external-links`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.65,
    });

    routes.push({
      url: `${baseUrl}/${locale}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
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

    const articles = await getPublishedArticles(locale);

    for (const article of articles) {
      routes.push({
        url: `${baseUrl}/${locale}/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    const concepts = await getPublishedConcepts(locale);

    for (const concept of concepts) {
      routes.push({
        url: `${baseUrl}/${locale}/concepts/${concept.slug}`,
        lastModified: new Date(concept.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    }

    const series = await getPublishedSeries(locale);

    for (const item of series) {
      routes.push({
        url: `${baseUrl}/${locale}/series/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    }

    const references = await getPublishedReferences();

    for (const reference of references) {
      routes.push({
        url: `${baseUrl}/${locale}/resources/${reference.slug}`,
        lastModified: new Date(reference.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return routes;
}

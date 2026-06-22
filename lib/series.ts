import 'server-only';

import { cache } from 'react';
import { z } from 'zod';
import { thaiSeries } from '@/content/series';
import { conceptReferences } from '@/content/concepts/references';
import { getPublishedArticles } from '@/lib/articles';
import { getPublishedConcepts } from '@/lib/concepts';
import { categoryIds } from '@/lib/content/categories';
import { getReferenceSlugById } from '@/lib/references';
import type { Locale } from '@/lib/site';
import type { ConceptReference, ConceptSummary } from '@/types/concept';
import {
  seriesDifficulties,
  seriesItemTypes,
  seriesStatuses,
  seriesTypes,
  type ResolvedSeriesItem,
  type Series,
  type SeriesSummary,
} from '@/types/series';

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const seriesCategoryIds = [
  ...categoryIds,
  'comparative-psychology',
] as const;

const seriesItemSchema = z.object({
  id: z.string().min(1),
  seriesId: z.string().min(1),
  order: z.number().int().positive(),
  type: z.enum(seriesItemTypes),
  targetId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  required: z.boolean(),
  estimatedReadingTime: z.number().int().positive(),
});

const seriesSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  introduction: z.string().min(1),
  language: z.enum(['th', 'en']),
  type: z.enum(seriesTypes),
  category: z.enum(seriesCategoryIds),
  difficulty: z.enum(seriesDifficulties),
  status: z.enum(seriesStatuses),
  coverImage: z
    .object({
      src: z.string().min(1),
      alt: z.string().min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })
    .nullable(),
  estimatedReadingTime: z.number().int().positive(),
  articleCount: z.number().int().nonnegative(),
  conceptCount: z.number().int().nonnegative(),
  author: z.string().min(1),
  publishedAt: z.string().regex(isoDatePattern),
  updatedAt: z.string().regex(isoDatePattern),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  items: z.array(seriesItemSchema).min(1),
  suggestedSeries: z.array(z.string().min(1)),
  translations: z.object({
    th: z.string().min(1).optional(),
    en: z.string().min(1).optional(),
  }),
});

const referenceMap = new Map<string, ConceptReference>(
  Object.values(conceptReferences).map((reference) => [
    reference.id,
    reference,
  ])
);

function toSummary(series: Series): SeriesSummary {
  const { introduction, items, ...summary } = series;
  void introduction;

  return {
    ...summary,
    itemCount: items.length,
  };
}

const loadSeries = cache(async (): Promise<Series[]> => {
  const parsed = z.array(seriesSchema).safeParse(thaiSeries);

  if (!parsed.success) {
    throw new Error(`Invalid series seed data: ${z.prettifyError(parsed.error)}`);
  }

  const ids = new Set<string>();
  const localizedSlugs = new Set<string>();

  for (const series of parsed.data) {
    const localizedSlug = `${series.language}:${series.slug}`;

    if (ids.has(series.id)) {
      throw new Error(`Duplicate series id: ${series.id}`);
    }

    if (localizedSlugs.has(localizedSlug)) {
      throw new Error(`Duplicate series slug: ${localizedSlug}`);
    }

    ids.add(series.id);
    localizedSlugs.add(localizedSlug);
  }

  for (const locale of ['th', 'en'] as const) {
    const [articles, concepts] = await Promise.all([
      getPublishedArticles(locale),
      getPublishedConcepts(locale),
    ]);
    const articleIds = new Set(articles.map((article) => article.id));
    const conceptIds = new Set(concepts.map((concept) => concept.id));

    for (const series of parsed.data.filter(
      (candidate) => candidate.language === locale
    )) {
      const itemIds = new Set<string>();
      const orders = new Set<number>();
      let articleCount = 0;
      let conceptCount = 0;
      let estimatedReadingTime = 0;

      for (const item of series.items) {
        if (item.seriesId !== series.id) {
          throw new Error(
            `Series item ${item.id} points to ${item.seriesId}, expected ${series.id}`
          );
        }

        if (itemIds.has(item.id)) {
          throw new Error(`Duplicate series item id: ${item.id}`);
        }

        if (orders.has(item.order)) {
          throw new Error(
            `Duplicate order ${item.order} in series ${series.slug}`
          );
        }

        itemIds.add(item.id);
        orders.add(item.order);
        estimatedReadingTime += item.estimatedReadingTime;

        if (item.type === 'article') {
          articleCount += 1;
          if (!articleIds.has(item.targetId)) {
            throw new Error(
              `Broken article item in ${series.slug}: ${item.targetId}`
            );
          }
        }

        if (item.type === 'concept') {
          conceptCount += 1;
          if (!conceptIds.has(item.targetId)) {
            throw new Error(
              `Broken concept item in ${series.slug}: ${item.targetId}`
            );
          }
        }

        if (
          item.type === 'reference' &&
          !referenceMap.has(item.targetId)
        ) {
          throw new Error(
            `Broken reference item in ${series.slug}: ${item.targetId}`
          );
        }
      }

      const expectedOrders = Array.from(
        { length: series.items.length },
        (_, index) => index + 1
      );

      if (expectedOrders.some((order) => !orders.has(order))) {
        throw new Error(`Non-contiguous item order in series ${series.slug}`);
      }

      if (articleCount !== series.articleCount) {
        throw new Error(
          `Article count mismatch in ${series.slug}: expected ${series.articleCount}, found ${articleCount}`
        );
      }

      if (conceptCount !== series.conceptCount) {
        throw new Error(
          `Concept count mismatch in ${series.slug}: expected ${series.conceptCount}, found ${conceptCount}`
        );
      }

      if (estimatedReadingTime !== series.estimatedReadingTime) {
        throw new Error(
          `Reading time mismatch in ${series.slug}: expected ${series.estimatedReadingTime}, found ${estimatedReadingTime}`
        );
      }

      for (const suggestedSlug of series.suggestedSeries) {
        if (!localizedSlugs.has(`${series.language}:${suggestedSlug}`)) {
          throw new Error(
            `Broken suggested series in ${series.slug}: ${suggestedSlug}`
          );
        }
      }

      for (const [translationLocale, translationSlug] of Object.entries(
        series.translations
      )) {
        if (
          translationSlug &&
          !localizedSlugs.has(
            `${translationLocale as Locale}:${translationSlug}`
          )
        ) {
          throw new Error(
            `Broken series translation in ${series.slug}: ${translationLocale}:${translationSlug}`
          );
        }
      }
    }
  }

  return parsed.data
    .map((series) => ({
      ...series,
      items: [...series.items].sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
});

export const getPublishedSeries = cache(
  async (locale: Locale): Promise<SeriesSummary[]> => {
    const series = await loadSeries();

    return series
      .filter(
        (item) =>
          item.language === locale &&
          (item.status === 'active' || item.status === 'completed')
      )
      .map(toSummary);
  }
);

export const getSeriesBySlug = cache(
  async (locale: Locale, slug: string): Promise<Series | null> => {
    const series = await loadSeries();

    return (
      series.find(
        (item) =>
          item.language === locale &&
          item.slug === slug &&
          (item.status === 'active' || item.status === 'completed')
      ) ?? null
    );
  }
);

export async function resolveSeriesItems(
  series: Series
): Promise<ResolvedSeriesItem[]> {
  const [articles, concepts] = await Promise.all([
    getPublishedArticles(series.language),
    getPublishedConcepts(series.language),
  ]);
  const articlesById = new Map(articles.map((article) => [article.id, article]));
  const conceptsById = new Map(concepts.map((concept) => [concept.id, concept]));

  return series.items.map((item) => {
    if (item.type === 'article') {
      const article = articlesById.get(item.targetId);
      return {
        ...item,
        href: article
          ? `/${series.language}/articles/${article.slug}`
          : null,
        targetSlug: article?.slug ?? null,
        targetAvailable: Boolean(article),
      };
    }

    if (item.type === 'concept') {
      const concept = conceptsById.get(item.targetId);
      return {
        ...item,
        href: concept
          ? `/${series.language}/concepts/${concept.slug}`
          : null,
        targetSlug: concept?.slug ?? null,
        targetAvailable: Boolean(concept),
      };
    }

    if (item.type === 'reference') {
      const referenceSlug = getReferenceSlugById(item.targetId);

      return {
        ...item,
        href: referenceSlug
          ? `/${series.language}/resources/${referenceSlug}`
          : null,
        targetSlug: referenceSlug,
        targetAvailable: referenceMap.has(item.targetId),
      };
    }

    return {
      ...item,
      href: null,
      targetSlug: null,
      targetAvailable:
        item.type === 'note' || referenceMap.has(item.targetId),
    };
  });
}

export async function getSeriesRelatedConcepts(
  series: Series
): Promise<ConceptSummary[]> {
  const concepts = await getPublishedConcepts(series.language);
  const ids = new Set(
    series.items
      .filter((item) => item.type === 'concept')
      .map((item) => item.targetId)
  );

  return concepts.filter((concept) => ids.has(concept.id));
}

export function getSeriesReferences(series: Series): ConceptReference[] {
  return series.items
    .filter((item) => item.type === 'reference')
    .map((item) => referenceMap.get(item.targetId))
    .filter((reference): reference is ConceptReference => Boolean(reference));
}

export async function getSuggestedSeries(
  series: Series
): Promise<SeriesSummary[]> {
  const allSeries = await getPublishedSeries(series.language);
  const suggestedSlugs = new Set(series.suggestedSeries);

  return allSeries.filter((item) => suggestedSlugs.has(item.slug));
}

export async function getStaticSeriesParams() {
  const series = await loadSeries();

  return series
    .filter(
      (item) => item.status === 'active' || item.status === 'completed'
    )
    .map((item) => ({
      locale: item.language,
      slug: item.slug,
    }));
}

import 'server-only';

import { cache } from 'react';
import { z } from 'zod';
import { thaiConcepts } from '@/content/concepts/th';
import {
  getPublishedArticles,
  getStaticPublishedArticles,
} from '@/lib/articles';
import {
  categoryIds,
  type CategoryId,
} from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import {
  conceptDifficulties,
  conceptStatuses,
  type Concept,
  type ConceptSummary,
} from '@/types/concept';
import type { ArticleSummary } from '@/types/article';

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const conceptSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  originalTerm: z.string().min(1),
  thaiTerm: z.string().min(1),
  shortDefinition: z.string().min(1),
  humanExplanation: z.string().min(1),
  technicalExplanation: z.string().min(1),
  category: z.enum(categoryIds),
  tradition: z.string().min(1),
  thinkers: z.array(z.string().min(1)).min(1),
  relatedConcepts: z.array(
    z.object({
      slug: z.string().min(1),
      title: z.string().min(1),
      relation: z.string().min(1),
    })
  ),
  relatedArticles: z.array(z.string().min(1)),
  references: z.array(
    z.object({
      id: z.string().min(1),
      authors: z.string().min(1),
      year: z.number().int().positive().optional(),
      title: z.string().min(1),
      publication: z.string().min(1).optional(),
      url: z.url().optional(),
    })
  ),
  commonMisunderstandings: z.array(z.string().min(1)).min(1),
  examples: z.array(z.string().min(1)).min(1),
  language: z.enum(['th', 'en']),
  status: z.enum(conceptStatuses),
  difficulty: z.enum(conceptDifficulties),
  updatedAt: z.string().regex(isoDatePattern),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  translations: z.object({
    th: z.string().min(1).optional(),
    en: z.string().min(1).optional(),
  }),
});

function toSummary(concept: Concept): ConceptSummary {
  const {
    humanExplanation,
    technicalExplanation,
    references,
    commonMisunderstandings,
    examples,
    ...summary
  } = concept;
  void humanExplanation;
  void technicalExplanation;
  void references;
  void commonMisunderstandings;
  void examples;
  return summary;
}

const loadConcepts = cache(async (): Promise<Concept[]> => {
  const parsed = z.array(conceptSchema).safeParse(thaiConcepts);

  if (!parsed.success) {
    throw new Error(`Invalid concept seed data: ${z.prettifyError(parsed.error)}`);
  }

  const ids = new Set<string>();
  const localizedSlugs = new Set<string>();

  for (const concept of parsed.data) {
    const localizedSlug = `${concept.language}:${concept.slug}`;

    if (ids.has(concept.id)) {
      throw new Error(`Duplicate concept id: ${concept.id}`);
    }

    if (localizedSlugs.has(localizedSlug)) {
      throw new Error(`Duplicate concept slug: ${localizedSlug}`);
    }

    ids.add(concept.id);
    localizedSlugs.add(localizedSlug);
  }

  for (const concept of parsed.data) {
    for (const relation of concept.relatedConcepts) {
      if (!localizedSlugs.has(`${concept.language}:${relation.slug}`)) {
        throw new Error(
          `Broken concept relation in ${concept.slug}: ${relation.slug}`
        );
      }
    }

    for (const [locale, translatedSlug] of Object.entries(
      concept.translations
    )) {
      if (
        translatedSlug &&
        !localizedSlugs.has(`${locale as Locale}:${translatedSlug}`)
      ) {
        throw new Error(
          `Broken concept translation in ${concept.slug}: ${locale}:${translatedSlug}`
        );
      }
    }
  }

  for (const locale of ['th', 'en'] as const) {
    const articles = await getStaticPublishedArticles(locale);
    const articleSlugs = new Set(articles.map((article) => article.slug));

    for (const concept of parsed.data.filter(
      (candidate) => candidate.language === locale
    )) {
      for (const articleSlug of concept.relatedArticles) {
        if (!articleSlugs.has(articleSlug)) {
          throw new Error(
            `Broken concept article link in ${concept.slug}: ${articleSlug}`
          );
        }
      }
    }

    for (const article of articles) {
      for (const conceptLink of article.relatedConcepts) {
        if (!localizedSlugs.has(`${locale}:${conceptLink.slug}`)) {
          throw new Error(
            `Broken article concept link in ${article.slug}: ${conceptLink.slug}`
          );
        }
      }
    }
  }

  return parsed.data.sort((a, b) =>
    a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
  );
});

export const getPublishedConcepts = cache(
  async (locale: Locale): Promise<ConceptSummary[]> => {
    const concepts = await loadConcepts();
    return concepts
      .filter(
        (concept) =>
          concept.language === locale && concept.status === 'published'
      )
      .map(toSummary);
  }
);

export const getConceptBySlug = cache(
  async (locale: Locale, slug: string): Promise<Concept | null> => {
    const concepts = await loadConcepts();
    return (
      concepts.find(
        (concept) =>
          concept.language === locale &&
          concept.status === 'published' &&
          concept.slug === slug
      ) ?? null
    );
  }
);

export async function getRelatedConcepts(
  concept: Concept
): Promise<ConceptSummary[]> {
  const concepts = await getPublishedConcepts(concept.language);
  const slugs = new Set(concept.relatedConcepts.map((relation) => relation.slug));
  return concepts.filter((candidate) => slugs.has(candidate.slug));
}

export async function getConceptArticles(
  concept: Concept
): Promise<ArticleSummary[]> {
  const articles = await getPublishedArticles(concept.language);
  const explicitSlugs = new Set(concept.relatedArticles);

  return articles.filter(
    (article) =>
      explicitSlugs.has(article.slug) ||
      article.relatedConcepts.some((related) => related.slug === concept.slug)
  );
}

export async function getConceptsByCategory(
  locale: Locale,
  category: CategoryId
): Promise<ConceptSummary[]> {
  const concepts = await getPublishedConcepts(locale);
  return concepts.filter((concept) => concept.category === category);
}

export async function getStaticConceptParams() {
  const concepts = await loadConcepts();
  return concepts
    .filter((concept) => concept.status === 'published')
    .map((concept) => ({
      locale: concept.language,
      slug: concept.slug,
    }));
}

import 'server-only';

import { cache } from 'react';
import { references } from '@/content/references';
import { locales } from '@/lib/site';
import type { Locale } from '@/lib/site';
import type { Reference } from '@/types/reference';

const referenceAliases: Record<string, string> = {
  'jung-aion-1951-ego': 'jung-aion-1951',
};

const referenceSlugById = new Map(
  references.map((reference) => [reference.id, reference.slug])
);

function validateReferences(items: Reference[]): Reference[] {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const reference of items) {
    if (ids.has(reference.id)) {
      throw new Error(`Duplicate reference id: ${reference.id}`);
    }

    if (slugs.has(reference.slug)) {
      throw new Error(`Duplicate reference slug: ${reference.slug}`);
    }

    ids.add(reference.id);
    slugs.add(reference.slug);
  }

  return items;
}

const loadReferences = cache(async (): Promise<Reference[]> =>
  validateReferences(references).sort((a, b) => {
    const authorOrder = a.author.localeCompare(b.author, 'en', {
      sensitivity: 'base',
    });
    return authorOrder || (a.year ?? 9999) - (b.year ?? 9999);
  })
);

export const getPublishedReferences = cache(async (): Promise<Reference[]> => {
  const items = await loadReferences();
  return items.filter((reference) => reference.status === 'published');
});

export const getReferenceBySlug = cache(
  async (slug: string): Promise<Reference | null> => {
    const items = await getPublishedReferences();
    return items.find((reference) => reference.slug === slug) ?? null;
  }
);

export function getReferenceSlugById(id: string): string | null {
  const canonicalId = referenceAliases[id] ?? id;
  return referenceSlugById.get(canonicalId) ?? null;
}

export async function getStaticReferenceParams() {
  const items = await getPublishedReferences();

  return locales.flatMap((locale: Locale) =>
    items.map((reference) => ({ locale, slug: reference.slug }))
  );
}

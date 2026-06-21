import type { Concept } from '@/types/concept';

type SeedConcept = Omit<
  Concept,
  'language' | 'status' | 'updatedAt' | 'translations'
> &
  Partial<
    Pick<Concept, 'language' | 'status' | 'updatedAt' | 'translations'>
  >;

export function defineConcept(concept: SeedConcept): Concept {
  return {
    language: 'th',
    status: 'published',
    updatedAt: '2026-06-21',
    translations: {},
    ...concept,
  };
}

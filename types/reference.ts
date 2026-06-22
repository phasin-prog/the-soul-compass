import type { Locale } from '@/lib/site';

export const referenceTypes = [
  'book',
  'paper',
  'essay',
  'lecture',
  'archive',
  'website',
  'glossary',
  'internal_note',
  'manuscript',
  'collected_works',
  'clinical_text',
  'philosophical_text',
] as const;
export type ReferenceType = (typeof referenceTypes)[number];

export const referenceCategories = [
  'analytical-psychology',
  'psychoanalysis',
  'lacanian-psychoanalysis',
  'adlerian-psychology',
  'neuroscience',
  'social-psychology',
  'philosophy',
  'philosophy-of-mind',
  'typology',
  'tpdt',
  'research-methodology',
] as const;
export type ReferenceCategory = (typeof referenceCategories)[number];

export const referenceSourceLevels = [
  'primary',
  'secondary',
  'interpretation',
  'internal',
] as const;
export type ReferenceSourceLevel = (typeof referenceSourceLevels)[number];

export const referenceStatuses = ['draft', 'published', 'archived'] as const;
export type ReferenceStatus = (typeof referenceStatuses)[number];

export type LocalizedReferenceText = Record<Locale, string>;

export interface Reference {
  id: string;
  slug: string;
  title: string;
  originalTitle: string | null;
  author: string;
  translator: string | null;
  editor: string | null;
  year: number | null;
  publisher: string | null;
  language: string;
  type: ReferenceType;
  category: ReferenceCategory;
  tradition: string;
  sourceLevel: ReferenceSourceLevel;
  description: LocalizedReferenceText;
  notes: LocalizedReferenceText;
  relatedThinkers: string[];
  relatedConcepts: string[];
  relatedArticles: string[];
  relatedSeries: string[];
  citationText: string;
  externalUrl: string | null;
  isbn: string | null;
  doi: string | null;
  status: ReferenceStatus;
  createdAt: string;
  updatedAt: string;
  seoTitle: LocalizedReferenceText;
  seoDescription: LocalizedReferenceText;
}

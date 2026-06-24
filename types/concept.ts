import type { CategoryId } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';

export const conceptStatuses = ['draft', 'review', 'published'] as const;
export type ConceptStatus = (typeof conceptStatuses)[number];

export const conceptDifficulties = [
  'beginner',
  'intermediate',
  'advanced',
  'academic',
] as const;
export type ConceptDifficulty = (typeof conceptDifficulties)[number];

export const conceptEntryTypes = [
  'concept',
  'person',
  'book',
  'school',
  'term',
  'symbol',
  'timeline',
  'source-note',
] as const;
export type ConceptEntryType = (typeof conceptEntryTypes)[number];

export interface ConceptRelation {
  slug: string;
  title: string;
  relation: string;
}

export interface ConceptReference {
  id: string;
  authors: string;
  year?: number;
  title: string;
  publication?: string;
  url?: string;
}

export interface Concept {
  id: string;
  slug: string;
  title: string;
  originalTerm: string;
  thaiTerm: string;
  shortDefinition: string;
  humanExplanation: string;
  technicalExplanation: string;
  category: CategoryId;
  tradition: string;
  thinkers: string[];
  relatedConcepts: ConceptRelation[];
  relatedArticles: string[];
  references: ConceptReference[];
  commonMisunderstandings: string[];
  examples: string[];
  language: Locale;
  status: ConceptStatus;
  difficulty: ConceptDifficulty;
  entryType?: ConceptEntryType;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  translations: Partial<Record<Locale, string>>;
}

export type ConceptSummary = Omit<
  Concept,
  | 'humanExplanation'
  | 'technicalExplanation'
  | 'references'
  | 'commonMisunderstandings'
  | 'examples'
>;


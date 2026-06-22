import type { Locale } from '@/lib/site';

export const externalLinkCategories = [
  'analytical_psychology',
  'psychoanalysis',
  'lacanian_psychoanalysis',
  'adlerian_psychology',
  'philosophy',
  'philosophy_of_mind',
  'neuroscience',
  'social_psychology',
  'clinical_ethics',
  'journal',
  'archive',
  'encyclopedia',
  'training_institute',
  'association',
  'internal',
  'other',
] as const;
export type ExternalLinkCategory = (typeof externalLinkCategories)[number];

export const externalLinkTypes = [
  'association',
  'institute',
  'training_center',
  'encyclopedia',
  'journal',
  'archive',
  'university_resource',
  'society',
  'educational_center',
  'reference_site',
  'internal_project',
  'other',
] as const;
export type ExternalLinkType = (typeof externalLinkTypes)[number];

export const externalLinkStatuses = [
  'active',
  'needs_review',
  'archived',
  'broken',
] as const;
export type ExternalLinkStatus = (typeof externalLinkStatuses)[number];

export interface ExternalLink {
  id: string;
  slug: string;
  name: string;
  abbreviation: string | null;
  description: Record<Locale, string>;
  url: string;
  category: ExternalLinkCategory;
  linkType: ExternalLinkType;
  authorityNote: Record<Locale, string>;
  language: string;
  country: string;
  isOfficial: boolean;
  isRecommended: boolean;
  status: ExternalLinkStatus;
  lastCheckedAt: string;
  createdAt: string;
  updatedAt: string;
}

export type ExternalLinkInput = Omit<
  ExternalLink,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface ExternalLinkEditorValue {
  slug: string;
  name: string;
  abbreviation: string;
  descriptionTh: string;
  descriptionEn: string;
  url: string;
  category: ExternalLinkCategory;
  linkType: ExternalLinkType;
  authorityNoteTh: string;
  authorityNoteEn: string;
  language: string;
  country: string;
  isOfficial: boolean;
  isRecommended: boolean;
  status: ExternalLinkStatus;
  lastCheckedAt: string;
}

/**
 * Icon Registry — central mapping for content-aware iconography
 */

import type { SoulIconName } from '@/components/icons/SoulIcon';
import type { CategoryId } from './content/categories';

export type IconTone = 'neutral' | 'primary' | 'gold' | 'muted' | 'danger' | 'active' | 'disabled';

export type ContentKind =
  | 'article'
  | 'guide'
  | 'glossary'
  | 'school'
  | 'thinker'
  | 'concept'
  | 'series'
  | 'studio'
  | 'archive'
  | 'resource'
  | 'external-link'
  | 'manifesto'
  | 'support'
  | 'about';

export const contentTypeIcons: Record<ContentKind, SoulIconName> = {
  article: 'article',
  guide: 'map',
  glossary: 'book',
  school: 'philosophy',
  thinker: 'psyche',
  concept: 'concept',
  series: 'depth',
  studio: 'body',
  archive: 'archive',
  resource: 'source',
  'external-link': 'external',
  manifesto: 'quote',
  support: 'compass',
  about: 'home',
};

export type LevelType = 'beginner' | 'intermediate' | 'advanced';

export const levelIcons: Record<LevelType, SoulIconName> = {
  beginner: 'compass',
  intermediate: 'depth',
  advanced: 'psychology',
};

export const levelLabels: Record<LevelType, Record<string, string>> = {
  beginner: { th: 'ระดับเริ่มต้น', en: 'Beginner' },
  intermediate: { th: 'ระดับกลาง', en: 'Intermediate' },
  advanced: { th: 'ระดับลึก', en: 'Advanced' },
};

export const schoolIcons: Record<string, SoulIconName> = {
  'Analytical Psychology': 'psychology',
  Psychoanalysis: 'psyche',
  Neuroscience: 'psychology',
  'Social Psychology': 'philosophy',
  Philosophy: 'philosophy',
  'Philosophy of Mind': 'concept',
  Typology: 'depth',
  TPDT: 'map',
};

export const categoryIcons: Record<CategoryId, SoulIconName> = {
  'analytical-psychology': 'compass',
  psychoanalysis: 'complex',
  neuroscience: 'psychology',
  'social-psychology': 'social',
  philosophy: 'philosophy',
  'philosophy-of-mind': 'psyche',
  typology: 'depth',
  tpdt: 'individuation',
};

export const navIcons: Record<string, SoulIconName> = {
  articles: 'article',
  concepts: 'concept',
  series: 'depth',
  resources: 'source',
  about: 'home',
  'external-links': 'external',
  support: 'compass',
  manifesto: 'quote',
  studio: 'body',
  account: 'auth',
};

export const markdownHeadingIcons: Record<string, SoulIconName> = {
  h1: 'compass',
  h2: 'symbol',
  h3: 'concept',
};

export const menuGroupConfig = {
  levels: {
    title: { th: 'อ่านตามระดับ', en: 'By difficulty' },
    icon: 'depth' as SoulIconName,
  },
  schools: {
    title: { th: 'สำนักและสายคิด', en: 'Schools & traditions' },
    icon: 'philosophy' as SoulIconName,
  },
  content: {
    title: { th: 'คลังเนื้อหา', en: 'Content library' },
    icon: 'archive' as SoulIconName,
  },
  account: {
    title: { th: 'บัญชี', en: 'Account' },
    icon: 'auth' as SoulIconName,
  },
};

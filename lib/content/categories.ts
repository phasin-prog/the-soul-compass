/**
 * Content categories
 */

import type { Locale } from '../site';

export const categoryIds = [
  'analytical-psychology',
  'psychoanalysis',
  'neuroscience',
  'social-psychology',
  'philosophy',
  'philosophy-of-mind',
  'typology',
  'tpdt',
] as const;

export type CategoryId = (typeof categoryIds)[number];

export interface Category {
  id: CategoryId;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  slug: string;
  color: string;
}

export const categories: Record<CategoryId, Category> = {
  'analytical-psychology': {
    id: 'analytical-psychology',
    name: {
      th: 'จิตวิทยาวิเคราะห์',
      en: 'Analytical Psychology',
    },
    description: {
      th: 'จิตวิทยาเชิงลึกของ Carl Jung',
      en: "Carl Jung's depth psychology",
    },
    slug: 'analytical-psychology',
    color: 'var(--accent)',
  },
  'psychoanalysis': {
    id: 'psychoanalysis',
    name: {
      th: 'จิตวิเคราะห์',
      en: 'Psychoanalysis',
    },
    description: {
      th: 'ทฤษฎีจิตวิเคราะห์ Freud, Klein, Lacan',
      en: 'Psychoanalytic theory: Freud, Klein, Lacan',
    },
    slug: 'psychoanalysis',
    color: 'var(--plum)',
  },
  'neuroscience': {
    id: 'neuroscience',
    name: {
      th: 'ประสาทวิทยาศาสตร์',
      en: 'Neuroscience',
    },
    description: {
      th: 'สมอง ระบบประสาท และกลไกของการรับรู้',
      en: 'The brain, nervous system, and mechanisms of cognition',
    },
    slug: 'neuroscience',
    color: 'var(--blue)',
  },
  'social-psychology': {
    id: 'social-psychology',
    name: {
      th: 'จิตวิทยาสังคม',
      en: 'Social Psychology',
    },
    description: {
      th: 'ตัวตน ความสัมพันธ์ กลุ่ม และอิทธิพลทางสังคม',
      en: 'Self, relationships, groups, and social influence',
    },
    slug: 'social-psychology',
    color: 'var(--clay)',
  },
  'philosophy': {
    id: 'philosophy',
    name: {
      th: 'ปรัชญา',
      en: 'Philosophy',
    },
    description: {
      th: 'ปรัชญาและแนวคิดเชิงทฤษฎี',
      en: 'Philosophical and theoretical perspectives',
    },
    slug: 'philosophy',
    color: 'var(--blue)',
  },
  'philosophy-of-mind': {
    id: 'philosophy-of-mind',
    name: {
      th: 'ปรัชญาจิต',
      en: 'Philosophy of Mind',
    },
    description: {
      th: 'จิตสำนึก ตัวตน การรับรู้ และปัญหากาย–จิต',
      en: 'Consciousness, selfhood, perception, and the mind-body problem',
    },
    slug: 'philosophy-of-mind',
    color: 'var(--celadon)',
  },
  'typology': {
    id: 'typology',
    name: {
      th: 'Typology',
      en: 'Typology',
    },
    description: {
      th: 'ทฤษฎีประเภทบุคลิกภาพของ Jung',
      en: 'Jungian psychological types',
    },
    slug: 'typology',
    color: 'var(--celadon)',
  },
  'tpdt': {
    id: 'tpdt',
    name: {
      th: 'TPDT',
      en: 'TPDT',
    },
    description: {
      th: 'ทฤษฎีบุคลิกภาพเชิงพลวัต (in development)',
      en: 'Theory of Personality Dynamics & Types (in development)',
    },
    slug: 'tpdt',
    color: 'var(--clay)',
  },
};

export function isCategoryId(value: string): value is CategoryId {
  return categoryIds.includes(value as CategoryId);
}

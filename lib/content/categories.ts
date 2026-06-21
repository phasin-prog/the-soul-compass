/**
 * Content categories
 */

import type { Locale } from '../site';

export type CategoryId =
  | 'analytical-psychology'
  | 'psychoanalysis'
  | 'philosophy'
  | 'typology'
  | 'tpdt';

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

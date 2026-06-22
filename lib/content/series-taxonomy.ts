import { categories } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import type {
  SeriesCategory,
  SeriesDifficulty,
  SeriesStatus,
  SeriesType,
} from '@/types/series';

export const seriesCategoryIds = [
  'analytical-psychology',
  'psychoanalysis',
  'comparative-psychology',
  'tpdt',
] as const satisfies readonly SeriesCategory[];

export const seriesCategoryMeta: Record<
  SeriesCategory,
  { name: Record<Locale, string>; color: string }
> = {
  'analytical-psychology': {
    name: categories['analytical-psychology'].name,
    color: categories['analytical-psychology'].color,
  },
  psychoanalysis: {
    name: categories.psychoanalysis.name,
    color: categories.psychoanalysis.color,
  },
  neuroscience: {
    name: categories.neuroscience.name,
    color: categories.neuroscience.color,
  },
  'social-psychology': {
    name: categories['social-psychology'].name,
    color: categories['social-psychology'].color,
  },
  philosophy: {
    name: categories.philosophy.name,
    color: categories.philosophy.color,
  },
  'philosophy-of-mind': {
    name: categories['philosophy-of-mind'].name,
    color: categories['philosophy-of-mind'].color,
  },
  typology: {
    name: categories.typology.name,
    color: categories.typology.color,
  },
  tpdt: {
    name: categories.tpdt.name,
    color: categories.tpdt.color,
  },
  'comparative-psychology': {
    name: {
      th: 'จิตวิทยาเปรียบเทียบข้ามสำนัก',
      en: 'Comparative Psychology',
    },
    color: 'var(--celadon)',
  },
};

export const seriesTypeLabels: Record<SeriesType, Record<Locale, string>> = {
  foundation: { th: 'ชุดปูพื้นฐาน', en: 'Foundation Series' },
  'deep-reading': { th: 'ชุดอ่านเชิงลึก', en: 'Deep Reading Series' },
  comparative: { th: 'ชุดเปรียบเทียบ', en: 'Comparative Series' },
  tpdt: { th: 'ชุด TPDT', en: 'TPDT Series' },
};

export const seriesDifficultyLabels: Record<
  SeriesDifficulty,
  Record<Locale, string>
> = {
  beginner: { th: 'เริ่มต้น', en: 'Beginner' },
  intermediate: { th: 'ระดับกลาง', en: 'Intermediate' },
  advanced: { th: 'ระดับลึก', en: 'Advanced' },
};

export const seriesStatusLabels: Record<
  SeriesStatus,
  Record<Locale, string>
> = {
  draft: { th: 'ฉบับร่าง', en: 'Draft' },
  active: { th: 'กำลังพัฒนา', en: 'Active' },
  completed: { th: 'เส้นทางสมบูรณ์', en: 'Complete path' },
  archived: { th: 'เก็บถาวร', en: 'Archived' },
};

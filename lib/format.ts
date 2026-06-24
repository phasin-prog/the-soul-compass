import type { Locale } from '@/lib/site';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'academic';

const difficultyMap = {
  th: {
    beginner: 'เริ่มต้น',
    intermediate: 'ระดับกลาง',
    advanced: 'ระดับลึก',
    academic: 'วิชาการเข้มข้น',
  },
  en: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    academic: 'Academic Study',
  },
} as const;

export function getDifficultyLabel(locale: Locale, difficulty: Difficulty): string {
  return difficultyMap[locale][difficulty];
}

/**
 * Format an ISO date string for display.
 * Uses 'short' month format by default (e.g. "Jan 1, 2024"),
 * or 'long' for full month name (e.g. "January 1, 2024").
 */
export function formatDate(
  locale: Locale,
  isoDate: string,
  monthFormat: 'short' | 'long' = 'long'
): string {
  return new Date(isoDate).toLocaleDateString(
    locale === 'th' ? 'th-TH' : 'en-US',
    { year: 'numeric', month: monthFormat, day: 'numeric' }
  );
}

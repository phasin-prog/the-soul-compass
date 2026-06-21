/**
 * Site-wide configuration and metadata
 */

export const siteConfig = {
  name: {
    th: "The Soul's Compass",
    en: "The Soul's Compass",
  },
  description: {
    th: 'พื้นที่ศึกษาจิตใจมนุษย์ผ่านจิตวิทยาหลายสำนัก ประสาทวิทยาศาสตร์ และปรัชญา',
    en: 'A space for studying mind across psychology, neuroscience, and philosophy',
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoulscompass.com',
  author: 'Witcha Prasomsin',
  social: {
    email: 'contact@thesoulscompass.com',
  },
} as const;

export const locales = ['th', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'th';

export const localeNames: Record<Locale, string> = {
  th: 'ไทย',
  en: 'English',
};

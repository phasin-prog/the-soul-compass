/**
 * Site-wide configuration and metadata
 */

export const siteConfig = {
  name: {
    th: "The Soul's Compass",
    en: "The Soul's Compass",
  },
  description: {
    th: 'พื้นที่สำหรับอ่านจิตใจมนุษย์อย่างลึกกว่าแบบทดสอบ',
    en: 'A space for understanding the human psyche beyond personality tests',
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

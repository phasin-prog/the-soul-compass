/**
 * Navigation structure — single source of truth for Header and MobileMenu
 */

import type { Locale } from '../site';

export interface NavItem {
  label: Record<Locale, string>;
  href: string;
}

export const primaryNav: NavItem[] = [
  {
    label: { th: 'บทความ', en: 'Articles' },
    href: 'articles',
  },
  {
    label: { th: 'แนวคิด', en: 'Concepts' },
    href: 'concepts',
  },
  {
    label: { th: 'ชุดอ่าน', en: 'Series' },
    href: 'series',
  },
  {
    label: { th: 'ทรัพยากร', en: 'Resources' },
    href: 'resources',
  },
  {
    label: { th: 'เกี่ยวกับ', en: 'About' },
    href: 'about',
  },
];

export const secondaryNav: NavItem[] = [
  {
    label: { th: 'ลิงก์ภายนอก', en: 'External links' },
    href: 'external-links',
  },
  {
    label: { th: 'สนับสนุนโครงการ', en: 'Support' },
    href: 'support',
  },
  {
    label: { th: 'เจตนารมณ์', en: 'Manifesto' },
    href: 'manifesto',
  },
];

/**
 * Navigation structure — single source of truth for Header and MobileMenu
 */

import type { Locale } from '../site';
import type { SoulIconName } from '@/components/icons/SoulIcon';

export interface NavItem {
  label: Record<Locale, string>;
  href: string;
  icon: SoulIconName;
}

export const primaryNav: NavItem[] = [
  {
    label: { th: 'บทความ', en: 'Articles' },
    href: 'articles',
    icon: 'article',
  },
  {
    label: { th: 'แนวคิด', en: 'Concepts' },
    href: 'concepts',
    icon: 'concept',
  },
  {
    label: { th: 'ชุดอ่าน', en: 'Series' },
    href: 'series',
    icon: 'depth',
  },
  {
    label: { th: 'ทรัพยากร', en: 'Resources' },
    href: 'resources',
    icon: 'source',
  },
  {
    label: { th: 'เกี่ยวกับ', en: 'About' },
    href: 'about',
    icon: 'home',
  },
];

export const secondaryNav: NavItem[] = [
  {
    label: { th: 'ลิงก์ภายนอก', en: 'External links' },
    href: 'external-links',
    icon: 'external',
  },
  {
    label: { th: 'สนับสนุนโครงการ', en: 'Support' },
    href: 'support',
    icon: 'compass',
  },
  {
    label: { th: 'เจตนารมณ์', en: 'Manifesto' },
    href: 'manifesto',
    icon: 'quote',
  },
];

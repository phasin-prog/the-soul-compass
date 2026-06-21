/**
 * Navigation structure
 */

import type { Locale } from '../site';

export interface NavItem {
  label: Record<Locale, string>;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: {
      th: 'บทความ',
      en: 'Articles',
    },
    href: '/articles',
  },
  {
    label: {
      th: 'จิตวิเคราะห์',
      en: 'Psychology',
    },
    href: '#',
    children: [
      {
        label: {
          th: 'จิตวิทยาวิเคราะห์',
          en: 'Analytical Psychology',
        },
        href: '/analytical-psychology',
      },
      {
        label: {
          th: 'จิตวิเคราะห์',
          en: 'Psychoanalysis',
        },
        href: '/psychoanalysis',
      },
      {
        label: {
          th: 'ปรัชญา',
          en: 'Philosophy',
        },
        href: '/philosophy',
      },
    ],
  },
  {
    label: {
      th: 'ทฤษฎีบุคลิกภาพ',
      en: 'Typology',
    },
    href: '#',
    children: [
      {
        label: {
          th: 'Typology',
          en: 'Typology',
        },
        href: '/typology',
      },
      {
        label: {
          th: 'TPDT',
          en: 'TPDT',
        },
        href: '/tpdt',
      },
    ],
  },
  {
    label: {
      th: 'แนวคิด',
      en: 'Concepts',
    },
    href: '/concepts',
  },
  {
    label: {
      th: 'ทรัพยากร',
      en: 'Resources',
    },
    href: '/resources',
  },
  {
    label: {
      th: 'เกี่ยวกับ',
      en: 'About',
    },
    href: '/about',
  },
];

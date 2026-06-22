import type { SupportTier, SupporterProfile } from '@/types/support';

export const supportTiers = [
  {
    id: 'support-tier-reader',
    name: {
      th: 'Reader Supporter',
      en: 'Reader Supporter',
    },
    slug: 'reader-supporter',
    description: {
      th: 'การสนับสนุนครั้งเดียวในจำนวนเล็กน้อย สำหรับช่วยค่าใช้จ่ายพื้นฐานของคลังความรู้',
      en: 'A small one-time contribution toward the archive’s basic operating costs.',
    },
    price: 150,
    currency: 'THB',
    interval: 'one_time',
    benefits: {
      th: [
        'เลือกแสดงชื่อหรือนามแฝงบนกำแพงผู้สนับสนุนได้',
        'เลือกสนับสนุนแบบไม่เปิดเผยชื่อได้',
      ],
      en: [
        'Optionally list a name or alias on the supporter wall',
        'Anonymous support remains available',
      ],
    },
    isActive: true,
  },
  {
    id: 'support-tier-compass',
    name: {
      th: 'Compass Supporter',
      en: 'Compass Supporter',
    },
    slug: 'compass-supporter',
    description: {
      th: 'การสนับสนุนรายเดือนเพื่อช่วยให้งานเขียน การตรวจอ้างอิง และการดูแลเว็บไซต์ดำเนินต่อเนื่อง',
      en: 'Monthly support for sustained writing, reference checking, and site maintenance.',
    },
    price: 250,
    currency: 'THB',
    interval: 'monthly',
    benefits: {
      th: [
        'ระบบบันทึกบทความ แนวคิด และรายการอ่าน',
        'ป้ายผู้สนับสนุนในบัญชีสมาชิก',
      ],
      en: [
        'Article bookmarks, saved concepts, and reading lists',
        'A supporter badge on the member account',
      ],
    },
    isActive: true,
  },
  {
    id: 'support-tier-research',
    name: {
      th: 'Research Supporter',
      en: 'Research Supporter',
    },
    slug: 'research-supporter',
    description: {
      th: 'ช่วยรองรับงานค้นคว้าระยะยาว การแปลคำสำคัญ และการพัฒนาโครงสร้างความรู้ที่ละเอียดขึ้น',
      en: 'Supports longer research, careful terminology work, and deeper knowledge infrastructure.',
    },
    price: 500,
    currency: 'THB',
    interval: 'monthly',
    benefits: {
      th: [
        'สิทธิ์เข้าถึงฉบับร่างก่อนเผยแพร่ในอนาคต',
        'บันทึกการค้นคว้าในอนาคต',
        'ป้ายผู้สนับสนุน',
      ],
      en: [
        'Future early access to selected drafts',
        'Future access to selected research notes',
        'A supporter badge',
      ],
    },
    isActive: true,
  },
  {
    id: 'support-tier-patron',
    name: {
      th: 'Patron',
      en: 'Patron',
    },
    slug: 'patron',
    description: {
      th: 'การสนับสนุนงานชุดขนาดใหญ่และหัวข้อที่ต้องใช้เวลาอ่าน วิจัย และตรวจสอบอย่างต่อเนื่อง',
      en: 'Supports major series and topics requiring sustained reading, research, and verification.',
    },
    price: 1200,
    currency: 'THB',
    interval: 'monthly',
    benefits: {
      th: [
        'เสนอและลงคะแนนหัวข้อบทความในอนาคต',
        'ช่วยสนับสนุนชุดงานวิจัยขนาดใหญ่',
        'เลือกแสดงชื่อหรือนามแฝงบนกำแพงผู้สนับสนุนได้',
      ],
      en: [
        'Suggest and vote on future article topics',
        'Help sustain major research series',
        'Optionally list a name or alias on the supporter wall',
      ],
    },
    isActive: true,
  },
] as const satisfies readonly SupportTier[];

// Public names will only be added after a real supporter has explicitly opted in.
export const publicSupporters: SupporterProfile[] = [];

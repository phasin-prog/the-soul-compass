import type { Locale } from '@/lib/site';
import type {
  ExternalLinkCategory,
  ExternalLinkStatus,
  ExternalLinkType,
} from '@/types/external-link';

export const externalLinkCategoryLabels: Record<
  ExternalLinkCategory,
  Record<Locale, string>
> = {
  analytical_psychology: { th: 'จิตวิทยาวิเคราะห์', en: 'Analytical Psychology' },
  psychoanalysis: { th: 'จิตวิเคราะห์', en: 'Psychoanalysis' },
  lacanian_psychoanalysis: { th: 'จิตวิเคราะห์แบบ Lacan', en: 'Lacanian Psychoanalysis' },
  adlerian_psychology: { th: 'จิตวิทยาแบบ Adler', en: 'Adlerian Psychology' },
  philosophy: { th: 'ปรัชญา', en: 'Philosophy' },
  philosophy_of_mind: { th: 'ปรัชญาจิต', en: 'Philosophy of Mind' },
  neuroscience: { th: 'ประสาทวิทยาศาสตร์', en: 'Neuroscience' },
  social_psychology: { th: 'จิตวิทยาสังคม', en: 'Social Psychology' },
  clinical_ethics: { th: 'จริยธรรมทางคลินิก', en: 'Clinical Ethics' },
  journal: { th: 'วารสาร', en: 'Journals' },
  archive: { th: 'จดหมายเหตุ', en: 'Archives' },
  encyclopedia: { th: 'สารานุกรม', en: 'Encyclopedias' },
  training_institute: { th: 'สถาบันฝึกอบรม', en: 'Training Institutes' },
  association: { th: 'สมาคมวิชาชีพ', en: 'Associations' },
  internal: { th: 'โครงการภายใน', en: 'Internal Projects' },
  other: { th: 'อื่น ๆ', en: 'Other' },
};

export const externalLinkTypeLabels: Record<
  ExternalLinkType,
  Record<Locale, string>
> = {
  association: { th: 'สมาคม', en: 'Association' },
  institute: { th: 'สถาบัน', en: 'Institute' },
  training_center: { th: 'ศูนย์ฝึกอบรม', en: 'Training center' },
  encyclopedia: { th: 'สารานุกรม', en: 'Encyclopedia' },
  journal: { th: 'วารสาร', en: 'Journal' },
  archive: { th: 'จดหมายเหตุ', en: 'Archive' },
  university_resource: { th: 'ทรัพยากรมหาวิทยาลัย', en: 'University resource' },
  society: { th: 'สมาคมวิชาการ', en: 'Society' },
  educational_center: { th: 'ศูนย์การเรียนรู้', en: 'Educational center' },
  reference_site: { th: 'เว็บไซต์อ้างอิง', en: 'Reference site' },
  internal_project: { th: 'โครงการภายใน', en: 'Internal project' },
  other: { th: 'อื่น ๆ', en: 'Other' },
};

export const externalLinkStatusLabels: Record<
  ExternalLinkStatus,
  Record<Locale, string>
> = {
  active: { th: 'ใช้งาน', en: 'Active' },
  needs_review: { th: 'รอตรวจทาน', en: 'Needs review' },
  archived: { th: 'เก็บถาวร', en: 'Archived' },
  broken: { th: 'ลิงก์เสีย', en: 'Broken' },
};

import type { Locale } from '@/lib/site';
import type {
  ReferenceCategory,
  ReferenceSourceLevel,
  ReferenceType,
} from '@/types/reference';

export const referenceTypeLabels: Record<
  ReferenceType,
  Record<Locale, string>
> = {
  book: { th: 'หนังสือ', en: 'Book' },
  paper: { th: 'บทความวิชาการ', en: 'Paper' },
  essay: { th: 'บทความ / ความเรียง', en: 'Essay' },
  lecture: { th: 'การบรรยาย / สัมมนา', en: 'Lecture / seminar' },
  archive: { th: 'จดหมายเหตุ', en: 'Archive' },
  website: { th: 'เว็บไซต์', en: 'Website' },
  glossary: { th: 'อภิธานศัพท์', en: 'Glossary' },
  internal_note: { th: 'บันทึกภายใน', en: 'Internal note' },
  manuscript: { th: 'ต้นฉบับ', en: 'Manuscript' },
  collected_works: { th: 'รวมผลงาน', en: 'Collected works' },
  clinical_text: { th: 'งานเขียนทางคลินิก', en: 'Clinical text' },
  philosophical_text: { th: 'งานปรัชญา', en: 'Philosophical text' },
};

export const referenceCategoryLabels: Record<
  ReferenceCategory,
  Record<Locale, string>
> = {
  'analytical-psychology': {
    th: 'จิตวิทยาวิเคราะห์',
    en: 'Analytical Psychology',
  },
  psychoanalysis: { th: 'จิตวิเคราะห์', en: 'Psychoanalysis' },
  'lacanian-psychoanalysis': {
    th: 'จิตวิเคราะห์แบบ Lacan',
    en: 'Lacanian Psychoanalysis',
  },
  'adlerian-psychology': {
    th: 'จิตวิทยาแบบ Adler',
    en: 'Adlerian Psychology',
  },
  neuroscience: { th: 'ประสาทวิทยาศาสตร์', en: 'Neuroscience' },
  'social-psychology': { th: 'จิตวิทยาสังคม', en: 'Social Psychology' },
  philosophy: { th: 'ปรัชญา', en: 'Philosophy' },
  'philosophy-of-mind': { th: 'ปรัชญาจิต', en: 'Philosophy of Mind' },
  typology: { th: 'Typology', en: 'Typology' },
  tpdt: { th: 'TPDT', en: 'TPDT' },
  'research-methodology': {
    th: 'ระเบียบวิธีวิจัย',
    en: 'Research Methodology',
  },
};

export const referenceSourceLevelLabels: Record<
  ReferenceSourceLevel,
  Record<Locale, string>
> = {
  primary: { th: 'แหล่งปฐมภูมิ', en: 'Primary source' },
  secondary: { th: 'แหล่งทุติยภูมิ', en: 'Secondary source' },
  interpretation: { th: 'งานตีความ', en: 'Interpretation' },
  internal: { th: 'พัฒนาการทฤษฎีภายใน', en: 'Internal theoretical development' },
};

export const referenceSourceLevelDescriptions: Record<
  ReferenceSourceLevel,
  Record<Locale, string>
> = {
  primary: {
    th: 'งานต้นทางของผู้เขียนหรือนักคิดที่กำลังศึกษา',
    en: 'An original work by the author or thinker under study.',
  },
  secondary: {
    th: 'งานวิชาการที่วิเคราะห์ อธิบาย หรือจัดวางงานต้นทาง',
    en: 'Scholarship that analyzes, explains, or contextualizes primary work.',
  },
  interpretation: {
    th: 'การอ่านหรือข้อเสนอเชิงตีความของผู้เขียนร่วมสมัย',
    en: 'A contemporary interpretive reading or theoretical proposal.',
  },
  internal: {
    th: 'กรอบที่พัฒนาภายใน The Soul’s Compass ไม่ใช่ฉันทามติทางวิชาการภายนอก',
    en: 'A framework developed inside The Soul’s Compass, not external scholarly consensus.',
  },
};

export const referenceSourceLevelStyles: Record<
  ReferenceSourceLevel,
  string
> = {
  primary: 'border-accent text-accent',
  secondary: 'border-blue text-blue',
  interpretation: 'border-plum text-plum',
  internal: 'border-clay text-clay',
};

import type { SoulIconName } from '@/components/icons/SoulIcon';
import type { CategoryId } from './categories';
import type { ArticleDifficulty, ArticleSourceStatus } from '@/types/article';
import type { ConceptEntryType } from '@/types/concept';

export interface MetadataMappingItem {
  key: string;
  name: { th: string; en: string };
  description: { th: string; en: string };
  icon: SoulIconName;
  color?: string; // Optional hex or css variable
}

export const categoryMetadata: Record<CategoryId, MetadataMappingItem & { color: string }> = {
  'analytical-psychology': {
    key: 'analytical-psychology',
    name: { th: 'จิตวิทยาวิเคราะห์', en: 'Analytical Psychology' },
    description: { th: 'จิตวิทยาเชิงลึกและจิตไร้สำนึกร่วมโดย Carl Jung', en: 'Depth psychology and collective unconscious by Carl Jung' },
    icon: 'compass',
    color: 'var(--accent)',
  },
  'psychoanalysis': {
    key: 'psychoanalysis',
    name: { th: 'จิตวิเคราะห์', en: 'Psychoanalysis' },
    description: { th: 'ทฤษฎีจิตวิเคราะห์ของ Freud, Klein และ Lacan', en: 'Psychoanalytic theory: Freud, Klein, Lacan' },
    icon: 'complex',
    color: 'var(--plum)',
  },
  'neuroscience': {
    key: 'neuroscience',
    name: { th: 'ประสาทวิทยาศาสตร์', en: 'Neuroscience' },
    description: { th: 'สมอง ระบบประสาท และการรับรู้เชิงชีวภาพ', en: 'Brain, nervous system, and biological cognition' },
    icon: 'psychology',
    color: 'var(--blue)',
  },
  'social-psychology': {
    key: 'social-psychology',
    name: { th: 'จิตวิทยาสังคม', en: 'Social Psychology' },
    description: { th: 'ตัวตน ความสัมพันธ์ และอิทธิพลของกลุ่มสังคม', en: 'Self, relationships, and the influence of social groups' },
    icon: 'social',
    color: 'var(--clay)',
  },
  'philosophy': {
    key: 'philosophy',
    name: { th: 'ปรัชญา', en: 'Philosophy' },
    description: { th: 'การตั้งคำถามต่อความเป็นอยู่ คุณค่า และการดำรงอยู่', en: 'Questioning existence, values, and being' },
    icon: 'philosophy',
    color: 'var(--blue)',
  },
  'philosophy-of-mind': {
    key: 'philosophy-of-mind',
    name: { th: 'ปรัชญาจิต', en: 'Philosophy of Mind' },
    description: { th: 'จิตสำนึก ความคิด ปัญหากาย-จิต และการรับรู้', en: 'Consciousness, mind, the mind-body problem, and perception' },
    icon: 'psyche',
    color: 'var(--celadon)',
  },
  'typology': {
    key: 'typology',
    name: { th: 'จิตวิทยาประเภทบุคคล', en: 'Typology' },
    description: { th: 'ทฤษฎีประเภทจิตวิทยาของ Jung และพลังขับเคลื่อนทางบุคลิกภาพ', en: 'Jungian psychological types and personality dynamics' },
    icon: 'depth',
    color: 'var(--celadon)',
  },
  'tpdt': {
    key: 'tpdt',
    name: { th: 'พลวัตบุคลิกภาพ (TPDT)', en: 'Personality Dynamics (TPDT)' },
    description: { th: 'กรอบแนวคิดพลวัตบุคลิกภาพเพื่อการเจริญเติบโตภายใน', en: 'Dynamic personality framework for inner integration' },
    icon: 'individuation',
    color: 'var(--clay)',
  },
};

export const readingLevelMetadata: Record<ArticleDifficulty, MetadataMappingItem> = {
  beginner: {
    key: 'beginner',
    name: { th: 'เริ่มอ่าน', en: 'Introductory' },
    description: { th: 'สำหรับผู้เริ่มต้น อ่านง่าย ปูพื้นฐานความเข้าใจพื้นฐาน', en: 'For beginners, accessible, establishes core concepts' },
    icon: 'levelBeginner',
  },
  intermediate: {
    key: 'intermediate',
    name: { th: 'อ่านจริงจัง', en: 'Focused Read' },
    description: { th: 'สำหรับผู้ที่ต้องการสมาธิ อธิบายความเชื่อมโยงเชิงลึกขึ้น', en: 'Requires concentration, explores deeper relationships' },
    icon: 'levelIntermediate',
  },
  advanced: {
    key: 'advanced',
    name: { th: 'อ่านลึก', en: 'Deep Analysis' },
    description: { th: 'บทความเชิงทฤษฎีที่มีโครงสร้างซับซ้อนและการวิเคราะห์เชิงลึก', en: 'Theoretical piece with abstract layers and deep analysis' },
    icon: 'levelAdvanced',
  },
  academic: {
    key: 'academic',
    name: { th: 'วิชาการเข้มข้น', en: 'Academic Study' },
    description: { th: 'อ้างอิงแหล่งชั้นปฐมภูมิ ศัพท์เฉพาะจำนวนมาก และโครงสร้างวิชาการ', en: 'Primary sources, heavy terminology, and academic structure' },
    icon: 'levelAcademic',
  },
};

export const sourceStatusMetadata: Record<ArticleSourceStatus, MetadataMappingItem & { color: string }> = {
  'original': {
    key: 'original',
    name: { th: 'ต้นฉบับโดยผู้เขียน', en: 'Original Piece' },
    description: { th: 'งานเขียนสร้างสรรค์เรียบเรียงขึ้นใหม่โดยตรงของ The Soul’s Compass', en: 'Original work authored directly for The Soul’s Compass' },
    icon: 'statusOriginal',
    color: 'var(--accent)', // Muted gold
  },
  'primary-source': {
    key: 'primary-source',
    name: { th: 'อิงต้นทางหลัก', en: 'Primary Source Study' },
    description: { th: 'ถอดความและอ้างอิงจากงานชิ้นหลัก (เช่น Jung, Freud, Lacan หรือต้นฉบับนักปรัชญา)', en: 'Based on and citing primary texts (e.g., Jung, Freud, Lacan, or philosophers)' },
    icon: 'statusPrimary',
    color: 'var(--blue)', // Blue
  },
  'secondary-source': {
    key: 'secondary-source',
    name: { th: 'อิงต้นทางรอง', en: 'Secondary Literature' },
    description: { th: 'อ้างอิงจากหนังสืออธิบายเพิ่มเติม บทวิจัย หรือวรรณกรรมขั้นรองเพื่อขยายความ', en: 'Referencing secondary explainers, papers, or secondary literature' },
    icon: 'statusSecondary',
    color: 'var(--celadon)', // Muted green-gray
  },
  'translation-draft': {
    key: 'translation-draft',
    name: { th: 'ร่างแปล / ถอดความ', en: 'Translation Draft' },
    description: { th: 'งานแปลหรือถอดความจากภาษาต้นฉบับที่อยู่ระหว่างขัดเกลาสำนวน', en: 'Translation or paraphrase under language refinement' },
    icon: 'statusTranslation',
    color: 'var(--plum)', // Rose/Plum
  },
  'pending-verification': {
    key: 'pending-verification',
    name: { th: 'รอตรวจอ้างอิง', en: 'Pending Citation Check' },
    description: { th: 'เนื้อหารอการตรวจสอบความสมบูรณ์ของจุดอ้างอิงเพิ่มเติม', en: 'Content awaiting verification of exact citations and references' },
    icon: 'statusPending',
    color: 'var(--clay)', // Rose-Amber
  },
  'experiment': {
    key: 'experiment',
    name: { th: 'บททดลองเขียน', en: 'Essay Experiment' },
    description: { th: 'ความเรียงเชิงทดลอง ค้นหาแนวคิด หรือรวบรวมข้อมูลดิบระว่างพัฒนา', en: 'Experimental essay, brainstorming, or raw notes in development' },
    icon: 'statusExperiment',
    color: 'var(--plum)', // Rose
  },
  'verified': {
    key: 'verified',
    name: { th: 'ผ่านการตรวจแล้ว', en: 'Verified & Audited' },
    description: { th: 'โครงสร้างเนื้อหา แหล่งอ้างอิง และภาษาได้รับการตรวจรับรองแล้ว', en: 'Structure, citations, and language verified' },
    icon: 'statusVerified',
    color: 'var(--celadon)', // Greenish
  },
  'needs-revision': {
    key: 'needs-revision',
    name: { th: 'รอปรับปรุงเนื้อหา', en: 'Needs Revision' },
    description: { th: 'บทความเก่าที่รอการเรียบเรียงใหม่หรือปรับปรุงเนื้อหาให้ทันสมัย', en: 'Legacy piece slated for rewrites or content updates' },
    icon: 'statusRevision',
    color: 'var(--soul-muted)', // Slate grey
  },
};

export const wikiEntryTypeMetadata: Record<ConceptEntryType, MetadataMappingItem> = {
  concept: {
    key: 'concept',
    name: { th: 'แนวคิด', en: 'Core Concept' },
    description: { th: 'แกนทฤษฎีทางจิตวิทยาหรือปรัชญาหลัก', en: 'Core psychological or philosophical concept' },
    icon: 'typeConcept',
  },
  person: {
    key: 'person',
    name: { th: 'บุคคลสำคัญ', en: 'Key Thinker' },
    description: { th: 'นักคิด นักจิตวิทยา หรือนักเขียนที่สร้างทฤษฎี', en: 'Thinker, psychologist, or theorist' },
    icon: 'typePerson',
  },
  book: {
    key: 'book',
    name: { th: 'หนังสือเล่มสำคัญ', en: 'Significant Book' },
    description: { th: 'ตำรา งานเขียน หรือวรรณกรรมที่เป็นหลักสำคัญของสำนักคิด', en: 'Core text or literary work of importance' },
    icon: 'typeBook',
  },
  school: {
    key: 'school',
    name: { th: 'สำนักคิด', en: 'School of Thought' },
    description: { th: 'กลุ่มกรอบคิด หรือประเพณีทางทฤษฎีและปฏิบัติการ', en: 'Theoretical tradition or school of thought' },
    icon: 'typeSchool',
  },
  term: {
    key: 'term',
    name: { th: 'ศัพท์เฉพาะทาง', en: 'Technical Term' },
    description: { th: 'คำศัพท์ทางเทคนิคที่มีความหมายเจาะจงเชิงวิชาการ', en: 'Technical or academic term with specific definition' },
    icon: 'typeTerm',
  },
  symbol: {
    key: 'symbol',
    name: { th: 'สัญลักษณ์ร่วม', en: 'Symbolic Archetype' },
    description: { th: 'ภาพสัญลักษณ์ ลายลักษณ์ หรือจินตภาพเชิงต้นแบบร่วม', en: 'Symbolic image, archetype, or mythological pattern' },
    icon: 'typeSymbol',
  },
  timeline: {
    key: 'timeline',
    name: { th: 'เส้นเวลา', en: 'Historical Timeline' },
    description: { th: 'เหตุการณ์ทางประวัติศาสตร์หรือวิวัฒนาการทางความหมาย', en: 'Historical event sequence or evolution of ideas' },
    icon: 'typeTimeline',
  },
  'source-note': {
    key: 'source-note',
    name: { th: 'บันทึกอ้างอิง', en: 'Source Note' },
    description: { th: 'หมายเหตุการอ้างอิงและบันทึกขอบสนามประกอบตำรา', en: 'Citation note or marginal reading commentary' },
    icon: 'typeSourceNote',
  },
};

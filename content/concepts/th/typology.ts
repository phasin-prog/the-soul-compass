import { defineConcept } from '@/content/concepts/helpers';
import { conceptReferences as ref } from '@/content/concepts/references';

export const typologyConcepts = [
  defineConcept({
    id: 'concept-psychological-types-th',
    slug: 'psychological-types',
    title: 'Psychological Types',
    originalTerm: 'Psychological Types',
    thaiTerm: 'ประเภททางจิตวิทยา',
    shortDefinition:
      'กรอบของ Jung สำหรับอธิบายความเอนเอียงของจิตสำนึกผ่าน Attitude และ Function รวมถึงการชดเชยจากสิ่งที่พัฒนาน้อยกว่า',
    humanExplanation:
      'Type ไม่ใช่กล่องที่ครอบคนทั้งคน แต่เป็นภาษาสำหรับสังเกตวิธีที่เราชอบรับรู้ ตัดสินใจ และปรับตัว พร้อมสิ่งที่มักถูกทิ้งไว้เบื้องหลัง',
    technicalExplanation:
      'Jung ประกอบ typology จาก introversion–extraversion attitudes และ four functions: thinking, feeling, sensation, intuition โดย type dynamics มีทั้ง dominant และ inferior tendencies',
    category: 'typology',
    tradition: 'Jungian Typology',
    thinkers: ['Carl G. Jung', 'Marie-Louise von Franz'],
    relatedConcepts: [
      { slug: 'attitude', title: 'Attitude', relation: 'ทิศทางพื้นฐานของ libido' },
      { slug: 'function', title: 'Function', relation: 'รูปแบบการรับรู้และตัดสิน' },
      { slug: 'individuation', title: 'Individuation', relation: 'การพัฒนานอกความเอนเอียงเดิม' },
    ],
    relatedArticles: ['typology-beyond-mbti'],
    references: [ref.jungTypes],
    commonMisunderstandings: [
      'Psychological Types ไม่ใช่ MBTI และไม่ควรถูกใช้เป็นอัตลักษณ์ตายตัว',
      'Type ไม่สามารถอธิบายประวัติชีวิต ความขัดแย้ง และบุคลิกภาพทั้งหมด',
    ],
    examples: [
      'คนที่พึ่งการคิดเชิงหลักการมากอาจจัดการข้อมูลได้ดี แต่พบความยากเมื่อสถานการณ์เรียกร้องการประเมินคุณค่าเชิงสัมพันธ์ที่ละเอียด',
    ],
    difficulty: 'beginner',
    seoTitle: 'Psychological Types ของ Jung คืออะไร',
    seoDescription:
      'Psychological Types คือกรอบ Attitude และ Function ของ Jung ไม่ใช่เพียงป้ายบุคลิกภาพหรือผลทดสอบ MBTI',
  }),
  defineConcept({
    id: 'concept-function-typology-th',
    slug: 'function',
    title: 'Function',
    originalTerm: 'Psychological Function',
    thaiTerm: 'หน้าที่ทางจิต',
    shortDefinition:
      'รูปแบบค่อนข้างคงที่ที่จิตใช้รับรู้หรือประเมินประสบการณ์ ได้แก่ Sensation, Intuition, Thinking และ Feeling',
    humanExplanation:
      'Function ช่วยแยกว่าคนกำลังให้ความสำคัญกับข้อมูลแบบใดและใช้เกณฑ์ใดตัดสิน ไม่ใช่การจัดอันดับว่าใครมีเหตุผลหรือมีอารมณ์มากกว่า',
    technicalExplanation:
      'Jung แยก irrational perceiving functions (sensation, intuition) จาก rational judging functions (thinking, feeling) และอธิบายความสัมพันธ์ dominant–inferior เชิงชดเชย',
    category: 'typology',
    tradition: 'Jungian Typology',
    thinkers: ['Carl G. Jung'],
    relatedConcepts: [
      { slug: 'psychological-types', title: 'Psychological Types', relation: 'กรอบที่ Function เป็นองค์ประกอบ' },
      { slug: 'attitude', title: 'Attitude', relation: 'ทิศทางที่ Function ทำงาน' },
      { slug: 'shadow', title: 'Shadow', relation: 'เนื้อหาที่อาจเกาะกับ function ที่ด้อยกว่า' },
    ],
    relatedArticles: ['typology-beyond-mbti'],
    references: [ref.jungTypes],
    commonMisunderstandings: [
      'Feeling function ไม่เท่ากับอารมณ์รุนแรง และ Thinking function ไม่เท่ากับความฉลาด',
    ],
    examples: [
      'สองคนอาจเห็นข้อเท็จจริงเดียวกัน แต่คนหนึ่งตัดสินจากความสอดคล้องเชิงเหตุผล อีกคนตัดสินจากลำดับคุณค่าและผลต่อความสัมพันธ์',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Function ใน Typology ของ Jung คืออะไร',
    seoDescription:
      'Function คือ Thinking, Feeling, Sensation และ Intuition ใน Psychological Types ของ Jung พร้อมพลวัต dominant และ inferior',
  }),
  defineConcept({
    id: 'concept-attitude-typology-th',
    slug: 'attitude',
    title: 'Attitude',
    originalTerm: 'Attitude',
    thaiTerm: 'ท่าทีของจิต',
    shortDefinition:
      'ทิศทางทั่วไปที่พลังและความสนใจของจิตสำนึกให้น้ำหนักแก่ object ภายนอกหรือปัจจัยเชิง subject',
    humanExplanation:
      'Introversion และ Extraversion ใน Jung ไม่ได้แปลว่าเงียบหรือเข้าสังคมเก่ง แต่บอกว่าการปรับตัวมักให้น้ำหนักกับ object หรือมุมมองภายในมากกว่ากัน',
    technicalExplanation:
      'Attitude เป็น habitual readiness of the psyche; extraverted orientation ถูกกำหนดโดย object ขณะที่ introverted orientation ถูกกำหนดโดย subjective factor',
    category: 'typology',
    tradition: 'Jungian Typology',
    thinkers: ['Carl G. Jung'],
    relatedConcepts: [
      { slug: 'psychological-types', title: 'Psychological Types', relation: 'กรอบที่ Attitude เป็นแกน' },
      { slug: 'function', title: 'Function', relation: 'กระบวนการที่ถูกวางใน attitude' },
      { slug: 'persona', title: 'Persona', relation: 'บทบาทที่อาจบดบัง orientation จริง' },
    ],
    relatedArticles: ['typology-beyond-mbti'],
    references: [ref.jungTypes],
    commonMisunderstandings: [
      'Introversion ไม่เท่ากับความขี้อาย และ Extraversion ไม่เท่ากับความชอบปาร์ตี้',
    ],
    examples: [
      'ในการตัดสินใจ คนหนึ่งอาจเริ่มจากข้อกำหนดของสถานการณ์ ขณะที่อีกคนเริ่มจากมาตรฐานภายใน แม้ทั้งคู่สื่อสารและเข้าสังคมได้ดี',
    ],
    difficulty: 'beginner',
    seoTitle: 'Attitude ใน Typology ของ Jung คืออะไร',
    seoDescription:
      'Attitude คือทิศทาง Introversion และ Extraversion ใน Jung ซึ่งต่างจากความขี้อายหรือความชอบเข้าสังคม',
  }),
];

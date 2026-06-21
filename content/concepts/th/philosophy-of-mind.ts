import { defineConcept } from '@/content/concepts/helpers';
import { conceptReferences as ref } from '@/content/concepts/references';

export const philosophyOfMindConcepts = [
  defineConcept({
    id: 'concept-consciousness-philosophy-th',
    slug: 'consciousness',
    title: 'Consciousness',
    originalTerm: 'Consciousness',
    thaiTerm: 'จิตสำนึก',
    shortDefinition:
      'ภาวะที่ประสบการณ์ปรากฏแก่ subject ไม่ว่าจะเป็นการเห็นสี รู้สึกเจ็บ คิด หรือรับรู้ตนเอง',
    humanExplanation:
      'คำถามเรื่อง consciousness ไม่ได้ถามเพียงว่าสมองประมวลผลข้อมูลอย่างไร แต่ถามด้วยว่าทำไมการประมวลผลบางอย่างจึงมีลักษณะ “เป็นอย่างไร” สำหรับผู้มีประสบการณ์',
    technicalExplanation:
      'ปรัชญาจิตแยกประเด็น access consciousness, phenomenal consciousness, self-consciousness และ reportability เพื่อไม่ให้ปัญหาหลายชนิดถูกรวมเป็นคำเดียว',
    category: 'philosophy-of-mind',
    tradition: 'Philosophy of Mind',
    thinkers: ['Thomas Nagel', 'David Chalmers', 'Ned Block'],
    relatedConcepts: [
      { slug: 'qualia', title: 'Qualia', relation: 'ลักษณะเชิงปรากฏของประสบการณ์' },
      { slug: 'subjectivity', title: 'Subjectivity', relation: 'มุมมองบุคคลที่หนึ่ง' },
      { slug: 'intentionality', title: 'Intentionality', relation: 'การที่จิตมุ่งไปยังสิ่งหนึ่ง' },
      { slug: 'ego', title: 'Ego (Jung)', relation: 'ศูนย์กลางของ consciousness ในอีกกรอบ' },
    ],
    relatedArticles: ['freud-jung-ego'],
    references: [ref.nagelBat, ref.chalmersConsciousMind],
    commonMisunderstandings: [
      'Consciousness ไม่เท่ากับความฉลาด ภาษา หรือความสามารถรายงานเพียงอย่างเดียว',
      'การหาความสัมพันธ์ทางประสาทไม่ได้ยุติคำถามเชิงปรัชญาทุกข้อโดยอัตโนมัติ',
    ],
    examples: [
      'ระบบสองระบบอาจแยกสีแดงจากสีเขียวได้เหมือนกัน แต่คำถามเรื่อง consciousness ถามต่อว่ามีประสบการณ์ของสีปรากฏแก่ระบบหรือไม่',
    ],
    difficulty: 'beginner',
    seoTitle: 'Consciousness คืออะไรในปรัชญาจิต',
    seoDescription:
      'Consciousness คือภาวะที่ประสบการณ์ปรากฏแก่ subject ครอบคลุม phenomenal experience, access และ self-consciousness',
  }),
  defineConcept({
    id: 'concept-self-philosophy-th',
    slug: 'self-philosophy-of-mind',
    title: 'Self (Philosophy of Mind)',
    originalTerm: 'Self',
    thaiTerm: 'ตัวตนในปรัชญาจิต',
    shortDefinition:
      'โครงสร้างหรือเงื่อนไขที่ทำให้ประสบการณ์ ความทรงจำ และการกระทำถูกนับว่าเป็นของ subject คนเดียวกัน',
    humanExplanation:
      'ปัญหาเรื่อง Self ถามว่าความต่อเนื่องของ “ฉัน” มาจากร่างกาย ความทรงจำ เรื่องเล่า มุมมองบุคคลที่หนึ่ง หรือความสัมพันธ์ระหว่างองค์ประกอบเหล่านี้',
    technicalExplanation:
      'ข้อเสนอสำคัญมีตั้งแต่ substantial self, psychological continuity, narrative self ไปจนถึง minimal experiential self ซึ่งแต่ละแบบตอบปัญหา identity และ ownership ต่างกัน',
    category: 'philosophy-of-mind',
    tradition: 'Philosophy of Mind / Phenomenology',
    thinkers: ['John Locke', 'Derek Parfit', 'Dan Zahavi'],
    relatedConcepts: [
      { slug: 'subjectivity', title: 'Subjectivity', relation: 'มุมมองที่ประสบการณ์เป็นของใครบางคน' },
      { slug: 'consciousness', title: 'Consciousness', relation: 'สนามของประสบการณ์' },
      { slug: 'ego', title: 'Ego (Jung)', relation: 'แนวคิดเรื่องศูนย์กลางจิตสำนึก' },
      { slug: 'self', title: 'Self (Jung)', relation: 'ความเป็นทั้งหมดในจิตวิทยาวิเคราะห์' },
    ],
    relatedArticles: ['freud-jung-ego'],
    references: [ref.zahaviSubjectivity],
    commonMisunderstandings: [
      'Self ไม่จำเป็นต้องหมายถึงแก่นสารที่คงที่และแยกจากร่างกาย',
      'การอธิบาย Self ว่าเป็นเรื่องเล่าไม่ได้แปลว่าตัวตนเป็นเรื่องแต่งที่ไม่มีผลจริง',
    ],
    examples: [
      'ผู้ที่ความทรงจำเปลี่ยนไปยังคงมีความต่อเนื่องบางอย่างทางร่างกายและมุมมองบุคคลที่หนึ่ง ทำให้เกณฑ์ของความเป็นคนเดิมกลายเป็นปัญหา',
    ],
    difficulty: 'advanced',
    seoTitle: 'Self คืออะไรในปรัชญาจิต',
    seoDescription:
      'Self ในปรัชญาจิตคือปัญหาความเป็นเจ้าของและความต่อเนื่องของประสบการณ์ เปรียบเทียบ substantial, narrative และ minimal self',
  }),
  defineConcept({
    id: 'concept-qualia-th',
    slug: 'qualia',
    title: 'Qualia',
    originalTerm: 'Qualia',
    thaiTerm: 'คุณลักษณะเชิงปรากฏ',
    shortDefinition:
      'ลักษณะที่ประสบการณ์หนึ่งให้ความรู้สึกอย่างไรจากมุมมองบุคคลที่หนึ่ง เช่น ความแดงของสีแดงหรือความเจ็บของความปวด',
    humanExplanation:
      'Qualia ชี้ไปยังด้านของประสบการณ์ที่ดูเหมือนไม่หมดไปกับคำอธิบายหน้าที่หรือพฤติกรรม แม้สถานะทางทฤษฎีของมันยังเป็นข้อถกเถียง',
    technicalExplanation:
      'การอภิปราย qualia เกี่ยวข้องกับ inverted spectrum, knowledge argument, absent qualia และข้อโต้แย้งของ physicalism, functionalism และ illusionism',
    category: 'philosophy-of-mind',
    tradition: 'Analytic Philosophy of Mind',
    thinkers: ['Frank Jackson', 'Thomas Nagel', 'Daniel Dennett'],
    relatedConcepts: [
      { slug: 'consciousness', title: 'Consciousness', relation: 'มิติ phenomenal' },
      { slug: 'subjectivity', title: 'Subjectivity', relation: 'มุมมองบุคคลที่หนึ่งของ qualia' },
      { slug: 'intentionality', title: 'Intentionality', relation: 'คำถามว่าเนื้อหากับความรู้สึกสัมพันธ์กันอย่างไร' },
    ],
    relatedArticles: [],
    references: [ref.nagelBat, ref.chalmersConsciousMind],
    commonMisunderstandings: [
      'Qualia ไม่ใช่คำตอบสำเร็จรูปที่พิสูจน์ dualism',
      'นักปรัชญาไม่ได้เห็นพ้องกันว่า qualia ตามนิยามเข้มแข็งมีอยู่จริง',
    ],
    examples: [
      'คำอธิบายความยาวคลื่นและการแยกประเภทสีอาจยังไม่บอกว่าการเห็นสีแดงรู้สึกอย่างไรแก่ผู้มอง',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Qualia คืออะไร',
    seoDescription:
      'Qualia คือคุณลักษณะเชิงปรากฏของประสบการณ์ เช่น ความแดงและความเจ็บ เป็นศูนย์กลางของข้อถกเถียงเรื่อง Consciousness',
  }),
  defineConcept({
    id: 'concept-intentionality-th',
    slug: 'intentionality',
    title: 'Intentionality',
    originalTerm: 'Intentionality',
    thaiTerm: 'ความมุ่งหมายของจิต',
    shortDefinition:
      'คุณสมบัติที่สภาวะทางจิตมุ่งไปยังหรือเป็นเรื่องเกี่ยวกับบางสิ่ง แม้สิ่งนั้นไม่มีอยู่จริงก็ตาม',
    humanExplanation:
      'เราสามารถกลัวเหตุการณ์ที่ยังไม่เกิด คิดถึงตัวละครสมมุติ หรือเชื่อสิ่งที่ผิดได้ Intentionality อธิบายความเป็น “เรื่องเกี่ยวกับ” ของสภาวะเหล่านี้',
    technicalExplanation:
      'ตั้งแต่ Brentano แนวคิดนี้ถูกใช้เป็นลักษณะสำคัญของ mental phenomena และพัฒนาเป็นทฤษฎี content, representation, directedness และ world-to-mind fit',
    category: 'philosophy-of-mind',
    tradition: 'Phenomenology / Analytic Philosophy',
    thinkers: ['Franz Brentano', 'Edmund Husserl', 'John Searle'],
    relatedConcepts: [
      { slug: 'consciousness', title: 'Consciousness', relation: 'ประสบการณ์จำนวนมากมี directedness' },
      { slug: 'subjectivity', title: 'Subjectivity', relation: 'ตำแหน่งที่ intentional act เกิดขึ้น' },
      { slug: 'qualia', title: 'Qualia', relation: 'ความสัมพันธ์ระหว่าง content กับ feel' },
    ],
    relatedArticles: [],
    references: [ref.brentanoPsychology, ref.searleIntentionality],
    commonMisunderstandings: [
      'Intentionality ในปรัชญาไม่เท่ากับการมีเจตนาจะทำบางอย่าง',
    ],
    examples: [
      'เราสามารถหวังว่าจะพบเมืองในนิยายได้ แม้ไม่มี object จริงที่ความหวังนั้นชี้ไปหาในโลก',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Intentionality คืออะไรในปรัชญาจิต',
    seoDescription:
      'Intentionality คือคุณสมบัติที่สภาวะทางจิตเป็นเรื่องเกี่ยวกับบางสิ่ง ไม่ใช่เพียงความตั้งใจทำการกระทำ',
  }),
  defineConcept({
    id: 'concept-subjectivity-th',
    slug: 'subjectivity',
    title: 'Subjectivity',
    originalTerm: 'Subjectivity',
    thaiTerm: 'ภาวะเชิงอัตวิสัย',
    shortDefinition:
      'โครงสร้างที่ประสบการณ์ปรากฏจากมุมมองของ subject และมีลักษณะเป็นของผู้ประสบคนนั้น',
    humanExplanation:
      'Subjectivity ไม่ได้แปลว่าทุกอย่างเป็นความคิดเห็น แต่มุ่งอธิบายข้อเท็จจริงว่าประสบการณ์เกิดจากตำแหน่งบุคคลที่หนึ่งซึ่งผู้อื่นเข้าถึงได้ไม่เหมือนเจ้าของประสบการณ์',
    technicalExplanation:
      'Phenomenology วิเคราะห์ first-person givenness, mineness และ pre-reflective self-awareness ขณะที่ปรัชญาวิเคราะห์ถามถึง epistemic asymmetry และ privacy',
    category: 'philosophy-of-mind',
    tradition: 'Phenomenology / Philosophy of Mind',
    thinkers: ['Edmund Husserl', 'Thomas Nagel', 'Dan Zahavi'],
    relatedConcepts: [
      { slug: 'consciousness', title: 'Consciousness', relation: 'ประสบการณ์ที่มี first-person character' },
      { slug: 'self-philosophy-of-mind', title: 'Self', relation: 'ความเป็นเจ้าของประสบการณ์' },
      { slug: 'qualia', title: 'Qualia', relation: 'ลักษณะที่ปรากฏแก่ subject' },
    ],
    relatedArticles: [],
    references: [ref.nagelBat, ref.zahaviSubjectivity],
    commonMisunderstandings: [
      'Subjectivity ไม่ได้ทำให้เหตุผล หลักฐาน หรือโลกภายนอกหมดความหมาย',
    ],
    examples: [
      'แพทย์อาจวัดสัญญาณของความปวดได้ แต่ผู้ป่วยยังมีการเข้าถึงความปวดในฐานะประสบการณ์ของตนต่างจากผู้สังเกต',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Subjectivity คืออะไร',
    seoDescription:
      'Subjectivity คือมุมมองบุคคลที่หนึ่งและความเป็นของฉันของประสบการณ์ แตกต่างจากการหมายความว่าทุกอย่างเป็นความเห็นส่วนตัว',
  }),
];

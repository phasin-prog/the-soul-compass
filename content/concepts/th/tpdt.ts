import { defineConcept } from '@/content/concepts/helpers';
import { conceptReferences as ref } from '@/content/concepts/references';

export const tpdtConcepts = [
  defineConcept({
    id: 'concept-psyche-dynamics-tpdt-th',
    slug: 'psyche-dynamics',
    title: 'Psyche Dynamics',
    originalTerm: 'Psyche Dynamics',
    thaiTerm: 'พลวัตของจิต',
    shortDefinition:
      'กรอบติดตามการเคลื่อนไหวของความสนใจ พลัง ความหมาย และความขัดแย้งระหว่างรูปแบบต่าง ๆ ของ Psyche',
    humanExplanation:
      'แทนที่จะถามเพียงว่าคนเป็นประเภทอะไร Psyche Dynamics ถามว่ารูปแบบใดกำลังนำ รูปแบบใดถูกกีดกัน และระบบเปลี่ยนการจัดระเบียบเมื่อเผชิญแรงกดดันอย่างไร',
    technicalExplanation:
      'ใน TPDT แนวคิดนี้ทำหน้าที่เป็นระดับวิเคราะห์เชิงกระบวนการ โดยพิจารณา activation, inhibition, compensation และ transition ของ patterns โดยยังอยู่ในระหว่างพัฒนานิยามเชิงปฏิบัติการ',
    category: 'tpdt',
    tradition: 'TPDT (Theory in Development)',
    thinkers: ['Phasin Pasumart'],
    relatedConcepts: [
      { slug: 'defense-field', title: 'Defense Field', relation: 'การจัดระเบียบเพื่อรักษาเสถียรภาพ' },
      { slug: 'transformation-axis', title: 'Transformation Axis', relation: 'มิติของการเปลี่ยนรูป' },
      { slug: 'transitional-pattern', title: 'Transitional Pattern', relation: 'รูปแบบระหว่างโครงสร้างเดิมกับใหม่' },
      { slug: 'complex', title: 'Complex', relation: 'หน่วยพลวัตใน Jung' },
    ],
    relatedArticles: ['what-is-tpdt'],
    references: [ref.jungDynamics, ref.freudAnxiety],
    commonMisunderstandings: [
      'Psyche Dynamics ยังไม่ใช่เครื่องมือวินิจฉัยหรือมาตรวัดที่ผ่านการตรวจสอบแล้ว',
      'คำว่า dynamics ไม่ได้หมายถึงอารมณ์ที่เปลี่ยนเร็วเท่านั้น',
    ],
    examples: [
      'เมื่อความต้องการใกล้ชิดกระตุ้นความกลัวการพึ่งพา ระบบอาจสลับจากการเข้าหาเป็นการถอนตัวเพื่อรักษาเสถียรภาพเดิม',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Psyche Dynamics ใน TPDT คืออะไร',
    seoDescription:
      'Psyche Dynamics คือกรอบติดตามการเคลื่อนไหวของรูปแบบ ความขัดแย้ง และการชดเชยใน TPDT ซึ่งยังอยู่ระหว่างพัฒนา',
  }),
  defineConcept({
    id: 'concept-defense-field-tpdt-th',
    slug: 'defense-field',
    title: 'Defense Field',
    originalTerm: 'Defense Field',
    thaiTerm: 'สนามการป้องกัน',
    shortDefinition:
      'เครือข่ายของการรับรู้ อารมณ์ ความสัมพันธ์ และการกระทำที่ร่วมกันรักษารูปแบบของตัวตนเมื่อเผชิญภัยคุกคาม',
    humanExplanation:
      'Defense Field มองการป้องกันมากกว่ากลไกเดี่ยว ๆ เพราะบ่อยครั้งสิ่งที่ทำให้รูปแบบคงอยู่คือทั้งวิธีมองโลก บทบาทของคนรอบข้าง และการหลีกเลี่ยงที่เสริมกัน',
    technicalExplanation:
      'แนวคิดนี้เป็นข้อเสนอของ TPDT เพื่อวิเคราะห์ defense ในระดับ distributed pattern โดยเชื่อม intrapsychic operations กับ interpersonal feedback และ contextual reinforcement',
    category: 'tpdt',
    tradition: 'TPDT (Theory in Development)',
    thinkers: ['Phasin Pasumart', 'Sigmund Freud', 'Anna Freud'],
    relatedConcepts: [
      { slug: 'defense-mechanism', title: 'Defense Mechanism', relation: 'รากฐานในจิตวิเคราะห์' },
      { slug: 'psyche-dynamics', title: 'Psyche Dynamics', relation: 'การเคลื่อนไหวในสนาม' },
      { slug: 'transitional-pattern', title: 'Transitional Pattern', relation: 'รูปแบบที่เกิดเมื่อสนามเริ่มคลาย' },
    ],
    relatedArticles: ['what-is-tpdt'],
    references: [ref.freudAnxiety, ref.annaFreudDefense],
    commonMisunderstandings: [
      'Defense Field เป็นสมมติฐานเชิงกรอบ ไม่ใช่สนามพลังทางกายภาพ',
      'การมี defense ไม่ได้แปลว่าบุคคลอ่อนแอหรือไม่ซื่อสัตย์',
    ],
    examples: [
      'คนหนึ่งหลีกเลี่ยงการขอความช่วยเหลือ ขณะที่ครอบครัวยกย่องความพึ่งตนเองและลดค่าความเปราะบาง ทั้งหมดร่วมกันทำให้รูปแบบป้องกันมั่นคง',
    ],
    difficulty: 'advanced',
    seoTitle: 'Defense Field ใน TPDT คืออะไร',
    seoDescription:
      'Defense Field คือข้อเสนอใน TPDT ที่มองการป้องกันเป็นเครือข่าย intrapsychic, interpersonal และ contextual ไม่ใช่กลไกเดี่ยว',
  }),
  defineConcept({
    id: 'concept-transformation-axis-tpdt-th',
    slug: 'transformation-axis',
    title: 'Transformation Axis',
    originalTerm: 'Transformation Axis',
    thaiTerm: 'แกนการเปลี่ยนแปลง',
    shortDefinition:
      'มิติสำหรับอธิบายว่าระบบเคลื่อนจากการรักษารูปแบบเดิมไปสู่การทดลอง บูรณาการ และจัดระเบียบใหม่มากน้อยเพียงใด',
    humanExplanation:
      'การเปลี่ยนแปลงไม่เกิดทันทีจาก “ไม่รู้” ไปเป็น “หายแล้ว” Transformation Axis ช่วยติดตามขั้นระหว่างการเห็นรูปแบบเดิม การทนความไม่แน่นอน และการสร้างทางเลือกใหม่',
    technicalExplanation:
      'ใน TPDT แกนนี้เป็น construct เชิงพัฒนาที่เสนอให้พิจารณา rigidity, reflective capacity, tolerance of conflict, experimentation และ consolidation โดยยังต้องพัฒนาวิธี operationalize',
    category: 'tpdt',
    tradition: 'TPDT (Theory in Development)',
    thinkers: ['Phasin Pasumart', 'Donald W. Winnicott'],
    relatedConcepts: [
      { slug: 'psyche-dynamics', title: 'Psyche Dynamics', relation: 'กระบวนการที่ถูกติดตาม' },
      { slug: 'defense-field', title: 'Defense Field', relation: 'เสถียรภาพที่อาจต้านการเปลี่ยน' },
      { slug: 'transitional-pattern', title: 'Transitional Pattern', relation: 'รูปแบบทดลองระหว่างการเปลี่ยน' },
      { slug: 'individuation', title: 'Individuation', relation: 'แนวคิดเปรียบเทียบใน Jung' },
    ],
    relatedArticles: ['what-is-tpdt'],
    references: [ref.jungDynamics, ref.winnicottPlaying],
    commonMisunderstandings: [
      'Transformation Axis ไม่ใช่คะแนนความดีหรือความเป็นผู้ใหญ่แบบเส้นตรง',
      'การถอยกลับชั่วคราวไม่จำเป็นต้องหมายถึงการเปลี่ยนแปลงล้มเหลว',
    ],
    examples: [
      'บุคคลอาจเริ่มจากรู้ตัวหลังเหตุการณ์ ต่อมารู้ตัวระหว่างเหตุการณ์ และในที่สุดทดลองตอบสนองใหม่ก่อนรูปแบบเดิมทำงานเต็มที่',
    ],
    difficulty: 'advanced',
    seoTitle: 'Transformation Axis ใน TPDT คืออะไร',
    seoDescription:
      'Transformation Axis เป็นข้อเสนอใน TPDT สำหรับติดตามความแข็งตัว การสะท้อนคิด การทดลอง และการจัดระเบียบรูปแบบใหม่',
  }),
  defineConcept({
    id: 'concept-transitional-pattern-tpdt-th',
    slug: 'transitional-pattern',
    title: 'Transitional Pattern',
    originalTerm: 'Transitional Pattern',
    thaiTerm: 'รูปแบบช่วงเปลี่ยนผ่าน',
    shortDefinition:
      'รูปแบบชั่วคราวที่เกิดเมื่อโครงสร้างเดิมไม่ครอบงำเต็มที่ แต่รูปแบบใหม่ยังไม่มั่นคงพอจะรับภาระทั้งหมด',
    humanExplanation:
      'ช่วงเปลี่ยนผ่านมักดูไม่เป็นระเบียบ เพราะคนอาจกลับไปมาระหว่างวิธีเดิมกับทางเลือกใหม่ Transitional Pattern ช่วยมองความไม่คงที่เป็นข้อมูลของการเปลี่ยน ไม่ใช่ความล้มเหลวทันที',
    technicalExplanation:
      'TPDT เสนอคำนี้เพื่ออธิบาย metastable configurations ที่รองรับ experimentation ระหว่าง loosening of defense field และ consolidation ของ organization ใหม่',
    category: 'tpdt',
    tradition: 'TPDT (Theory in Development)',
    thinkers: ['Phasin Pasumart', 'Donald W. Winnicott'],
    relatedConcepts: [
      { slug: 'transformation-axis', title: 'Transformation Axis', relation: 'ตำแหน่งของการเคลื่อนผ่าน' },
      { slug: 'defense-field', title: 'Defense Field', relation: 'โครงสร้างเดิมที่ยังดึงกลับ' },
      { slug: 'psyche-dynamics', title: 'Psyche Dynamics', relation: 'แรงที่จัดรูป transitional pattern' },
    ],
    relatedArticles: ['what-is-tpdt'],
    references: [ref.winnicottPlaying],
    commonMisunderstandings: [
      'Transitional Pattern ไม่ใช่ประเภทบุคลิกภาพอีกชนิดหนึ่ง',
      'ความไม่เสถียรช่วงเปลี่ยนผ่านไม่ได้ดีโดยตัวมันเอง ต้องดูหน้าที่และผลลัพธ์',
    ],
    examples: [
      'คนที่เคยตอบตกลงทุกคำขออาจเริ่มปฏิเสธแบบแข็งหรือรู้สึกผิดมาก ก่อนจะพัฒนาขอบเขตที่ยืดหยุ่นและสื่อสารได้ชัดขึ้น',
    ],
    difficulty: 'advanced',
    seoTitle: 'Transitional Pattern ใน TPDT คืออะไร',
    seoDescription:
      'Transitional Pattern คือรูปแบบชั่วคราวระหว่างโครงสร้างเดิมกับใหม่ใน TPDT ช่วยอ่านความไม่เสถียรของกระบวนการเปลี่ยนแปลง',
  }),
];

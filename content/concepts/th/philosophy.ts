import { defineConcept } from '@/content/concepts/helpers';
import { conceptReferences as ref } from '@/content/concepts/references';

export const philosophyConcepts = [
  defineConcept({
    id: 'concept-phenomenology-th',
    slug: 'phenomenology',
    title: 'Phenomenology',
    originalTerm: 'Phenomenology',
    thaiTerm: 'ปรากฏการณ์วิทยา',
    shortDefinition:
      'แนวทางปรัชญาที่ศึกษาว่าสิ่งต่าง ๆ ปรากฏในประสบการณ์อย่างไร และโครงสร้างใดทำให้การรับรู้ ความหมาย และโลกที่มีชีวิตเป็นไปได้',
    humanExplanation:
      'Phenomenology เริ่มจากประสบการณ์ตามที่มันถูกใช้ชีวิต ไม่รีบลดความเศร้า ความเจ็บ หรือการเห็นผู้อื่นให้เหลือเพียงกลไก แต่ก็ไม่หยุดแค่การเล่าความรู้สึกส่วนตัว',
    technicalExplanation:
      'จาก Husserl แนวทางนี้วิเคราะห์ intentionality, horizon, embodiment, temporality และ intersubjectivity ผ่านการระงับสมมติฐานบางชนิดเพื่อพิจารณาโครงสร้างของ givenness',
    category: 'philosophy',
    tradition: 'Phenomenology',
    thinkers: ['Edmund Husserl', 'Martin Heidegger', 'Maurice Merleau-Ponty'],
    relatedConcepts: [
      {
        slug: 'intentionality',
        title: 'Intentionality',
        relation: 'โครงสร้างที่ประสบการณ์มุ่งไปยังสิ่งหนึ่ง',
      },
      {
        slug: 'subjectivity',
        title: 'Subjectivity',
        relation: 'มุมมองบุคคลที่หนึ่งและ mineness',
      },
      {
        slug: 'embodiment',
        title: 'Embodiment',
        relation: 'ร่างกายในฐานะวิธีที่เราอยู่ในโลก',
      },
    ],
    relatedArticles: [],
    references: [ref.husserlIdeas, ref.merleauPontyPerception],
    commonMisunderstandings: [
      'Phenomenology ไม่ใช่การบันทึกความรู้สึกส่วนตัวโดยไม่ใช้เหตุผล',
      'การให้ความสำคัญกับประสบการณ์ไม่ได้ปฏิเสธวิทยาศาสตร์เชิงประจักษ์',
    ],
    examples: [
      'การศึกษาความปวดเชิง phenomenology ถามทั้งตำแหน่ง เวลา ความหมาย และวิธีที่ความปวดเปลี่ยนโลกที่บุคคลสามารถเข้าไปมีส่วนร่วม',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Phenomenology คืออะไร',
    seoDescription:
      'Phenomenology หรือปรากฏการณ์วิทยาศึกษาโครงสร้างของประสบการณ์ Intentionality, Subjectivity และ Embodiment',
  }),
  defineConcept({
    id: 'concept-embodiment-th',
    slug: 'embodiment',
    title: 'Embodiment',
    originalTerm: 'Embodiment',
    thaiTerm: 'ภาวะมีร่างกาย',
    shortDefinition:
      'แนวคิดที่ว่าจิต การรับรู้ และการกระทำถูกก่อรูปผ่านร่างกายที่มีชีวิตและความสัมพันธ์กับสิ่งแวดล้อม ไม่ได้เกิดในสมองอย่างโดดเดี่ยว',
    humanExplanation:
      'เรารู้จักโลกผ่านสิ่งที่ร่างกายทำได้ ท่าทาง ความเหนื่อย การเคลื่อนไหว และสภาพแวดล้อมเปลี่ยนวิธีคิดและรู้สึก ไม่ใช่เพียงเป็นข้อมูลที่ส่งเข้าไปให้สมอง',
    technicalExplanation:
      'Embodied approaches มีหลายระดับ ตั้งแต่ weak embodiment ใน cognitive science ถึง enactivism และ phenomenology ซึ่งเน้น sensorimotor coupling, situated action และ lived body',
    category: 'philosophy',
    tradition: 'Phenomenology / Embodied Cognition',
    thinkers: ['Maurice Merleau-Ponty', 'Francisco Varela', 'Andy Clark'],
    relatedConcepts: [
      {
        slug: 'phenomenology',
        title: 'Phenomenology',
        relation: 'การวิเคราะห์ lived body',
      },
      {
        slug: 'interoception',
        title: 'Interoception',
        relation: 'การรับรู้สภาวะภายในร่างกาย',
      },
      {
        slug: 'consciousness',
        title: 'Consciousness',
        relation: 'คำถามว่าร่างกายมีบทบาทต่อประสบการณ์อย่างไร',
      },
    ],
    relatedArticles: [],
    references: [ref.merleauPontyPerception, ref.clarkChalmersExtendedMind],
    commonMisunderstandings: [
      'Embodiment ไม่ได้หมายความว่าสมองไม่สำคัญ',
      'การอ้างว่าความคิดมีร่างกายต้องระบุระดับและกลไก ไม่ใช่ใช้เป็นคำเปรียบเทียบกว้าง ๆ',
    ],
    examples: [
      'การใช้กระดาษวาดแผนภาพอาจเปลี่ยนวิธีแก้ปัญหา เพราะร่างกายและเครื่องมือภายนอกกลายเป็นส่วนของกระบวนการคิด',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Embodiment คืออะไร',
    seoDescription:
      'Embodiment คือแนวคิดว่าจิตและการรับรู้ถูกก่อรูปผ่านร่างกาย การเคลื่อนไหว และสิ่งแวดล้อม ไม่ได้เกิดในสมองอย่างโดดเดี่ยว',
  }),
  defineConcept({
    id: 'concept-free-will-th',
    slug: 'free-will',
    title: 'Free Will',
    originalTerm: 'Free Will',
    thaiTerm: 'เจตจำนงเสรี',
    shortDefinition:
      'ปัญหาว่าบุคคลสามารถเป็นแหล่งกำเนิดและรับผิดชอบต่อการกระทำของตนได้ในความหมายใด ภายใต้เหตุปัจจัยทางกาย จิต และสังคม',
    humanExplanation:
      'คำถามเรื่อง Free Will ไม่ได้มีแค่ “ทุกอย่างถูกกำหนดหรือไม่” แต่รวมถึงความสามารถตอบสนองต่อเหตุผล การควบคุมตน การมีทางเลือก และเงื่อนไขของความรับผิดชอบ',
    technicalExplanation:
      'ข้อถกเถียงหลักประกอบด้วย libertarianism, hard determinism และ compatibilism พร้อมการแยก alternative possibilities, sourcehood และ reasons-responsive agency',
    category: 'philosophy',
    tradition: 'Metaphysics and Philosophy of Action',
    thinkers: ['Harry Frankfurt', 'P. F. Strawson', 'Robert Kane'],
    relatedConcepts: [
      {
        slug: 'intentionality',
        title: 'Intentionality',
        relation: 'ความเป็นเรื่องเกี่ยวกับเป้าหมายและเหตุผล',
      },
      {
        slug: 'unconscious',
        title: 'Unconscious',
        relation: 'ข้อจำกัดต่อความโปร่งใสของแรงจูงใจ',
      },
      {
        slug: 'predictive-processing',
        title: 'Predictive Processing',
        relation: 'กลไกสมองไม่ได้ยุติคำถามเชิงความรับผิดชอบทันที',
      },
    ],
    relatedArticles: [],
    references: [ref.frankfurtAlternatePossibilities],
    commonMisunderstandings: [
      'การค้นพบสาเหตุทางสมองของการตัดสินใจไม่ได้พิสูจน์ว่า Free Will ไม่มีอยู่โดยลำพัง',
      'Free Will ไม่จำเป็นต้องหมายถึงการกระทำที่ไม่มีสาเหตุใด ๆ',
    ],
    examples: [
      'คนอาจถูกบังคับภายนอก มีข้อจำกัดจากการเสพติด หรือทำตามเหตุผลที่ตนยอมรับ—แต่ละกรณีทำให้ความรับผิดชอบต่างกัน',
    ],
    difficulty: 'advanced',
    seoTitle: 'Free Will คืออะไร',
    seoDescription:
      'Free Will คือปัญหาเรื่องความเป็นเจ้าของการกระทำ ทางเลือก เหตุผล และความรับผิดชอบ ท่ามกลางเหตุปัจจัยทางกายและจิต',
  }),
  defineConcept({
    id: 'concept-personal-identity-th',
    slug: 'personal-identity',
    title: 'Personal Identity',
    originalTerm: 'Personal Identity',
    thaiTerm: 'อัตลักษณ์บุคคลข้ามเวลา',
    shortDefinition:
      'ปัญหาว่าอะไรทำให้บุคคลในเวลาหนึ่งเป็นคนเดียวกับบุคคลในอีกเวลา แม้ร่างกาย ความทรงจำ และบุคลิกภาพเปลี่ยนไป',
    humanExplanation:
      'เราใช้คำว่า “คนเดิม” อย่างง่ายในชีวิตประจำวัน แต่กรณีความจำเสื่อม การแบ่งสมอง การย้ายข้อมูล หรือการเปลี่ยนบุคลิกทำให้เกณฑ์นี้ซับซ้อน',
    technicalExplanation:
      'ทฤษฎีสำคัญเสนอ bodily continuity, brain continuity, psychological continuity และ reductionism โดยแยก numerical identity จากความคล้ายคลึงเชิงคุณสมบัติ',
    category: 'philosophy',
    tradition: 'Metaphysics / Philosophy of Mind',
    thinkers: ['John Locke', 'Derek Parfit', 'Marya Schechtman'],
    relatedConcepts: [
      {
        slug: 'self-philosophy-of-mind',
        title: 'Self',
        relation: 'โครงสร้างของความเป็นเจ้าของประสบการณ์',
      },
      {
        slug: 'memory-consolidation',
        title: 'Memory Consolidation',
        relation: 'ความทรงจำเป็นเกณฑ์หนึ่งแต่ไม่ใช่คำตอบทั้งหมด',
      },
      {
        slug: 'subjectivity',
        title: 'Subjectivity',
        relation: 'ความต่อเนื่องของมุมมองบุคคลที่หนึ่ง',
      },
    ],
    relatedArticles: [],
    references: [ref.parfitReasonsPersons],
    commonMisunderstandings: [
      'Personal Identity ในปรัชญาไม่ใช่เพียงบุคลิกหรือภาพลักษณ์ทางสังคม',
      'ความทรงจำอย่างเดียวมีปัญหาวนกลับ หากต้องรู้ก่อนว่าเป็นความทรงจำของใคร',
    ],
    examples: [
      'หากคนหนึ่งสูญเสียความทรงจำส่วนใหญ่แต่ยังมีร่างกายและความสัมพันธ์ต่อเนื่อง เราต้องอธิบายว่าอะไรทำให้เขายังเป็นคนเดิม',
    ],
    difficulty: 'advanced',
    seoTitle: 'Personal Identity คืออะไร',
    seoDescription:
      'Personal Identity คือปัญหาว่าอะไรทำให้บุคคลเป็นคนเดิมข้ามเวลา เปรียบเทียบร่างกาย สมอง ความทรงจำ และ psychological continuity',
  }),
];

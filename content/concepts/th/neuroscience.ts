import { defineConcept } from '@/content/concepts/helpers';
import { conceptReferences as ref } from '@/content/concepts/references';

export const neuroscienceConcepts = [
  defineConcept({
    id: 'concept-neuroplasticity-th',
    slug: 'neuroplasticity',
    title: 'Neuroplasticity',
    originalTerm: 'Neuroplasticity',
    thaiTerm: 'ความยืดหยุ่นของระบบประสาท',
    shortDefinition:
      'ความสามารถของระบบประสาทในการเปลี่ยนความแข็งแรงของการเชื่อมต่อ โครงสร้าง และการจัดหน้าที่ตามประสบการณ์ การเรียนรู้ หรือการบาดเจ็บ',
    humanExplanation:
      'สมองไม่ได้หยุดเปลี่ยนเมื่อโตเป็นผู้ใหญ่ การฝึกซ้ำ ประสบการณ์ใหม่ ความเครียด และการฟื้นฟูสามารถเปลี่ยนเส้นทางการทำงานได้ แต่การเปลี่ยนไม่ได้เกิดได้ทุกแบบอย่างไร้ขีดจำกัด',
    technicalExplanation:
      'Neuroplasticity ครอบคลุมกลไกหลายระดับ ตั้งแต่ synaptic plasticity, long-term potentiation และ dendritic remodeling ไปจนถึงการเปลี่ยน functional representation ในเครือข่ายขนาดใหญ่',
    category: 'neuroscience',
    tradition: 'Learning and Systems Neuroscience',
    thinkers: ['Donald Hebb', 'Eric Kandel', 'Michael Merzenich'],
    relatedConcepts: [
      {
        slug: 'memory-consolidation',
        title: 'Memory Consolidation',
        relation: 'การทำให้การเปลี่ยนแปลงจากการเรียนรู้คงทนขึ้น',
      },
      {
        slug: 'predictive-processing',
        title: 'Predictive Processing',
        relation: 'การปรับแบบจำลองจาก prediction error',
      },
      {
        slug: 'transformation-axis',
        title: 'Transformation Axis',
        relation: 'กรอบเปรียบเทียบเรื่องการเปลี่ยนรูปทางจิต',
      },
    ],
    relatedArticles: [],
    references: [ref.hebbOrganization, ref.kandelMemory],
    commonMisunderstandings: [
      'Neuroplasticity ไม่ได้หมายความว่าสมองเปลี่ยนได้ทุกอย่างด้วยความคิดเชิงบวก',
      'การเปลี่ยนแปลงของสมองอาจเป็นทั้งการปรับตัวที่ช่วยเหลือและรูปแบบที่สร้างปัญหา',
    ],
    examples: [
      'การฝึกทักษะดนตรีซ้ำ ๆ ทำให้เครือข่ายการรับรู้และการเคลื่อนไหวปรับตัว ขณะที่การฟื้นฟูหลังโรคหลอดเลือดสมองใช้การฝึกเพื่อสนับสนุนเส้นทางทดแทน',
    ],
    difficulty: 'beginner',
    seoTitle: 'Neuroplasticity คืออะไร',
    seoDescription:
      'Neuroplasticity คือความสามารถของระบบประสาทในการเปลี่ยนการเชื่อมต่อและหน้าที่จากการเรียนรู้ ประสบการณ์ และการฟื้นฟู',
  }),
  defineConcept({
    id: 'concept-predictive-processing-th',
    slug: 'predictive-processing',
    title: 'Predictive Processing',
    originalTerm: 'Predictive Processing',
    thaiTerm: 'การประมวลผลเชิงพยากรณ์',
    shortDefinition:
      'กรอบที่มองว่าสมองสร้างแบบจำลองคาดการณ์สาเหตุของข้อมูลประสาทสัมผัส และปรับแบบจำลองหรือการกระทำเพื่อลดความคลาดเคลื่อน',
    humanExplanation:
      'การรับรู้ไม่ใช่การรับภาพโลกเข้ามาตรง ๆ สมองใช้ประสบการณ์เดิมคาดว่ากำลังเกิดอะไร แล้วเปรียบเทียบกับข้อมูลใหม่ ความคาดหวังจึงช่วยทั้งให้รับรู้เร็วและทำให้เข้าใจผิดได้',
    technicalExplanation:
      'Predictive processing อธิบาย hierarchical generative models, prediction error และ precision weighting โดยบางแนวทางเชื่อมกับ Bayesian inference และ free-energy principle',
    category: 'neuroscience',
    tradition: 'Computational and Cognitive Neuroscience',
    thinkers: ['Karl Friston', 'Andy Clark', 'Jakob Hohwy'],
    relatedConcepts: [
      {
        slug: 'interoception',
        title: 'Interoception',
        relation: 'การคาดการณ์สภาวะภายในร่างกาย',
      },
      {
        slug: 'salience-network',
        title: 'Salience Network',
        relation: 'การจัดลำดับข้อมูลที่ควรได้รับน้ำหนัก',
      },
      {
        slug: 'intentionality',
        title: 'Intentionality',
        relation: 'คำถามเชิงปรัชญาเรื่อง content ของสภาวะจิต',
      },
    ],
    relatedArticles: [],
    references: [ref.fristonFreeEnergy, ref.clarkSurfingUncertainty],
    commonMisunderstandings: [
      'Predictive processing ไม่ได้บอกว่าการรับรู้เป็นภาพหลอนที่ไม่มีโลกภายนอก',
      'กรอบนี้ยังมีหลายเวอร์ชันและไม่ได้เป็นทฤษฎีที่นักประสาทวิทยาเห็นพ้องทั้งหมด',
    ],
    examples: [
      'เมื่ออ่านข้อความที่ตัวอักษรบางส่วนหายไป ความคาดหวังจากบริบทช่วยเติมความหมาย แต่ความคาดหวังเดียวกันก็อาจทำให้เราอ่านคำผิด',
    ],
    difficulty: 'advanced',
    seoTitle: 'Predictive Processing คืออะไร',
    seoDescription:
      'Predictive Processing มองว่าสมองคาดการณ์สาเหตุของข้อมูลประสาทสัมผัสและปรับจาก prediction error กับ precision',
  }),
  defineConcept({
    id: 'concept-interoception-th',
    slug: 'interoception',
    title: 'Interoception',
    originalTerm: 'Interoception',
    thaiTerm: 'การรับรู้สภาวะภายในร่างกาย',
    shortDefinition:
      'การตรวจจับ ตีความ และบูรณาการสัญญาณจากภายในร่างกาย เช่น การเต้นของหัวใจ การหายใจ ความหิว และความตึงเครียด',
    humanExplanation:
      'ความรู้สึกว่า “ร่างกายกำลังเป็นอย่างไร” มีส่วนต่ออารมณ์ การตัดสินใจ และความรู้สึกเป็นตัวตน แต่คนเราไวต่อสัญญาณและตีความสัญญาณเหล่านี้ต่างกัน',
    technicalExplanation:
      'Interoception ครอบคลุม afferent signaling, interoceptive attention, accuracy, sensibility และ prediction โดยเกี่ยวข้องกับ insula, anterior cingulate และระบบ autonomic',
    category: 'neuroscience',
    tradition: 'Affective and Cognitive Neuroscience',
    thinkers: ['A. D. Craig', 'Hugo Critchley', 'Anil Seth'],
    relatedConcepts: [
      {
        slug: 'predictive-processing',
        title: 'Predictive Processing',
        relation: 'การคาดการณ์สัญญาณภายใน',
      },
      {
        slug: 'embodiment',
        title: 'Embodiment',
        relation: 'บทบาทของร่างกายต่อจิตและประสบการณ์',
      },
      {
        slug: 'subjectivity',
        title: 'Subjectivity',
        relation: 'ความเป็นของฉันของสภาวะที่ถูกรับรู้',
      },
    ],
    relatedArticles: [],
    references: [ref.craigInteroception],
    commonMisunderstandings: [
      'Interoception ไม่ใช่สัญชาตญาณลึกลับ และการรู้สึกร่างกายชัดไม่ได้แปลว่าตีความถูกเสมอ',
    ],
    examples: [
      'หัวใจเต้นเร็วอาจถูกตีความเป็นความกลัว ความตื่นเต้น หรือผลจากคาเฟอีนตามบริบทและความคาดหวังของบุคคล',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Interoception คืออะไร',
    seoDescription:
      'Interoception คือการรับรู้และตีความสัญญาณภายในร่างกาย ซึ่งสัมพันธ์กับอารมณ์ การตัดสินใจ และความรู้สึกเป็นตัวตน',
  }),
  defineConcept({
    id: 'concept-memory-consolidation-th',
    slug: 'memory-consolidation',
    title: 'Memory Consolidation',
    originalTerm: 'Memory Consolidation',
    thaiTerm: 'การทำให้ความทรงจำคงทน',
    shortDefinition:
      'กระบวนการที่ร่องรอยความจำซึ่งยังเปราะบางถูกทำให้มีเสถียรภาพและบูรณาการกับความรู้เดิมตามเวลา',
    humanExplanation:
      'การจำไม่ได้จบเมื่อเหตุการณ์ผ่านไป การนอน การทบทวน อารมณ์ และการเรียกคืนภายหลังมีผลต่อสิ่งที่คงอยู่และวิธีที่ความทรงจำนั้นถูกจัดรูป',
    technicalExplanation:
      'งานวิจัยแยก synaptic consolidation ระยะสั้นจาก systems consolidation ระยะยาว และศึกษาบทบาทของ hippocampus, neocortex, sleep และ reconsolidation',
    category: 'neuroscience',
    tradition: 'Memory Neuroscience',
    thinkers: ['James McGaugh', 'Brenda Milner', 'Larry Squire'],
    relatedConcepts: [
      {
        slug: 'neuroplasticity',
        title: 'Neuroplasticity',
        relation: 'กลไกการเปลี่ยนแปลงที่รองรับการเรียนรู้',
      },
      {
        slug: 'personal-unconscious',
        title: 'Personal Unconscious',
        relation: 'กรอบเปรียบเทียบเรื่องประสบการณ์ที่ไม่อยู่ในจิตสำนึก',
      },
      {
        slug: 'repression',
        title: 'Repression',
        relation: 'แนวคิดจิตวิเคราะห์ที่ไม่ควรสับสนกับการลืมเชิงความจำ',
      },
    ],
    relatedArticles: [],
    references: [ref.mcgaughConsolidation, ref.kandelMemory],
    commonMisunderstandings: [
      'ความทรงจำไม่ได้ถูกบันทึกเหมือนวิดีโอและเรียกคืนแบบไม่เปลี่ยนแปลง',
      'การจำไม่ได้ไม่ใช่หลักฐานของ Repression โดยอัตโนมัติ',
    ],
    examples: [
      'การนอนหลังเรียนช่วยสนับสนุนการคงอยู่ของข้อมูล ขณะที่การเรียกคืนความจำอาจทำให้ร่องรอยนั้นเปิดรับการปรับแก้อีกครั้ง',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Memory Consolidation คืออะไร',
    seoDescription:
      'Memory Consolidation คือกระบวนการทำให้ร่องรอยความจำมีเสถียรภาพ ผ่านกลไกระดับ synapse ระบบสมอง และการนอน',
  }),
  defineConcept({
    id: 'concept-salience-network-th',
    slug: 'salience-network',
    title: 'Salience Network',
    originalTerm: 'Salience Network',
    thaiTerm: 'เครือข่ายตรวจจับความสำคัญ',
    shortDefinition:
      'เครือข่ายสมองขนาดใหญ่ที่มีส่วนตรวจจับเหตุการณ์ภายในและภายนอกที่ควรได้รับความสนใจ และประสานการสลับโหมดการทำงาน',
    humanExplanation:
      'สมองต้องเลือกตลอดเวลาว่าสัญญาณใดสำคัญพอให้หยุดสิ่งที่กำลังทำแล้วหันไปตอบสนอง Salience Network เป็นส่วนหนึ่งของระบบคัดเลือกนั้น ไม่ใช่ปุ่มอารมณ์เพียงปุ่มเดียว',
    technicalExplanation:
      'เครือข่ายนี้มักอ้างถึง anterior insula และ dorsal anterior cingulate พร้อมบทบาทในการ switching ระหว่าง default mode และ central executive networks',
    category: 'neuroscience',
    tradition: 'Network Neuroscience',
    thinkers: ['Vinod Menon', 'William Seeley'],
    relatedConcepts: [
      {
        slug: 'interoception',
        title: 'Interoception',
        relation: 'สัญญาณภายในที่อาจถูกจัดว่า salient',
      },
      {
        slug: 'predictive-processing',
        title: 'Predictive Processing',
        relation: 'precision และน้ำหนักของ prediction error',
      },
      {
        slug: 'attention',
        title: 'Attention',
        relation: 'การจัดสรรทรัพยากรต่อข้อมูลสำคัญ',
      },
    ],
    relatedArticles: [],
    references: [ref.menonNetworks],
    commonMisunderstandings: [
      'Salience Network ไม่ใช่ตำแหน่งเดียวในสมองและไม่อธิบายความสนใจทั้งหมด',
      'การเห็นความต่างในภาพสมองไม่ได้พิสูจน์สาเหตุทางจิตวิทยาเพียงลำพัง',
    ],
    examples: [
      'เสียงชื่อของเราในห้องที่มีคนคุยจำนวนมากอาจดึงความสนใจได้ เพราะระบบประเมินว่าสัญญาณนั้นมีความเกี่ยวข้องสูง',
    ],
    difficulty: 'advanced',
    seoTitle: 'Salience Network คืออะไร',
    seoDescription:
      'Salience Network คือเครือข่ายสมองที่ช่วยตรวจจับข้อมูลสำคัญและประสานการสลับระหว่างเครือข่ายการทำงานขนาดใหญ่',
  }),
  defineConcept({
    id: 'concept-attention-th',
    slug: 'attention',
    title: 'Attention',
    originalTerm: 'Attention',
    thaiTerm: 'ความสนใจ',
    shortDefinition:
      'ชุดกระบวนการที่คัดเลือก รักษา และจัดสรรทรัพยากรการประมวลผลให้ข้อมูลหรือเป้าหมายบางส่วนเหนือสิ่งอื่น',
    humanExplanation:
      'ความสนใจไม่ใช่แสงไฟดวงเดียว เราสามารถเลือกตำแหน่ง รักษาเป้าหมาย ยับยั้งสิ่งรบกวน หรือแบ่งทรัพยากรได้ต่างกัน และทุกแบบมีข้อจำกัด',
    technicalExplanation:
      'Cognitive neuroscience แยก alerting, orienting, selective, sustained และ executive attention พร้อมศึกษา dorsal/ventral attention networks และ top-down กับ bottom-up control',
    category: 'neuroscience',
    tradition: 'Cognitive Psychology and Neuroscience',
    thinkers: ['Michael Posner', 'Anne Treisman', 'Corbetta and Shulman'],
    relatedConcepts: [
      {
        slug: 'salience-network',
        title: 'Salience Network',
        relation: 'การตรวจจับสิ่งที่ควรได้รับน้ำหนัก',
      },
      {
        slug: 'consciousness',
        title: 'Consciousness',
        relation: 'สัมพันธ์กันแต่ไม่ใช่กระบวนการเดียวกัน',
      },
      {
        slug: 'predictive-processing',
        title: 'Predictive Processing',
        relation: 'ความคาดหวังมีผลต่อการคัดเลือกข้อมูล',
      },
    ],
    relatedArticles: [],
    references: [ref.menonNetworks],
    commonMisunderstandings: [
      'Attention ไม่เท่ากับ Consciousness และข้อมูลที่ไม่ได้รับความสนใจยังอาจถูกประมวลผลบางระดับ',
      'การทำหลายอย่างพร้อมกันมักเป็นการสลับงาน ไม่ใช่การประมวลผลเต็มกำลังพร้อมกัน',
    ],
    examples: [
      'ขณะขับรถบนเส้นทางคุ้นเคย เราอาจรักษาความสนใจต่อถนนพร้อมเลือกตอบสนองทันทีเมื่อมีเด็กวิ่งเข้ามา',
    ],
    difficulty: 'beginner',
    seoTitle: 'Attention คืออะไรในจิตวิทยาการรู้คิด',
    seoDescription:
      'Attention คือกระบวนการคัดเลือกและจัดสรรทรัพยากรการประมวลผล ครอบคลุม selective, sustained และ executive attention',
  }),
];

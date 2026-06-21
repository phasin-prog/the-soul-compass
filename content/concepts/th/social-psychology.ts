import { defineConcept } from '@/content/concepts/helpers';
import { conceptReferences as ref } from '@/content/concepts/references';

export const socialPsychologyConcepts = [
  defineConcept({
    id: 'concept-social-identity-th',
    slug: 'social-identity',
    title: 'Social Identity',
    originalTerm: 'Social Identity',
    thaiTerm: 'อัตลักษณ์ทางสังคม',
    shortDefinition:
      'ส่วนของความเข้าใจตนที่มาจากการเป็นสมาชิกกลุ่ม พร้อมคุณค่าและความหมายทางอารมณ์ที่ผูกกับสมาชิกภาพนั้น',
    humanExplanation:
      'เรารู้จักตนเองไม่ใช่แค่ในฐานะปัจเจก แต่ในฐานะสมาชิกของชาติ อาชีพ ชุมชน รุ่น หรือกลุ่มความเชื่อ เมื่อบริบททำให้สมาชิกภาพหนึ่งเด่น วิธีมองตนและผู้อื่นก็เปลี่ยนตาม',
    technicalExplanation:
      'Social identity theory อธิบาย social categorization, identification และ comparison รวมถึงแรงจูงใจต่อ positive distinctiveness และความสัมพันธ์ระหว่าง in-group กับ out-group',
    category: 'social-psychology',
    tradition: 'Social Identity Approach',
    thinkers: ['Henri Tajfel', 'John C. Turner'],
    relatedConcepts: [
      {
        slug: 'self-categorization',
        title: 'Self-Categorization',
        relation: 'กระบวนการที่ระดับอัตลักษณ์หนึ่งเด่นขึ้น',
      },
      {
        slug: 'conformity',
        title: 'Conformity',
        relation: 'การปรับพฤติกรรมตามบรรทัดฐานกลุ่ม',
      },
      {
        slug: 'self-philosophy-of-mind',
        title: 'Self',
        relation: 'คำถามเรื่องตัวตนในอีกระดับการวิเคราะห์',
      },
    ],
    relatedArticles: [],
    references: [ref.tajfelSocialIdentity, ref.turnerSelfCategorization],
    commonMisunderstandings: [
      'Social Identity ไม่ได้แปลว่าคนไม่มีลักษณะเฉพาะหรือถูกกลุ่มควบคุมทั้งหมด',
      'ความลำเอียงต่อกลุ่มตนไม่จำเป็นต้องเกิดจากความเกลียดชังส่วนตัว',
    ],
    examples: [
      'คนคนเดียวอาจเน้นความเป็นนักวิชาชีพในที่ทำงาน แต่เน้นความเป็นคนท้องถิ่นเมื่อพูดถึงนโยบายระดับประเทศ',
    ],
    difficulty: 'beginner',
    seoTitle: 'Social Identity คืออะไร',
    seoDescription:
      'Social Identity คือส่วนของตัวตนที่มาจากสมาชิกภาพกลุ่ม และช่วยอธิบาย in-group, out-group และการเปลี่ยนพฤติกรรมตามบริบท',
  }),
  defineConcept({
    id: 'concept-self-categorization-th',
    slug: 'self-categorization',
    title: 'Self-Categorization',
    originalTerm: 'Self-Categorization',
    thaiTerm: 'การจัดประเภทตนเอง',
    shortDefinition:
      'กระบวนการที่บุคคลจัดตนและผู้อื่นเข้าสู่หมวดทางสังคม ทำให้ระดับอัตลักษณ์และบรรทัดฐานของกลุ่มบางชุดเด่นขึ้น',
    humanExplanation:
      'เราไม่ได้รับรู้ตนในระดับเดียวตลอดเวลา บางครั้งเห็นตนเป็นบุคคลเฉพาะ บางครั้งเป็นสมาชิกทีม หรือเป็นมนุษย์ร่วมกับคนอื่น การเปลี่ยนระดับนี้มีผลต่อสิ่งที่ดูเหมาะสมและสำคัญ',
    technicalExplanation:
      'Self-categorization theory อธิบาย depersonalization, comparative fit, normative fit และ category salience โดยไม่ถือว่า depersonalization คือการสูญเสียความเป็นบุคคลทางคลินิก',
    category: 'social-psychology',
    tradition: 'Self-Categorization Theory',
    thinkers: ['John C. Turner', 'Penelope Oakes'],
    relatedConcepts: [
      {
        slug: 'social-identity',
        title: 'Social Identity',
        relation: 'ความหมายของสมาชิกภาพที่ถูกทำให้เด่น',
      },
      {
        slug: 'conformity',
        title: 'Conformity',
        relation: 'การทำตาม prototype และ norm ของกลุ่ม',
      },
      {
        slug: 'attribution',
        title: 'Attribution',
        relation: 'การอธิบายพฤติกรรมของสมาชิกกลุ่ม',
      },
    ],
    relatedArticles: [],
    references: [ref.turnerSelfCategorization],
    commonMisunderstandings: [
      'Self-categorization ไม่ใช่เพียงการติดป้ายตนอย่างมีสติ',
      'Depersonalization ในทฤษฎีนี้ไม่ใช่อาการ dissociation',
    ],
    examples: [
      'คู่แข่งสองทีมอาจเห็นความต่างระหว่างกันชัดมาก แต่กลับร่วมมือทันทีเมื่อบริบททำให้ทั้งสองเป็นตัวแทนองค์กรเดียวกัน',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Self-Categorization คืออะไร',
    seoDescription:
      'Self-Categorization คือกระบวนการที่ระดับอัตลักษณ์ทางสังคมเด่นขึ้นและเปลี่ยนการรับรู้บรรทัดฐาน ตนเอง และผู้อื่น',
  }),
  defineConcept({
    id: 'concept-attribution-th',
    slug: 'attribution',
    title: 'Attribution',
    originalTerm: 'Attribution',
    thaiTerm: 'การอธิบายสาเหตุของพฤติกรรม',
    shortDefinition:
      'กระบวนการที่คนอนุมานว่าสิ่งใดเป็นสาเหตุของพฤติกรรมและเหตุการณ์ เช่น คุณลักษณะของบุคคล สถานการณ์ หรือความสัมพันธ์ระหว่างทั้งสอง',
    humanExplanation:
      'เราอธิบายพฤติกรรมอยู่เสมอ แม้มีข้อมูลไม่ครบ คำอธิบายเหล่านี้กำหนดว่าเราจะโกรธ เห็นใจ ลงโทษ หรือคาดหวังอะไรต่อไป',
    technicalExplanation:
      'Attribution research ศึกษา dispositional และ situational inference, covariation, correspondent inference และ biases ที่เกิดจากข้อมูล ความสนใจ แรงจูงใจ และวัฒนธรรม',
    category: 'social-psychology',
    tradition: 'Social Cognition',
    thinkers: ['Fritz Heider', 'Harold Kelley', 'Edward E. Jones'],
    relatedConcepts: [
      {
        slug: 'fundamental-attribution-error',
        title: 'Fundamental Attribution Error',
        relation: 'ความเอนเอียงต่อคำอธิบายเชิงบุคคล',
      },
      {
        slug: 'cognitive-dissonance',
        title: 'Cognitive Dissonance',
        relation: 'แรงจูงใจอาจเปลี่ยนการอธิบายการกระทำ',
      },
      {
        slug: 'projection',
        title: 'Projection',
        relation: 'แนวคิดต่างสำนักที่ไม่ควรใช้แทน attribution',
      },
    ],
    relatedArticles: [],
    references: [ref.heiderRelations, ref.rossIntuitivePsychologist],
    commonMisunderstandings: [
      'Attribution ไม่ใช่การค้นพบสาเหตุจริงโดยตรง แต่เป็นกระบวนการอนุมาน',
      'การอธิบายพฤติกรรมด้วยบุคลิกภาพไม่จำเป็นต้องแม่นกว่าคำอธิบายด้วยสถานการณ์',
    ],
    examples: [
      'เมื่อคนหนึ่งตอบข้อความช้า เราอาจสรุปว่าเขาไม่ใส่ใจ ทั้งที่สาเหตุอาจเป็นภาระงานหรือปัญหาที่เราไม่เห็น',
    ],
    difficulty: 'beginner',
    seoTitle: 'Attribution คืออะไรในจิตวิทยาสังคม',
    seoDescription:
      'Attribution คือกระบวนการอนุมานสาเหตุของพฤติกรรมจากบุคคลและสถานการณ์ ซึ่งมีผลต่ออารมณ์และการตัดสินผู้อื่น',
  }),
  defineConcept({
    id: 'concept-fundamental-attribution-error-th',
    slug: 'fundamental-attribution-error',
    title: 'Fundamental Attribution Error',
    originalTerm: 'Fundamental Attribution Error',
    thaiTerm: 'ความคลาดเคลื่อนในการให้น้ำหนักสาเหตุส่วนบุคคล',
    shortDefinition:
      'แนวโน้มในการอธิบายพฤติกรรมของผู้อื่นด้วยคุณลักษณะภายในมากเกินไป เมื่อเทียบกับแรงกดดันและข้อจำกัดของสถานการณ์',
    humanExplanation:
      'พฤติกรรมของคนอื่นเด่นต่อสายตา แต่บริบทที่ผลักให้เขาทำเช่นนั้นมักมองไม่เห็น เราจึงอาจตัดสินว่า “เขาเป็นคนแบบนั้น” เร็วกว่าการถามว่าสถานการณ์บังคับอะไรอยู่',
    technicalExplanation:
      'ปรากฏการณ์นี้เกี่ยวข้องกับ perceptual salience, correction failure และ cultural variation; คำว่า fundamental ถูกวิจารณ์เพราะขนาดและความทั่วไปขึ้นกับเงื่อนไข',
    category: 'social-psychology',
    tradition: 'Social Cognition',
    thinkers: ['Lee Ross', 'Edward E. Jones'],
    relatedConcepts: [
      {
        slug: 'attribution',
        title: 'Attribution',
        relation: 'กรอบใหญ่ของการอนุมานสาเหตุ',
      },
      {
        slug: 'social-identity',
        title: 'Social Identity',
        relation: 'สมาชิกภาพกลุ่มอาจกำหนดรูปแบบการอธิบาย',
      },
      {
        slug: 'projection',
        title: 'Projection',
        relation: 'คำอธิบายเชิงจิตพลวัตที่แตกต่าง',
      },
    ],
    relatedArticles: [],
    references: [ref.rossIntuitivePsychologist],
    commonMisunderstandings: [
      'ไม่ได้หมายความว่าคุณลักษณะส่วนบุคคลไม่มีผลต่อพฤติกรรม',
      'ความเอนเอียงนี้ไม่ได้เกิดเท่ากันในทุกวัฒนธรรมและทุกสถานการณ์',
    ],
    examples: [
      'เราอาจมองพนักงานที่พูดน้อยว่าไม่กระตือรือร้น โดยไม่เห็นว่าการประชุมลงโทษคนที่เสนอความเห็นต่างอย่างไร',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Fundamental Attribution Error คืออะไร',
    seoDescription:
      'Fundamental Attribution Error คือแนวโน้มให้น้ำหนักบุคลิกภาพของผู้อื่นมากกว่าสถานการณ์เมื่ออธิบายพฤติกรรม',
  }),
  defineConcept({
    id: 'concept-cognitive-dissonance-th',
    slug: 'cognitive-dissonance',
    title: 'Cognitive Dissonance',
    originalTerm: 'Cognitive Dissonance',
    thaiTerm: 'ความไม่สอดคล้องทางการรู้คิด',
    shortDefinition:
      'ภาวะตึงเครียดจากการมีความเชื่อ การกระทำ หรือข้อมูลที่ไม่สอดคล้องกัน ซึ่งกระตุ้นให้บุคคลลดความไม่สอดคล้องนั้น',
    humanExplanation:
      'เมื่อการกระทำขัดกับภาพที่เรามีต่อตนเอง เราอาจเปลี่ยนพฤติกรรม เปลี่ยนความเชื่อ เพิ่มเหตุผลสนับสนุน หรือหลีกเลี่ยงข้อมูลที่ทำให้ความขัดแย้งชัดขึ้น',
    technicalExplanation:
      'Dissonance theory ศึกษาความสัมพันธ์ระหว่าง cognitions และกระบวนการลด dissonance โดยงานต่อมาพิจารณาบทบาทของ choice, commitment, self-concept และ action orientation',
    category: 'social-psychology',
    tradition: 'Motivated Social Cognition',
    thinkers: ['Leon Festinger', 'Elliot Aronson'],
    relatedConcepts: [
      {
        slug: 'attribution',
        title: 'Attribution',
        relation: 'การสร้างคำอธิบายเพื่อลดความไม่สอดคล้อง',
      },
      {
        slug: 'conformity',
        title: 'Conformity',
        relation: 'แรงกดดันกลุ่มอาจสร้างหรือแก้ dissonance',
      },
      {
        slug: 'defense-mechanism',
        title: 'Defense Mechanism',
        relation: 'กรอบจิตวิเคราะห์ที่ต่างระดับการอธิบาย',
      },
    ],
    relatedArticles: [],
    references: [ref.festingerDissonance],
    commonMisunderstandings: [
      'Cognitive dissonance ไม่ใช่คำเรียกความสับสนหรือการมีสองความคิดเฉย ๆ',
      'คนไม่ได้ลด dissonance ด้วยการเปลี่ยนความเชื่อเสมอไป บางครั้งเปลี่ยนพฤติกรรมหรือความสำคัญของข้อมูล',
    ],
    examples: [
      'คนที่ให้คุณค่ากับสุขภาพแต่สูบบุหรี่อาจเลิกสูบ หรือบอกตนว่าความเครียดอันตรายกว่าเพื่อทำให้ความขัดแย้งลดลง',
    ],
    difficulty: 'beginner',
    seoTitle: 'Cognitive Dissonance คืออะไร',
    seoDescription:
      'Cognitive Dissonance คือความตึงเครียดจากความเชื่อและการกระทำที่ไม่สอดคล้องกัน ซึ่งกระตุ้นการเปลี่ยนเหตุผล ความเชื่อ หรือพฤติกรรม',
  }),
  defineConcept({
    id: 'concept-conformity-th',
    slug: 'conformity',
    title: 'Conformity',
    originalTerm: 'Conformity',
    thaiTerm: 'การคล้อยตามกลุ่ม',
    shortDefinition:
      'การเปลี่ยนการตัดสิน ความเชื่อ หรือพฤติกรรมให้สอดคล้องกับบรรทัดฐานหรือคำตอบของกลุ่ม',
    humanExplanation:
      'คนอาจคล้อยตามเพราะคิดว่ากลุ่มมีข้อมูลดีกว่า เพราะไม่ต้องการถูกปฏิเสธ หรือเพราะมองบรรทัดฐานกลุ่มเป็นส่วนหนึ่งของตัวตน',
    technicalExplanation:
      'Social psychology แยก informational และ normative influence พร้อมศึกษาผลของ unanimity, group size, task ambiguity, public response และ identification',
    category: 'social-psychology',
    tradition: 'Experimental Social Psychology',
    thinkers: ['Solomon Asch', 'Muzafer Sherif', 'John C. Turner'],
    relatedConcepts: [
      {
        slug: 'social-identity',
        title: 'Social Identity',
        relation: 'สมาชิกภาพทำให้ norm มีความหมาย',
      },
      {
        slug: 'self-categorization',
        title: 'Self-Categorization',
        relation: 'กำหนดว่ากลุ่มใดเป็นแหล่งอ้างอิง',
      },
      {
        slug: 'cognitive-dissonance',
        title: 'Cognitive Dissonance',
        relation: 'ความต่างจากกลุ่มอาจสร้างความตึงเครียด',
      },
    ],
    relatedArticles: [],
    references: [ref.aschConformity, ref.turnerSelfCategorization],
    commonMisunderstandings: [
      'Conformity ไม่ได้เกิดเฉพาะกับคนอ่อนแอหรือไม่มีความคิดของตน',
      'การเห็นด้วยกับกลุ่มอาจมาจากข้อมูลใหม่ที่สมเหตุผล ไม่ใช่แรงกดดันเสมอไป',
    ],
    examples: [
      'คนอาจตอบคำถามผิดตามคนส่วนใหญ่ในที่สาธารณะ แม้ยังสงสัยอยู่ภายใน เพราะไม่ต้องการโดดเด่นจากกลุ่ม',
    ],
    difficulty: 'beginner',
    seoTitle: 'Conformity คืออะไรในจิตวิทยาสังคม',
    seoDescription:
      'Conformity คือการคล้อยตามบรรทัดฐานหรือคำตอบของกลุ่มจาก informational, normative หรือ identity-based influence',
  }),
];

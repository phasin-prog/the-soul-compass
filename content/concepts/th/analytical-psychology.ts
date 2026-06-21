import { defineConcept } from '@/content/concepts/helpers';
import { conceptReferences as ref } from '@/content/concepts/references';

export const analyticalPsychologyConcepts = [
  defineConcept({
    id: 'concept-ego-jung-th',
    slug: 'ego',
    title: 'Ego',
    originalTerm: 'Ego',
    thaiTerm: 'อัตตา',
    shortDefinition:
      'ศูนย์กลางของจิตสำนึกและความรู้สึกต่อเนื่องว่า “ฉันคือใคร” แต่ไม่ใช่ทั้งหมดของ Psyche',
    humanExplanation:
      'Ego คือจุดที่ประสบการณ์ ความทรงจำ และการตัดสินใจถูกรวมเป็นเรื่องราวของตัวเรา มันจำเป็นต่อการดำเนินชีวิต แต่มีขอบเขตและมักไม่เห็นสิ่งที่อยู่นอกภาพของตนเอง',
    technicalExplanation:
      'ในจิตวิทยาวิเคราะห์ Ego เป็น complex ที่ทำหน้าที่เป็นศูนย์กลางของ consciousness และมีความสัมพันธ์กับ Self ซึ่งเป็นภาพรวมเชิงสมมุติฐานของ Psyche ทั้งหมด',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    thinkers: ['Carl G. Jung'],
    relatedConcepts: [
      { slug: 'self', title: 'Self', relation: 'ขอบเขตที่กว้างกว่า Ego' },
      { slug: 'persona', title: 'Persona', relation: 'ภาพที่ Ego ใช้ในสังคม' },
      { slug: 'shadow', title: 'Shadow', relation: 'สิ่งที่ Ego ไม่รวมเป็นตน' },
      {
        slug: 'consciousness',
        title: 'Consciousness',
        relation: 'สนามที่ Ego เป็นศูนย์กลาง',
      },
    ],
    relatedArticles: [
      'freud-jung-ego',
      'shadow-is-not-just-the-dark-side',
    ],
    references: [ref.jungTwoEssays, ref.jungAion],
    commonMisunderstandings: [
      'Ego ใน Jung ไม่ได้หมายถึงความหลงตัวเองหรือความเห็นแก่ตัว',
      'Ego ไม่ใช่ Self และไม่ใช่ Psyche ทั้งหมด',
    ],
    examples: [
      'เมื่อเราพูดว่า “ฉันเป็นคนมีเหตุผล” เรากำลังอธิบายอัตลักษณ์ที่ Ego รักษาไว้ แม้ประสบการณ์บางส่วนอาจไม่เข้ากับภาพนั้น',
    ],
    difficulty: 'beginner',
    seoTitle: 'Ego ในจิตวิทยาของ Jung คืออะไร',
    seoDescription:
      'Ego คือศูนย์กลางของจิตสำนึกในจิตวิทยาวิเคราะห์ แต่ไม่ใช่ทั้งหมดของ Psyche เรียนรู้ความสัมพันธ์กับ Self, Persona และ Shadow',
  }),
  defineConcept({
    id: 'concept-persona-th',
    slug: 'persona',
    title: 'Persona',
    originalTerm: 'Persona',
    thaiTerm: 'หน้ากากทางสังคม',
    shortDefinition:
      'รูปแบบที่บุคคลนำเสนอตนต่อโลกเพื่อทำหน้าที่ในบทบาท ความคาดหวัง และความสัมพันธ์ทางสังคม',
    humanExplanation:
      'Persona ไม่ใช่ของปลอมเสมอไป แต่เป็นส่วนที่เราเลือกใช้ให้เหมาะกับสถานการณ์ ปัญหาเกิดเมื่อเรายึดภาพนั้นจนไม่เหลือระยะห่างระหว่างบทบาทกับชีวิตภายใน',
    technicalExplanation:
      'Persona เป็น functional complex ที่เกิดจากการประนีประนอมระหว่างความต้องการของปัจเจกกับข้อกำหนดของสังคม และมักมีความสัมพันธ์เชิงชดเชยกับ Shadow',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    thinkers: ['Carl G. Jung'],
    relatedConcepts: [
      { slug: 'ego', title: 'Ego', relation: 'ผู้ระบุตัวกับบทบาท' },
      { slug: 'shadow', title: 'Shadow', relation: 'สิ่งที่บทบาทไม่ยอมให้ปรากฏ' },
      {
        slug: 'individuation',
        title: 'Individuation',
        relation: 'กระบวนการคลายการยึดติดกับบทบาท',
      },
    ],
    relatedArticles: ['shadow-is-not-just-the-dark-side'],
    references: [ref.jungTwoEssays],
    commonMisunderstandings: [
      'Persona ไม่ได้แปลว่าบุคคลเสแสร้งทุกครั้งที่ปรับตัวตามบริบท',
    ],
    examples: [
      'ผู้บริหารอาจต้องแสดงความมั่นคงในที่ประชุม แม้ภายในกำลังลังเล Persona คือรูปแบบการทำหน้าที่ ไม่ใช่ข้อพิสูจน์ว่าอารมณ์ภายในไม่มีอยู่',
    ],
    difficulty: 'beginner',
    seoTitle: 'Persona คืออะไรในจิตวิทยาของ Jung',
    seoDescription:
      'Persona คือหน้ากากทางสังคมที่ช่วยให้บุคคลทำหน้าที่ แต่การระบุตัวกับบทบาทมากเกินไปอาจแยกเราจากชีวิตภายใน',
  }),
  defineConcept({
    id: 'concept-shadow-th',
    slug: 'shadow',
    title: 'Shadow',
    originalTerm: 'Shadow',
    thaiTerm: 'เงา',
    shortDefinition:
      'ส่วนของบุคลิกภาพที่ Ego ไม่ยอมรับว่าเป็นของตน ทั้งแรงผลักที่รับยากและศักยภาพที่ถูกละทิ้ง',
    humanExplanation:
      'Shadow ก่อตัวจากสิ่งที่เราเรียนรู้ว่าห้ามเป็นหรือไม่ควรแสดง มันจึงอาจรวมความโกรธ ความอิจฉา ความกล้า ความอ่อนโยน หรือความสามารถที่ไม่เข้ากับภาพของตัวเอง',
    technicalExplanation:
      'Shadow เป็นองค์ประกอบเชิงบุคคลของ unconscious ที่อยู่ใกล้ Ego และมักปรากฏผ่าน projection อารมณ์รุนแรง และรูปแบบพฤติกรรมที่ Ego อธิบายไม่ได้',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    thinkers: ['Carl G. Jung', 'Marie-Louise von Franz'],
    relatedConcepts: [
      { slug: 'persona', title: 'Persona', relation: 'คู่ชดเชยของภาพทางสังคม' },
      { slug: 'projection', title: 'Projection', relation: 'ทางที่ Shadow ปรากฏ' },
      {
        slug: 'personal-unconscious',
        title: 'Personal Unconscious',
        relation: 'บริเวณที่เนื้อหา Shadow ถูกแยกไว้',
      },
      {
        slug: 'individuation',
        title: 'Individuation',
        relation: 'กระบวนการรับผิดชอบต่อ Shadow',
      },
    ],
    relatedArticles: ['shadow-is-not-just-the-dark-side'],
    references: [ref.jungAion, ref.jungArchetypes],
    commonMisunderstandings: [
      'Shadow ไม่ใช่ชื่อรวมของความชั่วร้ายทั้งหมด',
      'การบูรณาการ Shadow ไม่ได้หมายถึงการทำตามแรงผลักทุกอย่าง',
    ],
    examples: [
      'คนที่ยึดว่าตนไม่เคยโกรธอาจตำหนิความก้าวร้าวของผู้อื่นอย่างรุนแรง หรือระเบิดอารมณ์เมื่อการควบคุมอ่อนลง',
    ],
    difficulty: 'beginner',
    seoTitle: 'Shadow คืออะไร: เงาในจิตวิทยาของ Jung',
    seoDescription:
      'Shadow คือส่วนที่ Ego ไม่ยอมรับ ทั้งด้านที่รับยากและศักยภาพที่ถูกละทิ้ง พร้อมความสัมพันธ์กับ Persona และ Projection',
  }),
  defineConcept({
    id: 'concept-self-jung-th',
    slug: 'self',
    title: 'Self',
    originalTerm: 'Self',
    thaiTerm: 'ตัวตนทั้งหมด',
    shortDefinition:
      'หลักการจัดระเบียบและภาพรวมของ Psyche ที่ครอบคลุมทั้งจิตสำนึกและจิตไร้สำนึก',
    humanExplanation:
      'Self ชี้ไปยังความเป็นทั้งหมดที่กว้างกว่าภาพ “ฉัน” ของ Ego มันไม่ใช่บุคลิกที่สมบูรณ์แบบ แต่เป็นแนวคิดสำหรับอธิบายแรงผลักให้ชีวิตส่วนต่าง ๆ เข้าสู่ความสัมพันธ์กัน',
    technicalExplanation:
      'Jung อธิบาย Self ทั้งในฐานะ archetype of wholeness และจุดศูนย์กลางเชิงสมมุติฐานของ Psyche โดย Ego มีความสัมพันธ์กับ Self แต่ไม่อาจเท่ากับ Self',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    thinkers: ['Carl G. Jung', 'Erich Neumann'],
    relatedConcepts: [
      { slug: 'ego', title: 'Ego', relation: 'ศูนย์กลางของ consciousness' },
      {
        slug: 'individuation',
        title: 'Individuation',
        relation: 'กระบวนการสร้างความสัมพันธ์ Ego–Self',
      },
      { slug: 'shadow', title: 'Shadow', relation: 'ส่วนที่ต้องถูกยอมรับในความเป็นทั้งหมด' },
    ],
    relatedArticles: ['freud-jung-ego'],
    references: [ref.jungAion, ref.jungArchetypes],
    commonMisunderstandings: [
      'Self ไม่ใช่ “ตัวตนแท้จริง” แบบคำขวัญที่รอให้ค้นพบครั้งเดียว',
      'Self ไม่เท่ากับ Ego ที่ใหญ่ขึ้นหรือมั่นใจขึ้น',
    ],
    examples: [
      'ช่วงวิกฤตอาจบังคับให้บุคคลทบทวนอัตลักษณ์เดิม และสร้างความสัมพันธ์ใหม่กับความต้องการหรือคุณค่าที่เคยถูกละเลย',
    ],
    difficulty: 'advanced',
    seoTitle: 'Self ในจิตวิทยาวิเคราะห์ของ Jung',
    seoDescription:
      'Self คือภาพรวมและหลักการจัดระเบียบของ Psyche ซึ่งกว้างกว่า Ego และมีบทบาทสำคัญในกระบวนการ Individuation',
  }),
  defineConcept({
    id: 'concept-complex-th',
    slug: 'complex',
    title: 'Complex',
    originalTerm: 'Complex',
    thaiTerm: 'ปมเชิงอารมณ์',
    shortDefinition:
      'กลุ่มความคิด ความทรงจำ ภาพ และอารมณ์ที่รวมตัวรอบแกนความหมายหนึ่งและมีความเป็นอิสระบางส่วนจาก Ego',
    humanExplanation:
      'Complex ทำให้เราตอบสนองบางสถานการณ์แรงหรือซ้ำกว่าที่ตั้งใจ เพราะเหตุการณ์ปัจจุบันไปกระตุ้นเครือข่ายประสบการณ์เดิมที่มีประจุทางอารมณ์',
    technicalExplanation:
      'Complex เป็น affectively toned constellation of psychic contents ซึ่งสามารถรบกวนการเชื่อมโยง ความจำ การตัดสินใจ และความรู้สึกเป็นเจ้าของการกระทำของ Ego',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    thinkers: ['Carl G. Jung'],
    relatedConcepts: [
      {
        slug: 'personal-unconscious',
        title: 'Personal Unconscious',
        relation: 'พื้นที่ของเนื้อหา complex',
      },
      { slug: 'ego', title: 'Ego', relation: 'complex ศูนย์กลางของ consciousness' },
      { slug: 'projection', title: 'Projection', relation: 'ทางที่ complex จัดรูปการรับรู้' },
    ],
    relatedArticles: [],
    references: [ref.jungDynamics],
    commonMisunderstandings: [
      'Complex ไม่ได้แปลว่าโรคหรือความผิดปกติเสมอไป ทุกคนมี complex',
    ],
    examples: [
      'คำวิจารณ์เล็กน้อยจากหัวหน้าอาจกระตุ้นความรู้สึกไร้ค่าที่เชื่อมกับประสบการณ์เดิม จนปฏิกิริยารุนแรงกว่าสถานการณ์ปัจจุบัน',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Complex คืออะไรในจิตวิทยาของ Jung',
    seoDescription:
      'Complex คือกลุ่มเนื้อหาทางจิตที่มีประจุอารมณ์และทำงานกึ่งอิสระจาก Ego ช่วยอธิบายปฏิกิริยาที่รุนแรงและเกิดซ้ำ',
  }),
  defineConcept({
    id: 'concept-projection-th',
    slug: 'projection',
    title: 'Projection',
    originalTerm: 'Projection',
    thaiTerm: 'การฉายภาพ',
    shortDefinition:
      'กระบวนการที่คุณสมบัติหรือความหมายภายในถูกประสบเสมือนเป็นคุณสมบัติของบุคคลหรือวัตถุภายนอก',
    humanExplanation:
      'Projection ไม่ได้หมายความว่าสิ่งที่เราเห็นในคนอื่นไม่มีอยู่จริง แต่หมายถึงการรับรู้ถูกเติมด้วยเนื้อหาของเราเองจนความเข้มและความหมายเกินข้อมูลตรงหน้า',
    technicalExplanation:
      'ในจิตวิทยาวิเคราะห์ projection เป็นกลไกอัตโนมัติที่เนื้อหา unconscious ถูกวางไว้บน object และคงอยู่จนบุคคลสามารถถอน projection และรับรู้ส่วนของตน',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    thinkers: ['Carl G. Jung'],
    relatedConcepts: [
      { slug: 'shadow', title: 'Shadow', relation: 'เนื้อหาที่มักถูกฉาย' },
      { slug: 'complex', title: 'Complex', relation: 'เครือข่ายที่กำหนดความหมายของ object' },
      { slug: 'persona', title: 'Persona', relation: 'ภาพตนที่ผลักคุณสมบัติบางอย่างออก' },
    ],
    relatedArticles: ['shadow-is-not-just-the-dark-side'],
    references: [ref.jungDynamics, ref.jungAion],
    commonMisunderstandings: [
      'การเรียกสิ่งหนึ่งว่า projection ไม่ได้พิสูจน์ว่าอีกฝ่ายไม่มีคุณสมบัตินั้น',
    ],
    examples: [
      'ความชื่นชมบุคคลหนึ่งอย่างไร้ข้อจำกัดอาจมีทั้งข้อมูลจริงและศักยภาพของเราที่ถูกวางไว้บนเขา',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Projection คืออะไรในจิตวิทยาเชิงลึก',
    seoDescription:
      'Projection คือการที่เนื้อหาภายในจัดรูปการรับรู้บุคคลภายนอก เรียนรู้ความสัมพันธ์กับ Shadow, Complex และการถอนภาพฉาย',
  }),
  defineConcept({
    id: 'concept-individuation-th',
    slug: 'individuation',
    title: 'Individuation',
    originalTerm: 'Individuation',
    thaiTerm: 'กระบวนการเป็นปัจเจกอย่างเป็นทั้งหมด',
    shortDefinition:
      'กระบวนการระยะยาวที่ Ego สร้างความสัมพันธ์กับส่วนต่าง ๆ ของ Psyche และพัฒนาความเป็นบุคคลที่แยกจากการเหมารวมของกลุ่ม',
    humanExplanation:
      'Individuation ไม่ใช่การเป็นคนพิเศษหรือแยกตัวจากสังคม แต่เป็นการรับผิดชอบต่อรูปแบบภายในของตน โดยไม่หลบหลังบทบาทหรือคำตอบสำเร็จรูป',
    technicalExplanation:
      'กระบวนการนี้เกี่ยวข้องกับการแยกความแตกต่างของ Ego จาก Persona การเผชิญ Shadow การถอน projection และการปรับความสัมพันธ์กับ Self',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    thinkers: ['Carl G. Jung', 'Marie-Louise von Franz'],
    relatedConcepts: [
      { slug: 'self', title: 'Self', relation: 'หลักการของความเป็นทั้งหมด' },
      { slug: 'shadow', title: 'Shadow', relation: 'เนื้อหาที่ต้องรับผิดชอบ' },
      { slug: 'persona', title: 'Persona', relation: 'บทบาทที่ต้องคลายการยึดติด' },
      { slug: 'projection', title: 'Projection', relation: 'สิ่งที่ต้องถอนกลับมาพิจารณา' },
    ],
    relatedArticles: ['shadow-is-not-just-the-dark-side'],
    references: [ref.jungTwoEssays, ref.jungAion],
    commonMisunderstandings: [
      'Individuation ไม่ใช่ self-improvement ที่มุ่งเพิ่มประสิทธิภาพอย่างเดียว',
      'กระบวนการนี้ไม่จบด้วยการไม่มีความขัดแย้ง',
    ],
    examples: [
      'บุคคลอาจเลิกเลือกอาชีพเพียงเพื่อรักษาภาพที่ครอบครัวให้คุณค่า แล้วค่อย ๆ สร้างรูปแบบชีวิตที่รับทั้งหน้าที่และแรงเรียกร้องภายใน',
    ],
    difficulty: 'advanced',
    seoTitle: 'Individuation คืออะไรในจิตวิทยาของ Jung',
    seoDescription:
      'Individuation คือกระบวนการสร้างความสัมพันธ์ระหว่าง Ego, Shadow, Persona และ Self เพื่อพัฒนาความเป็นบุคคลที่เป็นทั้งหมดขึ้น',
  }),
  defineConcept({
    id: 'concept-personal-unconscious-th',
    slug: 'personal-unconscious',
    title: 'Personal Unconscious',
    originalTerm: 'Personal Unconscious',
    thaiTerm: 'จิตไร้สำนึกส่วนบุคคล',
    shortDefinition:
      'ชั้นของจิตไร้สำนึกที่ประกอบด้วยประสบการณ์ซึ่งเคยรับรู้แต่ถูกลืม กดไว้ หรือรับรู้ไม่ชัด รวมถึง complex ของบุคคล',
    humanExplanation:
      'เนื้อหาใน Personal Unconscious เชื่อมกับประวัติชีวิตเฉพาะของเรา ไม่ว่าจะเป็นความทรงจำที่หลีกเลี่ยง ความรู้สึกที่ไม่เคยตั้งชื่อ หรือรูปแบบที่เกิดซ้ำ',
    technicalExplanation:
      'Jung แยก personal unconscious ออกจาก collective unconscious โดยชั้นแรกมีแหล่งกำเนิดหลักจากประสบการณ์ปัจเจกและจัดโครงสร้างผ่าน complexes',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    thinkers: ['Carl G. Jung'],
    relatedConcepts: [
      { slug: 'complex', title: 'Complex', relation: 'หน่วยจัดระเบียบสำคัญ' },
      { slug: 'shadow', title: 'Shadow', relation: 'เนื้อหาที่ Ego ปฏิเสธ' },
      { slug: 'unconscious', title: 'Unconscious', relation: 'คำกว้างในจิตวิเคราะห์' },
    ],
    relatedArticles: ['shadow-is-not-just-the-dark-side'],
    references: [ref.jungArchetypes, ref.jungDynamics],
    commonMisunderstandings: [
      'Personal Unconscious ไม่ได้เป็นเพียงคลังความทรงจำที่ลืม แต่มีการจัดรูปและอิทธิพลเชิงพลวัต',
    ],
    examples: [
      'กลิ่นบางอย่างอาจทำให้เกิดอารมณ์เข้มข้นก่อนนึกออกว่าเชื่อมกับเหตุการณ์ในวัยเด็ก',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Personal Unconscious คืออะไร',
    seoDescription:
      'Personal Unconscious คือจิตไร้สำนึกส่วนบุคคลที่รวมความทรงจำ ความรู้สึก และ Complex จากประวัติชีวิตเฉพาะของบุคคล',
  }),
];

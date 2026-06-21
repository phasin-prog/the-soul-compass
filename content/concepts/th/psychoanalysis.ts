import { defineConcept } from '@/content/concepts/helpers';
import { conceptReferences as ref } from '@/content/concepts/references';

export const psychoanalysisConcepts = [
  defineConcept({
    id: 'concept-id-th',
    slug: 'id',
    title: 'Id',
    originalTerm: 'Id',
    thaiTerm: 'อิด',
    shortDefinition:
      'ด้านของเครื่องมือทางจิตในแบบจำลอง Freud ที่เป็นแหล่งของแรงขับและทำงานตามกระบวนการปฐมภูมิ',
    humanExplanation:
      'Id ไม่ใช่ “ตัวร้ายในใจ” แต่เป็นชื่อสำหรับแรงเรียกร้องที่ยังไม่จัดรูปตามเหตุผล เวลา หรือข้อจำกัดของโลกภายนอก',
    technicalExplanation:
      'ใน structural model, Id เป็นส่วนที่เก่าแก่และเป็น unconscious ทั้งหมด พลังจาก drives ถูกแสดงผ่าน wishful impulses ซึ่ง Ego ต้องจัดการกับ reality และ Superego',
    category: 'psychoanalysis',
    tradition: 'Freudian Psychoanalysis',
    thinkers: ['Sigmund Freud'],
    relatedConcepts: [
      { slug: 'ego-freud', title: 'Ego (Freud)', relation: 'ตัวกลางกับ reality' },
      { slug: 'superego', title: 'Superego', relation: 'แหล่งข้อห้ามและอุดมคติ' },
      { slug: 'drive', title: 'Drive', relation: 'แรงเรียกร้องที่ Id รองรับ' },
      { slug: 'unconscious', title: 'Unconscious', relation: 'มิติการทำงานหลัก' },
    ],
    relatedArticles: ['freud-jung-ego'],
    references: [ref.freudEgoId],
    commonMisunderstandings: [
      'Id ไม่ใช่บุคลิกอีกตัวหนึ่งที่อยู่ในสมอง และไม่เท่ากับความชั่วร้าย',
    ],
    examples: [
      'ความอยากตอบโต้ทันทีโดยไม่คำนึงถึงผลลัพธ์แสดงแรงเรียกร้องแบบปฐมภูมิ แต่พฤติกรรมจริงยังผ่านการทำงานของ Ego',
    ],
    difficulty: 'beginner',
    seoTitle: 'Id คืออะไรในทฤษฎีของ Freud',
    seoDescription:
      'Id คือแหล่งแรงขับใน structural model ของ Freud ทำงานแบบ unconscious และสัมพันธ์กับ Ego, Superego และ Drive',
  }),
  defineConcept({
    id: 'concept-ego-freud-th',
    slug: 'ego-freud',
    title: 'Ego (Freud)',
    originalTerm: 'Ego',
    thaiTerm: 'อัตตาในทฤษฎี Freud',
    shortDefinition:
      'ระบบที่ประสานแรงเรียกร้องจาก Id, Superego, ร่างกาย และโลกภายนอก พร้อมใช้ defense เพื่อจัดการความขัดแย้ง',
    humanExplanation:
      'Ego คือการทำงานที่ช่วยให้เราเลื่อนการตอบสนอง ประเมินความจริง และหาทางประนีประนอม มันไม่ได้มีสติทั้งหมดและไม่ได้หมายถึงความมั่นใจในตนเอง',
    technicalExplanation:
      'Freudian Ego พัฒนาจาก Id ผ่านการติดต่อกับ reality มีทั้ง conscious, preconscious และ unconscious operations รวมถึง signal anxiety และ defense mechanisms',
    category: 'psychoanalysis',
    tradition: 'Freudian Psychoanalysis',
    thinkers: ['Sigmund Freud', 'Anna Freud'],
    relatedConcepts: [
      { slug: 'id', title: 'Id', relation: 'แรงขับที่ต้องจัดการ' },
      { slug: 'superego', title: 'Superego', relation: 'ข้อห้ามและอุดมคติ' },
      { slug: 'defense-mechanism', title: 'Defense Mechanism', relation: 'วิธีจัดการความขัดแย้ง' },
      { slug: 'ego', title: 'Ego (Jung)', relation: 'คำเดียวกันในอีกระบบทฤษฎี' },
    ],
    relatedArticles: ['freud-jung-ego'],
    references: [ref.freudEgoId, ref.freudAnxiety],
    commonMisunderstandings: [
      'Ego ของ Freud ไม่ได้มีสติทั้งหมด',
      '“Ego ใหญ่” ในภาษาทั่วไปไม่ใช่ความหมายทาง metapsychology',
    ],
    examples: [
      'เมื่ออยากลาออกทันทีแต่เลือกประเมินเงินสำรอง ความเสี่ยง และทางเลือกก่อน นั่นแสดงการประสานแรงผลักกับ reality',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Ego ในทฤษฎีของ Freud คืออะไร',
    seoDescription:
      'Ego ของ Freud เป็นระบบประสาน Id, Superego และโลกภายนอก รวมทั้งใช้ Defense Mechanism เพื่อจัดการความขัดแย้ง',
  }),
  defineConcept({
    id: 'concept-superego-th',
    slug: 'superego',
    title: 'Superego',
    originalTerm: 'Superego',
    thaiTerm: 'อภิอัตตา',
    shortDefinition:
      'โครงสร้างทางจิตที่รวมข้อห้าม อุดมคติ การตัดสินตน และร่องรอยของอำนาจที่ถูกทำให้เป็นภายใน',
    humanExplanation:
      'Superego ไม่ใช่เพียง “มโนธรรมที่ดี” มันอาจช่วยกำกับพฤติกรรม แต่อาจลงโทษอย่างรุนแรงและเรียกร้องมาตรฐานที่เป็นไปไม่ได้',
    technicalExplanation:
      'ใน Freud, Superego ก่อตัวผ่าน identification และการคลี่คลาย Oedipal relations ประกอบด้วย prohibitive และ ego-ideal functions ซึ่งทำงานได้ทั้ง conscious และ unconscious',
    category: 'psychoanalysis',
    tradition: 'Freudian Psychoanalysis',
    thinkers: ['Sigmund Freud', 'Melanie Klein'],
    relatedConcepts: [
      { slug: 'ego-freud', title: 'Ego (Freud)', relation: 'เป้าหมายของการตัดสิน' },
      { slug: 'id', title: 'Id', relation: 'แรงขับที่ถูกห้ามหรือควบคุม' },
      { slug: 'repression', title: 'Repression', relation: 'การกีดกันเนื้อหาที่รับไม่ได้' },
    ],
    relatedArticles: ['freud-jung-ego'],
    references: [ref.freudEgoId],
    commonMisunderstandings: [
      'Superego ไม่เท่ากับศีลธรรมที่มีวุฒิภาวะ และอาจมีความโหดร้ายสูง',
    ],
    examples: [
      'หลังทำผิดเล็กน้อย บุคคลอาจวิจารณ์ตนด้วยถ้อยคำรุนแรงเกินเหตุ ราวกับความผิดนั้นพิสูจน์ว่าตนไม่มีคุณค่า',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Superego คืออะไรในจิตวิเคราะห์',
    seoDescription:
      'Superego คือโครงสร้างของข้อห้าม อุดมคติ และการตัดสินตนในทฤษฎี Freud ซึ่งอาจทั้งกำกับและลงโทษ Ego',
  }),
  defineConcept({
    id: 'concept-repression-th',
    slug: 'repression',
    title: 'Repression',
    originalTerm: 'Repression',
    thaiTerm: 'การเก็บกด',
    shortDefinition:
      'กระบวนการที่ตัวแทนของแรงขับหรือความคิดซึ่งสร้างความขัดแย้งถูกกันออกจากจิตสำนึก แต่ยังคงทำงานทางอ้อม',
    humanExplanation:
      'สิ่งที่ถูกเก็บกดไม่ได้ถูกลบ มันอาจกลับมาในความฝัน อาการ ความผิดพลาดทางภาษา หรือรูปแบบความสัมพันธ์ที่บุคคลไม่เข้าใจ',
    technicalExplanation:
      'Freud แยก primal repression ออกจาก repression proper และอธิบาย return of the repressed ผ่าน derivatives ที่ผ่านการบิดรูปและการประนีประนอม',
    category: 'psychoanalysis',
    tradition: 'Freudian Psychoanalysis',
    thinkers: ['Sigmund Freud'],
    relatedConcepts: [
      { slug: 'unconscious', title: 'Unconscious', relation: 'ระบบที่เนื้อหาถูกกีดกัน' },
      { slug: 'defense-mechanism', title: 'Defense Mechanism', relation: 'Repression เป็นกลไกหลักชนิดหนึ่ง' },
      { slug: 'drive', title: 'Drive', relation: 'แรงเรียกร้องที่ตัวแทนถูกกดไว้' },
    ],
    relatedArticles: [],
    references: [ref.freudRepression, ref.freudUnconscious],
    commonMisunderstandings: [
      'Repression ไม่เหมือนการตั้งใจไม่คิดหรือการซ่อนข้อมูลอย่างมีสติ',
    ],
    examples: [
      'บุคคลอาจจำรายละเอียดเหตุการณ์ได้แต่เข้าถึงอารมณ์ที่เกี่ยวข้องไม่ได้ ขณะที่อารมณ์นั้นกลับปรากฏในอาการหรือความฝัน',
    ],
    difficulty: 'intermediate',
    seoTitle: 'Repression คืออะไร: การเก็บกดใน Freud',
    seoDescription:
      'Repression คือการกีดกันตัวแทนของแรงขับออกจากจิตสำนึก โดยเนื้อหายังกลับมาทางอ้อมผ่านความฝัน อาการ และความผิดพลาด',
  }),
  defineConcept({
    id: 'concept-defense-mechanism-th',
    slug: 'defense-mechanism',
    title: 'Defense Mechanism',
    originalTerm: 'Defense Mechanism',
    thaiTerm: 'กลไกป้องกันทางจิต',
    shortDefinition:
      'รูปแบบการทำงานที่ช่วยลดความวิตกกังวลหรือจัดการความขัดแย้ง โดยเปลี่ยนวิธีที่แรงผลัก ความรู้สึก หรือความจริงถูกรับรู้',
    humanExplanation:
      'Defense ช่วยให้ระบบจิตทนต่อสิ่งที่ยากเกินไปในขณะหนึ่ง ปัญหาไม่ได้อยู่ที่มี defense แต่อยู่ที่ความแข็งตัว ต้นทุน และการใช้ซ้ำโดยไม่รับรู้',
    technicalExplanation:
      'Defense mechanisms เป็น unconscious Ego operations เช่น repression, denial, displacement, projection และ reaction formation ซึ่งจัดการ signal anxiety และ compromise formations',
    category: 'psychoanalysis',
    tradition: 'Ego Psychology / Psychoanalysis',
    thinkers: ['Sigmund Freud', 'Anna Freud', 'George E. Vaillant'],
    relatedConcepts: [
      { slug: 'ego-freud', title: 'Ego (Freud)', relation: 'ระบบที่ดำเนิน defense' },
      { slug: 'repression', title: 'Repression', relation: 'กลไกพื้นฐาน' },
      { slug: 'defense-field', title: 'Defense Field', relation: 'การขยายแนวคิดใน TPDT' },
    ],
    relatedArticles: ['what-is-tpdt'],
    references: [ref.freudAnxiety, ref.annaFreudDefense],
    commonMisunderstandings: [
      'Defense ไม่ใช่การโกหกอย่างจงใจเสมอไป',
      'กลไกเดียวกันอาจมีหน้าที่ต่างกันตามบริบทและระดับความยืดหยุ่น',
    ],
    examples: [
      'คนที่รู้สึกโกรธเพื่อนร่วมงานอาจกลับไปวิจารณ์คนในบ้านแทน นี่เป็น displacement มากกว่าการเลือกอย่างมีสติ',
    ],
    difficulty: 'beginner',
    seoTitle: 'Defense Mechanism คืออะไร',
    seoDescription:
      'Defense Mechanism คือการทำงานของ Ego ที่ลดความวิตกกังวลและจัดการความขัดแย้ง เช่น Repression, Denial และ Displacement',
  }),
  defineConcept({
    id: 'concept-drive-th',
    slug: 'drive',
    title: 'Drive',
    originalTerm: 'Trieb / Drive',
    thaiTerm: 'แรงขับ',
    shortDefinition:
      'แนวคิดชายแดนระหว่างกายกับจิตที่แสดงข้อเรียกร้องจากความตึงเครียดของร่างกายต่อการทำงานทางจิต',
    humanExplanation:
      'Drive ไม่ใช่สัญชาตญาณที่มีเป้าหมายตายตัว แต่มองว่าความตึงเครียดถูกแปลเป็นแรงเรียกร้องซึ่งหา object และรูปแบบการตอบสนองได้หลายทาง',
    technicalExplanation:
      'Freud อธิบาย drive ผ่าน source, pressure, aim และ object โดย object เปลี่ยนได้ และ drive representatives เข้าสู่การจัดรูปของ fantasy, symptom และ defense',
    category: 'psychoanalysis',
    tradition: 'Freudian Psychoanalysis',
    thinkers: ['Sigmund Freud'],
    relatedConcepts: [
      { slug: 'id', title: 'Id', relation: 'แหล่งพลังของ drive ใน structural model' },
      { slug: 'repression', title: 'Repression', relation: 'กระทำต่อตัวแทนของ drive' },
      { slug: 'desire', title: 'Desire', relation: 'แนวคิดที่ Lacan แยกจาก need และ demand' },
    ],
    relatedArticles: [],
    references: [ref.freudBeyondPleasure],
    commonMisunderstandings: [
      'Drive ไม่ใช่ instinct แบบโปรแกรมพฤติกรรมสำเร็จรูป',
    ],
    examples: [
      'ความต้องการการยอมรับอาจผูกกับ object และกิจกรรมต่างกันในแต่ละช่วงชีวิต โดยไม่ลดเหลือความต้องการทางชีวภาพตรง ๆ',
    ],
    difficulty: 'advanced',
    seoTitle: 'Drive คืออะไรในทฤษฎีของ Freud',
    seoDescription:
      'Drive หรือ Trieb คือแนวคิดชายแดนกาย–จิตใน Freud ประกอบด้วย source, pressure, aim และ object ที่เปลี่ยนแปลงได้',
  }),
  defineConcept({
    id: 'concept-unconscious-freud-th',
    slug: 'unconscious',
    title: 'Unconscious',
    originalTerm: 'The Unconscious',
    thaiTerm: 'จิตไร้สำนึก',
    shortDefinition:
      'มิติของกระบวนการทางจิตที่ไม่เข้าถึงจิตสำนึกโดยตรง แต่มีผลต่อความคิด อารมณ์ ความฝัน อาการ และการกระทำ',
    humanExplanation:
      'Unconscious ไม่ใช่ห้องลับที่เก็บความจริงครบถ้วน แต่เป็นการทำงานที่มีตรรกะ การบิดรูป และความขัดแย้งของตนเอง',
    technicalExplanation:
      'Freud ใช้คำนี้ทั้งเชิงพรรณนา เชิงพลวัต และเชิงระบบ โดย system Ucs. ทำงานผ่าน primary process, timelessness, condensation และ displacement',
    category: 'psychoanalysis',
    tradition: 'Freudian Psychoanalysis',
    thinkers: ['Sigmund Freud'],
    relatedConcepts: [
      { slug: 'repression', title: 'Repression', relation: 'กลไกที่กีดกันเนื้อหา' },
      { slug: 'drive', title: 'Drive', relation: 'แรงเรียกร้องที่มีตัวแทนทางจิต' },
      {
        slug: 'personal-unconscious',
        title: 'Personal Unconscious',
        relation: 'ความแตกต่างในระบบ Jung',
      },
      { slug: 'desire', title: 'Desire', relation: 'แนวคิดสำคัญใน Lacan' },
    ],
    relatedArticles: ['freud-jung-ego'],
    references: [ref.freudDreams, ref.freudUnconscious],
    commonMisunderstandings: [
      'Unconscious ไม่ใช่เพียงสิ่งที่ยังไม่ได้นึกถึง',
      'การตีความไม่ได้เปิดเผยความหมายเดียวที่ซ่อนอยู่แบบรหัสลับ',
    ],
    examples: [
      'การเรียกชื่อผิดอาจเกิดจากหลายสาเหตุ แต่ในบางบริบทเผยความสัมพันธ์เชิงความหมายที่ผู้พูดไม่ได้ตั้งใจแสดง',
    ],
    difficulty: 'beginner',
    seoTitle: 'Unconscious คืออะไรในจิตวิเคราะห์',
    seoDescription:
      'Unconscious คือกระบวนการทางจิตที่ไม่เข้าถึงโดยตรงแต่มีผลต่อความฝัน อาการ และการกระทำ เรียนรู้ความหมายใน Freud',
  }),
];

export const lacanianConcepts = [
  defineConcept({
    id: 'concept-desire-lacan-th',
    slug: 'desire',
    title: 'Desire',
    originalTerm: 'Désir / Desire',
    thaiTerm: 'ความปรารถนา',
    shortDefinition:
      'สิ่งที่เหลือจากการที่ need ถูกถ่ายทอดผ่าน demand และเข้าสู่ระเบียบภาษา จึงไม่อิ่มเต็มด้วย object ชิ้นเดียว',
    humanExplanation:
      'Desire ไม่ใช่รายการของสิ่งที่เราอยากได้ เพราะเมื่อได้ object หนึ่ง ความปรารถนามักเลื่อนไปยังสิ่งอื่น สิ่งสำคัญคือโครงสร้างของการแสวงหาและความหมายต่อสายตาของผู้อื่น',
    technicalExplanation:
      'Lacan วาง desire ระหว่าง need และ demand โดย desire เป็น desire of the Other ทั้งในความหมายว่าถูกจัดรูปโดย Other และถามว่าตนเป็นอะไรในความปรารถนาของ Other',
    category: 'psychoanalysis',
    tradition: 'Lacanian Psychoanalysis',
    thinkers: ['Jacques Lacan'],
    relatedConcepts: [
      { slug: 'lack', title: 'Lack', relation: 'เงื่อนไขโครงสร้างของ desire' },
      { slug: 'big-other', title: 'Big Other', relation: 'สนามภาษาและการยอมรับ' },
      { slug: 'drive', title: 'Drive', relation: 'วงจรความพึงพอใจที่ไม่เท่ากับ desire' },
    ],
    relatedArticles: [],
    references: [ref.lacanEcrits, ref.lacanSeminarXI],
    commonMisunderstandings: [
      'Desire ใน Lacan ไม่เท่ากับความต้องการทางเพศหรือความอยากได้สิ่งของ',
    ],
    examples: [
      'การอยากได้ตำแหน่งงานอาจเกี่ยวทั้งกับงานจริงและคำถามว่าเราจะมีคุณค่าอย่างไรในสายตาของสถาบันหรือคนสำคัญ',
    ],
    difficulty: 'advanced',
    seoTitle: 'Desire ใน Lacan คืออะไร',
    seoDescription:
      'Desire ใน Lacan เกิดจากการที่ need ผ่าน demand และภาษา จึงสัมพันธ์กับ Lack และ Big Other มากกว่าการอยากได้ object ตรง ๆ',
  }),
  defineConcept({
    id: 'concept-lack-lacan-th',
    slug: 'lack',
    title: 'Lack',
    originalTerm: 'Manque / Lack',
    thaiTerm: 'ความขาด',
    shortDefinition:
      'ความไม่สมบูรณ์เชิงโครงสร้างที่เกิดเมื่อ subject ถูกก่อรูปในภาษา ไม่ใช่ช่องว่างที่ object ชิ้นหนึ่งเติมได้ถาวร',
    humanExplanation:
      'Lack อธิบายว่าทำไมการบรรลุสิ่งที่ต้องการไม่ทำให้คำถามเรื่องตัวตนและความปรารถนาหยุดลง ความขาดไม่ใช่ข้อบกพร่องส่วนตัวที่ต้องกำจัด',
    technicalExplanation:
      'Lacan แยก lack ในหลาย register และเชื่อม lack-in-being กับ castration, signifier และการเกิดของ desire โดย object a ทำหน้าที่เป็น cause มากกว่า object ที่เติมเต็ม',
    category: 'psychoanalysis',
    tradition: 'Lacanian Psychoanalysis',
    thinkers: ['Jacques Lacan'],
    relatedConcepts: [
      { slug: 'desire', title: 'Desire', relation: 'ความเคลื่อนไหวที่ Lack เปิดไว้' },
      { slug: 'symbolic', title: 'Symbolic', relation: 'ระเบียบ signifier ที่ก่อ subject' },
      { slug: 'real', title: 'Real', relation: 'สิ่งที่ต้านการทำให้เป็นสัญลักษณ์' },
    ],
    relatedArticles: [],
    references: [ref.lacanEcrits],
    commonMisunderstandings: [
      'Lack ไม่ได้หมายถึงความนับถือตนต่ำหรือการมีชีวิตไม่พอเพียง',
    ],
    examples: [
      'แม้ได้รับคำยืนยันที่ต้องการ บุคคลอาจยังถามซ้ำว่าอีกฝ่ายรักจริงหรือไม่ เพราะปัญหาไม่ได้อยู่ที่ข้อมูลขาดเพียงชิ้นเดียว',
    ],
    difficulty: 'advanced',
    seoTitle: 'Lack คืออะไรในทฤษฎีของ Lacan',
    seoDescription:
      'Lack คือความขาดเชิงโครงสร้างของ subject ในภาษา ซึ่งทำให้ Desire เคลื่อนไหวและไม่ถูกเติมเต็มด้วย object เดียว',
  }),
  defineConcept({
    id: 'concept-imaginary-lacan-th',
    slug: 'imaginary',
    title: 'Imaginary',
    originalTerm: 'Imaginary',
    thaiTerm: 'ระเบียบจินตภาพ',
    shortDefinition:
      'ระเบียบของภาพ ความเหมือน การระบุตัว และการแข่งขัน ซึ่งให้ความรู้สึกเป็นเอกภาพแก่ Ego',
    humanExplanation:
      'Imaginary ทำให้เราเห็นตนผ่านภาพที่ดูต่อเนื่องและเปรียบเทียบกับผู้อื่น ภาพนี้จำเป็นแต่ปิดบังความแตกร้าวและความซับซ้อนของ subject',
    technicalExplanation:
      'Lacan เชื่อม Imaginary กับ mirror stage, specular identification และ méconnaissance โดย Ego ก่อตัวผ่านภาพภายนอกที่ถูกยอมรับเป็นตัวตน',
    category: 'psychoanalysis',
    tradition: 'Lacanian Psychoanalysis',
    thinkers: ['Jacques Lacan'],
    relatedConcepts: [
      { slug: 'symbolic', title: 'Symbolic', relation: 'ระเบียบภาษาและความต่าง' },
      { slug: 'real', title: 'Real', relation: 'สิ่งที่ภาพและภาษาจับไม่ได้' },
      { slug: 'big-other', title: 'Big Other', relation: 'ตำแหน่งเชิงสัญลักษณ์ที่รับรองภาพ' },
    ],
    relatedArticles: [],
    references: [ref.lacanEcrits],
    commonMisunderstandings: [
      'Imaginary ไม่ได้แปลว่าสิ่งนั้นไม่มีจริงหรือเป็นจินตนาการเพ้อฝัน',
    ],
    examples: [
      'การสร้างภาพตัวเองว่าเป็นผู้ชนะอาจต้องพึ่งภาพคู่แข่งที่แพ้และสายตาของผู้อื่นที่รับรองความแตกต่างนั้น',
    ],
    difficulty: 'advanced',
    seoTitle: 'Imaginary ใน Lacan คืออะไร',
    seoDescription:
      'Imaginary คือระเบียบของภาพ การระบุตัว และความเหมือนใน Lacan เชื่อมกับ Mirror Stage และการก่อตัวของ Ego',
  }),
  defineConcept({
    id: 'concept-symbolic-lacan-th',
    slug: 'symbolic',
    title: 'Symbolic',
    originalTerm: 'Symbolic',
    thaiTerm: 'ระเบียบสัญลักษณ์',
    shortDefinition:
      'ระเบียบของภาษา กฎ ความแตกต่าง และตำแหน่งทางสังคมที่มีอยู่ก่อนปัจเจกและทำให้ subject พูดได้',
    humanExplanation:
      'เราไม่ได้ใช้ภาษาเพียงเป็นเครื่องมือ ภาษายังมอบชื่อ บทบาท และข้อจำกัดที่ทำให้เรารู้ว่าตนอยู่ตรงไหนในความสัมพันธ์',
    technicalExplanation:
      'Symbolic เป็น network of signifiers ซึ่งจัดโครงสร้าง kinship, law และ subjectivity; subject ถูก represented by one signifier for another signifier',
    category: 'psychoanalysis',
    tradition: 'Lacanian Psychoanalysis',
    thinkers: ['Jacques Lacan', 'Claude Lévi-Strauss'],
    relatedConcepts: [
      { slug: 'big-other', title: 'Big Other', relation: 'ตำแหน่งของระเบียบ Symbolic' },
      { slug: 'imaginary', title: 'Imaginary', relation: 'ระเบียบภาพและการระบุตัว' },
      { slug: 'real', title: 'Real', relation: 'ขีดจำกัดของ symbolization' },
      { slug: 'desire', title: 'Desire', relation: 'ถูกจัดรูปผ่าน signifier' },
    ],
    relatedArticles: [],
    references: [ref.lacanEcrits],
    commonMisunderstandings: [
      'Symbolic ไม่ได้หมายถึงสัญลักษณ์ชิ้นหนึ่งหรือคำเปรียบเทียบเท่านั้น',
    ],
    examples: [
      'คำว่า “ลูกที่ดี” มีผลต่อความปรารถนาและความผิดของบุคคล เพราะเป็นตำแหน่งในระบบความคาดหวัง ไม่ใช่เพียงคำบรรยาย',
    ],
    difficulty: 'advanced',
    seoTitle: 'Symbolic ใน Lacan คืออะไร',
    seoDescription:
      'Symbolic คือระเบียบของภาษา กฎ และ signifier ที่ก่อรูป subject พร้อมความสัมพันธ์กับ Big Other, Imaginary และ Real',
  }),
  defineConcept({
    id: 'concept-real-lacan-th',
    slug: 'real',
    title: 'Real',
    originalTerm: 'Real',
    thaiTerm: 'เดอะเรียล',
    shortDefinition:
      'สิ่งที่ไม่อาจถูกทำให้เป็นภาพหรือสัญลักษณ์ได้ครบ และกลับมาเป็นจุดสะดุด รอยแตก หรือความเป็นไปไม่ได้',
    humanExplanation:
      'Real ไม่ใช่ “โลกความจริง” ตรงข้ามกับจินตนาการ แต่คือสิ่งที่กรอบความหมายของเราจัดการไม่ได้และทำให้คำอธิบายเดิมล้มเหลว',
    technicalExplanation:
      'ใน Lacan, Real ถูกนิยามสัมพันธ์กับ impossibility และสิ่งที่ resists symbolization; มันมีความหมายเปลี่ยนไปตลอดพัฒนาการของทฤษฎี',
    category: 'psychoanalysis',
    tradition: 'Lacanian Psychoanalysis',
    thinkers: ['Jacques Lacan'],
    relatedConcepts: [
      { slug: 'symbolic', title: 'Symbolic', relation: 'ระเบียบที่มีขีดจำกัด' },
      { slug: 'imaginary', title: 'Imaginary', relation: 'ภาพที่พยายามให้เอกภาพ' },
      { slug: 'lack', title: 'Lack', relation: 'ความไม่สมบูรณ์ของโครงสร้าง' },
    ],
    relatedArticles: [],
    references: [ref.lacanSeminarXI],
    commonMisunderstandings: [
      'Real ไม่เท่ากับข้อเท็จจริงทางวัตถุหรือความจริงแท้ที่ซ่อนอยู่',
    ],
    examples: [
      'เหตุการณ์สะเทือนขวัญอาจไม่เข้ากับเรื่องเล่าที่บุคคลมีต่อตนเอง และกลับมาเป็นภาพซ้ำ อาการ หรือช่องว่างที่พูดไม่ได้',
    ],
    difficulty: 'advanced',
    seoTitle: 'Real ใน Lacan คืออะไร',
    seoDescription:
      'Real คือสิ่งที่ต้านการทำให้เป็นสัญลักษณ์ใน Lacan ไม่ใช่ reality ธรรมดา แต่เป็นขีดจำกัดและความเป็นไปไม่ได้ของความหมาย',
  }),
  defineConcept({
    id: 'concept-big-other-lacan-th',
    slug: 'big-other',
    title: 'Big Other',
    originalTerm: 'Grand Autre / Big Other',
    thaiTerm: 'ผู้อื่นใหญ่',
    shortDefinition:
      'ตำแหน่งเชิงสัญลักษณ์ของภาษา กฎ และการรับรองที่ subject สมมุติว่าเป็นผู้ค้ำประกันความหมาย',
    humanExplanation:
      'Big Other ไม่จำเป็นต้องเป็นบุคคลจริง มันอาจปรากฏเป็น “สังคมจะว่าอย่างไร” “ระบบต้องการอะไร” หรือผู้ฟังสมมุติที่เราพูดกับเขา',
    technicalExplanation:
      'Big Other เป็น locus of the signifier และสถานที่ที่ speech ถูกส่งไป ขณะเดียวกัน Lacan ยืนยันว่า Other itself lacks และไม่มีผู้ค้ำประกันสุดท้ายของระบบ',
    category: 'psychoanalysis',
    tradition: 'Lacanian Psychoanalysis',
    thinkers: ['Jacques Lacan'],
    relatedConcepts: [
      { slug: 'symbolic', title: 'Symbolic', relation: 'สนามที่ Big Other ตั้งอยู่' },
      { slug: 'desire', title: 'Desire', relation: 'desire of the Other' },
      { slug: 'lack', title: 'Lack', relation: 'Other เองก็ไม่สมบูรณ์' },
    ],
    relatedArticles: [],
    references: [ref.lacanEcrits],
    commonMisunderstandings: [
      'Big Other ไม่ใช่พระเจ้า ผู้มีอำนาจ หรือคนหมู่มากโดยตรง แม้บุคคลเหล่านั้นอาจถูกวางในตำแหน่งนี้',
    ],
    examples: [
      'คนอาจตรวจแก้งานไม่สิ้นสุดเพื่อให้ “มาตรฐานที่ถูกต้องจริง ๆ” พอใจ แม้ไม่มีใครระบุมาตรฐานนั้นได้ครบ',
    ],
    difficulty: 'advanced',
    seoTitle: 'Big Other คืออะไรใน Lacan',
    seoDescription:
      'Big Other คือที่ตั้งเชิงสัญลักษณ์ของภาษา กฎ และการรับรอง ไม่ใช่บุคคลรายหนึ่ง และสัมพันธ์กับ Desire กับ Lack',
  }),
];

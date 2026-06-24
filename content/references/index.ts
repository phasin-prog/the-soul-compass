import type {
  Reference,
  ReferenceCategory,
  ReferenceSourceLevel,
} from '@/types/reference';

const archiveDate = '2026-06-22';

type ReferenceSeed = Omit<
  Reference,
  | 'translator'
  | 'editor'
  | 'publisher'
  | 'description'
  | 'notes'
  | 'externalUrl'
  | 'isbn'
  | 'doi'
  | 'status'
  | 'createdAt'
  | 'updatedAt'
  | 'seoTitle'
  | 'seoDescription'
> &
  Partial<
    Pick<
      Reference,
      'translator' | 'editor' | 'publisher' | 'externalUrl' | 'isbn' | 'doi'
    >
  >;

const categoryNames: Record<ReferenceCategory, string> = {
  'analytical-psychology': 'Analytical Psychology',
  psychoanalysis: 'Psychoanalysis',
  'lacanian-psychoanalysis': 'Lacanian Psychoanalysis',
  'adlerian-psychology': 'Adlerian Psychology',
  neuroscience: 'Neuroscience',
  'social-psychology': 'Social Psychology',
  philosophy: 'Philosophy',
  'philosophy-of-mind': 'Philosophy of Mind',
  typology: 'Typology',
  tpdt: 'TPDT',
  'research-methodology': 'Research Methodology',
};

const sourceLevelCopy: Record<
  ReferenceSourceLevel,
  { th: string; en: string }
> = {
  primary: {
    th: 'ระเบียนแหล่งปฐมภูมิ',
    en: 'Primary-source record',
  },
  secondary: {
    th: 'ระเบียนแหล่งทุติยภูมิ',
    en: 'Secondary-source record',
  },
  interpretation: {
    th: 'ระเบียนงานตีความ',
    en: 'Interpretive-source record',
  },
  internal: {
    th: 'ระเบียนพัฒนาการทฤษฎีภายใน',
    en: 'Internal theoretical-development record',
  },
};

function createReference(seed: ReferenceSeed): Reference {
  const sourceLabel = sourceLevelCopy[seed.sourceLevel];
  const category = categoryNames[seed.category];

  return {
    ...seed,
    translator: seed.translator ?? null,
    editor: seed.editor ?? null,
    publisher: seed.publisher ?? null,
    description: {
      th:
        seed.sourceLevel === 'internal'
          ? 'บันทึกกรอบทฤษฎีที่พัฒนาภายใน The Soul’s Compass และแยกสถานะออกจากแหล่งวิชาการภายนอกอย่างชัดเจน'
          : `${sourceLabel.th}ในหมวด ${category} ที่เชื่อมกับเนื้อหาในคลังความรู้`,
      en:
        seed.sourceLevel === 'internal'
          ? 'A framework note developed inside The Soul’s Compass and explicitly separated from external scholarship.'
          : `${sourceLabel.en} in the ${category} collection, connected to relevant archive entries.`,
    },
    notes: {
      th: 'ระเบียนนี้แสดงเฉพาะข้อมูลที่ยืนยันไว้ในคลัง ช่องสำนักพิมพ์ ผู้แปล บรรณาธิการ ISBN DOI และ URL ที่ยังไม่ยืนยันจะไม่ถูกคาดเดา',
      en: 'This record shows only fields verified in the archive. Unverified publisher, translator, editor, ISBN, DOI, and URL data are left blank.',
    },
    externalUrl: seed.externalUrl ?? null,
    isbn: seed.isbn ?? null,
    doi: seed.doi ?? null,
    status: 'published',
    createdAt: archiveDate,
    updatedAt: archiveDate,
    seoTitle: {
      th: `${seed.title} — ระเบียนอ้างอิง`,
      en: `${seed.title} — Reference record`,
    },
    seoDescription: {
      th: `ระเบียนบรรณานุกรมของ ${seed.title} โดย ${seed.author} ในคลังอ้างอิง The Soul’s Compass`,
      en: `Bibliographic record for ${seed.title} by ${seed.author} in The Soul’s Compass reference archive.`,
    },
  };
}

export const references: Reference[] = [
  createReference({
    id: 'jung-psychological-types-1921',
    slug: 'jung-psychological-types',
    title: 'Psychological Types',
    originalTitle: 'Psychologische Typen',
    author: 'C. G. Jung',
    year: 1921,
    language: 'German',
    type: 'book',
    category: 'typology',
    tradition: 'Jungian Analytical Psychology',
    sourceLevel: 'primary',
    relatedThinkers: ['Carl G. Jung'],
    relatedConcepts: ['psychological-types', 'function', 'attitude'],
    relatedArticles: ['typology-beyond-mbti'],
    relatedSeries: [],
    citationText: 'Jung, C. G. (1921). Psychological Types.',
  }),
  createReference({
    id: 'jung-two-essays-1928',
    slug: 'jung-two-essays-on-analytical-psychology',
    title: 'Two Essays on Analytical Psychology',
    originalTitle: null,
    author: 'C. G. Jung',
    year: 1928,
    language: 'German',
    type: 'collected_works',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    sourceLevel: 'primary',
    relatedThinkers: ['Carl G. Jung'],
    relatedConcepts: ['ego', 'persona', 'individuation'],
    relatedArticles: [
      'freud-jung-ego',
      'shadow-is-not-just-the-dark-side',
    ],
    relatedSeries: ['structure-of-the-psyche'],
    citationText: 'Jung, C. G. (1928). Two Essays on Analytical Psychology.',
  }),
  createReference({
    id: 'jung-aion-1951',
    slug: 'jung-aion',
    title: 'Aion: Researches into the Phenomenology of the Self',
    originalTitle: null,
    author: 'C. G. Jung',
    year: 1951,
    language: 'German',
    type: 'collected_works',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    sourceLevel: 'primary',
    relatedThinkers: ['Carl G. Jung'],
    relatedConcepts: ['ego', 'shadow', 'self', 'individuation'],
    relatedArticles: [
      'freud-jung-ego',
      'shadow-is-not-just-the-dark-side',
    ],
    relatedSeries: ['structure-of-the-psyche'],
    citationText:
      'Jung, C. G. (1951). Aion: Researches into the Phenomenology of the Self.',
  }),
  createReference({
    id: 'jung-archetypes-collective-unconscious',
    slug: 'jung-archetypes-and-the-collective-unconscious',
    title: 'The Archetypes and the Collective Unconscious',
    originalTitle: null,
    author: 'C. G. Jung',
    year: 1959,
    language: 'German',
    type: 'collected_works',
    category: 'analytical-psychology',
    tradition: 'Jungian Analytical Psychology',
    sourceLevel: 'primary',
    relatedThinkers: ['Carl G. Jung'],
    relatedConcepts: ['shadow', 'self', 'personal-unconscious'],
    relatedArticles: ['shadow-is-not-just-the-dark-side'],
    relatedSeries: ['structure-of-the-psyche'],
    citationText:
      'Jung, C. G. (1959). The Archetypes and the Collective Unconscious.',
  }),
  createReference({
    id: 'freud-ego-id-1923',
    slug: 'freud-the-ego-and-the-id',
    title: 'The Ego and the Id',
    originalTitle: 'Das Ich und das Es',
    author: 'Sigmund Freud',
    year: 1923,
    language: 'German',
    type: 'clinical_text',
    category: 'psychoanalysis',
    tradition: 'Freudian Psychoanalysis',
    sourceLevel: 'primary',
    relatedThinkers: ['Sigmund Freud'],
    relatedConcepts: ['id', 'ego-freud', 'superego'],
    relatedArticles: ['freud-jung-ego'],
    relatedSeries: ['introduction-to-psychoanalysis'],
    citationText: 'Freud, S. (1923). The Ego and the Id.',
  }),
  createReference({
    id: 'freud-beyond-pleasure-1920',
    slug: 'freud-beyond-the-pleasure-principle',
    title: 'Beyond the Pleasure Principle',
    originalTitle: 'Jenseits des Lustprinzips',
    author: 'Sigmund Freud',
    year: 1920,
    language: 'German',
    type: 'clinical_text',
    category: 'psychoanalysis',
    tradition: 'Freudian Psychoanalysis',
    sourceLevel: 'primary',
    relatedThinkers: ['Sigmund Freud'],
    relatedConcepts: ['drive'],
    relatedArticles: [],
    relatedSeries: ['introduction-to-psychoanalysis'],
    citationText: 'Freud, S. (1920). Beyond the Pleasure Principle.',
  }),
  createReference({
    id: 'anna-freud-ego-defense-1936',
    slug: 'anna-freud-ego-and-mechanisms-of-defence',
    title: 'The Ego and the Mechanisms of Defence',
    originalTitle: 'Das Ich und die Abwehrmechanismen',
    author: 'Anna Freud',
    year: 1936,
    language: 'German',
    type: 'clinical_text',
    category: 'psychoanalysis',
    tradition: 'Ego Psychology',
    sourceLevel: 'primary',
    relatedThinkers: ['Anna Freud', 'Sigmund Freud'],
    relatedConcepts: ['defense-mechanism', 'defense-field'],
    relatedArticles: ['what-is-tpdt'],
    relatedSeries: [
      'introduction-to-psychoanalysis',
      'tpdt-transformative-psyche-dynamics',
    ],
    citationText:
      'Freud, A. (1936). The Ego and the Mechanisms of Defence.',
  }),
  createReference({
    id: 'lacan-ecrits-1966',
    slug: 'lacan-ecrits',
    title: 'Écrits',
    originalTitle: 'Écrits',
    author: 'Jacques Lacan',
    year: 1966,
    language: 'French',
    type: 'collected_works',
    category: 'lacanian-psychoanalysis',
    tradition: 'Lacanian Psychoanalysis',
    sourceLevel: 'primary',
    relatedThinkers: ['Jacques Lacan'],
    relatedConcepts: ['imaginary', 'symbolic', 'desire', 'big-other', 'real'],
    relatedArticles: [],
    relatedSeries: ['from-jung-to-lacan'],
    citationText: 'Lacan, J. (1966). Écrits.',
  }),
  createReference({
    id: 'lacan-seminar-xi-1964',
    slug: 'lacan-four-fundamental-concepts',
    title: 'The Four Fundamental Concepts of Psychoanalysis',
    originalTitle:
      'Le Séminaire, Livre XI: Les quatre concepts fondamentaux de la psychanalyse',
    author: 'Jacques Lacan',
    year: 1964,
    language: 'French',
    type: 'lecture',
    category: 'lacanian-psychoanalysis',
    tradition: 'Lacanian Psychoanalysis',
    sourceLevel: 'primary',
    relatedThinkers: ['Jacques Lacan'],
    relatedConcepts: ['unconscious', 'desire', 'big-other', 'real'],
    relatedArticles: [],
    relatedSeries: ['from-jung-to-lacan'],
    citationText:
      'Lacan, J. (1964). The Four Fundamental Concepts of Psychoanalysis.',
  }),
  createReference({
    id: 'heidegger-being-time-1927',
    slug: 'heidegger-being-and-time',
    title: 'Being and Time',
    originalTitle: 'Sein und Zeit',
    author: 'Martin Heidegger',
    year: 1927,
    language: 'German',
    type: 'philosophical_text',
    category: 'philosophy',
    tradition: 'Phenomenology / Existential Philosophy',
    sourceLevel: 'primary',
    relatedThinkers: ['Martin Heidegger'],
    relatedConcepts: ['phenomenology'],
    relatedArticles: [],
    relatedSeries: [],
    citationText: 'Heidegger, M. (1927). Being and Time.',
  }),
  createReference({
    id: 'merleau-ponty-perception-1945',
    slug: 'merleau-ponty-phenomenology-of-perception',
    title: 'Phenomenology of Perception',
    originalTitle: 'Phénoménologie de la perception',
    author: 'Maurice Merleau-Ponty',
    year: 1945,
    language: 'French',
    type: 'philosophical_text',
    category: 'philosophy',
    tradition: 'Phenomenology',
    sourceLevel: 'primary',
    relatedThinkers: ['Maurice Merleau-Ponty'],
    relatedConcepts: ['phenomenology', 'embodiment'],
    relatedArticles: [],
    relatedSeries: [],
    citationText:
      'Merleau-Ponty, M. (1945). Phenomenology of Perception.',
  }),
  createReference({
    id: 'ryle-concept-mind-1949',
    slug: 'ryle-the-concept-of-mind',
    title: 'The Concept of Mind',
    originalTitle: null,
    author: 'Gilbert Ryle',
    year: 1949,
    language: 'English',
    type: 'philosophical_text',
    category: 'philosophy',
    tradition: 'Analytic Philosophy',
    sourceLevel: 'primary',
    relatedThinkers: ['Gilbert Ryle'],
    relatedConcepts: [],
    relatedArticles: [],
    relatedSeries: [],
    citationText: 'Ryle, G. (1949). The Concept of Mind.',
  }),
  createReference({
    id: 'nagel-what-is-it-like-1974',
    slug: 'nagel-what-is-it-like-to-be-a-bat',
    title: 'What Is It Like to Be a Bat?',
    originalTitle: null,
    author: 'Thomas Nagel',
    year: 1974,
    language: 'English',
    type: 'essay',
    category: 'philosophy-of-mind',
    tradition: 'Analytic Philosophy of Mind',
    sourceLevel: 'primary',
    relatedThinkers: ['Thomas Nagel'],
    relatedConcepts: ['consciousness', 'qualia', 'subjectivity'],
    relatedArticles: [],
    relatedSeries: [],
    citationText: 'Nagel, T. (1974). What Is It Like to Be a Bat?',
  }),
  createReference({
    id: 'chalmers-conscious-mind-1996',
    slug: 'chalmers-the-conscious-mind',
    title: 'The Conscious Mind',
    originalTitle: null,
    author: 'David Chalmers',
    year: 1996,
    language: 'English',
    type: 'book',
    category: 'philosophy-of-mind',
    tradition: 'Analytic Philosophy of Mind',
    sourceLevel: 'primary',
    relatedThinkers: ['David Chalmers'],
    relatedConcepts: ['consciousness', 'qualia'],
    relatedArticles: [],
    relatedSeries: [],
    citationText: 'Chalmers, D. J. (1996). The Conscious Mind.',
  }),
  createReference({
    id: 'searle-intentionality-1983',
    slug: 'searle-intentionality',
    title: 'Intentionality',
    originalTitle: null,
    author: 'John Searle',
    year: 1983,
    language: 'English',
    type: 'philosophical_text',
    category: 'philosophy-of-mind',
    tradition: 'Analytic Philosophy of Mind',
    sourceLevel: 'primary',
    relatedThinkers: ['John Searle'],
    relatedConcepts: ['intentionality'],
    relatedArticles: [],
    relatedSeries: [],
    citationText: 'Searle, J. R. (1983). Intentionality.',
  }),
  createReference({
    id: 'tpdt-internal-framework-note',
    slug: 'tpdt-internal-framework-note',
    title: 'Transformative Psyche Dynamics Theory — Internal Framework Note',
    originalTitle: null,
    author: 'The Soul’s Compass',
    year: null,
    language: 'Thai / English',
    type: 'internal_note',
    category: 'tpdt',
    tradition: 'TPDT (Theory in Development)',
    sourceLevel: 'internal',
    relatedThinkers: ['Phasin Pasumart'],
    relatedConcepts: [
      'psyche-dynamics',
      'defense-field',
      'transformation-axis',
      'transitional-pattern',
    ],
    relatedArticles: ['what-is-tpdt'],
    relatedSeries: ['tpdt-transformative-psyche-dynamics'],
    citationText:
      'The Soul’s Compass. Transformative Psyche Dynamics Theory — Internal Framework Note.',
  }),
];

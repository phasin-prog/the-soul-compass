import type { Metadata } from 'next';
import { ConceptFilters } from '@/components/concepts/ConceptFilters';
import { getPublishedConcepts } from '@/lib/concepts';
import { isCategoryId } from '@/lib/content/categories';
import { getT } from '@/lib/i18n';
import { parseLocale } from '@/lib/locale';
import { getAlternateUrls } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = parseLocale(locale);
  const t = getT(localeKey);

  return {
    title: t.nav.concepts,
    description:
      localeKey === 'th'
        ? 'คลังแนวคิดเชิงโครงสร้างจากจิตวิทยาหลายสำนัก ประสาทวิทยาศาสตร์ จิตวิทยาสังคม ปรัชญา Typology และ TPDT'
        : 'A structured concept library spanning multiple psychologies, neuroscience, social psychology, philosophy, typology, and TPDT.',
    alternates: {
      canonical: `/${localeKey}/concepts`,
      languages: getAlternateUrls('/concepts'),
    },
  };
}

export default async function ConceptsPage({ params, searchParams }: PageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const localeKey = parseLocale(locale);
  const t = getT(localeKey);
  const concepts = await getPublishedConcepts(localeKey);
  const requestedCategory = Array.isArray(query.category)
    ? query.category[0]
    : query.category;
  const initialCategory =
    requestedCategory && isCategoryId(requestedCategory)
      ? requestedCategory
      : undefined;

  return (
    <div className="container mx-auto px-5 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-4xl sm:mb-16">
          <h1 className="type-page-title text-text">{t.nav.concepts}</h1>
          <p className="type-lead mt-5 text-text-soft">
            {localeKey === 'th'
              ? 'แผนที่ความรู้สำหรับแยกความหมายของคำ เปรียบเทียบสำนัก และติดตามว่าแนวคิดหนึ่งเชื่อมกับแนวคิดอื่นอย่างไร'
              : 'A knowledge map for distinguishing terms, comparing traditions, and following how one concept connects to another.'}
          </p>
          <p className="mt-5 max-w-3xl text-muted">
            {localeKey === 'th'
              ? 'แต่ละหน้าเป็นโหนดที่รวมคำนิยาม คำอธิบายเชิงมนุษย์ ความหมายทางเทคนิค ความเข้าใจผิด ตัวอย่าง นักคิด และเอกสารอ้างอิง—ไม่ใช่พจนานุกรมคำสั้น ๆ'
              : 'Each page is a reusable node containing definitions, human and technical explanations, misunderstandings, examples, thinkers, and references.'}
          </p>
        </header>

        {concepts.length > 0 ? (
          <ConceptFilters
            concepts={concepts}
            locale={localeKey}
            initialCategory={initialCategory}
          />
        ) : (
          <div className="border-y border-border py-14">
            <h2 className="type-section-title text-text">
              {localeKey === 'th'
                ? 'ยังไม่มีแนวคิดที่เผยแพร่'
                : 'No published concepts yet'}
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              {localeKey === 'th'
                ? 'โหนดแนวคิดจะปรากฏที่นี่เมื่อมีสถานะเผยแพร่'
                : 'Concept nodes will appear here once published.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

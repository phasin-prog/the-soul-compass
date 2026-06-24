import type { Metadata } from 'next';
import { Container } from '@/components/Layout/Container';
import { ConceptFilters } from '@/components/concepts/ConceptFilters';
import { LocaleAvailabilityNotice } from '@/components/LocaleAvailabilityNotice';
import { getPublishedConcepts } from '@/lib/concepts';
import { isCategoryId } from '@/lib/content/categories';
import { getT } from '@/lib/i18n';
import { parseLocale } from '@/lib/locale';
import { getAlternateUrls } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string | string[];
    difficulty?: string | string[];
    page?: string | string[];
    q?: string | string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = parseLocale(locale);
  const t = getT(localeKey);

  return {
    title: t.nav.concepts,
    description:
      localeKey === 'th'
        ? 'คลังแนวคิดแบบเชื่อมโยงจากจิตวิทยา ประสาทวิทยาศาสตร์ ปรัชญา Typology และ TPDT'
        : 'A connected concept library spanning psychology, neuroscience, philosophy, typology, and TPDT.',
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
  const requestedDifficulty = Array.isArray(query.difficulty)
    ? query.difficulty[0]
    : query.difficulty;
  const initialDifficulty =
    requestedDifficulty === 'beginner' ||
    requestedDifficulty === 'intermediate' ||
    requestedDifficulty === 'advanced'
      ? requestedDifficulty
      : undefined;
  const initialQuery = Array.isArray(query.q) ? query.q[0] : query.q;
  const requestedPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const parsedPage = Number.parseInt(requestedPage ?? '1', 10);
  const initialPage = Number.isFinite(parsedPage) && parsedPage > 0
    ? parsedPage
    : 1;

  return (
    <Container className="py-14 sm:py-18">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 grid gap-7 border-b border-border pb-10 sm:mb-16 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)] lg:items-end">
          <div>
            <h1 className="type-page-title text-text">{t.nav.concepts}</h1>
            <p className="type-lead mt-5 text-text-soft">
              {localeKey === 'th'
                ? 'แผนที่ความรู้สำหรับแยกความหมาย เปรียบเทียบสำนัก และติดตามว่าแนวคิดหนึ่งเชื่อมกับแนวคิดอื่นอย่างไร'
                : 'A knowledge map for distinguishing terms, comparing traditions, and following how one concept connects to another.'}
            </p>
          </div>
          <p className="max-w-xl text-text-soft lg:justify-self-end">
            {localeKey === 'th'
              ? 'แต่ละหน้าคือโหนดที่รวมคำจำกัดความ คำอธิบาย ตัวอย่าง ความเข้าใจผิด นักคิด และแหล่งอ้างอิง—ไม่ใช่รายการพจนานุกรมที่แยกขาดจากกัน'
              : 'Each page is a reusable node containing definitions, explanations, examples, misunderstandings, thinkers, and references—not an isolated dictionary entry.'}
          </p>
        </header>

        {concepts.length > 0 ? (
          <ConceptFilters
            concepts={concepts}
            locale={localeKey}
            initialCategory={initialCategory}
            initialDifficulty={initialDifficulty}
            initialPage={initialPage}
            initialQuery={initialQuery}
          />
        ) : (
          localeKey === 'en' ? (
            <LocaleAvailabilityNotice section="concepts" />
          ) : (
          <div className="border-y border-border py-14">
            <h2 className="type-section-title text-text">
              {localeKey === 'th' ? 'ยังไม่มีแนวคิดที่เผยแพร่' : 'No published concepts yet'}
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              {localeKey === 'th'
                ? 'โหนดแนวคิดจะปรากฏที่นี่เมื่อผ่านการตรวจทานและเผยแพร่'
                : 'Concept nodes will appear here once reviewed and published.'}
            </p>
          </div>
          )
        )}
      </div>
    </Container>
  );
}

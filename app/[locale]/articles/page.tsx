import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ArticleFilters } from '@/components/articles/ArticleFilters';
import { LocaleAvailabilityNotice } from '@/components/LocaleAvailabilityNotice';
import { ArticleCardSkeleton } from '@/components/ui/Skeleton';
import { getPublishedArticles } from '@/lib/articles';
import { isCategoryId } from '@/lib/content/categories';
import { getT } from '@/lib/i18n';
import { parseLocale } from '@/lib/locale';
import { getAlternateUrls } from '@/lib/metadata';

export const dynamic = 'force-dynamic';

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
    title: t.nav.articles,
    description:
      localeKey === 'th'
        ? 'บทความระยะยาวเกี่ยวกับจิตวิทยาหลายสำนัก ประสาทวิทยาศาสตร์ จิตวิทยาสังคม ปรัชญา Typology และ TPDT'
        : 'Long-form articles across psychology, neuroscience, social psychology, philosophy, typology, and TPDT.',
    alternates: {
      canonical: `/${localeKey}/articles`,
      languages: getAlternateUrls('/articles'),
    },
  };
}

export default async function ArticlesPage({ params, searchParams }: PageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const localeKey = parseLocale(locale);
  const t = getT(localeKey);
  const articles = await getPublishedArticles(localeKey);
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
          <h1 className="type-page-title text-text">{t.nav.articles}</h1>
          <p className="type-lead mt-5 text-text-soft">
            {localeKey === 'th'
              ? 'บทความสำหรับอ่านช้า ๆ เปรียบเทียบแนวคิด และติดตามข้อถกเถียงเรื่องจิตใจมนุษย์โดยไม่ลดทอนให้เหลือคำตอบสำเร็จรูป'
              : 'Long-form reading for comparing ideas and following debates about the human psyche without reducing them to ready-made answers.'}
          </p>
        </header>

        {articles.length === 0 ? (
          localeKey === 'en' ? (
            <LocaleAvailabilityNotice section="articles" />
          ) : (
          <div className="border-y border-border py-14">
            <h2 className="type-section-title text-text">
              {localeKey === 'th'
                ? 'ยังไม่มีบทความที่เผยแพร่'
                : 'No published articles yet'}
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              {localeKey === 'th'
                ? 'บทความจากคลังเนื้อหาและ Wiki Studio จะปรากฏที่นี่เมื่อมีสถานะเผยแพร่'
                : 'Articles from the content library and Wiki Studio will appear here once published.'}
            </p>
          </div>
          )
        ) : (
          <Suspense
            fallback={
              <div className="grid gap-x-8 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ArticleCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ArticleFilters
              articles={articles}
              locale={localeKey}
              initialCategory={initialCategory}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

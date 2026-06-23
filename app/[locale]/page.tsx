import Link from 'next/link';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Button } from '@/components/ui/Button';
import { getPublishedArticles } from '@/lib/articles';
import {
  categories,
  type CategoryId,
} from '@/lib/content/categories';
import { getPublishedSeries } from '@/lib/series';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const homeCategoryIds: CategoryId[] = [
  'analytical-psychology',
  'psychoanalysis',
  'philosophy',
  'philosophy-of-mind',
  'neuroscience',
  'social-psychology',
  'typology',
  'tpdt',
];

const categoryMarks: Record<CategoryId, string> = {
  'analytical-psychology': 'Ψ',
  psychoanalysis: 'ID',
  philosophy: 'Φ',
  'philosophy-of-mind': 'MIND',
  neuroscience: 'N',
  'social-psychology': 'SOC',
  typology: 'TYPE',
  tpdt: 'TPDT',
};

const categoryRoutes: Partial<Record<CategoryId, string>> = {
  'analytical-psychology': '/analytical-psychology',
  psychoanalysis: '/psychoanalysis',
  philosophy: '/philosophy',
  typology: '/typology',
  tpdt: '/tpdt',
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = locale === 'en' ? 'en' : 'th';
  const [articles, series] = await Promise.all([
    getPublishedArticles(localeKey),
    getPublishedSeries(localeKey),
  ]);
  const featuredArticles = [
    ...articles.filter((article) => article.featured),
    ...articles.filter((article) => !article.featured),
  ].slice(0, 3);
  const recommendedSeries = series[0];

  return (
    <div className="flex flex-col">
      <section className="home-hero relative overflow-hidden border-b border-border">
        <div className="home-hero__texture" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:min-h-[42rem] lg:grid-cols-[minmax(0,1.18fr)_minmax(22rem,0.82fr)] lg:items-center">
          <div className="relative z-10">
            <p className="home-kicker mb-6 max-w-2xl text-accent">
              THE SOUL’S COMPASS / ANALYTICAL PSYCHE ARCHIVE
            </p>
            <h1 className="type-display max-w-4xl text-text">
              <span className="block">
                {localeKey === 'th'
                  ? 'พื้นที่อ่านจิตใจมนุษย์'
                  : 'A place to read the human psyche'}
              </span>
              <span className="mt-2 block text-text-soft">
                {localeKey === 'th'
                  ? 'โดยไม่ลดมนุษย์ให้เหลือป้ายกำกับ'
                  : 'without reducing people to labels'}
              </span>
            </h1>
            <p className="type-lead mt-7 text-text-soft">
              {localeKey === 'th'
                ? 'คลังความรู้สำหรับค่อย ๆ ทำความเข้าใจจิตใจผ่านจิตวิทยา จิตวิเคราะห์ ปรัชญา และวิทยาศาสตร์—โดยรักษาความซับซ้อนของมนุษย์ไว้'
                : 'A knowledge archive for studying mind through psychology, psychoanalysis, philosophy, and science—without sanding away human complexity.'}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href={`/${localeKey}/articles/shadow-is-not-just-the-dark-side`}
              >
                {localeKey === 'th'
                  ? 'เริ่มอ่านจาก Shadow'
                  : 'Begin with the Shadow'}
              </Button>
              <Button href={`/${localeKey}/concepts`} variant="secondary">
                {localeKey === 'th'
                  ? 'สำรวจคลังแนวคิด'
                  : 'Explore the concept archive'}
              </Button>
            </div>
            {localeKey === 'en' ? (
              <p className="type-meta mt-5 max-w-xl text-muted">
                English translations are being reviewed. The complete published
                corpus is currently available in{' '}
                <Link
                  href="/th"
                  hrefLang="th"
                  className="text-accent underline decoration-accent/40 underline-offset-4"
                >
                  Thai
                </Link>
                .
              </p>
            ) : null}
          </div>

          <figure className="relative min-h-80 lg:min-h-[34rem]">
            <div className="home-compass" aria-hidden="true">
              <span className="home-compass__ring home-compass__ring--outer" />
              <span className="home-compass__ring home-compass__ring--middle" />
              <span className="home-compass__ring home-compass__ring--inner" />
              <span className="home-compass__line" />
              <span className="home-compass__line home-compass__line--horizontal" />
              <span className="home-compass__line home-compass__line--diagonal" />
              <span className="home-compass__line home-compass__line--diagonal-reverse" />
              <span className="home-compass__needle" />
              <span className="home-compass__centre" />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 mx-auto max-w-sm border-t border-border pt-5 text-center text-sm leading-7 text-muted lg:text-left">
              {localeKey === 'th'
                ? 'เข็มทิศมีไว้ช่วยกำหนดทิศ ไม่ได้ใช้ตัดสินว่ามนุษย์คนหนึ่งเป็นอะไร'
                : 'A compass helps orient inquiry; it does not decide what a person is.'}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="border-b border-border bg-surface px-5 py-16 sm:px-8 md:py-24"
        aria-labelledby="domains-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(20rem,0.55fr)] lg:items-end lg:justify-between">
            <h2 id="domains-heading" className="type-page-title max-w-2xl text-text">
              {localeKey === 'th'
                ? 'แผนที่ความคิดหลายสำนัก'
                : 'A map across traditions'}
            </h2>
            <p className="max-w-xl text-text-soft lg:justify-self-end">
              {localeKey === 'th'
                ? 'เลือกประตูบานหนึ่ง แล้วค่อยตามความเชื่อมโยงไปยังแนวคิด บทความ และแหล่งต้นทาง'
                : 'Choose one doorway, then follow its connections into concepts, essays, and source material.'}
            </p>
          </div>

          <nav
            className="category-compass-grid"
            aria-label={
              localeKey === 'th'
                ? 'หมวดความรู้หลัก'
                : 'Primary knowledge domains'
            }
          >
            {homeCategoryIds.map((categoryId) => {
              const category = categories[categoryId];
              const route =
                categoryRoutes[categoryId] ??
                `/concepts?category=${categoryId}`;

              return (
                <Link
                  key={categoryId}
                  href={`/${localeKey}${route}`}
                  className="category-compass-link group"
                >
                  <span
                    className="category-compass-mark"
                    style={{ color: category.color }}
                    aria-hidden="true"
                  >
                    {categoryMarks[categoryId]}
                  </span>
                  <span className="min-w-0">
                    <span className="type-card-title block text-text transition-colors duration-200 group-hover:text-accent">
                      {category.name[localeKey]}
                    </span>
                    <span className="mt-2 block text-sm leading-7 text-muted sm:text-base">
                      {category.description[localeKey]}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="category-compass-arrow"
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24"
        aria-labelledby="featured-heading"
      >
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="featured-heading" className="type-page-title text-text">
              {localeKey === 'th' ? 'บทความคัดสรร' : 'Selected essays'}
            </h2>
            <p className="mt-3 max-w-2xl text-text-soft">
              {localeKey === 'th'
                ? 'บทอ่านที่ชวนเริ่มจากคำถาม แล้วค่อยลงลึกไปยังกรอบคิดและหลักฐาน'
                : 'Essays that begin with a question, then move carefully into frameworks and evidence.'}
            </p>
          </div>
          <Button href={`/${localeKey}/articles`} variant="ghost">
            {localeKey === 'th' ? 'เปิดคลังบทความ' : 'Open the essay archive'} →
          </Button>
        </div>

        {featuredArticles.length > 0 ? (
          <div className="grid gap-x-10 md:grid-cols-2">
            {featuredArticles.map((article, index) => (
              <div
                key={article.slug}
                className={index === 0 ? 'md:col-span-2' : undefined}
              >
                <ArticleCard
                  article={article}
                  locale={localeKey}
                  featured={index === 0}
                  headingLevel="h3"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="border-y border-border py-10 text-muted">
            {localeKey === 'th'
              ? 'ยังไม่มีบทความที่เผยแพร่'
              : 'No published articles yet.'}
          </p>
        )}
      </section>

      <section className="border-y border-border bg-surface-raised px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(15rem,0.52fr)_minmax(0,1.48fr)] lg:items-start">
          <div>
            <p className="font-serif text-lg text-accent">
              {localeKey === 'th' ? 'อ่านอย่างเป็นลำดับ' : 'A guided reading path'}
            </p>
            <h2 className="type-section-title mt-3 text-text">
              {localeKey === 'th'
                ? 'เมื่อยังไม่แน่ใจว่าจะเริ่มตรงไหน'
                : 'When you are unsure where to begin'}
            </h2>
            <p className="mt-4 max-w-lg text-text-soft">
              {localeKey === 'th'
                ? 'เริ่มด้วยชุดการอ่านที่จัดแนวคิด บทความ และแหล่งอ้างอิงไว้ให้ค่อย ๆ ทำความเข้าใจทีละชั้น'
                : 'Start with an ordered sequence of concepts, essays, and references that builds understanding layer by layer.'}
            </p>
          </div>

          {recommendedSeries ? (
            <Link
              href={`/${localeKey}/series/${recommendedSeries.slug}`}
              className="group border-y border-border py-7 focus-visible:outline-offset-8"
            >
              <div className="type-meta flex flex-wrap items-center gap-x-5 gap-y-2 text-muted">
                <span>
                  {recommendedSeries.itemCount}{' '}
                  {localeKey === 'th' ? 'ลำดับการอ่าน' : 'readings'}
                </span>
                <span>
                  {recommendedSeries.estimatedReadingTime}{' '}
                  {localeKey === 'th'
                    ? 'นาทีโดยประมาณ'
                    : 'estimated minutes'}
                </span>
              </div>
              <h3 className="type-page-title mt-4 text-text transition-colors duration-200 group-hover:text-accent">
                {recommendedSeries.title}
              </h3>
              <p className="mt-3 max-w-3xl text-text-soft">
                {recommendedSeries.subtitle}
              </p>
              <span className="mt-6 inline-flex min-h-11 items-center font-medium text-accent">
                {localeKey === 'th'
                  ? 'เปิดเส้นทางการอ่าน'
                  : 'Open the reading path'}{' '}
                →
              </span>
            </Link>
          ) : (
            <Link
              href={`/${localeKey}/series`}
              className="group border-y border-border py-8"
            >
              <span className="type-section-title text-text transition-colors duration-200 group-hover:text-accent">
                {localeKey === 'th'
                  ? 'สำรวจชุดการอ่านทั้งหมด'
                  : 'Explore all reading paths'}
              </span>
              <span className="ml-3 text-accent" aria-hidden="true">
                →
              </span>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

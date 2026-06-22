import Link from 'next/link';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { HomeMotion } from '@/components/motion/HomeMotion';
import { Button } from '@/components/ui/Button';
import { getPublishedArticles } from '@/lib/articles';
import { getPublishedConcepts } from '@/lib/concepts';
import { categories } from '@/lib/content/categories';
import { getPublishedSeries } from '@/lib/series';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = locale === 'en' ? 'en' : 'th';
  const [articles, concepts, series] = await Promise.all([
    getPublishedArticles(localeKey),
    getPublishedConcepts(localeKey),
    getPublishedSeries(localeKey),
  ]);
  const featuredArticles = [
    ...articles.filter((article) => article.featured),
    ...articles.filter((article) => !article.featured),
  ].slice(0, 3);
  const conceptPreview = concepts.slice(0, 5);
  const recommendedSeries = series[0];
  const entryPaths = [
    {
      href: `/${localeKey}/articles`,
      title: localeKey === 'th' ? 'บทความ' : 'Articles',
      description:
        localeKey === 'th'
          ? 'อ่านข้อถกเถียงและคำอธิบายเชิงลึกแบบจบเป็นเรื่อง'
          : 'Read sustained arguments and long-form explanations.',
    },
    {
      href: `/${localeKey}/concepts`,
      title: localeKey === 'th' ? 'แนวคิด / วิกิ' : 'Concepts / Wiki',
      description:
        localeKey === 'th'
          ? 'แยกความหมายของคำและติดตามความสัมพันธ์ระหว่างแนวคิด'
          : 'Distinguish terms and follow relationships between ideas.',
    },
    {
      href: `/${localeKey}/series`,
      title: localeKey === 'th' ? 'ชุดการอ่าน' : 'Series',
      description:
        localeKey === 'th'
          ? 'เรียนตามลำดับที่จัดไว้เพื่อสร้างความเข้าใจทีละชั้น'
          : 'Build understanding through deliberately ordered reading paths.',
    },
    {
      href: `/${localeKey}/resources`,
      title: localeKey === 'th' ? 'แหล่งอ้างอิง' : 'Resources',
      description:
        localeKey === 'th'
          ? 'ตรวจที่มาจากต้นฉบับ งานวิชาการ และบรรณานุกรม'
          : 'Trace primary texts, scholarship, and bibliography.',
    },
  ];

  return (
    <div className="flex flex-col" data-home-motion>
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-center">
        <div>
          <p className="type-meta mb-5 max-w-xl font-medium text-accent" data-motion-hero>
            {localeKey === 'th'
              ? 'คลังความรู้สองภาษาเพื่อศึกษาจิตใจอย่างมีบริบท'
              : 'A bilingual knowledge archive for studying mind in context'}
          </p>
          <h1 className="type-display max-w-4xl text-text" data-motion-hero>
            {localeKey === 'th'
              ? 'อ่านจิตใจมนุษย์โดยไม่ลดทอนให้เหลือเพียงป้ายกำกับ'
              : 'Study the human psyche without reducing people to labels'}
          </h1>
          <p className="type-lead mt-7 text-text-soft" data-motion-hero>
            {localeKey === 'th'
              ? 'พื้นที่สำหรับอ่านจิตวิทยา จิตวิเคราะห์ ประสาทวิทยาศาสตร์ ปรัชญา และทฤษฎีที่กำลังพัฒนา—พร้อมแยกแหล่งที่มา ข้อเท็จจริง และการตีความออกจากกัน'
              : 'A place to read psychology, psychoanalysis, neuroscience, philosophy, and developing theory—with sources, evidence, and interpretation kept distinct.'}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-motion-hero>
            <Button href={`/${localeKey}/articles`}>
              {localeKey === 'th' ? 'เริ่มจากบทความ' : 'Start with articles'}
            </Button>
            <Button href={`/${localeKey}/series`} variant="secondary">
              {localeKey === 'th' ? 'เลือกเส้นทางการอ่าน' : 'Choose a reading path'}
            </Button>
          </div>
          {localeKey === 'en' ? (
            <p className="type-meta mt-5 max-w-xl text-muted" data-motion-hero>
              English translations are being reviewed. The complete published corpus is currently
              available in{' '}
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

        <aside
          className="relative min-h-72 overflow-hidden rounded-lg border border-border bg-surface p-6 sm:p-8"
          data-motion-hero
        >
          <HomeMotion />
          <div className="relative z-10 max-w-xs">
            <h2 className="type-section-title text-text">
              {localeKey === 'th' ? 'เข็มทิศ ไม่ใช่คำตอบสำเร็จรูป' : 'A compass, not a final answer'}
            </h2>
            <p className="mt-4 text-text-soft">
              {localeKey === 'th'
                ? 'ใช้คลังนี้เพื่อเปรียบเทียบกรอบคิด กลับไปหาต้นฉบับ และสร้างคำถามที่แม่นยำขึ้น'
                : 'Use this archive to compare frameworks, return to sources, and form sharper questions.'}
            </p>
          </div>
        </aside>
      </section>

      <section className="border-y border-border bg-surface px-5 py-14 sm:px-8" data-motion-reveal>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <h2 className="type-section-title text-text">
              {localeKey === 'th' ? 'เลือกวิธีเข้าสู่คลัง' : 'Choose how to enter the archive'}
            </h2>
            <p className="mt-3 text-text-soft">
              {localeKey === 'th'
                ? 'แต่ละทางตอบโจทย์การอ่านคนละแบบ และเชื่อมกลับหากันได้เสมอ'
                : 'Each path supports a different kind of inquiry and remains connected to the others.'}
            </p>
          </div>
          <nav className="grid border-b border-border md:grid-cols-2" aria-label="Archive entry paths" data-motion-group>
            {entryPaths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group grid min-h-36 grid-cols-[minmax(0,1fr)_auto] gap-6 border-t border-border py-6 md:odd:pr-8 md:even:border-l md:even:pl-8"
                data-motion-item
              >
                <span>
                  <span className="type-card-title block text-text transition-colors group-hover:text-accent">
                    {path.title}
                  </span>
                  <span className="mt-3 block max-w-md text-text-soft">{path.description}</span>
                </span>
                <span aria-hidden="true" className="self-center text-accent transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24" data-motion-reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
            <div>
              <h2 className="type-section-title text-text">
                {localeKey === 'th' ? 'เส้นทางแนะนำ' : 'Recommended learning path'}
              </h2>
              <p className="mt-4 max-w-lg text-text-soft">
                {localeKey === 'th'
                  ? 'ถ้ายังไม่แน่ใจว่าจะเริ่มตรงไหน ให้เริ่มด้วยชุดการอ่านที่จัดลำดับแนวคิด บทความ และแหล่งต้นทางไว้แล้ว'
                  : 'If you are unsure where to begin, start with a sequence that already orders concepts, articles, and source material.'}
              </p>
            </div>
            {recommendedSeries ? (
              <Link
                href={`/${localeKey}/series/${recommendedSeries.slug}`}
                className="group border-y border-border py-7"
              >
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-muted">
                  <span className="type-meta">{recommendedSeries.itemCount} {localeKey === 'th' ? 'ลำดับการอ่าน' : 'readings'}</span>
                  <span className="type-meta">{recommendedSeries.estimatedReadingTime} {localeKey === 'th' ? 'นาทีโดยประมาณ' : 'estimated minutes'}</span>
                </div>
                <h3 className="type-page-title mt-4 text-text transition-colors group-hover:text-accent">
                  {recommendedSeries.title}
                </h3>
                <p className="mt-3 max-w-3xl text-text-soft">{recommendedSeries.subtitle}</p>
                <span className="mt-6 inline-flex min-h-11 items-center font-medium text-accent">
                  {localeKey === 'th' ? 'เปิดเส้นทางการอ่าน' : 'Open the reading path'} →
                </span>
              </Link>
            ) : (
              <ol className="border-b border-border">
                {[
                  [`/${localeKey}/concepts`, localeKey === 'th' ? 'เริ่มจากแนวคิดหลัก' : 'Begin with core concepts'],
                  [`/${localeKey}/articles`, localeKey === 'th' ? 'อ่านข้อถกเถียงเชิงลึก' : 'Read long-form arguments'],
                  [`/${localeKey}/resources`, localeKey === 'th' ? 'ย้อนตรวจแหล่งต้นทาง' : 'Return to the source material'],
                ].map(([href, title], index) => (
                  <li key={href} className="border-t border-border">
                    <Link href={href} className="group grid min-h-20 grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4">
                      <span className="type-meta text-muted">{index + 1}</span>
                      <span className="font-medium text-text transition-colors group-hover:text-accent">{title}</span>
                      <span aria-hidden="true" className="text-accent">→</span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
      </section>

      <section className="border-y border-border bg-surface px-5 py-16 sm:px-8 md:py-20" data-motion-reveal>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)]">
          <div>
            <h2 className="type-section-title text-text">
              {localeKey === 'th' ? 'แนวคิดเป็นเครือข่าย' : 'Concepts form a network'}
            </h2>
            <p className="mt-4 text-text-soft">
              {localeKey === 'th'
                ? 'แต่ละโหนดมีคำจำกัดความ โดเมน และแนวคิดที่เกี่ยวข้อง เพื่อให้เห็นความต่างและความเชื่อมโยงพร้อมกัน'
                : 'Each node carries a definition, domain, and related ideas so distinctions and connections remain visible together.'}
            </p>
            <Button href={`/${localeKey}/concepts`} variant="ghost" className="mt-5">
              {localeKey === 'th' ? 'เปิดแผนที่แนวคิด' : 'Open the concept map'} →
            </Button>
          </div>
          <div className="border-b border-border" data-motion-group>
            {conceptPreview.length > 0
              ? conceptPreview.map((concept) => (
                  <Link
                    key={concept.slug}
                    href={`/${localeKey}/concepts/${concept.slug}`}
                    className="group grid gap-3 border-t border-border py-5 sm:grid-cols-[minmax(10rem,0.45fr)_minmax(0,1fr)]"
                    data-motion-item
                  >
                    <span className="type-card-title text-text transition-colors group-hover:text-accent">
                      {concept.title}
                    </span>
                    <span>
                      <span className="block text-text-soft">{concept.shortDefinition}</span>
                      {concept.relatedConcepts.length > 0 ? (
                        <span className="type-meta mt-2 block text-muted">
                          {localeKey === 'th' ? 'เชื่อมกับ' : 'Connected to'}{' '}
                          {concept.relatedConcepts.slice(0, 2).map((item) => item.title).join(' · ')}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                ))
              : Object.values(categories).slice(0, 5).map((category) => (
                  <Link
                    key={category.id}
                    href={`/${localeKey}/concepts?category=${category.id}`}
                    className="group grid gap-3 border-t border-border py-5 sm:grid-cols-[minmax(10rem,0.45fr)_minmax(0,1fr)]"
                    data-motion-item
                  >
                    <span className="type-card-title text-text transition-colors group-hover:text-accent">
                      {category.name[localeKey]}
                    </span>
                    <span className="text-text-soft">{category.description[localeKey]}</span>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24" data-motion-reveal>
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <h2 className="type-section-title text-text">
              {localeKey === 'th' ? 'บทความแนะนำ' : 'Featured articles'}
            </h2>
            <p className="mt-3 text-text-soft">
              {localeKey === 'th' ? 'บทอ่านสำหรับเริ่มต้นสำรวจคำถามสำคัญ' : 'Long-form starting points for consequential questions.'}
            </p>
          </div>
          <Button href={`/${localeKey}/articles`} variant="ghost">
            {localeKey === 'th' ? 'ดูทั้งหมด' : 'View all'} →
          </Button>
        </div>
        {featuredArticles.length > 0 ? (
          <div className="grid gap-x-8 md:grid-cols-2" data-motion-group>
            {featuredArticles.map((article, index) => (
              <div
                key={article.slug}
                className={index === 0 ? 'md:col-span-2' : undefined}
                data-motion-item
              >
                <ArticleCard article={article} locale={localeKey} featured={index === 0} />
              </div>
            ))}
          </div>
        ) : (
          <p className="border-y border-border py-10 text-muted">
            {localeKey === 'th' ? 'ยังไม่มีบทความที่เผยแพร่' : 'No published articles yet.'}
          </p>
        )}
      </section>

      <section className="border-y border-border bg-surface-raised px-5 py-16 sm:px-8" data-motion-reveal>
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="type-section-title text-text">
              {localeKey === 'th' ? 'เราไม่ได้สร้างคำตอบที่ง่ายลง' : 'We are not building simpler answers'}
            </h2>
            <p className="type-lead mt-4 text-text-soft">
              {localeKey === 'th'
                ? 'The Soul’s Compass สร้างพื้นที่ให้ความคิดที่ซับซ้อนยังคงซับซ้อนได้—แต่เข้าถึง ตรวจสอบ และเชื่อมโยงได้ดีขึ้น'
                : 'The Soul’s Compass lets difficult ideas remain difficult—while making them more approachable, traceable, and connected.'}
            </p>
          </div>
          <Button href={`/${localeKey}/manifesto`} variant="secondary">
            {localeKey === 'th' ? 'อ่านเจตนารมณ์' : 'Read the manifesto'}
          </Button>
        </div>
      </section>
    </div>
  );
}

import { getT } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { categories } from '@/lib/content/categories';
import { getPublishedArticles } from '@/lib/articles';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);
  const articles = await getPublishedArticles(localeKey);
  const featuredArticles = [
    ...articles.filter((article) => article.featured),
    ...articles.filter((article) => !article.featured),
  ].slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="type-display mb-6 text-text">
            {localeKey === 'th' ? (
              <>
                พื้นที่สำหรับอ่าน<em className="text-accent not-italic">จิตใจ</em>มนุษย์
              </>
            ) : (
              <>
                A space for understanding the <em className="text-accent not-italic">human psyche</em>
              </>
            )}
          </h1>
          <p className="type-lead mx-auto mb-8 text-muted">
            {t.meta.siteTagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={`/${localeKey}/manifesto`} variant="primary">
              {t.nav.manifesto}
            </Button>
            <Button href={`/${localeKey}/about`} variant="secondary">
              {t.nav.about}
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto border-t border-border px-5 py-16 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="type-section-title mb-8 text-center text-text">
            {localeKey === 'th' ? 'สำรวจตามหมวดหมู่' : 'Explore by Category'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(categories).map((category) => (
              <Link
                key={category.id}
                href={`/${localeKey}/concepts?category=${category.id}`}
                className="block h-full"
              >
                <Card hover className="h-full">
                  <div className="flex flex-col gap-2">
                    <div
                      className="w-12 h-1 rounded-full mb-2"
                      style={{ backgroundColor: category.color }}
                    />
                    <h3 className="type-card-title text-text">
                      {category.name[localeKey]}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {category.description[localeKey]}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-5 py-16 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="type-section-title text-text">
              {localeKey === 'th' ? 'บทความแนะนำ' : 'Featured Articles'}
            </h2>
            <Button href={`/${localeKey}/articles`} variant="ghost">
              {t.ui.viewAll} →
            </Button>
          </div>
          {featuredArticles.length > 0 ? (
            <div className="grid gap-x-8 md:grid-cols-2">
              {featuredArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={localeKey}
                />
              ))}
            </div>
          ) : (
            <p className="border-y border-border py-10 text-muted">
              {localeKey === 'th'
                ? 'ยังไม่มีบทความที่เผยแพร่'
                : 'No published articles yet.'}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

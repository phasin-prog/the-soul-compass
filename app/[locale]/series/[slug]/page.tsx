import type { Metadata } from 'next';
import { getT } from '@/lib/i18n';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { categories } from '@/lib/content/categories';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  // TODO: Implement when we have real series
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';

  return {
    title: 'Series Title',
    description: 'Series description',
  };
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  const category = categories['analytical-psychology'];

  return (
    <div className="container mx-auto px-5 py-16 sm:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Series Header */}
        <header className="mb-12">
          <div
            className="w-16 h-1 rounded-full mb-6"
            style={{ backgroundColor: category.color }}
          />
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="accent">{category.name[localeKey]}</Badge>
            <Badge>{t.series.status.active}</Badge>
          </div>
          <h1 className="type-page-title mb-6 text-text">
            {localeKey === 'th' ? 'ชื่อซีรีส์ตัวอย่าง' : 'Sample Series Title'}
          </h1>
          <p className="type-lead text-muted">
            {localeKey === 'th'
              ? 'คำอธิบายของซีรีส์บทความ เนื้อหาจริงจะถูกเพิ่มเข้ามาในภายหลัง'
              : 'Description of the article series. Real content will be added later.'}
          </p>
        </header>

        {/* Articles in Series */}
        <section>
          <h2 className="type-section-title mb-6 text-text">
            {t.series.articles}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} hover className="opacity-50">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-ink">
                    {i}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 h-6 w-3/4 rounded-md bg-surface-soft" />
                    <div className="h-12 w-full rounded-md bg-surface-soft" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

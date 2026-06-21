import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { categories } from '@/lib/content/categories';
import { getT } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Placeholder
async function getConcept(slug: string) {
  return null;
}

export async function generateStaticParams() {
  // TODO: Implement when we have real concepts
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';

  return {
    title: 'Concept Term',
    description: 'Concept definition',
  };
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  // Placeholder data
  const category = categories['analytical-psychology'];

  return (
    <div className="container mx-auto px-5 py-16 sm:px-8">
      <article className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div
              className="w-12 h-1 rounded-full mb-6"
              style={{ backgroundColor: category.color }}
            />

            <h1 className="type-page-title mb-4 text-text">
              {localeKey === 'th' ? 'แนวคิดตัวอย่าง' : 'Sample Concept'}
            </h1>

            <div className="mb-8">
              <Badge variant="accent">{category.name[localeKey]}</Badge>
            </div>

            {/* Definition */}
            <section className="mb-12">
              <h2 className="type-section-title mb-4 text-text">
                {t.concept.definition}
              </h2>
              <p className="type-lead text-muted">
                {localeKey === 'th'
                  ? 'คำนิยามของแนวคิดจะปรากฏที่นี่ เนื้อหาจริงจะถูกเพิ่มเข้ามาในภายหลัง'
                  : 'The definition of the concept will appear here. Real content will be added later.'}
              </p>
            </section>

            {/* Extended Explanation */}
            <section className="mb-12">
              <p className="mb-6 leading-[1.82] text-text-soft">
                {localeKey === 'th'
                  ? 'คำอธิบายเพิ่มเติมเกี่ยวกับแนวคิดนี้ รวมถึงบริบทประวัติศาสตร์ การใช้งานในทฤษฎี และความสำคัญในจิตวิทยาเชิงลึก'
                  : 'Extended explanation about this concept, including historical context, usage in theory, and significance in depth psychology.'}
              </p>
            </section>

            {/* References */}
            <section className="mb-12">
              <h2 className="type-section-title mb-4 text-text">
                {t.concept.relatedArticles}
              </h2>
              <p className="text-muted">
                {localeKey === 'th'
                  ? 'รายการอ้างอิงจะปรากฏที่นี่'
                  : 'References will appear here'}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Related Concepts */}
              <Card className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-text">
                  {t.concept.relatedConcepts}
                </h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-sm leading-relaxed text-muted">
                      {localeKey === 'th' ? 'แนวคิดที่เกี่ยวข้อง' : 'Related Concept'} {i}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Related Articles */}
              <Card>
                <h3 className="mb-3 text-sm font-semibold text-text">
                  {t.concept.relatedArticles}
                </h3>
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="text-sm leading-relaxed text-muted">
                      {localeKey === 'th' ? 'บทความที่เกี่ยวข้อง' : 'Related Article'} {i}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}

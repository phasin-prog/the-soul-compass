import type { Metadata } from 'next';
import { getT } from '@/lib/i18n';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  return {
    title: t.nav.resources,
    description:
      localeKey === 'th'
        ? 'แหล่งอ้างอิง หนังสือ และทรัพยากรสำหรับศึกษาจิตวิทยา ประสาทวิทยาศาสตร์ และปรัชญา'
        : 'References, books, and resources for studying psychology, neuroscience, and philosophy',
  };
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  return (
    <div className="container mx-auto px-5 py-16 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="type-page-title mb-4 text-text">
            {t.nav.resources}
          </h1>
          <p className="type-lead text-muted">
            {localeKey === 'th'
              ? 'แหล่งอ้างอิง หนังสือ บทความวิชาการ และทรัพยากรจากจิตวิทยาหลายสำนัก ประสาทวิทยาศาสตร์ สังคมศาสตร์ และปรัชญา'
              : 'References, books, academic papers, and resources across psychology, neuroscience, social science, and philosophy'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-border pb-8">
          <Badge variant="accent">{t.ui.viewAll}</Badge>
          <Badge>{localeKey === 'th' ? 'หนังสือ' : 'Books'}</Badge>
          <Badge>{localeKey === 'th' ? 'บทความ' : 'Papers'}</Badge>
          <Badge>{localeKey === 'th' ? 'วิดีโอ' : 'Videos'}</Badge>
          <Badge>{localeKey === 'th' ? 'เว็บไซต์' : 'Websites'}</Badge>
        </div>

        {/* Resources by Category */}
        <div className="space-y-12">
          {/* Books */}
          <section>
            <h2 className="type-section-title mb-6 text-text">
              {localeKey === 'th' ? 'หนังสือแนะนำ' : 'Recommended Books'}
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="opacity-50">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 h-6 w-3/4 rounded-md bg-surface-soft" />
                        <div className="mb-3 h-4 w-1/2 rounded-md bg-surface-soft" />
                        <div className="h-12 w-full rounded-md bg-surface-soft" />
                      </div>
                      <Badge>
                        {localeKey === 'th' ? 'หนังสือ' : 'Book'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Papers */}
          <section>
            <h2 className="type-section-title mb-6 text-text">
              {localeKey === 'th' ? 'บทความวิชาการ' : 'Academic Papers'}
            </h2>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="opacity-50">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 h-6 w-3/4 rounded-md bg-surface-soft" />
                        <div className="mb-3 h-4 w-1/2 rounded-md bg-surface-soft" />
                      </div>
                      <Badge>
                        {localeKey === 'th' ? 'บทความ' : 'Paper'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <p className="text-muted">{t.ui.comingSoon}</p>
        </div>
      </div>
    </div>
  );
}

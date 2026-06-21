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
    title: t.nav.series,
    description:
      localeKey === 'th'
        ? 'ซีรีส์บทความที่เรียงลำดับอย่างมีเหตุผล'
        : 'Curated article series in logical order',
  };
}

export default async function SeriesListingPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  return (
    <div className="container mx-auto px-5 py-16 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="type-page-title mb-4 text-text">
            {t.nav.series}
          </h1>
          <p className="type-lead text-muted">
            {localeKey === 'th'
              ? 'ซีรีส์บทความที่เรียงลำดับอย่างมีเหตุผล สำหรับศึกษาหัวข้อเชิงลึก'
              : 'Curated article series in logical order for in-depth study'}
          </p>
        </div>

        {/* Series Grid - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} hover className="opacity-50">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="accent">
                    {t.series.status.active}
                  </Badge>
                  <span className="type-meta text-muted">
                    {i * 3} {t.nav.articles}
                  </span>
                </div>
                <div className="h-10 w-full rounded-md bg-surface-soft" />
                <div className="h-16 w-full rounded-md bg-surface-soft" />
              </div>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <p className="text-muted">{t.ui.comingSoon}</p>
        </div>
      </div>
    </div>
  );
}

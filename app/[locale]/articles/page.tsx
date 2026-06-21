import type { Metadata } from 'next';
import { getT } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  return {
    title: t.nav.articles,
    description: siteConfig.description[localeKey],
  };
}

export default async function ArticlesPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  return (
    <div className="container mx-auto px-5 py-16 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="type-page-title mb-4 text-text">
            {t.nav.articles}
          </h1>
          <p className="type-lead text-muted">
            {localeKey === 'th'
              ? 'บทความเกี่ยวกับจิตวิทยาเชิงลึก จิตวิเคราะห์ และปรัชญา'
              : 'Articles on depth psychology, psychoanalysis, and philosophy'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-border pb-8">
          <Badge variant="accent">{t.ui.viewAll}</Badge>
          <Badge>{t.categories.analyticalPsychology}</Badge>
          <Badge>{t.categories.psychoanalysis}</Badge>
          <Badge>{t.categories.philosophy}</Badge>
          <Badge>{t.categories.typology}</Badge>
          <Badge>{t.categories.tpdt}</Badge>
        </div>

        {/* Articles Grid - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} hover className="opacity-50">
              <div className="flex flex-col gap-3">
                <div className="h-6 w-24 rounded-full bg-surface-soft" />
                <div className="h-12 w-full rounded-md bg-surface-soft" />
                <div className="h-16 w-full rounded-md bg-surface-soft" />
                <div className="flex gap-2 mt-2">
                  <div className="h-4 w-24 rounded-md bg-surface-soft" />
                  <div className="h-4 w-16 rounded-md bg-surface-soft" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="mt-12 text-center">
          <p className="text-muted">
            {localeKey === 'th'
              ? 'บทความจะเปิดให้อ่านเร็วๆ นี้'
              : 'Articles coming soon'}
          </p>
        </div>
      </div>
    </div>
  );
}

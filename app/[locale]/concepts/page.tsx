import type { Metadata } from 'next';
import { getT } from '@/lib/i18n';
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
    title: t.nav.concepts,
    description:
      localeKey === 'th'
        ? 'คลังแนวคิดและศัพท์เฉพาะทางจิตวิทยาเชิงลึก'
        : 'Glossary of depth psychology concepts and terms',
  };
}

export default async function ConceptsPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  return (
    <div className="container mx-auto px-5 py-16 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="type-page-title mb-4 text-text">
            {t.nav.concepts}
          </h1>
          <p className="type-lead text-muted">
            {localeKey === 'th'
              ? 'คลังแนวคิดและศัพท์เฉพาะทางจิตวิทยาเชิงลึก จิตวิเคราะห์ และปรัชญา'
              : 'A glossary of concepts and terms in depth psychology, psychoanalysis, and philosophy'}
          </p>
        </div>

        {/* Search Box - Placeholder */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder={t.ui.search}
              disabled
              className="min-h-12 w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-text placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-border pb-8">
          <Badge variant="accent">{t.ui.viewAll}</Badge>
          <Badge>{t.categories.analyticalPsychology}</Badge>
          <Badge>{t.categories.psychoanalysis}</Badge>
          <Badge>{t.categories.philosophy}</Badge>
        </div>

        {/* Concepts Grid - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <Card key={i} hover className="opacity-50">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="h-6 w-32 rounded-md bg-surface-soft" />
                  <div className="h-5 w-16 rounded-full bg-surface-soft" />
                </div>
                <div className="h-10 w-full rounded-md bg-surface-soft" />
              </div>
            </Card>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="mt-12 text-center">
          <p className="text-muted">
            {localeKey === 'th'
              ? 'แนวคิดจะเปิดให้อ่านเร็วๆ นี้'
              : 'Concepts coming soon'}
          </p>
        </div>
      </div>
    </div>
  );
}

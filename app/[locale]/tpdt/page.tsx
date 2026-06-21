import type { Metadata } from 'next';
import { categories } from '@/lib/content/categories';
import { CategoryPage } from '@/components/CategoryPage';
import { WarningBanner } from '@/components/WarningBanner';
import { getT } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const category = categories['tpdt'];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';

  return {
    title: category.name[localeKey],
    description: category.description[localeKey],
  };
}

export default async function TPDTPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  return (
    <CategoryPage category={category} locale={localeKey}>
      <div className="max-w-3xl mx-auto">
        <WarningBanner
          message={t.tpdt.statusLabel}
          description={t.tpdt.statusDescription}
        />
        <div className="text-center py-12">
          <p className="text-muted">
            {localeKey === 'th'
              ? 'เนื้อหาจะเปิดให้อ่านเมื่อทฤษฎีพร้อม'
              : 'Content will be available when the theory is ready'}
          </p>
        </div>
      </div>
    </CategoryPage>
  );
}

import type { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { WarningBanner } from '@/components/WarningBanner';
import { generateCategoryMetadata } from '@/lib/category-page';
import { categories } from '@/lib/content/categories';
import { getT } from '@/lib/i18n';
import { parseLocale } from '@/lib/locale';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const category = categories.tpdt;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateCategoryMetadata('tpdt', locale);
}

export default async function TPDTPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = parseLocale(locale);
  const t = getT(localeKey);

  return (
    <CategoryPage category={category} locale={localeKey}>
      <div className="mx-auto max-w-3xl">
        <WarningBanner
          message={t.tpdt.statusLabel}
          description={t.tpdt.statusDescription}
        />
      </div>
    </CategoryPage>
  );
}

import type { Metadata } from 'next';
import { categories } from '@/lib/content/categories';
import { CategoryPage } from '@/components/CategoryPage';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const category = categories['analytical-psychology'];

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

export default async function AnalyticalPsychologyPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';

  return <CategoryPage category={category} locale={localeKey} />;
}

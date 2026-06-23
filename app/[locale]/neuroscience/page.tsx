import type { Metadata } from 'next';
import { categories } from '@/lib/content/categories';
import { CategoryPage } from '@/components/CategoryPage';
import { generateCategoryMetadata } from '@/lib/category-page';
import { parseLocale } from '@/lib/locale';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const category = categories['neuroscience'];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateCategoryMetadata('neuroscience', locale);
}

export default async function NeurosciencePage({ params }: PageProps) {
  const { locale } = await params;
  return <CategoryPage category={category} locale={parseLocale(locale)} />;
}

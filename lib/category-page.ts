import type { Metadata } from 'next';
import type { CategoryId } from '@/lib/content/categories';
import { categories } from '@/lib/content/categories';
import { parseLocale } from '@/lib/locale';

/**
 * Generate metadata for a category page given its ID and raw locale param.
 */
export function generateCategoryMetadata(
  categoryId: CategoryId,
  rawLocale: string
): Metadata {
  const locale = parseLocale(rawLocale);
  const category = categories[categoryId];

  return {
    title: category.name[locale],
    description: category.description[locale],
  };
}

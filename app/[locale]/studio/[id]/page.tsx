import { redirect } from 'next/navigation';
import { parseLocale } from '@/lib/locale';

export default async function LegacyEditArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: localeValue, id } = await params;
  const locale = parseLocale(localeValue);
  redirect(`/${locale}/studio/articles/${id}/edit`);
}

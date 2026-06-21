import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/site';

export default async function LegacyEditArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: localeValue, id } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  redirect(`/${locale}/studio/articles/${id}/edit`);
}

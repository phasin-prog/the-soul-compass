import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/site';

export default async function LegacyNewArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  redirect(`/${locale}/studio/articles/new`);
}

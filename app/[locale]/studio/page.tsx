import { redirect } from 'next/navigation';
import { parseLocale } from '@/lib/locale';

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale = parseLocale(localeValue);
  redirect(`/${locale}/studio/articles`);
}

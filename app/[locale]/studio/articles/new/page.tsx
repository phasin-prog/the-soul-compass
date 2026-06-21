import { ArticleStudioEditor } from '@/components/studio/ArticleStudioEditor';
import { requireStudioUser } from '@/lib/auth/studio';
import type { Locale } from '@/lib/site';

export default async function NewStudioArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  await requireStudioUser(locale);

  return (
    <ArticleStudioEditor article={null} backlinks={[]} locale={locale} />
  );
}

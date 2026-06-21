import { ArticleStudioEditor } from '@/components/studio/ArticleStudioEditor';
import { requireStudioUser } from '@/lib/auth/studio';
import { parseLocale } from '@/lib/locale';

export default async function NewStudioArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale = parseLocale(localeValue);
  await requireStudioUser(locale);

  return (
    <ArticleStudioEditor article={null} backlinks={[]} locale={locale} />
  );
}

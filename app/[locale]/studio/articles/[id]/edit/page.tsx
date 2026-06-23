import { redirect } from 'next/navigation';

export default async function LegacyEditStudioArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  redirect(`/${locale}/studio/articles/${id}`);
}

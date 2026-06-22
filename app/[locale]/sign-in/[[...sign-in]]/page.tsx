import { redirect } from 'next/navigation';

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale = localeValue === 'en' ? 'en' : 'th';
  redirect(`/${locale}/login`);
}

import { SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { AuthShell, clerkAppearance } from '@/components/auth/AuthShell';
import type { Locale } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Login',
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';

  return (
    <AuthShell locale={locale} mode="login">
      <SignIn
        path={`/${locale}/login`}
        routing="path"
        signUpUrl={`/${locale}/register`}
        fallbackRedirectUrl={`/${locale}/account`}
        appearance={clerkAppearance}
      />
    </AuthShell>
  );
}

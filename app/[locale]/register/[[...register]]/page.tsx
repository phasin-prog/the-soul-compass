import { SignUp } from '@clerk/nextjs';
import type { Metadata } from 'next';
import {
  AuthShell,
  clerkAppearance,
} from '@/components/auth/AuthShell';
import type { Locale } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Register',
  robots: { index: false, follow: false },
};

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';

  return (
    <AuthShell locale={locale} mode="register">
      <SignUp
        path={`/${locale}/register`}
        routing="path"
        signInUrl={`/${locale}/login`}
        fallbackRedirectUrl={`/${locale}/account`}
        appearance={clerkAppearance}
      />
    </AuthShell>
  );
}

import { ClerkProvider, SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';
import {
  AuthShell,
  clerkAppearance,
  getClerkLocalization,
} from '@/components/auth/AuthShell';
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
    <ClerkProvider
      localization={getClerkLocalization(locale)}
      signInUrl={`/${locale}/login`}
      signUpUrl={`/${locale}/register`}
      afterSignOutUrl={`/${locale}`}
    >
      <AuthShell locale={locale} mode="login">
        <SignIn
          path={`/${locale}/login`}
          routing="path"
          signUpUrl={`/${locale}/register`}
          fallbackRedirectUrl={`/${locale}/account`}
          appearance={clerkAppearance}
        />
      </AuthShell>
    </ClerkProvider>
  );
}

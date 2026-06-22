import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AccountLayout } from '@/components/account/AccountLayout';
import { requireMemberUser } from '@/lib/auth';
import type { Locale } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Account',
  robots: { index: false, follow: false },
};

export default async function MemberAccountLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const user = await requireMemberUser(locale);

  return (
    <AccountLayout locale={locale} user={user}>
      {children}
    </AccountLayout>
  );
}

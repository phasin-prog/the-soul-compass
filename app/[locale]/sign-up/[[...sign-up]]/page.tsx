import { SignUp } from '@clerk/nextjs';
import type { Locale } from '@/lib/site';

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_auto]">
      <div className="max-w-xl">
        <p className="mb-4 text-sm font-medium text-accent">The Soul’s Compass Studio</p>
        <h1 className="type-page-title text-text">
          {locale === 'th' ? 'สร้างบัญชีนักเขียน' : 'Create a writer account'}
        </h1>
        <p className="type-lead mt-6 text-muted">
          {locale === 'th'
            ? 'บัญชีนี้ใช้เข้าถึงคลังบทความส่วนตัวใน R2 และหน้าจัดการการเผยแพร่'
            : 'This account unlocks your private R2 article vault and publishing workspace.'}
        </p>
      </div>
      <SignUp
        path={`/${locale}/sign-up`}
        routing="path"
        signInUrl={`/${locale}/sign-in`}
        fallbackRedirectUrl={`/${locale}/studio`}
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'shadow-none',
            card: 'border border-border bg-surface shadow-none',
            headerTitle: 'text-text',
            headerSubtitle: 'text-muted',
            socialButtonsBlockButton:
              'border-border bg-background text-text hover:bg-surface-raised',
            formFieldLabel: 'text-text-soft',
            formFieldInput:
              'border-border bg-background text-text focus:border-accent',
            footerActionText: 'text-muted',
            footerActionLink: 'text-accent hover:text-accent-strong',
            formButtonPrimary:
              'bg-accent text-accent-ink hover:bg-accent-strong',
          },
        }}
      />
    </div>
  );
}

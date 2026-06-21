import { SignIn } from '@clerk/nextjs';
import type { Locale } from '@/lib/site';

export default async function SignInPage({
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
          {locale === 'th'
            ? 'กลับเข้าสู่ห้องเขียนของคุณ'
            : 'Return to your writing room'}
        </h1>
        <p className="type-lead mt-6 text-muted">
          {locale === 'th'
            ? 'สร้างฉบับร่าง เชื่อมความคิดด้วย Wiki links และเผยแพร่บทความจากพื้นที่เดียว'
            : 'Draft, connect ideas with wiki links, and publish from one quiet workspace.'}
        </p>
      </div>
      <SignIn
        path={`/${locale}/sign-in`}
        routing="path"
        signUpUrl={`/${locale}/sign-up`}
        fallbackRedirectUrl={`/${locale}/studio/articles`}
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

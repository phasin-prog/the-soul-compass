import type { ReactNode } from 'react';
import type { Locale } from '@/lib/site';

interface AuthShellProps {
  children: ReactNode;
  locale: Locale;
  mode: 'login' | 'register';
}

export const clerkAppearance = {
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
} as const;

export function AuthShell({ children, locale, mode }: AuthShellProps) {
  const isLogin = mode === 'login';

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto]">
      <div className="max-w-xl">
        <p className="mb-4 text-sm font-medium text-accent">
          {locale === 'th' ? 'บัญชีนักอ่าน' : 'Reader account'}
        </p>
        <h1 className="type-page-title text-text">
          {locale === 'th'
            ? isLogin
              ? 'กลับสู่ห้องอ่านของคุณ'
              : 'สร้างพื้นที่อ่านส่วนตัว'
            : isLogin
              ? 'Return to your reading room'
              : 'Create your private reading space'}
        </h1>
        <p className="type-lead mt-6 text-muted">
          {locale === 'th'
            ? isLogin
              ? 'เข้าสู่ระบบเพื่อเก็บบทความ แนวคิด และความคืบหน้าการอ่าน โดยเนื้อหาหลักของเว็บไซต์ยังคงเปิดให้อ่านได้โดยไม่ต้องมีบัญชี'
              : 'บัญชีช่วยจัดเก็บบทความ แนวคิด และประวัติการอ่าน เนื้อหาความรู้สาธารณะยังคงอ่านได้โดยไม่ต้องสมัครสมาชิก'
            : isLogin
              ? 'Sign in to collect articles, concepts, and reading progress. The public knowledge library remains open without an account.'
              : 'An account keeps articles, concepts, and reading history together. Public knowledge remains readable without registration.'}
        </p>
      </div>
      {children}
    </div>
  );
}

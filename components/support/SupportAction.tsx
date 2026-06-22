'use client';

import { useUser } from '@clerk/nextjs';
import type { Locale } from '@/lib/site';
import { siteConfig } from '@/lib/site';

interface SupportActionProps {
  locale: Locale;
  showAccountStatus?: boolean;
  tierName?: string;
}

export function SupportAction({
  locale,
  showAccountStatus = true,
  tierName,
}: SupportActionProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const subject =
    locale === 'th'
      ? `สนับสนุน The Soul's Compass${tierName ? ` — ${tierName}` : ''}`
      : `Support The Soul's Compass${tierName ? ` — ${tierName}` : ''}`;
  const body =
    locale === 'th'
      ? `สวัสดีครับ ผม/ฉันสนใจสนับสนุน The Soul's Compass${tierName ? ` ในระดับ ${tierName}` : ''}\n\nชื่อหรือนามแฝง (ไม่บังคับ):\nต้องการแสดงบนกำแพงผู้สนับสนุนหรือไม่: ไม่ / ใช่\n`
      : `Hello, I am interested in supporting The Soul's Compass${tierName ? ` at the ${tierName} tier` : ''}.\n\nName or alias (optional):\nDisplay on the supporter wall: No / Yes\n`;
  const href = `mailto:${siteConfig.social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const label =
    locale === 'th' ? 'ติดต่อเพื่อสนับสนุน' : 'Contact to support';

  return (
    <div>
      <a
        href={href}
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-accent bg-accent px-5 text-sm font-semibold text-accent-ink transition-colors hover:border-accent-strong hover:bg-accent-strong"
      >
        {label}
      </a>
      {showAccountStatus ? (
        <p
          className="mt-3 max-w-md text-sm leading-6 text-muted"
          aria-live="polite"
        >
          {!isLoaded
            ? locale === 'th'
              ? 'กำลังตรวจสถานะบัญชี'
              : 'Checking account status'
            : isSignedIn
              ? locale === 'th'
                ? `เข้าสู่ระบบแล้วในชื่อ ${user.fullName ?? user.username ?? 'สมาชิก'} ระบบชำระเงินจะเชื่อมกับบัญชีนี้ในอนาคต`
                : `Signed in as ${user.fullName ?? user.username ?? 'member'}. Future payments can connect to this account.`
              : locale === 'th'
                ? 'สนับสนุนได้โดยไม่ต้องมีบัญชี หรือเข้าสู่ระบบหากต้องการเชื่อมสถานะผู้สนับสนุนในอนาคต'
                : 'You can support without an account, or sign in to connect future supporter status.'}
        </p>
      ) : null}
    </div>
  );
}

import Link from 'next/link';
import { SoulIcon } from '@/components/icons/SoulIcon';
import type { Locale } from '@/lib/site';
import { getT } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = getT(locale);
  const currentYear = new Date().getFullYear();
  const links = [
    {
      href: `/${locale}/resources`,
      label: locale === 'th' ? 'คลังอ้างอิง' : 'Reference archive',
    },
    {
      href: `/${locale}/external-links`,
      label: locale === 'th' ? 'แหล่งอ่านภายนอก' : 'External reading',
    },
    {
      href: `/${locale}/manifesto`,
      label: locale === 'th' ? 'เจตนารมณ์' : 'Manifesto',
    },
    {
      href: `/${locale}/support`,
      label: locale === 'th' ? 'สนับสนุนโครงการ' : 'Support the project',
    },
    {
      href: `mailto:feedback@thesoulscompass.com`,
      label: locale === 'th' ? 'ส่งความคิดเห็น' : 'Send feedback',
    },
  ];

  return (
    <footer className="mt-auto bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-12">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent-soft text-accent">
                <SoulIcon name="compass" size={18} />
              </span>
              <div>
                <p className="font-medium text-text">
                  {locale === 'th'
                    ? 'สนใจรับบริการวิเคราะห์บุคลิก?'
                    : 'Interested in type analysis?'}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {locale === 'th'
                    ? 'ติดต่อเพื่อสอบถามรายละเอียด นัดหมาย หรือขอคำแนะนำเบื้องต้น'
                    : 'Contact for details, booking, or initial guidance'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/${locale}/support`}
                className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong"
              >
                {locale === 'th' ? 'ติดต่อรับบริการ' : 'Contact for service'}
              </Link>
              <Link
                href={`/${locale}/support`}
                className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-strong"
              >
                {locale === 'th' ? 'รายละเอียด' : 'Details'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] md:py-16">
        <div className="max-w-2xl">
          <p className="mb-4 font-serif text-xl font-medium text-text">
            {siteConfig.name[locale]}
          </p>
          <p className="max-w-xl text-sm leading-7 text-muted">
            {t.footer.description}
          </p>
        </div>

        <nav
          className="grid grid-cols-2 gap-x-6 gap-y-2 md:justify-self-end"
          aria-label={locale === 'th' ? 'ลิงก์ท้ายเว็บไซต์' : 'Footer navigation'}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-faint sm:px-8 md:flex-row md:items-start md:justify-between">
          <p>
            {t.footer.copyright} {currentYear}
          </p>
          <p className="max-w-2xl md:text-right">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

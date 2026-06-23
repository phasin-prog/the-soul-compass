import Link from 'next/link';
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

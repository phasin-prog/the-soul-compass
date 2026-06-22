import type { Locale } from '@/lib/site';
import { getT } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = getT(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-2xl">
          <p className="mb-3 font-serif text-xl font-medium text-text">
            {siteConfig.name[locale]}
          </p>
          <p className="text-sm leading-relaxed text-muted">
            {t.footer.description}
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="type-meta text-muted">
            {t.footer.copyright} {currentYear}
          </p>
          <p className="type-meta mt-2 max-w-md text-faint">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}

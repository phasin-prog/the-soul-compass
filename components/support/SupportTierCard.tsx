import type { Locale } from '@/lib/site';
import type { SupportTier } from '@/types/support';
import { SupportAction } from '@/components/support/SupportAction';

interface SupportTierCardProps {
  locale: Locale;
  tier: SupportTier;
  index: number;
}

function formatPrice(tier: SupportTier, locale: Locale): string {
  const amount = new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: tier.currency,
    maximumFractionDigits: 0,
  }).format(tier.price);

  if (tier.interval === 'one_time') {
    return locale === 'th' ? `${amount} ครั้งเดียว` : `${amount} one time`;
  }

  return locale === 'th' ? `${amount} / เดือน` : `${amount} / month`;
}

export function SupportTierCard({
  locale,
  tier,
  index,
}: SupportTierCardProps) {
  return (
    <article className="grid !max-w-none gap-6 border-t border-border py-8 md:grid-cols-[5rem_minmax(12rem,0.65fr)_minmax(0,1fr)] md:gap-8">
      <p className="type-meta text-faint">
        {String(index + 1).padStart(2, '0')}
      </p>

      <div>
        <h3 className="type-section-title text-text">{tier.name[locale]}</h3>
        <p className="mt-3 font-medium text-accent">
          {formatPrice(tier, locale)}
        </p>
        <p className="mt-4 text-sm leading-6 text-muted">
          {tier.description[locale]}
        </p>
      </div>

      <div>
        <p className="type-meta text-muted">
          {locale === 'th'
            ? 'สิ่งที่ระดับนี้เตรียมรองรับ'
            : 'What this tier prepares for'}
        </p>
        <ul className="mt-4 space-y-3">
          {tier.benefits[locale].map((benefit) => (
            <li
              key={benefit}
              className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3 text-sm leading-6 text-text-soft"
            >
              <span
                aria-hidden="true"
                className="mt-[0.65rem] size-1.5 rounded-full bg-accent"
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <SupportAction
            locale={locale}
            tierName={tier.name[locale]}
            showAccountStatus={false}
          />
        </div>
      </div>
    </article>
  );
}

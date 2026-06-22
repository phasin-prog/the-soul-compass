import type { Metadata } from 'next';
import { SupportDisclaimer } from '@/components/support/SupportDisclaimer';
import { SupportFAQ } from '@/components/support/SupportFAQ';
import { SupportHero } from '@/components/support/SupportHero';
import { SupporterWall } from '@/components/support/SupporterWall';
import { SupportTierCard } from '@/components/support/SupportTierCard';
import {
  publicSupporters,
  supportTiers,
} from '@/lib/content/support';
import { getAlternateUrls } from '@/lib/metadata';
import type { Locale } from '@/lib/site';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const title =
    locale === 'th'
      ? 'สนับสนุน The Soul’s Compass'
      : 'Support The Soul’s Compass';
  const description =
    locale === 'th'
      ? 'ช่วยรักษาคลังความรู้จิตวิทยาเชิงลึก ปรัชญา และงานอ้างอิงภาษาไทยให้เติบโตโดยเนื้อหาหลักยังคงเปิดให้อ่าน'
      : 'Help sustain an independent Thai knowledge archive for depth psychology, philosophy, and careful reference work while core content stays public.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/support`,
      languages: getAlternateUrls('/support'),
    },
    openGraph: {
      type: 'website',
      url: `/${locale}/support`,
      title,
      description,
    },
  };
}

export default async function SupportPage({ params }: PageProps) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const activeTiers = supportTiers.filter((tier) => tier.isActive);
  const researchCosts =
    locale === 'th'
      ? [
          {
            title: 'การค้นคว้าใช้เวลา',
            body: 'การเปรียบเทียบสำนักและตรวจข้อถกเถียงต้องย้อนกลับไปอ่านงานต้นฉบับ ไม่ใช่อาศัยบทสรุปสั้น ๆ เพียงชั้นเดียว',
          },
          {
            title: 'การเขียนใช้เวลา',
            body: 'บทความระยะยาวต้องจัดโครงสร้าง แยกคำที่ดูคล้ายกัน และตรวจไม่ให้ภาษาง่ายกลายเป็นการลดทอนทฤษฎี',
          },
          {
            title: 'การแปลและตรวจอ้างอิงใช้เวลา',
            body: 'ศัพท์ทางจิตวิทยาและปรัชญาต้องรักษาทั้งความหมายเดิม บริบทของสำนัก และความอ่านรู้เรื่องในภาษาไทย',
          },
        ]
      : [
          {
            title: 'Research takes time',
            body: 'Comparing traditions and checking disputes means returning to primary work, not relying on one layer of summaries.',
          },
          {
            title: 'Writing takes time',
            body: 'Long-form work requires structure, careful distinctions, and language that clarifies without flattening theory.',
          },
          {
            title: 'Translation and references take time',
            body: 'Psychological and philosophical terms must preserve original meaning, school context, and readable Thai.',
          },
        ];
  const supportUses =
    locale === 'th'
      ? [
          'เขียนบทความระยะยาว',
          'สร้างและดูแลระบบ Wiki / Concepts',
          'ตรวจและจัดระเบียบเอกสารอ้างอิง',
          'พัฒนา TPDT อย่างโปร่งใสว่าเป็นทฤษฎีที่กำลังพัฒนา',
          'ปรับปรุงความเร็ว การเข้าถึง และประสบการณ์อ่านของเว็บไซต์',
          'รักษาเนื้อหาความรู้หลักให้เข้าถึงได้โดยสาธารณะ',
        ]
      : [
          'Writing long-form articles',
          'Building and maintaining the Wiki / Concepts system',
          'Checking and organizing references',
          'Developing TPDT transparently as a theory in progress',
          'Improving site performance, accessibility, and reading experience',
          'Keeping the core knowledge archive publicly accessible',
        ];

  return (
    <div className="container mx-auto px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <SupportHero locale={locale} />

        <section
          aria-labelledby="why-support-title"
          className="py-14 sm:py-18"
        >
          <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className="type-meta text-accent">
                {locale === 'th' ? 'เหตุผลของการสนับสนุน' : 'Why support'}
              </p>
              <h2
                id="why-support-title"
                className="type-section-title mt-2 text-text"
              >
                {locale === 'th'
                  ? 'คลังความรู้จริงจังต้องเติบโตอย่างช้าและตรวจสอบได้'
                  : 'A serious archive grows slowly and remains accountable'}
              </h2>
            </div>

            <div className="border-y border-border">
              {researchCosts.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-2 border-t border-border py-5 first:border-t-0 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-7"
                >
                  <h3 className="font-medium text-text">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="support-helps-title"
          className="border-y border-border py-10"
        >
          <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
            <h2
              id="support-helps-title"
              className="type-section-title text-text"
            >
              {locale === 'th'
                ? 'การสนับสนุนช่วยให้อะไรเกิดขึ้น'
                : 'What support helps sustain'}
            </h2>
            <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {supportUses.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3 text-sm leading-7 text-text-soft"
                >
                  <span aria-hidden="true" className="text-accent">
                    ◇
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="support-tiers"
          aria-labelledby="support-tiers-title"
          className="py-14 sm:py-18"
        >
          <div className="mb-8 max-w-3xl">
            <p className="type-meta text-accent">
              {locale === 'th' ? 'ระดับการสนับสนุน' : 'Support tiers'}
            </p>
            <h2
              id="support-tiers-title"
              className="type-section-title mt-2 text-text"
            >
              {locale === 'th'
                ? 'เลือกตามกำลังและความสบายใจ'
                : 'Choose only what feels sustainable'}
            </h2>
            <p className="mt-4 text-muted">
              {locale === 'th'
                ? 'จำนวนเงินด้านล่างเป็นข้อเสนอเริ่มต้นสำหรับระบบในอนาคต ขณะนี้ยังไม่มีการตัดเงินหรือสมัครสมาชิกรายเดือนผ่านเว็บไซต์'
                : 'The amounts below are initial proposals for a future system. The website does not currently charge cards or create subscriptions.'}
            </p>
          </div>

          <div className="border-b border-border">
            {activeTiers.map((tier, index) => (
              <SupportTierCard
                key={tier.id}
                tier={tier}
                locale={locale}
                index={index}
              />
            ))}
          </div>
        </section>

        <div className="space-y-16">
          <SupporterWall locale={locale} supporters={publicSupporters} />
          <SupportDisclaimer locale={locale} />
          <SupportFAQ locale={locale} />
        </div>
      </div>
    </div>
  );
}

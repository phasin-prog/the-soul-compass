import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Anuphan, Pridi } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { StudioToaster } from '@/components/studio/StudioToaster';
import { parseLocale } from '@/lib/locale';
import {
  getAlternateUrls,
  getOrganizationJsonLd,
  getWebSiteJsonLd,
} from '@/lib/metadata';
import { safeJsonLdStringify } from '@/lib/safe-json-ld';
import { locales, siteConfig } from '@/lib/site';
import '../globals.css';

const display = Pridi({
  variable: '--font-display',
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

const body = Anuphan({
  variable: '--font-body',
  subsets: ['thai', 'latin'],
  weight: 'variable',
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = parseLocale(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name[localeKey],
      template: `%s | ${siteConfig.name[localeKey]}`,
    },
    description: siteConfig.description[localeKey],
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: `/${localeKey}`,
      languages: getAlternateUrls(),
    },
    openGraph: {
      type: 'website',
      locale: localeKey === 'th' ? 'th_TH' : 'en_US',
      url: siteConfig.url,
      siteName: siteConfig.name[localeKey],
      title: siteConfig.name[localeKey],
      description: siteConfig.description[localeKey],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name[localeKey],
      description: siteConfig.description[localeKey],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey = parseLocale(locale);
  const organizationJsonLd = getOrganizationJsonLd(localeKey);
  const websiteJsonLd = getWebSiteJsonLd(localeKey);

  return (
    <ClerkProvider afterSignOutUrl={`/${localeKey}`}>
      <html
        lang={localeKey}
        className={`${display.variable} ${body.variable} h-full antialiased`}
        style={{ colorScheme: 'dark' }}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(organizationJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(websiteJsonLd) }}
          />
        </head>
        <body className="flex min-h-full flex-col bg-background text-text">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
          >
            Skip to main content
          </a>
          <Header locale={localeKey} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer locale={localeKey} />
          <ScrollToTop />
          <StudioToaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

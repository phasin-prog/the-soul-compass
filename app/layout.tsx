/**
 * Root layout - redirects are handled by middleware
 * This layout wraps the entire app but most metadata is in [locale]/layout.tsx
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

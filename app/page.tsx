/**
 * Root page - middleware redirects to /[locale]
 * This should never be reached in normal operation
 */

import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/site';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}

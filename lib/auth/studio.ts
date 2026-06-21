import 'server-only';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/site';

export async function requireStudioUser(locale: Locale): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    redirect(`/${locale}/sign-in`);
  }

  return userId;
}

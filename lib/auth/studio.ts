import 'server-only';

import { requireEditorialUser } from '@/lib/auth';
import type { Locale } from '@/lib/site';

export async function requireStudioUser(locale: Locale): Promise<string> {
  const user = await requireEditorialUser(locale);
  return user.id;
}

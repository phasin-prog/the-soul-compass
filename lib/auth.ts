import 'server-only';

import { auth, currentUser } from '@clerk/nextjs/server';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import {
  isEditor,
  normalizeSupporterTier,
  normalizeUserRole,
} from '@/lib/roles';
import type { Locale } from '@/lib/site';
import type { User } from '@/types/user';

function getPrimaryEmail(
  user: NonNullable<Awaited<ReturnType<typeof currentUser>>>
): string {
  return (
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    ''
  );
}

function getDisplayName(
  user: NonNullable<Awaited<ReturnType<typeof currentUser>>>,
  email: string
): string {
  const fullName =
    user.fullName ??
    user.username ??
    [user.firstName, user.lastName].filter(Boolean).join(' ');

  return fullName || email.split('@')[0] || 'Member';
}

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const { userId } = await auth();

  if (!userId) return null;

  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const email = getPrimaryEmail(clerkUser);

  return {
    id: clerkUser.id,
    email,
    displayName: getDisplayName(clerkUser, email),
    avatarUrl: clerkUser.imageUrl || null,
    role: normalizeUserRole(clerkUser.publicMetadata.role, 'member'),
    supporterTier: normalizeSupporterTier(
      clerkUser.publicMetadata.supporterTier
    ),
    createdAt: new Date(clerkUser.createdAt).toISOString(),
    updatedAt: new Date(clerkUser.updatedAt).toISOString(),
  };
});

export async function requireMemberUser(locale: Locale): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  return user;
}

export async function requireEditorialUser(locale: Locale): Promise<User> {
  const user = await requireMemberUser(locale);

  if (!isEditor(user.role)) {
    redirect(`/${locale}/account?notice=editor-access-required`);
  }

  return user;
}

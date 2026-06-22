import type { Locale } from '@/lib/site';
import {
  supporterTiers,
  userRoles,
  type SupporterTier,
  type UserRole,
} from '@/types/user';

export const roleLabels: Record<UserRole, Record<Locale, string>> = {
  guest: { th: 'ผู้เยี่ยมชม', en: 'Guest' },
  member: { th: 'สมาชิก', en: 'Member' },
  supporter: { th: 'ผู้สนับสนุน', en: 'Supporter' },
  editor: { th: 'บรรณาธิการ', en: 'Editor' },
  admin: { th: 'ผู้ดูแลระบบ', en: 'Admin' },
};

export function normalizeUserRole(
  value: unknown,
  fallback: UserRole = 'guest'
): UserRole {
  return typeof value === 'string' && userRoles.includes(value as UserRole)
    ? (value as UserRole)
    : fallback;
}

export function normalizeSupporterTier(value: unknown): SupporterTier {
  return typeof value === 'string' &&
    supporterTiers.includes(value as SupporterTier)
    ? (value as SupporterTier)
    : 'none';
}

export function isMember(role: UserRole): boolean {
  return role !== 'guest';
}

export function isSupporter(role: UserRole): boolean {
  return role === 'supporter';
}

export function isEditor(role: UserRole): boolean {
  return role === 'editor' || role === 'admin';
}

export function isAdmin(role: UserRole): boolean {
  return role === 'admin';
}

import type { Locale } from '@/lib/site';

export const userRoles = [
  'guest',
  'member',
  'supporter',
  'editor',
  'admin',
] as const;

export type UserRole = (typeof userRoles)[number];

export const supporterTiers = [
  'none',
  'supporter',
  'patron',
  'founding',
] as const;

export type SupporterTier = (typeof supporterTiers)[number];

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  role: UserRole;
  supporterTier: SupporterTier;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  userId: string;
  bio: string;
  preferredLanguage: Locale;
  publicDisplayName: string;
  supporterVisibleName: string;
}

export type BookmarkTargetType = 'article' | 'concept';

export interface Bookmark {
  id: string;
  userId: string;
  targetType: BookmarkTargetType;
  targetId: string;
  createdAt: string;
}

export interface ReadingProgress {
  id: string;
  userId: string;
  articleId: string;
  progressPercent: number;
  lastReadAt: string;
}

export interface SavedConcept {
  id: string;
  userId: string;
  conceptId: string;
  createdAt: string;
}

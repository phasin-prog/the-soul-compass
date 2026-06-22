import type { Locale } from '@/lib/site';

export type SupportInterval = 'one_time' | 'monthly';
export type SupportPaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export interface SupportTier {
  id: string;
  name: Record<Locale, string>;
  slug: string;
  description: Record<Locale, string>;
  price: number;
  currency: string;
  interval: SupportInterval;
  benefits: Record<Locale, string[]>;
  isActive: boolean;
}

export interface SupportPayment {
  id: string;
  userId: string;
  tierId: string;
  amount: number;
  currency: string;
  status: SupportPaymentStatus;
  provider: string;
  providerPaymentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SupporterProfile {
  userId: string;
  publicName: string;
  displayOnWall: boolean;
  anonymous: boolean;
  message: string;
  tierId: string;
  active: boolean;
}

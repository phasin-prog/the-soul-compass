import type { Locale } from '@/lib/site';

/**
 * Parse a raw locale string (from route params) into a valid Locale.
 * Falls back to 'th' for unrecognized values.
 */
export function parseLocale(value: string): Locale {
  return value === 'en' ? 'en' : 'th';
}

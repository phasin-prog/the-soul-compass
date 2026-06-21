/**
 * Normalize a string for locale-insensitive search comparison.
 * Applies Unicode NFKC normalization, trims, and lowercases.
 */
export function normalizeSearch(value: string): string {
  return value.normalize('NFKC').trim().toLocaleLowerCase();
}

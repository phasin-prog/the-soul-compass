import type { Locale, Translation } from './types'
import { th } from './th'
import { en } from './en'

export type { Locale, Translation }
export { th, en }

export const defaultLocale: Locale = 'th'
export const locales: Locale[] = ['th', 'en']

const translations: Record<Locale, Translation> = { th, en }

export function getT(locale: Locale): Translation {
  return translations[locale]
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

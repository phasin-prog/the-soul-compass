export type Locale = 'th' | 'en'

export const locales: Locale[] = ['th', 'en']
export const defaultLocale: Locale = 'th'

export type NavItem = {
  label: string
  href: string
}

export type Translation = {
  meta: {
    siteName: string
    siteDescription: string
    siteTagline: string
  }
  nav: {
    home: string
    articles: string
    series: string
    concepts: string
    analyticalPsychology: string
    psychoanalysis: string
    philosophy: string
    typology: string
    tpdt: string
    about: string
    manifesto: string
    resources: string
    support: string
    contact: string
  }
  categories: {
    analyticalPsychology: string
    psychoanalysis: string
    philosophy: string
    typology: string
    tpdt: string
    soulEssays: string
    readingGuide: string
  }
  article: {
    readMore: string
    readingTime: string
    publishedOn: string
    updatedOn: string
    inSeries: string
    partOf: string
    relatedArticles: string
    relatedConcepts: string
    references: string
    tableOfContents: string
    prevArticle: string
    nextArticle: string
    backToSeries: string
    minRead: string
  }
  concept: {
    definition: string
    relatedThinkers: string
    relatedArticles: string
    relatedConcepts: string
    seeAlso: string
  }
  series: {
    articles: string
    status: {
      active: string
      completed: string
      planned: string
    }
  }
  ui: {
    learnMore: string
    viewAll: string
    backTo: string
    comingSoon: string
    inDevelopment: string
    search: string
    language: string
    lightMode: string
    darkMode: string
    skipToMain: string
    openMenu: string
    closeMenu: string
    home: string
  }
  tpdt: {
    statusLabel: string
    statusDescription: string
  }
  footer: {
    description: string
    copyright: string
    disclaimer: string
  }
}

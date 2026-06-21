# The Soul's Compass / Moonlight  
## Deep Psychology Knowledge Platform — Product Requirements Document

**Version:** 1.0  
**Date:** 2026-06-20  
**Status:** Approved for development

---

## Product Overview

The Soul's Compass (also known as Moonlight) is a serious knowledge platform for deep psychology, analytical psychology, psychoanalysis, philosophy, and future original theory development under **TPDT — Transformative Psyche Dynamics Theory**.

This is not a blog. This is not a self-help site. This is not an MBTI content farm.

It is a knowledge architecture for a serious psychological-philosophical project — structured for long-form articles, conceptual series, theory development, and eventual service expansion.

---

## Business / Project Goals

1. Build a serious intellectual brand in Thai and English
2. Publish long-form articles on depth psychology and philosophy
3. Organize complex psychological concepts clearly and without distortion
4. Distinguish Jung's actual typology from MBTI-style simplification
5. Present Freud, Adler, Lacan, Jung, and philosophy rigorously but accessibly
6. Prepare the TPDT theory section for progressive publication
7. Support article series (structured multi-part content)
8. Support future expansion: services, books, courses, consultations
9. Create a platform that feels premium, symbolic, and trustworthy

---

## User Personas

| Persona | Description | Primary Need |
|---------|-------------|--------------|
| **Beginner** | Came from social media (Facebook), curious about Jung or psychoanalysis | Clear entry points, readable introductions |
| **MBTI reader** | Knows 4-letter types, senses there's more | Typology critique series, honest comparison |
| **Serious reader** | Psychology/philosophy background, wants rigorous content | Depth, accuracy, proper references |
| **Self-understanding seeker** | Not academic, but seeking genuine insight | Accessible but not shallow articles |
| **Social media follower** | Reads articles shared on Facebook/Line | Mobile-first experience, series hooks |
| **Future client** | Interested in consultation or services | Clear about / contact, no fake clinical claims |
| **Research reader** | Uses the site as a conceptual reference | Glossary, concept pages, references |

---

## Core User Journeys

1. Read article from social media → continue related article → explore concept page
2. Search concept → read glossary → read full essay
3. Enter Jung section → understand psyche structure → read individuation series
4. Enter psychoanalysis section → compare Freud / Adler / Lacan
5. Enter typology critique → understand Jung vs. MBTI distinction
6. Enter TPDT section → understand what the theory is building toward
7. Explore About / Manifesto → understand the project's intellectual direction

---

## Scope

### In Scope — V1
| Section | Status |
|---------|--------|
| Home | Build |
| About / Manifesto | Build |
| Articles (listing + detail) | Build |
| Series (listing + detail) | Build |
| Concepts / Glossary | Build |
| Analytical Psychology hub | Build |
| Psychoanalysis hub | Build |
| Philosophy hub | Build |
| Typology hub | Build |
| TPDT hub (in-development state) | Build scaffold |
| Resources / Reading guide | Build |
| Contact | Build |
| Thai language (primary) | Build |
| English language | Build |

### Not In Scope — V1
- Clinical services or medical claims
- User accounts / authentication
- Comments system
- E-commerce / payment
- Headless CMS (static typed content first)
- Database (static content files first)
- Search (can add in V2)
- Newsletter/email system (can add in V2)
- Fake TPDT doctrine — the theory section is scaffolding only

---

## Success Criteria

| Criterion | Measurable Standard |
|-----------|---------------------|
| No 404 on main routes | All routes in sitemap return 200 or valid redirect |
| Build passes | `npm run build` completes without errors on Vercel |
| Article reading UX | Readable at 17–18px, max-width 720px, mobile-first |
| Visual identity | Does not look like a cheap template or MBTI site |
| Copy quality | No AI-filler tone, no "unlock your potential" language |
| TPDT integrity | No invented doctrine — only structural scaffolding |
| Bilingual | Both `/th` and `/en` routes functional |
| SEO baseline | Title, description, canonical, OG on every page |
| Accessibility | Passes basic AA contrast, semantic HTML, keyboard nav |

---

## Route Architecture

### Structure
```
/                           → redirect to /th (default locale)

/th                         → Thai home
/th/about
/th/manifesto
/th/articles
/th/articles/[slug]
/th/series
/th/series/[slug]
/th/concepts
/th/concepts/[slug]
/th/analytical-psychology
/th/analytical-psychology/[slug]
/th/psychoanalysis
/th/psychoanalysis/[slug]
/th/philosophy
/th/philosophy/[slug]
/th/typology
/th/typology/[slug]
/th/tpdt
/th/tpdt/[slug]
/th/resources
/th/contact

/en                         → English home
/en/about
/en/manifesto
/en/articles
/en/articles/[slug]
/en/series
/en/series/[slug]
/en/concepts
/en/concepts/[slug]
/en/analytical-psychology
/en/analytical-psychology/[slug]
/en/psychoanalysis
/en/psychoanalysis/[slug]
/en/philosophy
/en/philosophy/[slug]
/en/typology
/en/typology/[slug]
/en/tpdt
/en/tpdt/[slug]
/en/resources
/en/contact
```

---

## Content Architecture

### Content Types

```typescript
type Locale = 'th' | 'en'

type Article = {
  slug: string
  locale: Locale
  title: string
  subtitle?: string
  excerpt: string
  category: CategorySlug
  tags: string[]
  seriesSlug?: string
  orderInSeries?: number
  publishedAt: string       // ISO 8601
  updatedAt?: string
  readingTime: number       // minutes
  heroImage?: string
  content: string           // MDX or typed string
  relatedConcepts: string[] // concept slugs
  relatedArticles: string[] // article slugs
  references?: Reference[]
}

type Series = {
  slug: string
  locale: Locale
  title: string
  description: string
  category: CategorySlug
  articles: string[]        // ordered article slugs
  status: 'active' | 'completed' | 'planned'
}

type Concept = {
  slug: string
  locale: Locale
  term: string
  shortDefinition: string   // 1–2 sentences
  longDefinition: string    // full explanation
  category: CategorySlug
  relatedThinkers: string[]
  relatedArticles: string[]
  relatedConcepts: string[]
}

type Category = {
  slug: CategorySlug
  locale: Locale
  title: string
  description: string
  parentCategory?: CategorySlug
}

type CategorySlug =
  | 'analytical-psychology'
  | 'psychoanalysis'
  | 'philosophy'
  | 'typology'
  | 'tpdt'
  | 'soul-essays'
  | 'reading-guide'
```

### Suggested Content Files
```
lib/
  site.ts           — site metadata, name, description, locale config
  routes.ts         — typed route builders
  i18n.ts           — locale strings, nav labels
  content/
    articles.ts
    series.ts
    concepts.ts
    categories.ts
    resources.ts
    navigation.ts
```

### Core Concept Groups (Glossary Architecture)
- Psyche Structure (ego, persona, shadow, anima/animus, Self)
- Symbol and Dream
- Individuation
- Freudian concepts (id, ego, superego, drives, defense mechanisms)
- Adlerian concepts (inferiority, social interest, life style)
- Lacanian concepts (Real/Symbolic/Imaginary, desire, objet a)
- Existentialism (Dasein, bad faith, absurd)
- Typology Critique
- TPDT Foundations (scaffolding only)

### Suggested Article Series — V1
| Series | Category | Status |
|--------|----------|--------|
| Structure of the Psyche | analytical-psychology | planned |
| Individuation | analytical-psychology | planned |
| Jungian Typology vs. MBTI | typology | planned |
| Freud and the Unconscious | psychoanalysis | planned |
| Adler and Inferiority | psychoanalysis | planned |
| Lacan and Desire | psychoanalysis | planned |
| Philosophy of the Self | philosophy | planned |
| TPDT Foundations | tpdt | in-development |

---

## Design System Summary

| Token | Value |
|-------|-------|
| Background | `#0a0a0f` (near-black) |
| Surface | `#111118` |
| Border | `#2a2a35` |
| Text | `#e8e4d9` (ivory) |
| Text muted | `#9a9690` |
| Accent gold | `#c4a35a` |
| Accent silver | `#8fa0b0` |
| Navy | `#1a2035` |
| Display font | Playfair Display (or Cormorant Garamond) |
| Body font | Inter (or Source Sans 3) |
| Thai font | Sarabun |
| Body size | 17–18px |
| Body line-height | 1.75 |
| Article max-width | 680–720px |

---

## Page Specifications

### Home
- Hero: Project name + one clear sentence (not a tagline cliché)
- Topic gateway cards: Analytical Psychology, Psychoanalysis, Philosophy, Typology, TPDT
- Featured article or series
- Latest articles (3–5)
- Manifesto preview block
- Concept archive preview

### Article Detail
- Title, subtitle, category badge, published date, reading time
- Optional: hero image
- Table of contents (for articles >1,500 words, sticky on desktop)
- Article body (680–720px max-width, 17–18px, line-height 1.75)
- References / further reading
- Related concepts (2–4 chips)
- Related articles (2–3 cards)
- Series navigation (prev/next in series)

### Concepts / Glossary
- List view with filter by category
- Each concept: term, short definition, related thinkers, related articles

### TPDT
- Clear "in development" status
- What the theory is building toward
- Intellectual sources and lineage
- Foundations essay series (planned/in-progress state)
- No invented doctrine

---

## Copy Standards

### What to Avoid
- "Unlock your potential" / "Transform your life"
- "Discover who you really are" (generic)
- "Scientifically proven personality type"
- Machine-translation rhythm
- Fake academic authority
- Generic self-help uplift

### Tone Reference
**Thai:** "พื้นที่สำหรับอ่านจิตใจมนุษย์อย่างลึกกว่าแบบทดสอบ"  
**English:** "The psyche is not a personality label. It is a living field of image, conflict, desire, and transformation."

---

## Technical Stack (Recommended)

| Item | Choice | Reason |
|------|--------|--------|
| Framework | Next.js 15, App Router | Bilingual routing, static generation, Vercel-native |
| Language | TypeScript strict | Type-safe content, better refactoring |
| Styling | Tailwind CSS | Utility-first, no CSS-in-JS overhead |
| Content | Typed static files | No database needed for V1, fast build |
| Fonts | Google Fonts via `next/font` | CLS-safe loading |
| Images | `next/image` | Automatic optimization |
| Deployment | Vercel | Zero-config Next.js |

---

## Non-Functional Requirements

- Build time: < 60 seconds on Vercel
- LCP: < 2.5s on mobile (3G)
- CLS: < 0.1
- Zero TypeScript errors in production build
- All main routes: 200 OK
- Accessibility: WCAG 2.1 AA minimum

---

## Risks and Constraints

| Risk | Mitigation |
|------|-----------|
| TPDT content doesn't exist yet | Build structural scaffolding; mark as in-development |
| Thai copy quality | Human-written copy only; no machine translation for key pages |
| Scope creep (adding features too early) | Follow V1 scope strictly; log V2 features separately |
| `.env` file may contain sensitive data | Audit before first git commit |
| Bilingual routing complexity | Use Next.js App Router `[locale]` segment pattern |

---

## Recommended Next Phase

**PHASE 2:** Initialize Next.js project and establish architecture
- `npx create-next-app@latest` (TypeScript, Tailwind, App Router)
- Configure design tokens
- Create `lib/` content architecture
- Set up bilingual `[locale]` routing
- Build `SiteHeader`, `SiteFooter`, `ArticleLayout` components
- Deploy empty scaffolding to Vercel preview

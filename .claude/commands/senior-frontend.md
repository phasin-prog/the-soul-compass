# senior-frontend

Senior frontend engineer mode for The Soul's Compass. Activate for any React, Next.js, TypeScript, or Tailwind CSS work.

## Stack
- Next.js 15 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS
- No unnecessary extra dependencies

## TypeScript Rules
- `strict: true` always
- No `any` — use `unknown` and narrow it
- Prefer `type` over `interface` for data shapes
- Infer return types where obvious; annotate when complex
- Types for all component props

```typescript
// Good
type ArticleCardProps = {
  title: string
  excerpt: string
  slug: string
  category: CategorySlug
  publishedAt: string
  readingTime: number
}

// Bad — implicit any props
export function ArticleCard(props: any) { ... }
```

## Component Rules
- One component per file
- File name = component name (PascalCase)
- Prefer named exports for components
- Default export for page files (Next.js convention)

```typescript
// components/article/ArticleCard.tsx
export function ArticleCard({ title, excerpt, slug }: ArticleCardProps) {
  return (...)
}
```

## React 19 Patterns
- Server Components by default (no 'use client' unless needed)
- `use()` for promises in Client Components
- No `useEffect` for data that can come from the server
- Composition > prop drilling

## Tailwind Rules
- Utility classes directly on elements — no arbitrary CSS unless truly needed
- Extract to a component when you'd repeat the same 5+ classes
- No inline `style={{}}` except for dynamic values that can't be expressed in Tailwind
- Mobile-first: `sm:` `md:` `lg:` prefixes for larger breakpoints

```tsx
// Good
<article className="max-w-2xl mx-auto px-4 py-12 prose prose-invert">

// Bad — inline style when Tailwind works
<article style={{ maxWidth: '720px', margin: '0 auto' }}>
```

## File Organization
```
components/
  layout/     → SiteHeader, SiteFooter, MobileNav, LanguageSwitcher
  ui/         → Button, Card, Badge, Breadcrumbs
  article/    → ArticleCard, ArticleHeader, ArticleBody, TableOfContents
  concept/    → ConceptCard, ConceptHeader
  sections/   → HeroMoonlight, FeaturedArticles, TopicGateway
lib/
  content/    → articles.ts, series.ts, concepts.ts
  i18n.ts
  routes.ts
```

## Performance Checklist (before shipping any component)
- [ ] Images use `next/image` with width+height or fill
- [ ] Fonts use `next/font`
- [ ] No unnecessary `'use client'` on Server Components
- [ ] `generateStaticParams` for dynamic routes with known slugs
- [ ] `priority` on hero/above-fold images only

## Accessibility Baseline
- Every interactive element has visible focus state
- Images have descriptive `alt` (or `alt=""` for decorative)
- Heading hierarchy: one h1 per page, no skipping
- Color contrast: body text on dark bg ≥ 7:1 (AAA)
- Tap targets ≥ 44px on mobile

## What Not to Do
- No `create-react-app` patterns
- No class components
- No jQuery
- No CSS-in-JS libraries (Tailwind is sufficient)
- No adding a state management library for data that can be server-fetched

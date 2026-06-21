# nextjs-app-router

Next.js App Router expert skill. Activate when working on any Next.js page, component, or route in this project.

## Version Requirements (this project)
- Next.js 15+ App Router
- React 19+
- TypeScript 5.1+
- Node.js 20.9+

## Core Rules

### Always App Router — Never Pages Router
- All routes live in `app/`
- No `pages/` directory
- No `getServerSideProps`, `getStaticProps`, `getInitialProps`

### Server vs Client Components
```typescript
// Default: Server Component (no directive needed)
export default async function Page() { ... }

// Client Component: only when you need hooks, events, browser APIs
'use client'
export default function Interactive() { ... }
```

**Never add `'use client'` unless required.** Server Components are cheaper and faster.

### Async Params (Next.js 15+)
```typescript
// params and searchParams are Promises — always await
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
}
```

### Data Fetching
```typescript
// In Server Components — fetch directly, no useEffect
async function getData() {
  const res = await fetch('...', { next: { revalidate: 3600 } })
  return res.json()
}

// Caching is opt-in in Next.js 15
// Add 'use cache' for expensive components
'use cache'
export async function ExpensiveComponent() { ... }
```

### Metadata
```typescript
// Static
export const metadata: Metadata = {
  title: '...',
  description: '...',
}

// Dynamic
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return { title: `...${slug}` }
}
```

### generateStaticParams
```typescript
// For dynamic routes with known values — generates static pages at build time
export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}
```

### Image Optimization
```typescript
// Always next/image — never <img> for content images
import Image from 'next/image'
<Image src="..." alt="..." width={800} height={400} priority />
// Hero images: add priority prop
// Below-fold images: omit priority
```

### Fonts
```typescript
// next/font — always. Never @import in CSS for fonts.
import { Playfair_Display, Inter } from 'next/font/google'
const display = Playfair_Display({ subsets: ['latin'], display: 'swap' })
```

### Parallel Routes (if needed)
```typescript
// Every @slot needs a default.tsx
// app/@modal/default.tsx
export default function Default() { return null }
```

## What to Avoid
- `<img>` tags for content images
- `useEffect` for data that can be fetched server-side
- Hardcoded locale strings not going through i18n
- Client components wrapping whole pages
- `dynamic = 'force-dynamic'` on static pages

## Bilingual Routes (this project)
```
app/
  page.tsx              → redirect to /th
  [locale]/
    layout.tsx
    page.tsx
    articles/[slug]/page.tsx
    concepts/[slug]/page.tsx
    ...
```
Locale segment: `'th' | 'en'`

## Source
Based on [jezweb/claude-skills nextjs](https://playbooks.com/skills/jezweb/claude-skills/nextjs) + Next.js official docs

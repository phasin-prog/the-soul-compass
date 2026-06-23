---
name: nextjs-tailwind-qa
description: QA checklist for Next.js 16 + Tailwind CSS 4 in The Soul's Compass — route safety, React component safety, TypeScript safety, Tailwind consistency, hydration checks.
---

# Next.js + Tailwind QA

## When to use

Use this skill **after every change** to Next.js routes, React components, or Tailwind classes. It catches framework-specific regressions.

## What to do

1. **Next.js route safety** — verify:
   - `[locale]` parameter is respected in all routes
   - `generateStaticParams` still returns correct slugs
   - `generateMetadata` still returns correct metadata
   - Server components don't use client hooks
   - Client components are marked with `"use client"`

2. **React component safety** — verify:
   - No missing `key` props in lists
   - No conditional hooks
   - No stale closures in effects
   - Props are properly typed (no `any`)
   - No inline object/array creation causing re-renders

3. **TypeScript safety** — run `npx tsc --noEmit` and verify:
   - No type errors
   - No `@ts-ignore` or `@ts-expect-error` without justification
   - All props interfaces are defined
   - All API responses are typed

4. **Tailwind class consistency** — verify:
   - Consistent spacing tokens (multiples of 4px or 8px)
   - Consistent typography classes
   - No inline styles where Tailwind classes exist
   - No duplicate utility classes
   - Dark mode classes if applicable
   - Responsive prefixes (`sm:`, `md:`, `lg:`) used correctly

5. **No hydration regressions** — verify:
   - No browser-only APIs in server components
   - `suppressHydrationWarning` only where justified (e.g., `suppress` on `<html>`)
   - Date/time rendering is consistent server/client

6. **No unnecessary client components** — verify:
   - Components that only render static content are server components
   - `"use client"` is only on components that need interactivity

7. **No duplicated design primitives** — verify:
   - Reuse existing components from `components/` or `ui/`
   - Don't create near-duplicate components
   - Shared patterns use a single implementation

8. **Run available package scripts** — execute and report:
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run build` (if source files changed)

## What not to do

- Do NOT use `any` type.
- Do NOT add `"use client"` to components that don't need it.
- Do NOT use inline styles where Tailwind classes work.
- Do NOT create duplicate components for similar patterns.
- Do NOT skip TypeScript checks.
- Do NOT ignore hydration warnings.

## Output format

```
## Next.js + Tailwind QA

### Route Safety
| Route | Status | Issues |
|-------|--------|--------|

### Component Safety
| Component | Status | Issues |
|-----------|--------|--------|

### TypeScript
| Check | Status | Output |
|-------|--------|--------|

### Tailwind Consistency
| Area | Status | Issues |
|------|--------|--------|

### Hydration
| Component | Status | Issues |
|-----------|--------|--------|

### Build
| Command | Status | Output |
|---------|--------|--------|

### Overall
<pass/fail>
```

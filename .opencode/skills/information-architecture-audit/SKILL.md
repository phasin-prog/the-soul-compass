---
name: information-architecture-audit
description: Audit and propose site map, navigation hierarchy, content hierarchy, article discovery, and route structure for The Soul's Compass.
---

# Information Architecture Audit

## When to use

Use this skill as the **first step** of any UI/UX overhaul. It maps what exists, proposes what should exist, and identifies route risks.

## What to do

1. **Current site map extraction** — scan `app/[locale]/` to extract every route. Document:
   - Public routes (articles, concepts, series, resources, external-links, typology, tpdt, psychoanalysis, philosophy, analytical-psychology, about, manifesto, support)
   - Studio routes (studio/articles, studio/articles/[id], studio/articles/[id]/edit, studio/articles/new)
   - Admin routes (admin, admin/articles, admin/concepts, admin/external-links)
   - Account routes (account, account/bookmarks, account/saved-concepts, account/reading-history)
   - Auth routes (login, sign-in, sign-up, register)

2. **Proposed site map** — after extraction, propose an improved hierarchy:
   - What should be top-level navigation?
   - What should be nested?
   - What discovery mechanisms are missing (search, related content, breadcrumbs)?

3. **Navigation hierarchy** — read `lib/content/navigation.ts` and document current nav structure. Propose improvements.

4. **Content hierarchy** — map how articles, concepts, series, and resources relate. Check `lib/content/categories.ts`, `lib/content/series.ts`, `lib/content/concepts.ts`.

5. **Article discovery** — evaluate how readers find articles: category pages, series pages, concept pages, search, external links.

6. **Category/tag logic** — read category definitions and propose improvements for bilingual consistency.

7. **Studio entry points** — document how Studio creators access article editing.

8. **Route risk report** — for every proposed change, identify:
   - Which routes are affected
   - Whether Thai/English parity is maintained
   - Whether article URLs change (SEO risk)
   - Whether any API contract changes

## What not to do

- Do NOT change any routes during audit — this is read-only analysis.
- Do NOT modify `lib/routes.ts` during audit.
- Do NOT add or remove pages during audit.
- Do NOT redesign navigation visually — only propose structural changes.

## Output format

```
## IA Audit Report

### Current Site Map
<tree of all routes>

### Proposed Site Map
<tree of proposed routes>

### Navigation Hierarchy
<current nav + proposed changes>

### Content Relationships
<articles ↔ concepts ↔ series ↔ resources>

### Discovery Gaps
<what's missing>

### Route Risk Report
| Route | Risk Level | Impact |
|-------|-----------|--------|
| /articles/[slug] | none | preserved |
| ... | ... | ... |

### Recommendations
1. <recommendation>
```

---
name: fullstack-regression-guard
description: Protect API contracts, database schema, storage, auth, articles, localization, and deployment config during UI/UX changes in The Soul's Compass.
---

# Fullstack Regression Guard

## When to use

Use this skill **after every UI/UX change** to verify nothing broke in the fullstack layers. This is mandatory before considering any change complete.

## What to do

1. **Protect API contracts** — verify all `app/api/` or route handlers still return expected shapes. Check `lib/articles.ts`, `lib/concepts.ts`, `lib/series.ts`, `lib/references.ts`, `lib/external-links.ts`.

2. **Protect database schema** — verify no changes to Supabase table structures, column names, or RLS policies. Check `supabase/migrations/`.

3. **Protect storage paths/rules** — verify article cover storage (R2/S3) still works. Check `lib/r2/wiki-store.ts`.

4. **Protect auth** — verify Clerk authentication still works:
   - Login/register pages functional
   - Protected routes still require auth
   - Studio and admin access still gated
   - Check `lib/auth.ts`, `lib/auth/studio.ts`

5. **Protect article data** — verify:
   - Article CRUD still works (Studio)
   - Article reading still works (public)
   - Article slugs unchanged (SEO)
   - Markdown rendering unchanged
   - Cover images still load

6. **Protect localization** — verify:
   - Thai and English versions both render
   - `lib/i18n/th.ts` and `lib/i18n/en.ts` still referenced
   - `[locale]` routing still works
   - All translated strings still present

7. **Protect deployment config** — verify:
   - `next.config` unchanged
   - Environment variable references unchanged
   - Build script (`npm run build`) still works

8. **Verify build** — run `npm run build` if source files were changed. Report any errors.

## What not to do

- Do NOT skip regression checks because "only CSS changed."
- Do NOT modify Supabase schema, migrations, or seed files.
- Do NOT change API response shapes.
- Do NOT modify Clerk configuration.
- Do NOT change environment variable names or structure.
- Do NOT alter article slugs or URLs.
- Do NOT remove i18n keys.
- Do NOT change `next.config` without approval.

## Output format

```
## Regression Report

### API Contracts
| Endpoint | Status | Notes |
|----------|--------|-------|

### Database Schema
| Table | Status | Notes |
|-------|--------|-------|

### Storage
| Path | Status | Notes |
|------|--------|-------|

### Auth
| Route | Status | Notes |
|-------|--------|-------|

### Articles
| Operation | Status | Notes |
|-----------|--------|-------|

### Localization
| Language | Status | Notes |
|----------|--------|-------|

### Build
| Command | Status | Output |
|---------|--------|--------|

### Overall
<pass/fail>
```

# The Soul's Compass — Repository Audit Report

**Date:** 2026-06-20  
**Auditor:** safe-refactor-git-operator  
**Status:** Pre-build greenfield

---

## Summary

This repository contains **no existing Next.js application**. It is a greenfield project. There is no code to audit for breakage, duplication, or existing UX problems. The audit instead documents the starting state and establishes the baseline before any code is written.

---

## Current Stack

| Item | Status |
|------|--------|
| Framework | Not yet initialized |
| Package manager | Not yet initialized |
| Next.js version | Not installed |
| Router type | Not applicable |
| TypeScript | Not installed |
| Tailwind CSS | Not installed |
| CMS | None |
| Database | None |
| Deployment target | Vercel (intended) |

**Files present:**
- `.env` — exists, contents not read (may contain API keys)
- `claude.json` — empty
- `.agent/skills-catalog.md` — skills reference catalog (338KB, AI agent tooling)

---

## Route Map

**Current routes:** None. No pages directory, no app directory, no Next.js config.

---

## Broken Routes

N/A — no server running. All routes would return 404 until app is initialized.

---

## Existing Content Structure

**None.** No articles, no concepts, no series data.

---

## Existing Component Structure

**None.** No components directory.

---

## Styling / Design System Status

**None.** No CSS, no Tailwind config, no design tokens.

---

## Article Reading UX Problems

**None to audit.** No article pages exist.

---

## Navigation Problems

**None to audit.** No navigation exists.

---

## SEO Problems

- No metadata
- No sitemap.xml
- No robots.txt
- No OG images
- No structured data

All of these are expected at greenfield — will be built from scratch.

---

## Mobile UX Problems

**None to audit.** No UI exists.

---

## Performance Risks

**None current.** Risks to watch during build:
- Unoptimized images (use `next/image` throughout)
- Thai font loading causing CLS (use `font-display: swap`)
- Large bundle from unnecessary client-side JS on static pages

---

## Build / Deployment Risks

| Risk | Level | Notes |
|------|-------|-------|
| No `package.json` | High | Must initialize before any work |
| `.env` file with unknown contents | Medium | Verify no secrets committed to git |
| `.agent/` directory in git | Low | Skills catalog — not harmful, but large (338KB) |
| No `.gitignore` | Medium | Add before first npm install or `node_modules` may be tracked |

---

## Content Architecture Problems

No content exists. Architecture will be built to spec.

---

## Recommended Rebuild Phases

### PHASE 0 ✅ Complete
- Project-specific skills created in `.claude/commands/`

### PHASE 1 ✅ Complete
- Audit completed (this document)
- PRD created (`docs/PRD.md`)

### PHASE 2 — Initialize Project
- `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- Configure `next.config.ts`
- Set up `.gitignore`
- Define design tokens in `tailwind.config.ts`
- Configure fonts (Playfair Display, Inter, Sarabun)

### PHASE 3 — Architecture
- Create `lib/` type definitions and static content files
- Create `app/[locale]/layout.tsx` with bilingual routing
- Create locale redirect at `app/page.tsx`
- Set up navigation config

### PHASE 4 — Core Pages
- Home (`/th`, `/en`)
- Articles listing
- Article detail with reading UX
- Concept glossary
- About + Manifesto

### PHASE 5 — Content Sections
- Analytical Psychology hub
- Psychoanalysis hub
- Philosophy hub
- Typology hub
- TPDT "in development" hub

### PHASE 6 — SEO + Performance
- Metadata on all pages
- sitemap.xml generation
- robots.txt
- OG images
- hreflang

### PHASE 7 — QA + Deploy
- Full accessibility audit
- Performance audit
- Build verification
- Vercel deployment

---

## Notes

- The `.env` file should be audited before first commit to ensure no secrets are tracked in git
- The `.agent/skills-catalog.md` (338KB) should be assessed for whether it belongs in the repository or in `.gitignore`
- No production code exists to protect — the first commit will be the project initialization

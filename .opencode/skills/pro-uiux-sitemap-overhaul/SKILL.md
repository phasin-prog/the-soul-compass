---
name: pro-uiux-sitemap-overhaul
description: Professional full-site UI/UX and site map overhaul for The Soul's Compass — information architecture before visuals, design system before page styling, route preservation, no AI-slop.
---

# Professional UI/UX & Site Map Overhaul

## When to use

Use this skill when planning or executing a **full-site redesign** or **site map restructuring** of The Soul's Compass. This skill governs the overhaul process, not individual component edits.

## What to do

1. **Information architecture first** — map current routes, content hierarchy, and navigation before any visual work. Use `information-architecture-audit` skill.
2. **Design system before page styling** — define typography, spacing, color, and component patterns before applying to pages. Use `visual-design-system-audit` skill.
3. **Route preservation** — all existing public routes must remain accessible. Document every route in `lib/routes.ts` and `app/[locale]/` before changes.
4. **Thai/English routing preservation** — the `[locale]` segment is sacred. Both `/en/...` and `/th/...` must work identically.
5. **Article and Studio safety** — article CRUD, Studio pages, and admin pages must not break during overhaul.
6. **No random redesign** — every visual change must trace back to the design system audit or IA audit. No ad-hoc styling.
7. **No AI-slop visual clichés** — follow `PRODUCT.md` anti-references: no glassmorphism, no neon gradients, no decorative symbolism, no personality-test funnel aesthetics.
8. **Quiet midnight reading room** — the brand personality from `PRODUCT.md` must be preserved: contemplative, rigorous, intimate.

## What not to do

- Do NOT redesign pages before completing the IA audit.
- Do NOT apply visual styles before defining the design system.
- Do NOT change route paths or add/remove routes without explicit approval.
- Do NOT break Thai/English parity.
- Do NOT add glassmorphism, neon gradients, mystical symbols, or generic AI editorial layouts.
- Do NOT change article data models, Supabase schema, or API contracts.
- Do NOT touch authentication, deployment, or database configuration.
- Do NOT use decorative serif styling or personality-test funnel patterns.

## Output format

Report overhaul progress as:

```
## UI/UX Overhaul Status

### Phase: [IA Audit | Design System | Page Redesign | QA]
### Completed
- <task>

### In Progress
- <task>

### Blocked
- <task> — <reason>

### Files Changed
- <list>

### Route Impact
- Preserved: <routes>
- Modified: <routes or "none">
- Removed: <routes or "none">
```

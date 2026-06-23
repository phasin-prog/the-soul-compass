---
name: visual-design-system-audit
description: Audit and define typography scale, spacing, color roles, surfaces, borders, cards, buttons, icons, motion, and component patterns for The Soul's Compass.
---

# Visual Design System Audit

## When to use

Use this skill **after the IA audit** and **before any page redesign**. It defines the visual language that all pages must follow.

## What to do

1. **Typography scale** — read current font choices, sizes, line heights, and weights. Propose a consistent scale:
   - Display / H1 / H2 / H3 / H4 / Body / Small / Caption
   - Thai vs English font considerations (readability at 200% zoom)

2. **Spacing scale** — define a consistent spacing system (4px/8px base). Document current spacing patterns and gaps.

3. **Color roles** — map current color usage. Define semantic roles:
   - Background (page, surface, elevated)
   - Text (primary, secondary, muted, inverse)
   - Accent (brand, interactive, hover, active)
   - Status (success, warning, error, info)
   - Must meet WCAG 2.1 AA contrast (4.5:1 text, 3:1 large text)

4. **Surface layers** — define card/panel elevation hierarchy. No glassmorphism per `PRODUCT.md`.

5. **Border/radius rules** — define consistent border widths, radius values, and when to use them.

6. **Card hierarchy** — define card variants for articles, concepts, series, resources. Consistent padding, shadow, hover states.

7. **Button/link states** — define primary, secondary, ghost, danger button styles. Link states: default, hover, active, visited, focus.

8. **Icon rules** — `lucide-react` is used. Define size scale, when icons appear, stroke width consistency.

9. **Motion rules** — define animation principles:
   - Respect `prefers-reduced-motion`
   - Subtle transitions (150-300ms)
   - No decorative animations

10. **Component patterns** — document existing reusable components and propose missing ones.

## What not to do

- Do NOT apply design system to pages during audit — this is definition only.
- Do NOT introduce glassmorphism, neon gradients, or mystical symbolism.
- Do NOT change font files or add new font dependencies without approval.
- Do NOT modify `tailwind.config` or `postcss.config` during audit.
- Do NOT create new components during audit.

## Output format

```
## Design System Audit

### Typography Scale
<scale definition>

### Spacing Scale
<scale definition>

### Color Roles
| Role | Token | Value | Contrast |
|------|-------|-------|----------|

### Surface Layers
<layer definitions>

### Border/Radius Rules
<rules>

### Card Hierarchy
<card variants>

### Button/Link States
<state definitions>

### Icon Rules
<rules>

### Motion Principles
<principles>

### Component Inventory
| Component | Status | Notes |
|-----------|--------|-------|

### Gaps Identified
<what's missing>
```

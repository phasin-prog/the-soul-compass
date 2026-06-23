---
name: accessibility-performance-qa
description: Enforce accessibility (WCAG 2.1 AA) and performance QA for The Soul's Compass — semantic HTML, keyboard nav, focus states, contrast, reduced motion, image optimization, Core Web Vitals.
---

# Accessibility & Performance QA

## When to use

Use this skill **after page redesign** and **before finalizing any UI change**. It ensures The Soul's Compass meets WCAG 2.1 AA and performs well.

## What to do

1. **Semantic HTML** — verify heading order (h1 → h2 → h3), landmark regions (nav, main, article, footer), and proper list/table usage.

2. **Heading order** — every page must have exactly one `<h1>`, followed by `<h2>` sections, then `<h3>` subsections. No skipped levels.

3. **Keyboard navigation** — verify all interactive elements are reachable via Tab, Enter activates links/buttons, Escape closes modals, arrow keys navigate menus.

4. **Focus states** — verify visible focus indicators on all interactive elements. Never `outline: none` without a replacement.

5. **Color contrast** — verify text meets 4.5:1 ratio (normal text) or 3:1 (large text). Check against both light and dark backgrounds.

6. **Reduced motion** — verify animations respect `prefers-reduced-motion: reduce`. Use `@media (prefers-reduced-motion: reduce)` or `motion-safe:`/`motion-reduce:` Tailwind variants.

7. **Image optimization** — verify:
   - Next.js `<Image>` with `priority` for above-the-fold images
   - `width` and `height` on all images (prevent CLS)
   - Alt text on all meaningful images
   - Lazy loading for below-the-fold images

8. **LCP/INP/CLS risk checking** — identify:
   - Largest Contentful Paint: hero images, large text blocks
   - Interaction to Next Paint: heavy JS, unnecessary re-renders
   - Cumulative Layout Shift: missing dimensions, injected content

9. **Hydration and bundle risk checking** — verify:
   - No `"use client"` where server components suffice
   - Dynamic imports for heavy components
   - No duplicate React instances
   - No large client-side state in article pages

## What not to do

- Do NOT remove focus styles.
- Do NOT use `aria-hidden="true"` on focusable elements.
- Do NOT skip alt text on meaningful images.
- Do NOT add animations without `prefers-reduced-motion` support.
- Do NOT use `next/image` without width/height or `fill`.
- Do NOT add unnecessary `"use client"` directives.

## Output format

```
## Accessibility & Performance QA

### Semantic HTML
| Page | Status | Issues |
|------|--------|--------|

### Heading Order
| Page | Status | Issues |
|------|--------|--------|

### Keyboard Navigation
| Component | Status | Issues |
|-----------|--------|--------|

### Focus States
| Component | Status | Issues |
|-----------|--------|--------|

### Color Contrast
| Element | Ratio | Status |
|---------|-------|--------|

### Reduced Motion
| Animation | Status | Issues |
|-----------|--------|--------|

### Image Optimization
| Image | Status | Issues |
|-------|--------|--------|

### Core Web Vitals Risk
| Metric | Risk Level | Source |
|--------|-----------|--------|

### Hydration Risk
| Component | Risk | Reason |
|-----------|------|--------|

### Overall Status
<pass/fail with summary>
```

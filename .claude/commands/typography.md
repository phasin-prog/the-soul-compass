# typography

Typography expert for The Soul's Compass — dark psychology/philosophy platform with Thai + English longform reading.

Sources: [petekp/typography](https://playbooks.com/skills/petekp/claude-code-setup/typography) · [eddiebe147/typography-advisor](https://playbooks.com/skills/eddiebe147/claude-settings/typography-advisor) · [pbakaus/impeccable typeset](https://claudemarketplaces.com/skills/pbakaus/impeccable/typeset)

---

## This Project's Type System

### Font Stack
```
Display / Headings:  Playfair Display (or Cormorant Garamond)
Body:                Inter (or Source Sans 3)
Thai body:           Sarabun
Code (if needed):    JetBrains Mono
```

### Loading (next/font — never @import)
```typescript
import { Playfair_Display, Inter, Sarabun } from 'next/font/google'

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-display',
})
const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-body',
})
const thai = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-thai',
})
```

---

## Type Scale (Major Third ratio — 1.25)

| Token | Size | Usage |
|-------|------|-------|
| `text-xs` | 12px | metadata, captions |
| `text-sm` | 14px | badges, labels |
| `text-base` | 17px | body (EN) |
| `text-body-th` | 19px | body (TH) |
| `text-lg` | 20px | lead paragraph, concept card |
| `text-xl` | 24px | h3 in article |
| `text-2xl` | 28px | h2 in article |
| `text-3xl` | 34px | h1 article title |
| `text-4xl` | 42px | section heading, hero subtitle |
| `text-5xl` | 52px | hero display |

Fluid between breakpoints using `clamp()`:
```css
--text-body: clamp(16px, 1.1vw + 14px, 18px);
--text-display: clamp(36px, 4vw + 20px, 64px);
```

---

## Line Length (Measure)

| Context | Max-width |
|---------|-----------|
| Article body | `66ch` (≈65–70 chars) |
| Lead paragraph | `58ch` |
| Concept definition | `62ch` |
| Card excerpt | `48ch` |

**Never:** full-width prose on desktop. Never justified text.

---

## Line Height

| Context | Line-height |
|---------|------------|
| EN body | 1.75 |
| TH body | 1.85 (Thai descenders need more room) |
| H2/H3 in article | 1.25 |
| Display / hero | 1.1 |
| Card excerpt | 1.6 |

---

## Dark Background Rules

On `#0a0a0f` background:
- Body text: `#e8e4d9` (warm ivory) — NOT pure white #ffffff
- Muted/metadata: `#9a9690` — verify 4.5:1 minimum
- Never increase font-weight on dark to compensate for low contrast
- Add `0.01em` letter-spacing to body on dark (improves legibility)
- Reduce heading weight slightly vs. light mode (400 feels heavier on dark)

```css
/* Contrast ratios on #0a0a0f */
#e8e4d9 → 14.2:1  ✅ AAA
#9a9690 → 4.8:1   ✅ AA (check per usage)
#c4a35a → 6.1:1   ✅ AA (gold accent)
```

---

## Thai Typography Specifics

- Base size: **19px** (not 16px — Thai glyphs are denser)
- Line-height: **1.85** minimum
- `word-break: keep-all` for Thai — prevent mid-word breaks
- Font: Sarabun — clean, not decorative, works at small sizes
- Avoid: Kanit (too geometric for longform), Prompt (too modern/corporate)
- Mixed TH+EN in same paragraph: EN falls back to body font, TH to thai font

```css
.prose-th {
  font-family: var(--font-thai), var(--font-body), sans-serif;
  font-size: 1.1875rem; /* 19px */
  line-height: 1.85;
  word-break: keep-all;
}
```

---

## Tailwind Config

```typescript
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      thai:    ['var(--font-thai)', 'var(--font-body)', 'sans-serif'],
    },
    fontSize: {
      'body-th': ['1.1875rem', { lineHeight: '1.85' }],
    },
  }
}
```

---

## Typography Audit Checklist

Run when reviewing any page or component:

- [ ] Body text ≥ 17px EN / ≥ 19px TH
- [ ] Article body max-width ≤ 66ch
- [ ] Line-height ≥ 1.75 EN / ≥ 1.85 TH
- [ ] No justified text (`text-justify`)
- [ ] No pure white (#fff) text on dark bg
- [ ] Heading hierarchy: h1 → h2 → h3, no skips
- [ ] Display font (Playfair) only on headings — not body
- [ ] Contrast ≥ 4.5:1 for all text, ≥ 7:1 for body
- [ ] fonts loaded via `next/font` — no `@import` in CSS
- [ ] `font-display: swap` on all font declarations
- [ ] Letter-spacing: `0.01em` on body, slight negative on large headings

---

## Common Mistakes to Flag

| Problem | Fix |
|---------|-----|
| 16px body on dark bg | Raise to 17–18px EN, 19px TH |
| `line-height: 1.5` on article body | Raise to 1.75 |
| Full-width prose | Add `max-w-prose` or explicit `max-w-[66ch]` |
| Playfair Display on body text | Switch to Inter/Sarabun |
| Pure #ffffff text | Use `#e8e4d9` warm ivory |
| Thai text breaking mid-word | Add `word-break: keep-all` |
| Multiple font weights loaded | Limit to 2–3 weights per family |
| No `font-display: swap` | CLS risk — always add |

---

## Usage

`/typography audit` — audit current typography  
`/typography scale` — generate type scale for current context  
`/typography fix [component]` — fix typography issues in a specific file

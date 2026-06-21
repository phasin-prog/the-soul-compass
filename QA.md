# QA Checklist — The Soul's Compass

Date: 2026-06-20
Phase: 7 (Pre-deployment)

---

## Build Status

- [x] Zero TypeScript errors
- [x] Build completes successfully
- [x] All 30 routes generated
- [x] No console errors in build output

---

## Pages (30 routes)

### Core Pages
- [ ] `/` → redirects to `/th`
- [ ] `/th` — Home (TH)
- [ ] `/en` — Home (EN)
- [ ] `/th/about` — About (TH)
- [ ] `/en/about` — About (EN)
- [ ] `/th/manifesto` — Manifesto (TH)
- [ ] `/en/manifesto` — Manifesto (EN)

### Listings
- [ ] `/th/articles` — Articles listing
- [ ] `/en/articles` — Articles listing
- [ ] `/th/concepts` — Concepts listing
- [ ] `/en/concepts` — Concepts listing
- [ ] `/th/series` — Series listing
- [ ] `/en/series` — Series listing
- [ ] `/th/resources` — Resources
- [ ] `/en/resources` — Resources

### Categories (5 × 2 locales = 10)
- [ ] `/th/analytical-psychology`
- [ ] `/en/analytical-psychology`
- [ ] `/th/psychoanalysis`
- [ ] `/en/psychoanalysis`
- [ ] `/th/philosophy`
- [ ] `/en/philosophy`
- [ ] `/th/typology`
- [ ] `/en/typology`
- [ ] `/th/tpdt` (with warning banner)
- [ ] `/en/tpdt` (with warning banner)

### Detail Templates (placeholder)
- [ ] `/th/articles/[slug]`
- [ ] `/en/articles/[slug]`
- [ ] `/th/concepts/[slug]`
- [ ] `/en/concepts/[slug]`

---

## Navigation

### Header
- [ ] Logo links to home
- [ ] Articles link works
- [ ] Concepts link works
- [ ] About link works
- [ ] Manifesto link works
- [ ] Language switcher works (TH ↔ EN)
- [ ] Nav is sticky on scroll

### Footer
- [ ] Description displays
- [ ] Copyright year is current
- [ ] Disclaimer displays

---

## Functionality

### i18n
- [ ] Thai content displays correctly
- [ ] English content displays correctly
- [ ] Language switcher maintains current page path
- [ ] Fonts switch correctly (Inter → Sarabun for Thai)

### Typography
- [ ] Playfair Display loads for headings
- [ ] Inter loads for English body text
- [ ] Sarabun loads for Thai body text
- [ ] Italic keywords render in gold (#c4a35a)
- [ ] Line height is 1.75
- [ ] Max-width 720px for prose

### Components
- [ ] Buttons render correctly (primary/secondary/ghost)
- [ ] Cards have hover effects
- [ ] Badges display correctly
- [ ] Warning banner shows on TPDT pages
- [ ] Category color bars display

---

## Accessibility

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Skip to main content link works (Tab + Enter)
- [ ] Focus indicators visible (gold outline)
- [ ] Enter/Space activate buttons/links
- [ ] Escape closes modals (if any)

### Screen Reader
- [ ] `<main id="main-content">` landmark present
- [ ] `<nav aria-label>` present
- [ ] Heading hierarchy logical (h1 → h2 → h3)
- [ ] Links have descriptive text
- [ ] Images have alt text (when added)
- [ ] ARIA labels on language switcher

### Color Contrast
- [ ] Text (#e8e4d9) on background (#0a0a0f): 12.6:1 ✓
- [ ] Muted text (#9a9690) on background: 6.2:1 ✓
- [ ] Gold accent (#c4a35a) on dark: 5.1:1 ✓

---

## SEO

### Meta Tags
- [ ] Title tags present and unique
- [ ] Description tags present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URLs set
- [ ] hreflang tags present

### Files
- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` accessible
- [ ] `/opengraph-image` generates

### JSON-LD
- [ ] Organization schema present
- [ ] WebSite schema present

---

## Performance

### Fonts
- [x] Using next/font/google
- [x] font-display: swap
- [ ] No FOUT (Flash of Unstyled Text)

### Images
- [ ] Using next/image (when images added)
- [ ] Blur placeholders (when images added)

### Loading
- [ ] Pages load quickly
- [ ] No layout shifts (CLS < 0.1)
- [ ] No long tasks blocking main thread

---

## Responsive Design

### Breakpoints
- [ ] Mobile (< 768px): layout adapts
- [ ] Tablet (768px - 1024px): layout adapts
- [ ] Desktop (> 1024px): max-width containers

### Touch Targets
- [ ] Buttons/links at least 44×44px
- [ ] Adequate spacing between interactive elements

---

## Browser Testing

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] iOS Safari
- [ ] Chrome Mobile
- [ ] Firefox Mobile

---

## Content Audit

### Placeholder Content
- [ ] All pages have "Coming Soon" or placeholder text
- [ ] No lorem ipsum
- [ ] TPDT warning banner displays
- [ ] Category descriptions accurate

### Copy
- [ ] No typos in English content
- [ ] No typos in Thai content
- [ ] Tone matches CLAUDE.md guidelines
- [ ] No "Unlock your potential" / marketing speak

---

## Git & Deployment

### Pre-deployment
- [x] All changes committed
- [x] Build succeeds locally
- [ ] README.md updated
- [ ] DEPLOYMENT.md created
- [ ] env.example present

### Ready for Deploy
- [ ] Environment variables documented
- [ ] No secrets in codebase
- [ ] .gitignore correct

---

## Post-Deployment Verification

*(Complete after deploy)*

- [ ] Production site loads
- [ ] All routes accessible
- [ ] Lighthouse audit run
- [ ] Performance score > 90
- [ ] Accessibility score = 100
- [ ] SEO score = 100

---

**Notes:**
- [ ] = Manual test required
- [x] = Already verified/automated

**Status:** Ready for deployment

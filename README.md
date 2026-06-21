# The Soul's Compass

> Next.js 15 · TypeScript · Tailwind CSS · Vercel

พื้นที่สำหรับอ่านจิตใจมนุษย์อย่างลึกกว่าแบบทดสอบ — จิตวิทยาเชิงลึก จิตวิเคราะห์ และปรัชญา

**Live Site:** https://thesoulscompass.vercel.app *(coming soon)*

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or 20.x
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd the-souls-compass

# Install dependencies
npm install

# Create environment file
cp env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Fonts:** Playfair Display, Inter, Sarabun
- **Deployment:** Vercel
- **i18n:** Thai (primary) + English

---

## 🏗️ Project Structure

```
app/
├── [locale]/              # Locale-based routing (th/en)
│   ├── page.tsx           # Home
│   ├── about/             # About page
│   ├── manifesto/         # Manifesto
│   ├── articles/          # Article listing + [slug]
│   ├── concepts/          # Concept glossary + [slug]
│   ├── series/            # Series listing + [slug]
│   ├── resources/         # Resources
│   └── [categories]/      # 5 category pages
├── sitemap.ts             # Dynamic sitemap
├── robots.ts              # SEO robots.txt
└── opengraph-image.tsx    # OG image generation

components/
├── ui/                    # Base UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Badge.tsx
├── Header.tsx             # Site header
├── Footer.tsx             # Site footer
├── ArticleCard.tsx        # Article preview card
├── ConceptCard.tsx        # Concept preview card
├── CategoryPage.tsx       # Category landing template
├── ArticleLayout.tsx      # Article detail wrapper
└── WarningBanner.tsx      # TPDT development notice

lib/
├── site.ts                # Site config
├── routes.ts              # Route utilities
├── metadata.ts            # SEO metadata helpers
├── i18n/                  # Internationalization
└── content/               # Content type definitions
```

---

## 🌐 Environment Variables

Copy `env.local.example` to `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set:
```env
NEXT_PUBLIC_SITE_URL=https://thesoulscompass.com
```

---

## 🎨 Design System

**Colors:**
- Background: `#0a0a0f`
- Surface: `#111118`
- Border: `#2a2a35`
- Text: `#e8e4d9`
- Text muted: `#9a9690`
- Accent gold: `#c4a35a`

**Typography:**
- Headings: Playfair Display (serif)
- Body: Inter (English), Sarabun (Thai)
- Base size: 17-18px, line-height: 1.75

**Design Principles:**
- Dark theme only
- Editorial typography with italic emphasis
- Max-width 720px for prose
- Warm, earthy color palette

---

## 📝 Content Structure

**Categories:**
1. Analytical Psychology — Carl Jung's depth psychology
2. Psychoanalysis — Freud, Klein, Lacan
3. Philosophy — Philosophical perspectives
4. Typology — Jungian psychological types
5. TPDT — Theory in development (with warning banner)

**Content Types:**
- Articles (long-form)
- Concepts (glossary entries)
- Series (curated collections)
- Resources (books, papers, videos)

---

## 🔍 SEO & Performance

**SEO:**
- ✅ Dynamic sitemap.xml
- ✅ robots.txt
- ✅ Open Graph images
- ✅ JSON-LD structured data
- ✅ hreflang for locale alternates
- ✅ Canonical URLs

**Accessibility:**
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Skip to main content
- ✅ ARIA labels

**Performance:**
- ✅ Static generation (30 routes)
- ✅ Font optimization
- ✅ Image optimization ready

---

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick deploy to Vercel:**

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 📚 Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🎯 Project Status

**Phase 0-6:** ✅ Complete
- Skills setup
- Architecture
- Core pages
- Content sections
- SEO + Accessibility

**Phase 7:** 🚧 In Progress
- QA + Deployment

**Next Steps:**
- Add real content (articles, concepts)
- MDX integration
- CMS setup (optional)
- Analytics (optional)

---

## 📄 License

MIT License

---

## 👤 Author

Witcha Prasomsin

---

## 🙏 Acknowledgments

Built with Claude Code (Opus 4.8) — Anthropic's official CLI for Claude

# The Soul's Compass

> Next.js 16 · TypeScript · Tailwind CSS · Supabase · Cloudflare R2 · Vercel

พื้นที่ศึกษาจิตใจมนุษย์ผ่านจิตวิทยาหลายสำนัก ประสาทวิทยาศาสตร์ จิตวิทยาสังคม และปรัชญา

**Live Site:** https://thesoulscompass.vercel.app

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.9 or newer
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/phasin-prog/the-soul-compass.git
cd the-soul-compass

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

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Fonts:** Playfair Display, Inter, Sarabun
- **Auth:** Clerk
- **Database:** Supabase (PostgreSQL)
- **Storage:** Cloudflare R2
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
│   ├── studio/            # CMS editor (auth-gated)
│   └── [categories]/      # Category pages (AP, psychoanalysis, etc.)
├── sitemap.ts             # Dynamic sitemap
├── robots.ts              # SEO robots.txt
└── opengraph-image.tsx    # OG image generation

components/
├── ui/                    # Base UI components
├── home/                  # Homepage sections
├── studio/                # Studio CMS editor
├── Header.tsx
├── Footer.tsx
├── ArticleCard.tsx
├── ConceptCard.tsx
├── CategoryPage.tsx
└── ArticleLayout.tsx

lib/
├── site.ts                # Site config
├── routes.ts              # Route utilities
├── articles.ts            # Article data layer
├── concepts.ts            # Concept data layer (Supabase + R2)
├── series.ts              # Series data layer (Supabase + R2)
├── i18n/                  # Internationalization (th.ts, en.ts)
└── wiki/                  # Studio types, publish/draft logic
```

---

## 🌐 Environment Variables

The publishing Studio uses Supabase as the public metadata/index layer and Cloudflare R2 as the private Markdown/object store:

```env
NEXT_PUBLIC_SITE_URL=https://thesoulscompass.com
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_BUCKET_NAME=<bucket>
R2_ACCESS_KEY_ID=<access-key>
R2_SECRET_ACCESS_KEY=<secret-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
POSTHOG_PROJECT_TOKEN=phc_...
POSTHOG_LOGS_ENDPOINT=https://us.i.posthog.com/i/v1/logs
OTEL_SERVICE_NAME=the-souls-compass
```

### CMS database setup

Apply the checked-in migration once per Supabase environment:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
npm run cms:check
```

### Publishing flow

1. Draft and review content is written privately to R2.
2. Publishing upserts typed metadata and the R2 object key to Supabase.
3. Next.js invalidates only the article list/locale/slug cache tags.
4. No Git commit, Vercel deployment, or full-site rebuild is required.

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
- Base size: 17–18px, line-height: 1.75

**Design Principles:**
- Dark theme only
- Editorial typography with italic emphasis
- Max-width 720px for prose
- Warm, earthy color palette
- Quiet midnight reading-room aesthetic

---

## 📝 Content Structure

**Categories:**
1. Analytical Psychology — Carl Jung's depth psychology
2. Psychoanalysis — Freud, Klein, Lacan
3. Neuroscience — Brain, nervous system, cognition, and affect
4. Social Psychology — Groups, identity, attribution, and social influence
5. Philosophy — Philosophical perspectives
6. Philosophy of Mind — Consciousness, self, and the mind-body problem
7. Typology — Jungian psychological types
8. TPDT — Theory in development (with warning banner)

**Content Types:**
- Articles (long-form)
- Concepts (structured, interconnected knowledge nodes)
- Series (curated reading paths)
- Resources (books, papers, videos)

All content types are managed through the built-in Studio CMS and stored in Supabase + Cloudflare R2.

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
- ✅ Static generation for public routes
- ✅ Font optimization
- ✅ Image optimization (Cloudflare R2 + Next.js Image)

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
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run cms:check        # Verify Supabase table and R2 read/write access
npm run cms:seed-existing # Seed existing static articles to database
```

---

## 🎯 Project Status

**Phase 0–6:** ✅ Complete
- Skills setup, architecture, core pages, content sections, SEO + Accessibility

**Studio CMS:** ✅ Complete
- Full publish/draft lifecycle for Articles, Concepts, and Series via Supabase + R2

**Phase 7:** 🚧 In Progress
- QA + Deployment

---

## 👤 Author

**Phasin Pasumart**
- GitHub: [@phasin-prog](https://github.com/phasin-prog)
- Email: phasinxpasumart@gmail.com
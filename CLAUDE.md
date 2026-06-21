# The Soul's Compass — Quick Reference

> Next.js 15 · TypeScript strict · Tailwind · Vercel · Thai (primary) / English

---

## สารบัญ
1. [Tone — เสียงและน้ำเสียง](#tone)
2. [กฎสำคัญ](#rules)
3. [ขั้นตอนการทำงาน](#workflow)
4. [Design Tokens](#tokens)
5. [Routes](#routes)
6. [Lib Structure](#lib)

---

## Tone

**Thai:** พื้นที่สำหรับอ่านจิตใจมนุษย์อย่างลึกกว่าแบบทดสอบ  
**English:** precise · intellectual · non-therapeutic

**ห้ามเด็ดขาด:**
- "Unlock your potential" / "Transform your life" / "Discover who you really are"
- machine-translation rhythm
- fake academic authority

---

## กฎสำคัญ

| หัวข้อ | กฎ |
|--------|-----|
| **TPDT** | ห้ามแต่งทฤษฎี — scaffolding เท่านั้น, mark "in development" ทุกชิ้น |
| **Typology** | Jung ≠ MBTI — ห้ามเทียบเท่า |
| **Copy** | ต้องการ references สำหรับ claims ที่จริงจัง |
| **Secrets** | ตรวจ `.env` ก่อน commit แรก |
| **Build** | Zero TS errors · WCAG 2.1 AA · LCP < 2.5s · CLS < 0.1 |

---

## ขั้นตอนการทำงาน

```
Phase 0  ✅  Skills (.claude/commands/)
Phase 1  ✅  Audit + PRD  →  docs/AUDIT.md, docs/PRD.md
Phase 2  🔲  Initialize Next.js
             npx create-next-app@latest . --typescript --tailwind --app
             + .gitignore ก่อน npm install
Phase 3  🔲  lib/ architecture + [locale] routing
Phase 4  🔲  Core pages (home, articles, concepts, about, manifesto)
Phase 5  🔲  Content sections (AP, psychoanalysis, philosophy, typology, TPDT)
Phase 6  🔲  SEO + Performance (sitemap, OG, hreflang)
Phase 7  🔲  QA + Vercel deploy
```

---

## Design Tokens

| Token | Value |
|-------|-------|
| Background | `#0a0a0f` |
| Surface | `#111118` |
| Border | `#2a2a35` |
| Text | `#e8e4d9` |
| Text muted | `#9a9690` |
| Accent gold | `#c4a35a` |
| Accent silver | `#8fa0b0` |

**Font:** Playfair Display · Inter · Sarabun (Thai) — 17–18px · 1.75lh · max-w 720px

---

## Routes

```
/  →  /th
/[locale]/articles/[slug]
/[locale]/series/[slug]
/[locale]/concepts/[slug]
/[locale]/analytical-psychology/[slug]
/[locale]/psychoanalysis/[slug]
/[locale]/philosophy/[slug]
/[locale]/typology/[slug]
/[locale]/tpdt/[slug]
/[locale]/resources · /about · /manifesto · /contact
```

---

## Lib Structure

```
lib/
  site.ts · routes.ts · i18n/ (exists)
  content/
    articles.ts · series.ts · concepts.ts
    categories.ts · resources.ts · navigation.ts
```

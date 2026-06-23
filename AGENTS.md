<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Identity

The Soul's Compass is a bilingual (Thai/English) long-form knowledge space for reading the psyche in depth. Brand personality: contemplative, rigorous, intimate — like a quiet midnight reading room.

## Agent Rules

### Read local skills first

Before any UI/UX, site map, or design work, load the relevant skill from `.opencode/skills/`:

- `safe-repo-workflow` — mandatory before any code change
- `pro-uiux-sitemap-overhaul` — full-site redesign orchestration
- `information-architecture-audit` — site map and navigation analysis
- `visual-design-system-audit` — typography, spacing, color, component patterns
- `accessibility-performance-qa` — WCAG 2.1 AA and Core Web Vitals
- `fullstack-regression-guard` — protect API, DB, auth, i18n after changes
- `studio-ui-system` — Studio editorial interface
- `nextjs-tailwind-qa` — Next.js and Tailwind-specific checks

### Use subagents for audit and review

- Spawn `explore` subagents for codebase discovery before editing
- Spawn `general` subagents for independent review of changes
- Use `task` tool to track multi-step work

### Do not edit source code before installation is complete

- Configuration and skill installation is separate from source changes
- Verify all skills are installed before beginning redesign work

### Do not push or deploy automatically

- Never run `git push` without explicit user approval
- Never trigger deployment pipelines without explicit user approval
- Report changes and request approval before pushing

### Do not change database/storage/auth/schema without explicit approval

- Supabase schema, migrations, and RLS policies are read-only by default
- Clerk auth configuration is read-only by default
- Storage paths (R2/S3) are read-only by default
- Environment variables and deployment config are read-only by default

### Preserve The Soul's Compass identity

- Follow `PRODUCT.md` design principles and anti-references
- No glassmorphism, neon gradients, mystical symbolism, or personality-test funnel aesthetics
- Quiet midnight reading room aesthetic: contemplative, rigorous, intimate

### Preserve public article routes

- All `/[locale]/articles/[slug]` routes must remain accessible
- Article URLs must not change (SEO preservation)
- Markdown rendering must remain consistent

### Preserve Thai/English routing

- The `[locale]` segment is sacred — both `/en/...` and `/th/...` must work
- All content must be available in both languages
- `lib/i18n/th.ts` and `lib/i18n/en.ts` are the source of truth

## Product UI

- For UI/UX, layout, responsive, Figma, or Canva work, use the installed skills in `.opencode/skills/`.
- Preserve the quiet midnight reading-room character defined in `PRODUCT.md`.
- Prefer existing tokens/components and the smallest working diff.

## Supabase Note

Supabase MCP may be added later in read-only/project-scoped mode only after approval. Do not add write tools, migration MCP, or database write access without explicit user approval.

---
name: soul-compass-design-agent
description: Audit, design, and implement UI/UX for The Soul's Compass public archive and Studio. Use when changing layouts, navigation, typography, responsive behavior, accessibility, Figma screens, Canva assets, or visual hierarchy in this repository.
---

# Soul Compass Design Agent

Read `references/design-language.md` before changing UI.

## Workflow

1. Read the target route, reused components, `app/globals.css`, and relevant Next.js guide under `node_modules/next/dist/docs/`.
2. Inspect the rendered page when browser tooling is available. Use Figma for editable screen exploration; use Canva only for standalone promotional graphics.
3. Preserve content, routes, SEO, auth, and data behavior unless the request explicitly changes them.
4. Prefer the smallest working diff. Reuse existing tokens and components; do not add a dependency for styling.
5. Implement mobile-first and keep touch targets at least 44px.
6. Verify with targeted lint, TypeScript, and one rendered-page check. Run a production build for structural layout changes.

## Design decisions

- Treat public pages as a quiet midnight reading room, not a SaaS landing page.
- Treat Studio as a focused editorial workspace, not a marketing page.
- Make provenance visible: primary, secondary, interpretation, and internal work must not blur together.
- Favor editorial rows, indexes, and reading paths over repeated product-card grids.
- Keep navigation concise. Move secondary destinations into grouped menus when the desktop row becomes crowded.
- Use Pridi for display text and Anuphan for interface/body text.
- Use the existing dark neutral palette and warm accent. Avoid gradients, glassmorphism, decorative dashboards, and gratuitous motion.

## Figma and Canva

- Figma: capture the current page, keep it as reference, create revisions in a separate frame, then implement the accepted direction in code.
- Canva: create social posts, covers, posters, and share cards only. Do not use Canva as the source of truth for responsive web UI.
- If Figma limits block editing, continue in code from the approved design direction and document the limit briefly.

## Stop conditions

- Do not redesign unrelated routes.
- Do not fabricate content, citations, metrics, or academic claims.
- Do not replace accessible native controls with custom imitations.

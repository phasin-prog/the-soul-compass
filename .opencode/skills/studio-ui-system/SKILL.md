---
name: studio-ui-system
description: Manage The Soul's Compass Studio — one-page editorial interface for creating and editing articles with markdown, metadata, and cover images.
---

# Studio UI System

## When to use

Use this skill when working on Studio pages (`app/[locale]/studio/`). The Studio is a simple editorial tool, not a full CMS.

## What to do

1. **One-page Studio** — Studio should be a single focused interface, not a multi-page dashboard. Keep the article list, editor, and preview on as few pages as possible.

2. **Simple editorial workflow** — the flow is:
   - List articles (with status: draft/published)
   - Create new article
   - Edit existing article
   - Preview article
   - Publish/unpublish

3. **Editing existing experimental articles** — preserve all existing articles. The Studio edits them, not replaces them.

4. **Required fields** — each article must support:
   - `title` — article title
   - `slug` — URL-safe identifier (auto-generated from title, editable)
   - `excerpt` — short description for cards and previews
   - `body` / `content` — markdown body text

5. **Cover field** — if the data model supports it, include a cover image field. Check `types/article.ts` and `supabase/migrations/` for current schema.

6. **Visible feedback controls** — show positive/negative feedback on article saves:
   - Success: toast notification (using `sonner`)
   - Error: inline error message with details
   - Loading state during save

7. **Markdown/header/icon UI** — the editor should:
   - Use a markdown textarea (not a WYSIWYG)
   - Show metadata fields above the editor
   - Use `lucide-react` icons for actions (save, preview, delete, etc.)

8. **No complex fake CMS** — do NOT build:
   - Drag-and-drop page builders
   - Visual editors
   - Multi-step wizards
   - Role management UIs
   - Analytics dashboards
   - Version control UIs

## What not to do

- Do NOT build a full CMS with templates, blocks, or page builders.
- Do NOT add rich text editors (use plain markdown textarea).
- Do NOT add user management beyond what Clerk provides.
- Do NOT change the article data model without approval.
- Do NOT remove existing Studio functionality.
- Do NOT add features that require new database tables.

## Output format

```
## Studio Changes

### Pages Modified
- <page> — <description>

### Components Modified
- <component> — <description>

### Data Model
- Fields: <list>
- Changes from current: <list or "none">

### Feedback
- Success: <mechanism>
- Error: <mechanism>
- Loading: <mechanism>
```

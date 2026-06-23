---
name: safe-repo-workflow
description: Enforce safe repository workflow for The Soul's Compass — check git status, read AGENTS.md, audit before edits, small diffs, verify builds, never auto-push.
---

# Safe Repo Workflow

## When to use

Use this skill **before any code change** in The Soul's Compass repository. It is mandatory for every editing session.

## What to do

1. **Check git status** — run `git status` before starting work. Note uncommitted changes.
2. **Read AGENTS.md** — load project-level rules before editing any file.
3. **Audit before risky edits** — for files touching routes, auth, Supabase, i18n, or deployment, read the file fully before modifying.
4. **List exact files before editing** — use `glob` or `read` to confirm file paths exist before `edit` or `write`.
5. **Make small diffs** — one logical change per edit. Never rewrite entire files unless the task requires it.
6. **Run lint/typecheck/build** — after changes, run:
   - `npm run lint` (if available)
   - `npx tsc --noEmit` (TypeScript check)
   - `npm run build` (only if source files were changed and build is safe)
7. **Report changed files** — list every file touched, commands run, and risks identified.
8. **Never push or deploy automatically** — require explicit user approval before `git push` or any deployment.

## What not to do

- Do NOT edit files without checking git status first.
- Do NOT run `git push`, `git deploy`, or any CI trigger without explicit approval.
- Do NOT modify `.env`, `.env.local`, or any secrets file.
- Do NOT edit `supabase/` migrations without explicit approval.
- Do NOT touch `node_modules/` or lockfiles unless updating dependencies is the explicit task.
- Do NOT make large monolithic diffs — keep changes atomic.
- Do NOT skip lint/typecheck after editing TypeScript or React files.

## Output format

After completing work, report:

```
## Safe Workflow Report

### Git Status
<status output>

### Files Changed
- file1.ts — description
- file2.tsx — description

### Commands Run
- `npm run lint` — pass/fail
- `npx tsc --noEmit` — pass/fail

### Risks Identified
- <risk or "none">

### Approval Needed
- [ ] git push
- [ ] deployment
```

# Migration Plan — Current → `src/` + Bun

> **Status: EXECUTED.** This document is kept as a record of what was done. The current setup uses **dual aliases** — root `/components/` remains the active UI kit (imported as `@/components/*`), and `src/components/` holds hardened copies (imported as `@src/components/*`). See `CLAUDE.md` § "The three zones".

## Phase 0 — Snapshot

Before anything:

```bash
git status
git stash -u                    # only if there are uncommitted changes you want to preserve
git checkout -b chore/restructure-src-bun
```

## Phase 1 — Switch to Bun

1. Verify Bun installed: `bun --version`
2. Remove any existing lockfile from npm/yarn/pnpm:
   ```bash
   rm -f package-lock.json yarn.lock pnpm-lock.yaml
   rm -rf node_modules
   ```
3. Install with Bun:
   ```bash
   bun install
   ```
4. Verify dev server boots:
   ```bash
   bun run dev
   ```
   Open http://localhost:3000 — should render. Kill server.
5. Update scripts in `package.json` to reflect Bun if needed (most don't need changes — `bun run dev` already invokes `next dev`).
6. Add to `package.json`:
   ```jsonc
   "packageManager": "bun@<version>",
   "engines": { "bun": ">=1.0" }
   ```
7. Commit: `chore: switch to bun package manager`

## Phase 2 — Move sources into `src/`

The root `/components/` UI kit stays in place (read-only).

```bash
mkdir -p src/styles src/types
git mv app   src/app
git mv lib   src/lib
git mv hooks src/hooks
```

Create `src/components/` (empty) and `src/features/` (empty) — these are the production homes for new code:

```bash
mkdir -p src/components/ui src/components/layout src/features
```

Move global styles into `src/styles/`:

```bash
git mv src/app/globals.css src/styles/globals.css
git mv src/app/themes.css  src/styles/themes.css
```

Update the import in `src/app/layout.tsx`:

```diff
- import "./globals.css";
+ import "@/styles/globals.css";
```

Update `src/styles/globals.css`:

```diff
- @import "./themes.css";
+ @import "./themes.css";   /* same — files now co-located */
```

## Phase 3 — Update path aliases

`tsconfig.json`:
```jsonc
"paths": {
  "@/*": ["./src/*"]
}
```

`components.json` (shadcn) — already uses `@/…` aliases, so just verify it still resolves:
```json
{
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Run typecheck:
```bash
bunx tsc --noEmit
```

Fix any unresolved imports. Most should resolve automatically because everything was using `@/` already.

## Phase 4 — Quarantine the root UI kit

The root `/components/` folder stays but is **off-limits to `src/`** imports. Add an ESLint rule to enforce:

`.eslintrc`:
```jsonc
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/no-children-prop": "off",
    "react-hooks/exhaustive-deps": "off",
    "@next/next/no-img-element": "off",
    "no-restricted-imports": ["error", {
      "patterns": [
        {
          "group": ["../components/*", "../../components/*", "../../../components/*"],
          "message": "Root /components/ is the UI kit playground — do not import from src/. Copy what you need into src/components/."
        },
        {
          "group": ["../templates/*", "../../templates/*", "../../../templates/*"],
          "message": "templates/ is the design playground — do not import from src/. Promote per docs/component-checklist.md."
        }
      ]
    }]
  }
}
```

Verify:
```bash
bun run lint
```

## Phase 5 — Templates folder

```bash
mkdir -p templates
```

Create `templates/README.md` (already authored — see `agent/templates.md` for content).

Add `templates/` to the lint ignore (since these files are throw-away):

`.eslintignore`:
```
templates/
```

## Phase 6 — Component catalog page

Create `src/app/dev/components/page.tsx` that:
- Lists production components in `src/components/`
- Auto-discovers template variants in `templates/{name}/Variant*.tsx`
- Renders each in an isolated card with theme toggle

Build behind a dev-only guard:
```tsx
export default function DevComponentsPage() {
  if (process.env.NODE_ENV === "production") return null;
  // ...
}
```

(Detailed implementation deferred until after migration is approved.)

## Phase 7 — Husky + lint-staged

```bash
bun add -d husky lint-staged
bunx husky init
```

Edit `.husky/pre-commit`:
```sh
bunx lint-staged
```

`package.json`:
```jsonc
"lint-staged": {
  "*.{ts,tsx}": [
    "eslint --fix"
  ],
  "*.{ts,tsx,css,md,json}": [
    "prettier --write"
  ]
}
```

Add scripts:
```jsonc
"prepare": "husky",
"format": "prettier --write \"src/**/*.{ts,tsx,css,md,json}\"",
"typecheck": "tsc --noEmit"
```

Verify by staging a file and committing — lint-staged should run.

## Phase 8 — Verification gate

Before opening the migration PR:

```bash
bun run lint        # passes
bun run typecheck   # passes
bun run build       # passes
bun run dev         # dev server boots, /, /dashboard render
```

Manually verify:
- [ ] Light + dark theme work
- [ ] Existing routes (`/`, `/dashboard`, `(auth)`, `(guest)`) render
- [ ] No console errors on key pages
- [ ] `/dev/components` lists components (Phase 6)
- [ ] Committing a file triggers Husky → lint-staged (Phase 7)
- [ ] `git grep "from \"@/components\"" src/` shows imports resolving to `src/components/` (not root)
- [ ] `git grep -r "from .*\\.\\./components" src/` returns nothing (root UI kit not imported)

## Phase 9 — PR

```bash
git push -u origin chore/restructure-src-bun
# Open PR with title:
#   chore: restructure to src/ + switch to bun
# Body:
#   - Move app/, lib/, hooks/ → src/
#   - Quarantine root /components/ as read-only UI kit
#   - Add /templates for design playground
#   - Switch package manager to Bun
#   - Add Husky + lint-staged
#   - Add /dev/components catalog (Phase 6)
#   - New rules in CLAUDE.md, agent/, docs/
```

## Rollback

If anything goes sideways:
```bash
git checkout main
git branch -D chore/restructure-src-bun
rm -rf node_modules bun.lock
npm install   # or whatever the team was using before
```

# Project Structure — Buildatics

Canonical layout. If the tree on disk doesn't match this, the tree is wrong.

## Top-level

```
buildatics/
├── components/             # Active UI kit (shadcn primitives + custom). Imported as @/components/*
├── templates/{feature}/    # Throw-away design experiments. Never imported by src/.
├── src/                    # All production code lives here.
│   ├── app/                # Next.js App Router routes
│   ├── components/         # Hardened copies from /components/ + production-only components
│   ├── features/{name}/    # Cross-route feature modules
│   ├── hooks/              # App-wide hooks
│   ├── lib/                # App-wide utilities (cn, fonts, ga, themes)
│   ├── styles/             # globals.css, themes.css
│   └── types/              # Global TS types
├── docs/                   # Human-facing docs
├── agent/                  # AI rules
├── public/                 # Static assets
├── CLAUDE.md               # Strict project rules (auto-loaded by Claude Code)
└── .cursorrules            # Cursor mirror
```

## Path aliases (tsconfig.json)

```jsonc
"paths": {
  "@/components/*":    ["./components/*"],     // root UI kit
  "@src/components/*": ["./src/components/*"], // hardened src copies
  "@/*":               ["./src/*"]             // everything else lives in src
}
```

What this means in practice:
- `@/components/ui/button` → `components/ui/button.tsx` (root kit)
- `@/lib/utils` → `src/lib/utils.ts`
- `@/hooks/use-mobile` → `src/hooks/use-mobile.ts`
- `@/styles/globals.css` → `src/styles/globals.css`
- `@/app/dashboard/...` → `src/app/dashboard/...`
- `@/features/checkout` → `src/features/checkout/`
- `@src/components/layout/sidebar/app-sidebar` → `src/components/layout/sidebar/app-sidebar.tsx` (hardened copy)

## `src/app/` (Next.js App Router)

```
src/app/
├── (auth)/                       # Route group
├── (guest)/                      # Route group
├── dashboard/
│   ├── _components/              # Route-local UI (underscore prefix = not a route)
│   ├── _hooks/
│   ├── layout.tsx
│   └── page.tsx
├── dev/components/page.tsx       # Component catalog (dev-only)
├── layout.tsx
└── not-found.tsx
```

## `src/components/` (hardened copies + production-only)

This folder starts mostly empty. Files arrive here in two ways:
1. **Hardening from the root UI kit** — a kit component (e.g. sidebar) needs a production-only change. Copy from `components/...` to `src/components/...`, then update consumers to import via `@src/components/...`.
2. **Production-only components** — components that have no kit counterpart and are app-wide enough to not belong in a single feature.

Currently copied:
- `src/components/layout/sidebar/` — used by dashboard. Internal sibling refs still resolve to root unless those siblings are also copied.
- `src/components/layout/header/` — same pattern.

When you harden a sibling that was previously root-referenced, update the cross-reference inside the src copy from `@/components/layout/...` to `@src/components/layout/...`.

## `src/features/{name}/` (cross-route features)

```
src/features/{kebab-name}/
├── components/                   # Components specific to this feature
├── hooks/
├── lib/                          # Pure functions, mappers, validators
├── types.ts                      # Public types
└── index.ts                      # Barrel — only re-exports the public surface
```

The folder name must match the eventual `templates/{name}/` it was promoted from (when applicable).

## `templates/` (design playground)

```
templates/
├── README.md
└── {feature-name}/
    ├── Variant1.tsx              # default export, page-like
    ├── Variant2.tsx
    └── notes.md                  # optional design notes
```

Rules:
- May import from anywhere (root `/components/`, `src/`, third-party).
- **Not** imported by `src/` (ESLint enforces).
- Catalog at `/dev/components` auto-discovers variants.
- Promotion to production is manual — see `docs/component-checklist.md`.

## Decision tree — "where does this file go?"

```
Route page/layout/handler?              → src/app/{route}/
Used by only one route?                 → src/app/{route}/_components/
Used by many routes in one feature?     → src/features/{feature}/
Hardened copy of a kit component?       → src/components/  (same relative path as in /components/)
New shadcn primitive (kit-level)?       → components/ui/  (with shadcn CLI: components.json points here)
Pure utility?                           → src/lib/  (or src/features/{f}/lib/)
Custom hook used app-wide?              → src/hooks/
TS type used app-wide?                  → src/types/
Design experiment / iteration?          → templates/{feature-name}/
```

If two answers apply, prefer the **narrower** scope.

## `components.json` (shadcn) aliases

```json
{
  "aliases": {
    "components": "@/components",
    "utils":      "@/lib/utils",
    "ui":         "@/components/ui",
    "lib":        "@/lib",
    "hooks":      "@/hooks"
  }
}
```

`@/components` and `@/components/ui` resolve to the **root UI kit** under the dual-alias setup — which is exactly where new shadcn-added primitives should land. `@/lib`, `@/hooks` resolve to `src/`.

## `agent/` (AI rules)
- `structure.md` — this file
- `frontend.md` — React / Next.js / TypeScript patterns
- `design.md` — design tokens, color, typography, spacing
- `skill.md` — meta-rules: how Claude should behave in this repo
- `templates.md` — playground workflow and promotion path

## `docs/` (human docs)
- `design-system.md` — tokens, fonts, spacing, usage examples
- `component-checklist.md` — promotion + review checklist
- `contributing.md` — branches, commits, Husky, lint-staged
- `migration-plan.md` — one-time root → `src/` migration steps (already executed)

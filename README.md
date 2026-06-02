# Buildatics

A Next.js 16 + Tailwind v4 + shadcn/ui kit for building admin-style frontends, with a deliberate split between an **active UI kit** (root `/components/`) and a **production source tree** (`/src/`). New features are sketched in `/templates/`, promoted into `/src/`, and exposed to the running app through a Display Center pattern.

> First-time? Skim [ARCHITECTURE.md](./ARCHITECTURE.md) before writing code — the dual-alias setup and the templates → src promotion flow are load-bearing.

---

## Prerequisites

- **Node 20+** (any modern LTS works — used only by tooling)
- **Bun ≥ 1.0** (`curl -fsSL https://bun.sh/install | bash`)
- Git (only required for Husky hooks)

## Setup

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) — root redirects to `/dashboard`.

If this is a fresh clone with no git history, run `git init && git add -A && git commit -m "init"` so Husky activates on the next commit.

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Next dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run start` | Serve the built app |
| `bun run lint` | ESLint (flat config, must pass before commit) |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run format` | Prettier write across `src/**/*` |

Pre-commit (Husky → lint-staged) runs `eslint --fix` and `prettier --write` on staged files. Don't use `--no-verify`; fix the issue.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 (`@theme inline`) + CSS variables |
| Component primitives | shadcn/ui (Radix under the hood) |
| Icons | lucide-react (primary), @radix-ui/react-icons + @remixicon/react also installed |
| Forms | react-hook-form + zod |
| State | zustand (light, only when needed) |
| Theming | next-themes + custom theme provider (color presets, font, sidebar mode, radius, scale, layout) |
| Package manager | Bun (lockfile: `bun.lock`) |
| Lint / Format | ESLint 9 (flat config) + Prettier |

Full dependency list: `package.json`.

## Project shape

```
buildatics/
├── components/                 # Active UI kit (shadcn primitives + custom). Default UI source.
├── templates/                  # Throw-away design playground. Never imported by src/.
├── src/                        # All production code.
│   ├── app/                    # Next.js App Router routes
│   ├── components/             # Hardened copies from /components/ + production-only components
│   ├── features/{name}/        # Cross-route feature modules
│   ├── hooks/                  # App-wide hooks
│   ├── lib/                    # App-wide utilities (cn, fonts, themes, ga)
│   ├── styles/                 # globals.css, themes.css
│   └── types/                  # Global TS types
├── docs/                       # Human-facing docs (design system, contribution, etc.)
├── agent/                      # Strict rules for AI assistants (Claude Code / Cursor)
├── public/                     # Static assets
├── ARCHITECTURE.md             # System layout, aliases, data flow
├── CLAUDE.md                   # Strict rules auto-loaded by Claude Code
└── .cursorrules                # Mirror for Cursor
```

## Path aliases (`tsconfig.json`)

```jsonc
"paths": {
  "@/components/*":    ["./components/*"],     // root UI kit (default)
  "@src/components/*": ["./src/components/*"], // hardened src copies (use after promotion)
  "@/*":               ["./src/*"]             // catches @/app, @/lib, @/hooks, @/features, @/styles, @/types
}
```

Read [ARCHITECTURE.md § Aliases](./ARCHITECTURE.md#path-aliases) for when to use which.

## Key routes (after `bun run dev`)

| URL | What it shows |
| --- | --- |
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Production home — minimal sidebar (Display Center + Templates + Reference) |
| `/dashboard/display-center` | The "live" Display Center page. Renders whichever variant was promoted via "Use this" |
| `/dashboard/templates/display-center/variant-1` … `variant-5` | Design iteration playground (5 variants of the listing layout). Each has a `Use this` button that sets a cookie + navigates to `/dashboard/display-center` |
| `/dashboard/components` | Catalog of UI primitives (Button, Badge, Card, Input, …) |
| `/dashboard/components/{slug}` | Showcase for one component |
| `/dashboard/sample` | Reference index — flat list of every entry in the *full* nav, useful when exploring |
| `/dashboard/default`, `/dashboard/crm`, `/dashboard/hotel`, … | Demo dashboards from the kit (the "full" sidebar is shown on these routes) |
| `/dev/components` | Dev-only template gallery (auto-discovers `templates/{feature}/Variant*.tsx`) |

## The two component zones

| Zone | Path | Purpose | Alias | Edit policy |
| --- | --- | --- | --- | --- |
| **UI kit (active)** | `/components/` | Live shadcn primitives + custom kit pieces | `@/components/*` | Edit only for kit-level changes (new shadcn primitive, shared bug fix). Don't refactor casually. |
| **Production src** | `/src/` | App Router routes, features, lib, hooks, hardened component copies | `@/*` + `@src/components/*` for src copies | All new app code goes here. |
| **Templates** | `/templates/{feature}/` | Throw-away design iteration | (relative imports) | Free-form. Never imported by `src/`. |

When a kit component needs production-only tweaks: copy it from `components/...` to `src/components/...` (same relative path), then update consumers to import via `@src/components/...`. The root copy stays as the canonical reference. Already done for `src/components/layout/{sidebar,header}/`, `src/components/active-theme.tsx`, and `src/components/theme-customizer/`.

## Templates → Production workflow

1. Sketch in `templates/{feature-name}/Variant1.tsx`, `Variant2.tsx` … or under `src/app/dashboard/(auth)/templates/{feature}/variant-N/page.tsx` for in-app iteration with the dashboard chrome.
2. View at `/dev/components` (auto-discovered file templates) or via the in-app variant switcher in the toolbar.
3. When approved:
   - Run the checklist in `docs/component-checklist.md`.
   - For Display Center: click **Use this on Display Center** in the toolbar — sets a `display_center_variant` cookie, redirects to `/dashboard/display-center` which reads the cookie and renders the chosen variant.
   - For other features: copy the chosen variant's code into `src/features/{name}/` or `src/app/{route}/_components/`, refactor for production (typed props, error states, real data), and wire to the production route.
4. Leave the template in place until the user explicitly says to delete it.

## Adding a new UI primitive showcase

Drop a file into `src/app/dashboard/(auth)/components/_showcases/{slug}.tsx`, register it in `_showcases/index.ts`, and add an entry to `_registry.ts`. The sidebar dropdown rebuilds from the registry automatically.

## Strict project rules

The rules that govern AI assistance (Claude Code / Cursor) and human contributors live in:

- [`CLAUDE.md`](./CLAUDE.md) — auto-loaded by Claude Code in every session
- [`.cursorrules`](./.cursorrules) — same TL;DR for Cursor
- [`agent/`](./agent/) — full rule set (structure, frontend patterns, design system, skill rules, templates workflow)
- [`docs/`](./docs/) — human-facing companion (design system reference, component checklist, contributing, migration history)

**Hard rules at a glance:**

- Bun only for package management
- TypeScript only in `src/` (no `.js`/`.jsx`)
- Design tokens only — never hex codes or Tailwind named palette in production
- Server Components by default; add `"use client"` only when required
- Do exactly what was asked — no drive-by refactors, no premature abstractions, no new dependencies without asking
- Don't edit `/components/` (the active UI kit) casually — copy into `src/components/` first
- Never delete `templates/{feature}/` without explicit confirmation
- Never `--no-verify`, never `git push --force`, never amend without being asked

## Troubleshooting

| Symptom | Try |
| --- | --- |
| `next dev` exits with "Unable to acquire lock" | Another `next dev` already runs — kill it or use a different port |
| Husky hook didn't run | `git init` first if no git repo; otherwise `bun run prepare` |
| ESLint errors about `next/core-web-vitals` | Make sure `@eslint/eslintrc` is installed (`bun install`) — flat config uses the compat shim |
| Image broken in a card | Verify the Unsplash photo ID is still valid; swap in `_data.ts` |
| Hydration mismatch on dashboard | Stale dev cache — hard refresh, then restart `bun run dev` |

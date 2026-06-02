# Buildatics — Project Rules (Strict)

This file is auto-loaded by Claude Code / Cursor in every session. **Follow these rules exactly.** No improvisation, no "while I'm here" cleanups, no hallucinated APIs.

If a rule conflicts with a user request, ask before proceeding. If a rule seems wrong, propose an update to this file rather than working around it.

---

## 1. The three zones (load-bearing)

| Zone | Path | Purpose | Aliased as | Edit policy |
| --- | --- | --- | --- | --- |
| **UI Kit (active)** | `/components/` (repo root) | The live shadcn UI kit + custom pieces. Used directly by production. | `@/components/*` | Edit only when adding a new shadcn primitive or extending the kit globally. **Do not refactor casually.** |
| **Production source** | `/src/` | App Router routes, features, hooks, lib, styles, hardened component copies. | `@/*` (everything except `/components/`), `@src/components/*` (src copies) | All new production code goes here. |
| **Design playground** | `/templates/{feature}/` | Iterative design experiments. Throw-away. | (relative imports only) | Free-form. Never imported by `src/`. |

### Path aliases (tsconfig.json)

```jsonc
"paths": {
  "@/components/*":     ["./components/*"],    // root UI kit (default)
  "@src/components/*":  ["./src/components/*"], // hardened copies in src
  "@/*":                ["./src/*"]            // catches @/app, @/lib, @/hooks, @/features, @/styles, @/types
}
```

**Reading the aliases:**
- `import { Button } from "@/components/ui/button"` → resolves to root UI kit.
- `import { AppSidebar } from "@src/components/layout/sidebar/app-sidebar"` → resolves to the *src copy* (a hardened version).
- `import { cn } from "@/lib/utils"` → resolves to `src/lib/utils.ts`.

### Hardening flow ("copy and clone")

When a component from the root UI kit needs production tweaks:
1. **Copy** the file(s) from `components/...` → `src/components/...` (same relative path).
2. **Update consumers** (production code in `src/`) to import via `@src/components/...` instead of `@/components/...`.
3. The src copy is the production-modifiable version. The root kit stays as the reference.
4. **Don't copy what you don't need to modify.** A copy is overhead; only do it when divergence is real.

Sidebar and header are already copied: `src/components/layout/{sidebar,header}/`. Their internal sibling references (`@/components/layout/sidebar/nav-main`) still resolve to root — that's intentional. When a sibling also needs hardening, copy that too and rewrite the cross-reference to `@src/components/...`.

---

## 2. Source layout (`src/`)

```
src/
├── app/                              # Next.js App Router routes only
│   ├── (auth)/, (guest)/             # Route groups
│   ├── dashboard/
│   │   ├── _components/              # Route-local UI (underscore = not a route segment)
│   │   ├── _hooks/
│   │   └── …
│   ├── dev/components/               # In-app component catalog (dev-only)
│   ├── layout.tsx
│   └── not-found.tsx
├── components/                       # Hardened copies of UI kit + production-only components
│   ├── ui/                           # Production-tweaked primitives (only when copied)
│   └── layout/                       # sidebar/, header/ already here
├── features/{name}/                  # Cross-route feature modules
│   ├── components/, hooks/, lib/, types.ts, index.ts (barrel)
├── hooks/                            # App-wide hooks
├── lib/                              # App-wide utilities (cn, fonts, ga, themes)
├── styles/                           # globals.css, themes.css
└── types/                            # Global TS types
```

### Where does this file go?

```
Route page/layout/handler?              → src/app/{route}/
Used by one route only?                 → src/app/{route}/_components/
Used by many routes in one feature?     → src/features/{feature}/
Truly app-wide, generic?                → src/components/  (when hardening from kit)
Reusable primitive (Button, Input)?     → src/components/ui/  (only when hardening; else use @/components/ui)
Pure utility / formatter?               → src/lib/  (or src/features/{f}/lib/)
Custom hook used app-wide?              → src/hooks/
TS type used app-wide?                  → src/types/
Design experiment / iteration?          → templates/{feature-name}/
```

Prefer the **narrower** scope when two apply. Promote later when reuse is real.

---

## 3. Hard rules for changes

1. **Do only what was asked.** No drive-by refactors, no "improvements," no renaming variables for style, no reorganising imports unless that *is* the task.
2. **No new abstractions** unless the task calls for one. Three similar lines is fine; a premature helper is not.
3. **No dependencies added** without asking. Propose, then install with `bun add`.
4. **Don't refactor the root UI kit (`/components/`) casually.** If a primitive needs production tweaks, *copy* it into `src/components/` and modify there. Direct edits to root are only for genuine kit-level fixes/additions.
5. **Never delete a `templates/{name}/` folder** without explicit user confirmation.
6. **TypeScript only** in `src/`. No `.js`/`.jsx`. No `any` outside unavoidable third-party boundaries.
7. **No new comments** unless they explain *why* something non-obvious is true.
8. **Server vs client:** default to Server Components. `"use client"` only when needed (hooks, browser APIs, event handlers).
9. **Git:** never `git push`, never `--force`, never `--no-verify`, never amend without being asked. (Currently the project is not even a git repo — `git init` is a user decision.)

---

## 4. Component design rules (production code in `src/`)

Every production component MUST:

- [ ] Be a named export (`export function MyThing(...)`) — defaults only where Next.js requires them.
- [ ] Have an explicit props `type` — no inline `({a, b}: {a:string,b:number})`.
- [ ] Forward `className` and merge with `cn()` from `@/lib/utils`. Forward `ref` for DOM-wrapping components.
- [ ] Use design tokens (CSS variables from `@/styles/globals.css`) — **never hardcoded colors, hex codes, or named palette like `bg-red-500`**.
- [ ] Use `data-slot="…"` attributes on stylable internal parts (matches shadcn convention).
- [ ] Use Tailwind v4 utilities; `cva` for variants instead of conditional class strings.
- [ ] Be accessible: semantic HTML, keyboard navigable, ARIA only when needed, focus-visible rings.
- [ ] Not fetch data inside itself unless it is a Server Component.

Banned in production components:
- `dangerouslySetInnerHTML` without a sanitiser
- inline `style={{...}}` for values that exist as utilities/tokens
- `console.log`
- `useEffect` for derived state

---

## 5. Design tokens (the only source of truth)

| Token category | Defined in | How to use |
| --- | --- | --- |
| Colors (`--primary`, `--background`, `--base-*`, etc.) | `src/styles/globals.css`, `src/styles/themes.css` | `bg-primary`, `text-foreground`, `border-border` — never hex |
| Radius | `--radius` and `--radius-{sm,md,lg,xl}` | `rounded-md`, `rounded-lg` |
| Typography | `src/lib/fonts.ts`, `--font-sans`, `--font-display` | `font-sans`, `font-display`, `font-mono` |
| Spacing | Tailwind default scale | `p-4`, `gap-2`, `space-y-6` — no arbitrary `p-[17px]` unless justified |
| Animation | `@theme inline` block in `globals.css` | Add keyframes there, not inline |

**Adding a new token:** add to `:root` + `.dark` in `globals.css`, surface via `@theme inline`, then use.

---

## 6. Templates → production workflow

1. Designer/dev scaffolds `templates/{feature}/Variant1.tsx`, `Variant2.tsx`, etc. Multiple variants encouraged.
2. View them at `/dev/components` (auto-discovered).
3. When approved, follow `docs/component-checklist.md`:
   - Single-route consumer → copy to `src/app/{route}/_components/`
   - Multi-route feature → copy to `src/features/{feature}/`
   - Hardened UI kit primitive → copy to `src/components/`
4. Refactor for production (typed props, error states, a11y, real data).
5. Wire to the production route in `src/app/`.
6. **Leave the template in place** until the user says to delete it.

**Claude must never delete a template without explicit confirmation.**

---

## 7. Tooling

- **Package manager: Bun.** Only `bun install`, `bun add`, `bun run`. Lockfile: `bun.lock`.
- **Dev server:** `bun run dev`.
- **Lint:** `bun run lint` — must pass before commit.
- **Typecheck:** `bun run typecheck` (added during migration).
- **Format:** Prettier via lint-staged on commit. Don't reformat unchanged files.
- **Husky pre-commit:** runs lint-staged. Don't bypass.

---

## 8. When in doubt

- [agent/structure.md](agent/structure.md) — layout details
- [agent/frontend.md](agent/frontend.md) — React/Next patterns
- [agent/design.md](agent/design.md) — design system rules
- [agent/skill.md](agent/skill.md) — how Claude should behave in this repo
- [agent/templates.md](agent/templates.md) — playground workflow
- [agent/api.md](agent/api.md) — API interaction rules (BFF, tokens, `apiFetch`)
- [docs/component-checklist.md](docs/component-checklist.md) — before promoting a template

If a rule here contradicts another file, **this file wins**. Propose a fix.

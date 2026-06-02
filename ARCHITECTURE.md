# Architecture — Buildatics

This document explains the moving parts of the codebase and why they exist. It complements [README.md](./README.md) (setup-focused) and [CLAUDE.md](./CLAUDE.md) (strict rules).

---

## 1. The three zones

The codebase is split into three intentionally separate trees. The split is the most important architectural decision in the project.

```
buildatics/
├── components/          # 1. UI Kit (active reference)
├── templates/           # 2. Design Playground
└── src/                 # 3. Production source
```

| Zone | Path | Imported as | Mental model |
| --- | --- | --- | --- |
| **UI Kit** | `/components/` | `@/components/*` | The shadcn-style kit. Live in the app. Stable surface. |
| **Templates** | `/templates/{feature}/` | (relative only) | Sketchbook. Throw-away experiments. Never imported by `src/`. |
| **Source** | `/src/` | `@/*` (and `@src/components/*` for forks) | Production routes, features, hooks, lib, hardened component copies. |

### Why three zones?

- **UI Kit stays untouched** so the underlying primitives remain a stable reference. Bug fixes for the kit go into root; production tweaks for *one* consumer go into a src copy.
- **Templates are explicitly throw-away** so designers/devs can iterate without polluting production code with dead variants.
- **`src/` is the only place production code lives** so build / lint / type rules can be tightly scoped there.

---

## 2. Path aliases

The `tsconfig.json` paths encode the three-zone split:

```jsonc
"paths": {
  "@/components/*":    ["./components/*"],     // ROOT UI kit (default UI source)
  "@src/components/*": ["./src/components/*"], // SRC hardened copies
  "@/*":               ["./src/*"]             // everything else in src
}
```

### Concretely

| Import | Resolves to | When to use |
| --- | --- | --- |
| `@/components/ui/button` | `components/ui/button.tsx` (root) | Default — pull primitives from the kit |
| `@src/components/layout/sidebar/app-sidebar` | `src/components/layout/sidebar/app-sidebar.tsx` | The src has a hardened copy with production tweaks |
| `@/lib/utils` | `src/lib/utils.ts` | `cn`, fonts, themes, ga — all under src |
| `@/hooks/use-mobile` | `src/hooks/use-mobile.ts` | App-wide hooks |
| `@/features/checkout` | `src/features/checkout/` | Feature modules |
| `@/styles/globals.css` | `src/styles/globals.css` | Stylesheets |
| `@/app/dashboard/...` | `src/app/dashboard/...` | Route imports (rare) |

### Why the `@src/components/*` alias?

A single `@/*` mapped to `./src/*` would force every UI primitive into `src/components/`. We don't want that — most primitives should stay in the unmodified kit. The explicit `@src/...` alias lets you signal "use the *hardened* copy" only when one exists, without changing the default import for everything else.

---

## 3. The hardening flow (when to copy a kit component)

```
1. By default, src/ imports from @/components/... (root kit)
2. A specific consumer needs a production-only tweak
3. Copy that component file from components/X.tsx → src/components/X.tsx
4. Modify the src copy
5. Update the consumer's import: @/components/X → @src/components/X
6. Root kit copy stays unchanged as the reference
```

Currently hardened:

- `src/components/layout/sidebar/app-sidebar.tsx` — pathname-aware variant switching
- `src/components/layout/sidebar/nav-main.tsx` — production navItems + pathname-based switch to referenceNavItems
- `src/components/layout/header/index.tsx` — added "All Pages" link, points to src `ThemeCustomizerPanel`
- `src/components/active-theme.tsx` — handles new `font` + `sidebarMode` fields and cookies
- `src/components/theme-customizer/*` — adds `FontSelector`, fixes `SidebarModeSelector`

When src copies internally reference sibling files in root (e.g. `app-sidebar.tsx` imports `nav-user` from root), that's allowed — only the *modified* entries need to live in src. Copy more siblings only when you also need to modify them.

---

## 4. Source layout (`src/`)

```
src/
├── app/                              # Next.js App Router
│   ├── (auth)/, (guest)/             # Route groups (not in URL)
│   ├── dashboard/
│   │   ├── (auth)/                   # Auth-required dashboard pages with sidebar+header chrome
│   │   │   ├── components/           # /dashboard/components (catalog)
│   │   │   ├── display-center/       # /dashboard/display-center (production view)
│   │   │   ├── templates/            # /dashboard/templates/* (iteration)
│   │   │   ├── default/, crm/, ...   # Demo dashboards (full sidebar)
│   │   │   ├── layout.tsx            # SidebarProvider + AppSidebar + SiteHeader
│   │   │   └── page.tsx              # /dashboard (minimal sidebar, empty content)
│   │   ├── (guest)/                  # Public dashboard pages (no sidebar/header)
│   │   ├── page.tsx                  # /dashboard root index
│   │   └── ...
│   ├── dev/components/               # /dev/components — template gallery (auto-discovers /templates/)
│   ├── layout.tsx                    # Root layout (fonts, ThemeProvider, ActiveThemeProvider)
│   └── not-found.tsx                 # /404
├── components/                       # Hardened copies of UI kit + production-only components
├── features/{name}/                  # (empty — placeholder for cross-route feature modules)
├── hooks/                            # use-character-limit, use-file-upload, use-mobile
├── lib/                              # cn, fonts (next/font), themes (presets + tokens), ga, compose-refs
├── styles/                           # globals.css (Tailwind + tokens + @theme inline), themes.css (presets)
└── types/                            # Global TS types (empty — add as needed)
```

### Decision tree for new files

```
Route page/layout/handler?              → src/app/{route}/
Used by only one route?                 → src/app/{route}/_components/
                                          src/app/{route}/_hooks/
Used by many routes in one feature?     → src/features/{feature}/
Hardened copy of a kit component?       → src/components/  (same relative path as in /components/)
New shadcn primitive (kit-level)?       → components/ui/   (shadcn CLI: components.json points here)
Pure utility?                           → src/lib/  (or src/features/{f}/lib/)
App-wide custom hook?                   → src/hooks/
App-wide TS type?                       → src/types/
Design experiment / iteration?          → templates/{feature-name}/
```

Prefer the **narrower** scope when two apply. Promote later when reuse is real, not anticipated.

---

## 5. Routing model

### Route groups

| Group | Purpose | Layout |
| --- | --- | --- |
| `src/app/dashboard/(auth)/` | Authenticated dashboard pages | `SidebarProvider` + `AppSidebar` + `SiteHeader` chrome |
| `src/app/dashboard/(guest)/` | Public dashboard pages | No sidebar chrome (login, error pages, demo single-page layouts) |

### Private folders

- `src/app/{route}/_components/` — route-local UI (underscore prefix tells Next.js to ignore as a URL segment)
- `src/app/{route}/_hooks/`, `_data.ts`, etc. — same pattern

### The sidebar's "minimal vs full" switch

`src/components/layout/sidebar/nav-main.tsx` selects which nav to render based on pathname:

```ts
const useMinimal =
  pathname === "/dashboard" ||
  pathname === "/dashboard/display-center" ||
  pathname.startsWith("/dashboard/templates/") ||
  pathname.startsWith("/dashboard/components");
const items = useMinimal ? navItems : referenceNavItems;
```

- **Minimal** (`navItems` in src): Display Center / Templates / Reference (Components). For the "production" pages we're actually building.
- **Full** (`referenceNavItems`): All 60+ demo routes from the kit. Shown on any other dashboard route so you can navigate the demo content as reference.

The reference data lives in [src/components/layout/sidebar/reference-nav-items.ts](src/components/layout/sidebar/reference-nav-items.ts) (plain data module, no `"use client"`).

---

## 6. Theming system

### Token sources

| Tokens | Defined in | Surfaced via |
| --- | --- | --- |
| Colors (`--primary`, `--background`, etc.) | `src/styles/globals.css` `:root` + `.dark` | `bg-primary`, `text-foreground`, etc. (Tailwind utilities) |
| Theme presets (Underground, Rose Garden, Sunset Glow, …) | `src/styles/themes.css` `[data-theme-preset="..."]` selectors | Theme provider sets `data-theme-preset` on `<body>` |
| Theme fonts | `src/styles/themes.css` `[data-theme-font="..."]` selectors set `--text-family` | Body class `font-sans` resolves through `@theme inline { --font-sans: var(--text-family) }` |
| Radius / scale / content-layout / sidebar-mode | Similar pattern with `data-theme-*` attributes | CSS rules and JSX consumers via `useThemeConfig()` |
| Fonts loaded | `src/lib/fonts.ts` (next/font/google) | CSS vars `--font-inter`, `--font-geist`, etc. |

### Provider flow

```
src/app/layout.tsx (Server Component)
  reads cookies(theme_preset, theme_radius, theme_scale, theme_content_layout, theme_font, theme_sidebar_mode)
  passes as `initialTheme` to ActiveThemeProvider
  also splays them as `data-theme-*` attributes on <body> for first paint

ActiveThemeProvider (src/components/active-theme.tsx, "use client")
  useState initialised from initialTheme
  useEffect → writes cookies + sets data-theme-* attributes on body
  exposes useThemeConfig() → { theme, setTheme }

ThemeCustomizerPanel (src/components/theme-customizer/panel.tsx)
  popover with PresetSelector, FontSelector, ThemeScaleSelector, ThemeRadiusSelector, ColorModeSelector, ContentLayoutSelector, SidebarModeSelector
  each calls setTheme(...) on user interaction
```

### Two important subtleties

1. **`--font-sans` cascade.** The body uses `font-sans` (Tailwind utility) which expands to `font-family: var(--font-sans)`. `@theme inline` in `globals.css` defines `--font-sans: var(--text-family)`. Preset selectors and font selectors override `--text-family` (NOT `--font-sans`) — that's the layer the cascade flows through. Setting `--font-sans` directly does nothing because Tailwind already substitutes via `--text-family`.

2. **Reactive sidebar variant.** The dashboard `(auth)/layout.tsx` is a Server Component — it reads cookies once at request time. To let the floating/inset/icon toggle take effect *without a page reload*, `AppSidebar` reads `theme.sidebarMode` from `useThemeConfig()` and computes `variant` on every render. Similarly, the content-area `bg-muted/40` is gated via `group-data-[theme-sidebar-mode=floating]/layout:bg-transparent` (CSS reacting to the body attribute).

---

## 7. Display Center — promotion via cookie

`/dashboard/display-center` is the only "production" page so far that uses the templates-promotion workflow. The mechanism:

```
1. User iterates on /dashboard/templates/display-center/variant-1 ... variant-5
2. Toolbar has a "Use this on Display Center" button
3. Clicking it:
     document.cookie = `display_center_variant=N`
     router.push("/dashboard/display-center")
     router.refresh()                  ← re-runs the Server Component with new cookie
4. /dashboard/display-center reads the cookie:
     cookies().get("display_center_variant")?.value
     looks it up in VARIANT_LAYOUTS = { 1: Variant1Layout, 2: ..., 5: ... }
     renders that layout
```

### File map

```
src/app/dashboard/(auth)/
├── templates/display-center/
│   ├── _data.ts                       Property type + 6 mock Australian houses + facade + floorPlan URLs
│   ├── _components/
│   │   ├── toolbar.tsx                Beds chip / Filter / Facade-Floor toggle / variant switcher / Use This button
│   │   ├── property-card.tsx          Image-top card (V1/V2/V4)
│   │   ├── property-row.tsx           Image-left horizontal (V3, V4 hero)
│   │   ├── property-list-item.tsx     Compact thumbnail row (V5)
│   │   └── variant-layouts.tsx        5 layout components + VARIANT_LAYOUTS registry
│   ├── variant-1/page.tsx … variant-5/page.tsx
└── display-center/
    └── page.tsx                       Reads cookie → renders chosen VARIANT_LAYOUTS[N]
```

### Why cookies (and not a DB or a file)?

- Solo-dev or single-tenant preview workflow: cookies are good enough.
- Per-user (your "Use this" doesn't override a teammate's).
- Reversible: clear cookies → back to V1 default.

When this needs to become a project-wide setting (committed in git, same for everyone), the upgrade is a server action that writes the choice to a JSON file. The reading side stays identical (just swap `cookies().get(...)` for `fs.readFile(...)`).

---

## 8. Component catalog (`/dashboard/components`)

A mini-Storybook driven by a registry pattern so adding components is trivial.

```
src/app/dashboard/(auth)/components/
├── _registry.ts                       List of { slug, name, description } entries
├── _showcases/
│   ├── index.ts                       slug → React component map
│   ├── button.tsx, badge.tsx, ...     One showcase file per component
│   └── ...
├── _components/
│   └── showcase-section.tsx           Shared wrapper for grouped examples
├── [slug]/page.tsx                    Dynamic route — renders SHOWCASES[slug]
└── page.tsx                           Index — grid of all entries
```

The sidebar's "Reference → Components" dropdown is auto-generated from `componentRegistry`. Adding a new entry to the registry + a showcase file makes it appear in the sidebar without further wiring.

---

## 9. Toolchain notes

### Bun

- Lockfile: `bun.lock` (committed).
- Use `bun add` / `bun add -d` for dependency changes — never npm/yarn/pnpm.
- The `packageManager` field in `package.json` enforces this for tools that honour it.

### ESLint 9 flat config (`eslint.config.mjs`)

- Next 16 dropped `next lint` — we use `eslint` directly with `next/core-web-vitals` via `@eslint/eslintrc`'s `FlatCompat`.
- Adds `no-restricted-imports` to block `templates/*` from being imported anywhere in `src/`.
- Ignores `templates/`, `.next/`, `.history/`, `node_modules/`.

### Husky + lint-staged

- `.husky/pre-commit` runs `bunx lint-staged` on every commit.
- Lint-staged config in `package.json`: runs `eslint --fix` on staged `.ts`/`.tsx` and `prettier --write` on all staged text files under `src/`.
- Activates only after `git init` + first commit (Husky requires a git repo).

### Tailwind v4

- No `tailwind.config.{js,ts}` — config-less. Tokens flow via CSS variables.
- The `@theme inline` block in `src/styles/globals.css` is where Tailwind's design tokens are mapped to CSS variables.
- `prettier-plugin-tailwindcss` sorts class names automatically.

---

## 10. AI / human contributor guardrails

Strict rules live in [`CLAUDE.md`](./CLAUDE.md) (auto-loaded by Claude Code) and [`agent/`](./agent/). The most load-bearing ones:

- Three zones are non-negotiable — don't blur the boundary between root kit, src, and templates.
- Imports follow the alias semantics in §2.
- The hardening flow in §3 is the *only* way to fork a kit component for production use.
- No `--no-verify`, no `git push --force`, no drive-by refactors, no new dependencies without asking.
- "No extra UI": if a task is "make /foo render with X sidebar state", that's `return null` for content — don't invent welcome cards.
- Templates → src promotion is **manual and deliberate** (see Display Center cookie flow for an in-app affordance, or `docs/component-checklist.md` for the general checklist).

The memory directory at `~/.claude/projects/-Users-nirajanbasnet-Projects-buildatics/memory/` carries forward feedback like "No extra UI" between sessions.

---

## 11. Open questions / future work

These are flagged for when they become relevant — don't pre-build:

- **State management** for dynamic features. zustand is installed; we'll add API patterns when the first dynamic feature lands.
- **API / BFF layer.** When a feature needs server data beyond cookies, add `src/features/{f}/lib/api.ts` (pure fetchers) and decide on a query lib (TanStack Query, SWR) at that time.
- **Server actions** for the cookie-based "Use This" → file-based promotion if multi-user / committed state becomes needed.
- **Component catalog expansion** — registry pattern makes this trivial; add as you need them.
- **Testing.** None set up yet. Vitest + RTL for components / Playwright for E2E are the likely choices; ask before installing.

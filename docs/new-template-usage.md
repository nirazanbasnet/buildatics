# `/new-template` — Buildatics scaffolding command

A slash command in this project that scaffolds a new template iteration feature end-to-end: folder structure, variants, toolbar, mock data, sidebar nav, and production wiring. Mirrors the conventions of `display-center-detail`, `display-center-filter`, `preconstruction-list`, and `preconstruction-detail`.

Lives in [.claude/commands/new-template.md](../.claude/commands/new-template.md) — auto-loaded by Claude Code in this repo.

## How to invoke

```
/new-template <Feature Name>
```

The argument is the **human-readable feature name**. Claude derives the kebab-case slug automatically.

| You type | Slug |
| --- | --- |
| `/new-template Display Center Documents` | `display-center-documents` |
| `/new-template Preconstruction List` | `preconstruction-list` |
| `/new-template Lead Inbox` | `lead-inbox` |
| `/new-template Project Calendar` | `project-calendar` |

If you forget the name, just type `/new-template` and Claude will ask.

## What happens — the flow

1. **Claude asks 5 blocking questions** (multi-choice UI) — see below
2. **Confirms the plan** in plain English so you can correct it
3. **Scaffolds files** (V1 + V2 + production wiring + nav)
4. **Runs** `bun run typecheck` → `lint` → `build`
5. **Reports** a file list and clickable try-it links

## The 5 questions Claude asks

| # | Question | Choices |
| --- | --- | --- |
| 1 | **Trigger pattern** — how does the feature appear on the production page? | Sheet on card click · Modal Sheet from toolbar · Standalone page |
| 2 | **Production page location** | New `/dashboard/{slug}` · Integrated into an existing page · Template-only (no prod wiring) |
| 3 | **Nav placement** | New top-level entry · Sub-page under an existing section (e.g. under "Preconstruction") |
| 4 | **Image / data sources** | Screenshot? · Mock data location (new `_data.ts` or share from sibling feature) |
| 5 | **Use This persistence** | Cookie-based (default) · Custom |

## Variants — always 2 by default

Every scaffold creates **V1 + V2** so you can iterate later without renaming files. There are three ways V2 gets filled:

- **You supply V2 designs** (screenshots/mockups) → Claude implements them literally
- **You ask Claude to design V2** ("design V2 from your side", "make 2 variants so I can compare") → Claude produces a polished alternative that differs from V1 in at least 3 design levers (layout shape, density, status treatment, progress visualization, icon treatment, typography, info ordering)
- **"Just V1 for now"** → skips V2 entirely

If V2 isn't discussed, Claude scaffolds V2 as a clearly-marked "design pending" stub with a dashed-border banner — never a copy of V1.

## What gets created

```
src/app/dashboard/(auth)/templates/{slug}/
├── _data.ts                           # Types + mock data (if applicable)
├── _components/
│   ├── variants.ts                    # v1|v2 id, parser, variant links
│   ├── use-this-button.tsx            # Cookie-writing promotion button
│   ├── {feature}-toolbar.tsx          # If feature has list/card toggle — controlled
│   ├── {feature}-layout.tsx           # V1 layout (owns view state)
│   ├── {feature}-layout-v2.tsx        # V2 layout
│   ├── {feature}-table.tsx            # V1 list-mode body (if multi-mode)
│   ├── {feature}-cards.tsx            # V1 card-mode body
│   ├── {feature}-table-v2.tsx         # V2 list-mode body
│   ├── {feature}-cards-v2.tsx         # V2 card-mode body
│   └── {feature}-sheet.tsx            # Sheet wrapper if trigger=Sheet
├── variant-1/page.tsx                 # V1 iteration page with VariantHeader
├── variant-2/page.tsx                 # V2 iteration page
└── page.tsx                           # Cookie-aware redirect to promoted variant
```

**Plus:**

- Production route at `src/app/dashboard/(auth)/{slug}/page.tsx` (if needed)
- Sidebar nav entries in `src/components/layout/sidebar/nav-main.tsx`
- Production wiring (Sheet integration, prop threading, cookie reads)

## Tips for best results

- **Have a screenshot ready** — drop it into the chat with the `/new-template` call or in the same message. Claude uses screenshots literally (label text, badge colors, field order).
- **Be explicit about V2 upfront** — saying "design V2 yourself so I can compare" up front saves a round-trip.
- **Specify nav nesting** — if the new page belongs under an existing section (e.g. "Preconstruction List" under the existing "Preconstruction" group), say so. Otherwise Claude defaults to a new top-level nav entry.
- **One feature at a time** — `/new-template` is for one feature per invocation. Run it again for the next one.
- **Iterate freely after** — the template folder is throw-away until promoted. Edit files directly; ask Claude to redesign V2; provide screenshots for stubbed tabs.

## Behaviour rules baked into the command

The skill enforces CLAUDE.md hard rules automatically:

- **Design tokens only** — no hex codes, no `bg-red-500`-style named palette. Uses `bg-card`, `text-foreground`, `border-border`, etc.
- **shadcn primitives from root kit** — `@/components/ui/...`, no copy-into-`src/components/ui/` unless production tweaks are needed (hardening flow)
- **Server Components by default** — `"use client"` only for hooks, browser APIs, event handlers
- **Named exports**, `className` forwarded, accessible (semantic HTML, keyboard nav, focus-visible rings)
- **Toolbar is a controlled component** when there's a view toggle — layout owns the state, toolbar takes `view` + `onViewChange` props
- **Active filter chips** = `Badge variant="default"` with `rounded-full` + inner ghost-button `X`. **View toggles** = shadcn `ToggleGroup` + `ToggleGroupItem variant="outline"`. (Matches the Display Center toolbar exactly.)
- **No drive-by refactors**, no new dependencies, no `--no-verify`, no `git push`, no amends

## Real examples already shipped in this repo

- `/dashboard/templates/preconstruction-list/variant-1` — V1 list/card toggle (table + icon-row cards)
- `/dashboard/templates/preconstruction-list/variant-2` — V2 alternative (row cards w/ circular progress + status-stripe stat tiles)
- `/dashboard/templates/preconstruction-detail/variant-1` — V1 detail with 6 tabs, 2-col overview, owner tabs, contacts list, sidebar
- `/dashboard/templates/preconstruction-detail/variant-2` — V2 single-column with hero actions, KPI strip, segmented category progress
- `/dashboard/preconstruction-list` — production: click any row/card to open the detail Sheet (whichever variant is currently promoted)

## Promotion flow ("Use this")

Each variant page has a **Use this** button (top-right of the variant header). Clicking it:

1. Sets two cookies (`{slug_underscored}_enabled=true`, `{slug_underscored}_variant=v1|v2`)
2. Toasts a success message
3. Redirects to the production page where the promoted variant becomes live

The production page reads those cookies on every render and serves the chosen variant.

## When NOT to use `/new-template`

- **Editing an existing feature** → just describe the change; don't re-scaffold
- **Promoting a template to a hardened production component** → follow [docs/component-checklist.md](component-checklist.md) instead
- **Adding a brand-new shadcn primitive to the root kit** → not a "template feature"; do it directly

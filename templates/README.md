# Templates — Design Playground

This folder is a sketchbook. Iterate freely. Files here are **not** imported by `src/`.

## How to add a feature

```
templates/
└── {feature-name}/        # kebab-case, matches eventual src/features/{name}/
    ├── Variant1.tsx       # default export, page-like
    ├── Variant2.tsx
    └── notes.md           # optional design notes
```

## How to view

```bash
bun run dev
# open http://localhost:3000/dev/components
```

The catalog auto-discovers `templates/{feature}/Variant*.tsx` and renders each in an isolated frame with theme toggle.

## When ready to promote

See `docs/component-checklist.md`. Promotion is **manual** — copy the approved variant into `src/features/{name}/` (or `src/app/{route}/_components/` for single-route code), refactor for production, and wire to the production route.

## What this folder is NOT

- Not production code (use `src/`)
- Not imported by `src/` (ever — ESLint enforces)
- Not a permanent home — `templates/` is removed entirely before a production release cut

## Rules

- May import from anywhere (root `/components/`, `src/components/`, third-party).
- May hardcode mock data.
- May skip a11y / error states (it's a sketch).
- Should still use design tokens — see `docs/design-system.md`.
- Don't delete a template without user approval — they remain useful design references.

See `agent/templates.md` for the full workflow.

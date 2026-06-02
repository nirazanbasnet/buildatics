# Buildatics — Docs

Human-facing documentation. AI rules live in `/agent/` and `CLAUDE.md`.

## Index

- [design-system.md](./design-system.md) — Tokens, colors, typography, spacing, fonts. The visual contract.
- [component-checklist.md](./component-checklist.md) — Use before promoting a template to `src/` or merging a new production component.
- [contributing.md](./contributing.md) — Branches, commits, lint-staged, Husky pre-commit, PRs.
- [migration-plan.md](./migration-plan.md) — One-time migration from root layout to `src/` + Bun.

## Project shape (quick)

```
buildatics/
├── components/          # READ-ONLY UI kit (shadcn reference + experiments)
├── templates/           # Throw-away design playground
├── src/                 # Production code (Next.js App Router under src/app)
├── docs/                # This folder
├── agent/               # Strict AI rules
└── CLAUDE.md            # Auto-loaded by Claude Code
```

See [agent/structure.md](../agent/structure.md) for the full tree.

## Common tasks

| Task | Where to start |
| --- | --- |
| Sketch a new feature design | `templates/{name}/Variant1.tsx`, view at `/dev/components` |
| Promote a design to production | `docs/component-checklist.md` |
| Add a new color / font / spacing token | `docs/design-system.md` § "Adding a token" |
| Build a new production component | `agent/structure.md` decision tree → write under `src/` |
| Set up the repo first time | `docs/migration-plan.md` then `bun install && bun run dev` |

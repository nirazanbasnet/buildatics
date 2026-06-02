# Contributing

## Setup

```bash
bun install
bun run dev
```

Open `http://localhost:3000`. Component catalog at `/dev/components`.

## Package manager

**Bun only.** No `npm`, `yarn`, or `pnpm`. The lockfile is `bun.lock`.

```bash
bun add <pkg>          # add a runtime dep (ask in a PR first)
bun add -d <pkg>       # add a dev dep (ask first)
bun remove <pkg>
bun run <script>
```

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Next.js dev server |
| `bun run build` | Production build |
| `bun run start` | Serve the built app |
| `bun run lint` | ESLint (must pass before commit) |
| `bun run format` | Prettier write (added during migration) |
| `bun run typecheck` | `tsc --noEmit` (added during migration) |

## Branches

- `main` — protected. Direct pushes blocked.
- Feature: `feat/{short-description}` (e.g. `feat/checkout-form`)
- Fix: `fix/{short-description}`
- Chore: `chore/{short-description}` (deps, configs, docs)
- Refactor: `refactor/{short-description}`

## Commit messages

Conventional commits:

```
<type>(<scope>): <subject>

[optional body]
```

Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `perf`, `test`, `build`, `ci`.

Examples:
- `feat(checkout): add coupon code input`
- `fix(button): preserve focus ring in dark mode`
- `chore(deps): bump next to 16.0.10`

Keep the subject under 70 characters. Body explains **why**.

## Pre-commit (Husky + lint-staged)

Husky runs lint-staged on every commit. lint-staged runs:
- `eslint --fix` on staged `.ts` / `.tsx`
- `prettier --write` on staged `.{ts,tsx,css,md,json}`

**Don't bypass with `--no-verify`.** If the hook fails, fix the issue and re-commit.

If you genuinely need to skip (e.g. emergency hotfix), discuss in the PR.

## Code style (enforced)

- Prettier (`.prettierrc`):
  - 2-space indent
  - Double quotes
  - 100-char line width
  - Semicolons
  - No trailing commas
  - `prettier-plugin-tailwindcss` sorts Tailwind classes
- ESLint (`.eslintrc`):
  - Extends `next/core-web-vitals`
  - Extras: see `agent/frontend.md` § "Import order"

## PRs

- Title: < 70 chars, user-visible change
- Body:
  - **Why** the change exists
  - Screenshots or screen recording for any visual change
  - "Promoted from `templates/{name}/Variant{N}.tsx`" line if applicable
  - Checklist link to `docs/component-checklist.md` completion
- Keep PRs small (< 400 lines diff is ideal; > 800 should be split unless it's a single mechanical refactor)
- One concern per PR. No "fix bug AND refactor AND add feature" PRs.

## Removing the templates folder before a release

Before a production release cut, remove `templates/` entirely:

```bash
# verify nothing in src/ imports from templates/
grep -r "from .*templates" src/ && echo "BLOCKED: templates referenced from src/" || echo "OK"

# then, with user approval:
rm -rf templates/
```

This is a one-shot operation. Don't do it without the user explicitly saying "we're cutting a release."

## Reporting issues

- File in the repo's issue tracker.
- For visual regressions, include screenshots in light + dark mode.
- For perf regressions, include `bun run build` output and the slow route.

# Frontend Patterns — Buildatics

Hard rules for React, Next.js (App Router 16), and TypeScript in `src/`. Pair with `agent/design.md` for visual rules.

## React

### Components
- Named exports only (`export function MyThing()`). Default exports only where Next.js requires them (`app/**/page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`, `route.ts`).
- Function declarations, not arrow consts (`function Foo()` not `const Foo = () => {}`). Reason: better stack traces, hoisting, and consistency with shadcn convention.
- Explicit props type: `type MyThingProps = { … }`, then `function MyThing(props: MyThingProps)`. No inline props.
- Always destructure props at the top of the function body, not in the signature, when more than 3 props.
- Always forward `className` and merge with `cn()`. Always forward `ref` when wrapping a single DOM element (use `React.forwardRef` or React 19's `ref` prop).
- Use `data-slot="name"` on stylable internals (consistent with shadcn UI kit pattern in `/components/ui/`).

### State and effects
- Prefer derived state (compute in render) over stored state.
- Don't use `useEffect` to sync derived values — derive them.
- Don't use `useEffect` for one-shot data fetching in client components — use a server component, route handler, or a query library (when one is added).
- `useState` initial value: pass a function for expensive init (`useState(() => compute())`).
- `useMemo` / `useCallback`: don't add without a measured reason. Premature memoization is noise.

### Forms
- Use `react-hook-form` + `zod` (already installed). Resolver: `@hookform/resolvers/zod`.
- Validation schema lives next to the form (`schema.ts` in the feature folder).
- Field errors surface via `<FormMessage />` from `src/components/ui/form.tsx`.

### Data
- Server Components own data fetching by default. Pass data down as props.
- Client Components receive data via props or via clearly-named hooks (`useCheckoutCart`, not `useData`).
- No `fetch` in components. Wrap network access in `src/features/{f}/lib/api.ts`.

## Next.js App Router (16)

- Default to **Server Components**. Add `"use client"` only when needed:
  - The file uses hooks, event handlers, browser APIs, or context.
  - The file imports another `"use client"` module that needs to be client-rendered.
- `"use client"` is the *first line* of the file (above imports). It marks the file and everything it imports as client.
- Route groups `(name)/` for organisation without affecting the URL.
- Private folders `_name/` for non-route co-located code (components, hooks, schemas).
- Server actions: define in a file marked `"use server"` at top. Keep small, validate input with zod.
- Loading + error UI: per-route `loading.tsx` / `error.tsx`. Don't use suspense boundaries in client components for route-level loading.
- Metadata: export `metadata` or `generateMetadata` from the route.
- Cookies / headers: `await cookies()`, `await headers()` (Next 16 is async).
- Dynamic params: `await params` and `await searchParams` (also async in 16).

## TypeScript

- `strict: true` is on. Keep it that way.
- No `any`. If a third-party type is missing, write a `.d.ts` shim in `src/types/`.
- Prefer `type` over `interface` except when you need declaration merging.
- Discriminated unions for variants — not boolean flags.
- Use `satisfies` for config-like literals when you want both inference and type checking.

## Imports

- Use `@/…` aliases inside `src/`. Never deep relative `../../`.
- Alias semantics (see `agent/structure.md` for the tsconfig paths):
  - `@/components/...` → **root UI kit** at `/components/` (active, default UI source)
  - `@src/components/...` → hardened copies in `src/components/` (use when a kit component has been forked for production tweaks)
  - `@/lib/...`, `@/hooks/...`, `@/features/...`, `@/styles/...`, `@/types/...`, `@/app/...` → all under `src/`
- Import order (Prettier-enforced eventually; manually enforce until then):
  1. External packages (`react`, `next`, third-party)
  2. Internal aliases (`@/components`, `@/lib`, `@/features`)
  3. Relative (`./`, `../`)
  4. Type-only imports last, prefixed `import type { … }`
- No barrel files (`index.ts` re-exports) **except** for feature module public surfaces (`src/features/{f}/index.ts`). Barrels everywhere hurt tree-shaking and tooling.

## Performance

- Images: `next/image` with explicit `width`/`height` or `fill` + sized parent. Never `<img>` for hero/content images.
- Fonts: `next/font` (already wired in `src/lib/fonts.ts`).
- Dynamic import (`next/dynamic`) for heavy client components used below the fold.
- Don't reach for `React.memo` / `useMemo` unless profiling shows a hot path.
- Don't ship code only used by templates to production routes (lint will eventually catch this).

## Accessibility

- Semantic HTML first. `<button>` for actions, `<a>` for navigation, `<label>` for inputs.
- Every interactive element keyboard-reachable. Focus ring visible (`focus-visible:ring-2 ring-ring`).
- Color contrast meets WCAG AA. Use tokens; if a token fails AA against its background, fix the token, not the usage.
- `aria-label` only when no visible text exists. Don't duplicate text with `aria-label`.
- Modal/dialog: trap focus, restore on close, `Esc` closes — use Radix primitives (already installed) rather than rolling your own.

## Testing (future-proof — add when first test arrives)

When tests are introduced:
- Unit: `bun test` (Bun's built-in runner) for pure utilities in `src/lib`.
- Component: Vitest + React Testing Library (add when needed, ask first).
- E2E: Playwright (add when needed, ask first).
- **Never mock data fetching in integration tests** — hit a fixture/mock server, not jest mocks.

## What NOT to do

- Don't introduce a state management library "for future scale" — `zustand` is already installed; if it's not enough, ask before adding more.
- Don't introduce a query library (TanStack Query, SWR) without asking.
- Don't add a CSS-in-JS library. Tailwind v4 + CSS variables is the system.
- Don't add a component library besides what's in `package.json`. Radix + shadcn pattern is enough.
- Don't add a date library beyond `date-fns` (already installed).
- Don't add a UUID library beyond `uuid` (already installed).
- Don't add `lodash`. Use native JS / small helpers in `src/lib/utils.ts`.

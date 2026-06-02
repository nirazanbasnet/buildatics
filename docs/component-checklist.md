# Component Checklist

Run through this before merging a new production component or promoting one from `templates/`.

## A. Location

- [ ] Used by only one route → file is under `src/app/{route}/_components/`
- [ ] Used by many routes in one feature → file is under `src/features/{feature}/components/`
- [ ] Truly app-wide / generic → file is under `src/components/`
- [ ] Reusable primitive (Button, Input, Dialog) → file is under `src/components/ui/`
- [ ] File name is `PascalCase.tsx` matching the exported component name

## B. API

- [ ] Named export (not `export default`), e.g. `export function CheckoutForm(...)`
- [ ] Explicit props type: `type CheckoutFormProps = { … }`
- [ ] No `any` in the public surface
- [ ] `className?: string` is accepted and merged with `cn()`
- [ ] `ref` is forwarded when the component wraps a single DOM element
- [ ] Children only when the component is genuinely a container
- [ ] Variants use `class-variance-authority` (cva), not conditional class strings
- [ ] Public surface is minimal — internal helpers stay internal

## C. Server vs Client

- [ ] If the file uses hooks / browser APIs / event handlers, `"use client"` is the first line
- [ ] Otherwise, no `"use client"` (Server Component by default)
- [ ] Server data fetching only in Server Components; client gets data via props

## D. Styling

- [ ] Only design tokens — no hex codes, no Tailwind named palette (`red-500`, `blue-700`)
- [ ] No `style={{ … }}` for values that exist as Tailwind utilities / CSS variables
- [ ] Uses `font-sans` / `font-display` / `font-mono` — no inline `font-family`
- [ ] No arbitrary spacing values (`p-[17px]`) without a justification comment
- [ ] `data-slot="…"` on stylable internal parts (consistent with shadcn convention)
- [ ] Dark mode verified (toggle theme in `/dev/components`)

## E. Accessibility

- [ ] Semantic HTML: `<button>` for actions, `<a>` for navigation, `<label>` for inputs
- [ ] Keyboard reachable: Tab order makes sense, focus ring visible (`focus-visible:ring-2 ring-ring`)
- [ ] No `outline: none` without a replacement
- [ ] `aria-label` only when no visible text exists (don't duplicate)
- [ ] Color contrast meets WCAG AA against its background
- [ ] If modal/popover: focus trap + restore on close + `Esc` closes (use Radix)
- [ ] Images have meaningful `alt` text (or `alt=""` if decorative)

## F. Correctness

- [ ] TypeScript: `bun run lint` passes with no new warnings
- [ ] Edge cases: empty state, loading, error all handled (or explicitly out of scope)
- [ ] No `console.log` left behind
- [ ] No `// TODO:` for things not in this PR
- [ ] No dead code, no commented-out blocks

## G. Performance

- [ ] Heavy client-only components dynamic-imported (`next/dynamic`)
- [ ] Images use `next/image` with sizes
- [ ] No `useMemo` / `useCallback` without a measured reason
- [ ] No unnecessary re-render triggers (stable refs for handlers passed to memoised children)

## H. Promotion from templates (only if applicable)

- [ ] Template variant identified in PR description: "Promoted from `templates/checkout/Variant2.tsx`"
- [ ] Production file renamed meaningfully (`Variant2.tsx` → `CheckoutForm.tsx`)
- [ ] Mocks replaced with real data (props / hooks / server fetches)
- [ ] Unused variants in the template folder are noted but **not deleted** (user decides when to delete the whole template)
- [ ] Production route under `src/app/` wired to use the new component

## I. Verification

- [ ] Run `bun run dev` and open the route in a browser
- [ ] Check light theme, dark theme
- [ ] Check mobile (DevTools 375px), tablet (768px), desktop (1280px)
- [ ] Tab through the component — focus order correct, all targets reachable
- [ ] If forms: submit valid + invalid input, verify error messages

## J. PR

- [ ] PR title is short (< 70 chars), describes the user-visible change
- [ ] PR body says **why**, not what (the diff shows what)
- [ ] Promoted-from line if applicable
- [ ] No unrelated changes in the diff

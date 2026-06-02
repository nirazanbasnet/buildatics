# Templates Workflow — Buildatics

The `templates/` folder is the design playground. It is **the only place** where you should iterate visually without worrying about production rules.

## Mental model

- `templates/` is to design what a sketchbook is to a painter: many attempts, low stakes, easy to throw away.
- `src/` is the final canvas: clean, conformant, only the approved outcome.
- The two stay separate. Never blur the line by importing one from the other.

## Folder shape

```
templates/
├── README.md
└── {feature-name}/
    ├── Variant1.tsx
    ├── Variant2.tsx
    ├── Variant3.tsx
    ├── notes.md          # Optional — what you're exploring, what's open
    └── assets/           # Optional — local mocks, fixtures, sample data
```

Rules for `{feature-name}`:
- `kebab-case`
- Matches the eventual `src/features/{feature-name}/` directory name when promoted.
- One feature per folder. Don't dump unrelated variants into one folder.

## What a "variant" file looks like

- A single default export (it's not a route, but treat it as page-like).
- May import anything: root `/components/`, `src/components/`, third-party.
- May hardcode mock data inline.
- May skip a11y, error handling, and edge cases (you're sketching).
- Should still use design tokens — even sketches benefit from tonal consistency.

```tsx
// templates/checkout/Variant1.tsx
import { Button } from "@/components/ui/button";

export default function CheckoutVariant1() {
  return (
    <div className="mx-auto max-w-md p-6">
      {/* …sketch the layout… */}
      <Button>Pay now</Button>
    </div>
  );
}
```

## Viewing variants

The in-app catalog at `/dev/components` auto-discovers files in `templates/{feature}/Variant*.tsx` and renders each in an isolated frame with the feature name and variant number visible.

Run:
```bash
bun run dev
# open http://localhost:3000/dev/components
```

Use the catalog to:
- Compare variants side-by-side
- Test light/dark theme
- Check responsiveness

## Promotion to production

When a variant is approved by the user / designer:

1. **Open `docs/component-checklist.md`.**
2. Decide the target location:
   - Single route only → `src/app/{route}/_components/`
   - Multi-route feature → `src/features/{feature}/`
3. Copy the variant file(s) to the target. Rename meaningfully (`CheckoutVariant1.tsx` → `CheckoutForm.tsx`).
4. Refactor for production (the checklist will walk you through):
   - Typed props (no inline `any`)
   - `forwardRef` + `className` forwarding where it wraps a DOM element
   - Error / loading states
   - Real data wiring (replace mocks with props / hooks / server fetches)
   - Accessibility pass
   - Remove `console.log`, dev comments, unused variants
5. Wire to the production route in `src/app/`.
6. Verify the route in the browser (light + dark, mobile + desktop).
7. Open the PR. Mention "Promoted from `templates/checkout/Variant2.tsx`" in the description.
8. **Leave the template in place.** It is still a useful reference. The user will tell you when to delete the entire `templates/{feature}/` folder.

## Deletion

- Never delete a single variant file unless the user names it.
- Never delete a `templates/{feature}/` folder unless the user says "we're done with checkout, remove the template."
- Before the production release cut, the entire `templates/` folder is removed in one go (tracked in `docs/contributing.md`).

## What templates are NOT for

- Not a place to write production code "to save time later." Production code goes to `src/` directly.
- Not a place to dump random experiments unrelated to a current design task.
- Not a substitute for the UI kit (`/components/`). Use the kit as a source of primitives even while sketching.
- Not imported by `src/`. Never. The build should fail loudly if this is attempted (we can add an ESLint rule for this — see `docs/contributing.md`).

## Auto-discovery convention

For the `/dev/components` catalog to pick up your variants, follow these naming rules:
- File: `templates/{feature}/Variant{N}.tsx` where `{N}` is `1, 2, 3, …`
- Default export is the component to render
- Optional `templates/{feature}/notes.md` is rendered as markdown alongside the variants

If you need a non-conforming layout, edit the catalog page at `src/app/dev/components/page.tsx` — but discuss with the user first.

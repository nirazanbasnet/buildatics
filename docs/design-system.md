# Design System

The visual contract for production components in `src/`. Mirrors `agent/design.md` with more examples for human readers.

## Source of truth

| Concern | File |
| --- | --- |
| Color tokens (light + dark) | `src/styles/globals.css` |
| Theme presets | `src/styles/themes.css` |
| Tailwind exposure (`@theme inline`) | `src/styles/globals.css` |
| Fonts (next/font) | `src/lib/fonts.ts` |
| shadcn aliases & base color | `components.json` |

## Color tokens

All semantic tokens are CSS variables. Use them via Tailwind utilities (`bg-primary`, `text-foreground`, etc.).

### Semantic roles

| Token | Light value | Dark value | Use for |
| --- | --- | --- | --- |
| `--background` | white | `--base-950` | Page background |
| `--foreground` | `--base-800` | `--base-200` | Primary text |
| `--card` | white | `--base-950` | Card surface |
| `--card-foreground` | `--base-800` | `--base-200` | Text on cards |
| `--popover` | white | `--base-950` | Popovers, dropdowns |
| `--primary` | `--base-950` | `--base-50` | Primary action |
| `--primary-foreground` | white | `--base-900` | Text on primary |
| `--secondary` | `--base-300` | `--base-500` | Secondary action |
| `--muted` | `neutral-100` | `--base-900` | Subdued surface |
| `--muted-foreground` | `neutral-500` | `--base-400` | Subdued text |
| `--accent` | `--base-200` | `--base-900` | Hover / accent surface |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Destructive action |
| `--border` | `--base-200` | `--base-800` | Borders |
| `--input` | `--base-300` | `--base-700` | Form input borders |
| `--ring` | `--base-800` | `--base-200` | Focus rings |
| `--chart-1` … `--chart-5` | varied | varied | Chart series |
| `--sidebar*` | varied | varied | Sidebar shell |

### Base ramp (for *new* tokens, not for direct use)

`--base-50` to `--base-1000` (12 stops). Defined with `oklch()` for perceptual uniformity.

### Adding a new color token

1. Add to `:root` and `.dark` in `src/styles/globals.css`:
   ```css
   --warning: oklch(0.78 0.17 80);
   --warning-foreground: var(--base-900);
   ```
2. Surface in the `@theme inline` block:
   ```css
   --color-warning: var(--warning);
   --color-warning-foreground: var(--warning-foreground);
   ```
3. Use: `bg-warning text-warning-foreground`.
4. Add a row to the table above.

### What NOT to do

- Don't write `bg-[#fff]`, `text-[#333]`, `bg-red-500` in production components.
- Don't introduce per-component CSS variables. All tokens are global.

## Typography

Fonts loaded via `next/font` in `src/lib/fonts.ts`. Currently wired: Inter, Geist, Roboto, Plus Jakarta Sans, Montserrat, Poppins, Overpass Mono, PT Sans, Hedvig Letters Serif, Kumbh Sans, Outfit.

Active font is controlled by the theme preset (`data-theme-preset` on `<body>` switches `--text-family` and `--display-family`).

### Utilities

| Class | What it picks |
| --- | --- |
| `font-sans` | The active body font (`--font-sans`) |
| `font-display` | The active display font (`--font-display`), weight `--display-weight` |
| `font-mono` | Overpass Mono (`--font-overpass-mono`) |

### Type scale (Tailwind)

| Class | Size | Use |
| --- | --- | --- |
| `text-xs` | 12 | Captions, footnotes |
| `text-sm` | 14 | Secondary UI text, table cells |
| `text-base` | 16 | Body |
| `text-lg` | 18 | Lead paragraph |
| `text-xl` | 20 | Card titles |
| `text-2xl` | 24 | Page subtitle |
| `text-3xl` | 30 | Page title |
| `text-4xl` | 36 | Hero |
| `text-5xl` | 48 | Display |

Weights: 400 / 500 / 600 / 700. Add new weights in `src/lib/fonts.ts` if needed (and discuss the cost — each weight ships a font file).

## Spacing

Tailwind 4px scale. Common values:

| Class | px |
| --- | --- |
| `p-1` / `gap-1` | 4 |
| `p-2` / `gap-2` | 8 |
| `p-3` | 12 |
| `p-4` | 16 |
| `p-6` | 24 |
| `p-8` | 32 |
| `p-12` | 48 |
| `p-16` | 64 |

Layout patterns:
- App shell padding: `px-4 md:px-6 lg:px-8`
- Container max width: `max-w-screen-xl mx-auto`
- Card body: `p-6` with `gap-4` between sections
- Stack of text: `space-y-2` (tight) or `space-y-4` (default)
- Inline form gap: `gap-2`
- Section gap: `space-y-8`

**No arbitrary values** (`p-[17px]`) unless aligning to a non-grid third-party asset. If you do, leave a comment with the reason.

## Radius

| Class | Value |
| --- | --- |
| `rounded-sm` | `--radius` - 4px |
| `rounded-md` | `--radius` - 2px |
| `rounded-lg` | `--radius` |
| `rounded-xl` | `--radius` + 4px |
| `rounded-full` | full pill |

`--radius` defaults to `0.5rem` (8px). Switching the global feel is one variable.

## Shadows

| Class | Use |
| --- | --- |
| `shadow-sm` | Subtle elevation (cards in a list) |
| `shadow` | Default |
| `shadow-md` | Hover state |
| `shadow-lg` | Modals, popovers (pair with `border border-border`) |
| `shadow-xl` | Hero CTAs, prominent surfaces |

Avoid more than two distinct shadow levels on one screen.

## Motion

- Use `tailwindcss-animate` utilities (`animate-in fade-in-0 slide-in-from-top-2`).
- Add keyframes inside the `@theme inline` block in `globals.css`.
- Use `motion-safe:` / `motion-reduce:` variants for non-essential motion.

## Icons

- Library: `lucide-react`.
- Sizes: `size-4` (inline w/ text), `size-5` (buttons), `size-6` (standalone).

## Component density

| Element | Default | Compact | Large |
| --- | --- | --- | --- |
| Button | `h-9 px-4` | `h-8 px-3` | `h-10 px-6` |
| Input | `h-9` | `h-8` | `h-10` |
| Table row | `h-10` | `h-9` | `h-12` |

## Themes

Body element carries `data-theme-preset`, `data-theme-scale`, `data-theme-radius`, `data-theme-content-layout` (see `src/app/layout.tsx`). New theme-aware styling should hang off these attributes via CSS, not JS.

```css
[data-theme-scale="compact"] {
  --radius: 0.25rem;
}
```

## Reference: the existing UI kit

`/components/ui/` (root) is the visual reference. New components should *match its density, spacing, and color discipline* even though they live under `src/`.

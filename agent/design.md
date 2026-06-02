# Design System Rules — Buildatics

The visual system. All production components in `src/` MUST conform. The existing UI kit in `/components/` is the visual reference for tone and density.

## Source of truth

| Concern | File |
| --- | --- |
| Color tokens | `src/styles/globals.css` (`:root` and `.dark`) |
| Theme presets | `src/styles/themes.css` |
| Tailwind exposure | `@theme inline { … }` block in `globals.css` |
| Fonts | `src/lib/fonts.ts` (next/font) and `--font-sans`, `--font-display` |
| Tailwind config | Tailwind v4 — config-less. Tokens flow via CSS vars. |
| shadcn settings | `components.json` (aliases, baseColor, iconLibrary) |

## Color

- **Never use hex codes** (`#fff`, `#ff0000`) in components.
- **Never use Tailwind's named palette** (`bg-red-500`, `text-blue-700`) — these escape the theme system.
- Use semantic tokens exclusively:
  - Backgrounds: `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-accent`, `bg-sidebar`
  - Foregrounds: `text-foreground`, `text-muted-foreground`, `text-card-foreground`
  - Actions: `bg-primary text-primary-foreground`, `bg-secondary text-secondary-foreground`, `bg-destructive text-white`
  - Borders & rings: `border-border`, `ring-ring`, `border-input`
  - Chart series: `text-chart-1` … `text-chart-5` (already wired)
- The full ramp `--base-50` … `--base-1000` is available for *new tokens*, not for direct use. If you need a new semantic role, add a token in `globals.css` and surface it via `@theme inline`.

### Adding a color token (procedure)
1. Add the variable to `:root` and `.dark` in `src/styles/globals.css`.
2. Map it inside `@theme inline { --color-{name}: var(--{name}); }`.
3. Use as `bg-{name}` / `text-{name}` / etc.
4. Document it in `docs/design-system.md`.

## Typography

Font families exposed:
- `font-sans` — default body font (`--font-sans` → currently swappable via theme: Inter, Geist, Roboto, Plus Jakarta Sans, etc.)
- `font-display` — heading/display font (heavier weight via `--display-weight`)
- `font-mono` — monospace (`Overpass_Mono` wired in `src/lib/fonts.ts`)

Rules:
- Body copy: `font-sans` (default — no class needed).
- Headings: `font-display` for hero/marketing display; `font-sans font-semibold` for in-app section headers.
- Weights: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700). Don't introduce 800/900 without adding the weight to `next/font` config first.
- Sizes (use Tailwind scale, don't invent):
  - `text-xs` 12, `text-sm` 14, `text-base` 16, `text-lg` 18, `text-xl` 20, `text-2xl` 24, `text-3xl` 30, `text-4xl` 36, `text-5xl` 48
- Line-height: paired with size via Tailwind defaults; only override (`leading-tight`, `leading-relaxed`) when there's a layout reason.
- Letter-spacing: defaults only, except `tracking-tight` on large display text.

## Spacing

- Use the Tailwind 4px scale: `0.5` (2px), `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `8` (32px), `10` (40px), `12` (48px), `16` (64px), `20` (80px), `24` (96px).
- **No arbitrary values** like `p-[17px]` unless aligning to a non-grid third-party asset. Justify in the PR or the comment above the line.
- Layout gaps use `gap-` not margins. Margins for typographic flow only (`space-y-` on text blocks).
- Container padding: `px-4 md:px-6 lg:px-8`. Max width: `max-w-screen-xl` for app shells unless feature spec says otherwise.

## Radius

- Use radius tokens: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`.
- Driven by `--radius` (default `0.5rem`) and its derivatives in `@theme inline`.
- To globally change roundness, change `--radius`. Don't override per-component except for special cases (avatar = full, badge = full or sm).

## Elevation / Shadow

- Use Tailwind's `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`.
- Modal/popover surfaces: `shadow-lg` + `border border-border`.
- Avoid more than two shadow levels in one screen — it flattens the hierarchy.

## Motion

- Animations live in `globals.css` `@theme inline` block (`@keyframes`).
- Use `tailwindcss-animate` utilities: `animate-in fade-in-0`, `animate-out fade-out-0`, `slide-in-from-top-2`, etc.
- Respect `prefers-reduced-motion`: use `motion-safe:` / `motion-reduce:` variants when adding non-essential motion.
- Page transitions: avoid. The top-loader (`nextjs-toploader`) is sufficient.

## Iconography

- Library: `lucide-react` (set in `components.json`). Also: `@remixicon/react` and `@radix-ui/react-icons` are installed for the existing kit — prefer `lucide` for new code.
- Size: `size-4` (16) for inline with text, `size-5` (20) for buttons, `size-6` (24) for standalone.
- Stroke width: leave at lucide default unless designing a heavier look.

## Density and layout

- Buttons default to `h-9 px-4` (md). Compact variant `h-8 px-3` (sm). Large `h-10 px-6` (lg).
- Inputs default to `h-9`. Match button height in inline forms.
- Cards: `p-6` content, `gap-4` between sections.
- Tables: `text-sm`, `h-10` rows, `px-3` cells.

## Theming hooks already wired

The body element carries `data-theme-preset`, `data-theme-scale`, `data-theme-radius`, `data-theme-content-layout` attributes (see `src/app/layout.tsx`). New theme-aware styling should hang off these attributes via CSS, not via JS branching.

## When designing a new component

1. Sketch in `templates/{feature}/Variant{N}.tsx` first.
2. Use only tokens (colors, fonts, spacing, radius).
3. Match the density and tone of the existing UI kit in `/components/ui/` — buttons, inputs, dialogs, etc.
4. If you need a new token, add it before using it — don't shim with arbitrary values.
5. Promote per `docs/component-checklist.md`.

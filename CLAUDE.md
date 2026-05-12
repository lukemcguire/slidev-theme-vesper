# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the theme

There are no local `node_modules` — the theme is loaded directly by a globally installed Slidev CLI:

```bash
npx slidev example.md          # dev server with hot reload
npx slidev build example.md    # static build
npx slidev export example.md   # export to PDF/PNG
```

## Architecture

This is a **Slidev theme package** (`slidev-theme-vesper`) with no build step of its own. Slidev loads files directly from the directory at runtime via Vite.

### How Slidev resolves theme files

- `styles/index.css` — auto-loaded globally; defines all CSS custom properties and base styles
- `styles/code.css` — auto-loaded globally; styles the `.vp-code-container` system used by `CodeBlock.vue` and the `code-right`/`code-full` layouts
- `layouts/*.vue` — resolved by name when a slide front matter specifies `layout: <name>`
- `components/*.vue` — auto-imported globally into all layouts and slides by name
- `setup/shiki.ts` — must export a **plain default function** (no imports from `@slidev/types`; the package is not installed locally). Slidev calls `mod.default()` to get the Shiki theme config.
- `vite.config.ts` — Vite plugin that shims `lz-string` CJS→ESM so Mermaid
  diagrams work. No imports at top level (vite not installed locally); exports
  a plain object.
- `package.json` `slidev.defaults` — provides `canvasWidth: 960`,
  `lineNumbers: true`, and full Catppuccin Mocha Mermaid theme variables as
  theme-level defaults so users don't need to repeat them in front matter.

### Design token system

All visual values flow from CSS custom properties declared on `:root` in `styles/index.css`. Dark mode is handled by redefining the same properties under `.dark`. Nothing is hardcoded in components — always use the `--color-*`, `--vp-*`, `--space-*`, `--text-*`, and `--rule-*` variables.

**Palette structure:**
- `:root` — Catppuccin Latte (light mode)
- `.dark` — Catppuccin Mocha (dark mode)
- Raw palette vars: `--vp-base`, `--vp-mauve`, `--vp-blue`, `--vp-green`, `--vp-yellow`, `--vp-red`, `--vp-teal`, `--vp-surface0`, `--vp-surface1`, etc.
- Semantic aliases: `--color-bg`, `--color-fg`, `--color-accent`, `--color-accent-alt`, `--color-rule`, `--color-rule-light`, `--color-fg-muted`, `--color-fg-subtle`, `--color-bg-alt`, `--color-bg-panel`

Component CSS must use semantic `--color-*` vars, not raw palette vars, so both themes auto-update.

### Layout anatomy

Every layout follows this structure:
```
<VesperHeader>   ← flex-shrink: 0; deck title left · slide title center · author right
<main content>   ← flex: 1, overflow: hidden
<VesperFooter>   ← flex-shrink: 0; section number · date · page/total
```

The `.slidev-layout` root element is always `display: flex; flex-direction: column` at 960×540px (16:9; renders at 1920×1080 at 2×). Layouts must not exceed this height.

**Footer uses `$nav?.currentPage` (Vue template global)** — not `useNav()` from `@slidev/client`, which requires the package to be installed locally.

### CodeBlock / code panel system

`styles/code.css` defines `.vp-code-container` and its child classes (`.vp-code-header`, `.vp-code-body`, `.vp-code-content`, `.vp-code-footer`, corner bracket spans). This system is shared between:
- `components/CodeBlock.vue` — standalone component for use inline on any slide; has scoped CSS for `border` and `background` so it renders correctly in all layout contexts
- `layouts/code-right.vue` — duplicates the header/badge/body/caption structure directly using scoped `cdr-*` classes (does not use `CodeBlock.vue`)
- `layouts/code-full.vue` — same, using `cdf-*` classes

### Block component

`components/Block.vue` is a titled content panel with a solid accent header bar. Props:
- `type`: `'default' | 'info' | 'success' | 'warning' | 'danger' | 'example'` (default: `'default'`)
- `title`: optional string; if omitted, no header bar — left accent border only
- `compact`: boolean (default: `false`) — reduces body padding

Type-to-color mapping via `--block-accent` CSS custom property:
- `default` → `--vp-mauve`; `info` → `--vp-blue`; `success` → `--vp-green`
- `warning` → `--vp-yellow`; `danger` → `--vp-red`; `example` → `--vp-teal`

Corner brackets on Block use `--bracket-color: var(--block-accent)` override so they match the block's accent, not the global bracket color.

### CSS corner brackets

Implemented as sibling `<span>` elements (`.vp-bracket-bl`, `.vp-bracket-br`) inside the bracketed container plus `::before`/`::after` pseudo-elements for the top pair. The `vp-bracketed` utility class in `index.css` handles the top corners; bottom corners require explicit `<span class="vp-bracket-bl"></span><span class="vp-bracket-br"></span>` in the template.

### SvgDiagram component

`components/SvgDiagram.vue` fetches an SVG file via `fetch()` and renders it
inline with `v-html`. This allows SVG elements to inherit document CSS custom
properties (`var(--vp-*)`) so diagrams adapt automatically to dark/light mode.

Props: `src` (string) — URL path to the SVG file relative to Slidev's root.

SVG assets in `assets/` use `var(--vp-base)`, `var(--vp-mauve)`, etc. instead
of hardcoded hex. **Exception:** `fig_1-5.svg` uses hardcoded generic colors
intentionally (it's a "before" comparison showing a plain default theme) and
should remain as `<img>`, not `<SvgDiagram>`.

### Callout slot markdown

Slidev only processes inline markdown in component slot content when the
content is surrounded by blank lines (block form). Single-line usage
`<Callout>**bold**</Callout>` passes raw text — bold will not render. Always
use block form:

```vue
<Callout type="warning">

**Bold** renders here.

</Callout>
```

### Banner component

`components/Banner.vue` is a full-width label strip. Props:
- `text`: optional string (renders nothing if absent)
- `variant`: `'default' | 'accent'` — default uses `--color-bg-alt` background; accent uses `--color-accent`

No default text — the banner is always opt-in via `bannerText` prop on layouts that support it (`cover`, `end`, `image-full`).

### CSS class prefix

All utility classes and component classes use the `vp-` prefix. Layout-specific scoped CSS uses short two-letter prefixes (e.g. `.cdr-` for code-right, `.cdf-` for code-full) to avoid collisions.

## Key constraints

- `setup/shiki.ts` must export a **bare function**, not an object, and must have **no imports**
- Component CSS must use semantic `--color-*` vars (never raw hex or `--vp-*` raw palette vars), except inside `Block.vue` where `--block-accent` and raw `--vp-*` vars set per-type colors on the root element
- Layout scoped styles use short two-letter prefixes to avoid collisions across layouts
- The `colorSchema: dark` in `package.json` sets Catppuccin Mocha as the default; toggle with `d` key during presentation

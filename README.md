# slidev-theme-vesper

A Slidev theme with structured layouts, a dual-mode Catppuccin palette, and a component system built for technical presentations. IBM Plex Sans for body text, Fira Code for code and labels. Dark-first (Catppuccin Mocha), with a light variant (Catppuccin Latte) available via front matter.

---

## Installation

**From GitHub** (no npm publish required — Slidev resolves themes directly from URLs):

```yaml
---
theme: https://github.com/lukemcguire/slidev-theme-vesper
---
```

Slidev will download and cache the theme automatically on first run.

**From a local clone:**

```bash
git clone https://github.com/lukemcguire/slidev-theme-vesper
```

Then reference it by path in your front matter:

```yaml
---
theme: ./path/to/slidev-theme-vesper
---
```

---

## Front Matter

```yaml
---
theme: slidev-theme-vesper
title: 'Your Presentation Title'   # → VesperHeader deck title (left)
author: 'Your Name'                 # → VesperHeader right slot
date: 'MONTH YEAR'                  # → VesperFooter center
colorSchema: dark                   # dark (default) | light
---
```

The theme sets these defaults automatically — no need to repeat them:
`highlighter: shiki`, `lineNumbers: true`, `canvasWidth: 960`.

Per-slide overrides:

```yaml
---
layout: default
title: SLIDE TITLE        # → VesperHeader center slot
sectionNumber: 1-1        # → VesperFooter left slot
---
```

---

## Layouts

| Layout | Description |
|---|---|
| `cover` | Title slide with corner brackets and optional Banner labels |
| `table-of-contents` | Dot-leader ToC with chapter and section entries |
| `section` | Chapter/section divider — large display title + descriptor |
| `default` | Primary content layout: prose, lists, tables |
| `statement` | Single centered text, no chrome |
| `quote` | Attributed quotation with name/title/affiliation |
| `two-column` | Equal-width columns with center rule |
| `three-column` | Three equal columns with labeled headers |
| `callout` | Content area + prominent alert box at the bottom |
| `comparison` | Two labeled panels with accent-color borders |
| `image-right` | Text left, image panel right (with figure caption) |
| `image-left` | Image panel left, text right (with figure caption) |
| `image-full` | Full-bleed background image, gradient overlay, title bottom-left |
| `image-top` | Horizontal image band top, content area below |
| `image-bottom` | Content area top, horizontal image band bottom |
| `two-images` | Two side-by-side image panels with independent captions |
| `code-right` | Prose left, styled code panel right |
| `code-full` | Full-area code panel with prominent title bar |
| `chart-right` | Prose left, Mermaid diagram right |
| `chart-left` | Mermaid diagram left, prose right |
| `chart-full` | Full-area Mermaid diagram with title bar |
| `dashboard` | Six-panel grid (3×2) for status overviews and KPIs |
| `timeline` | Vertical chronological sequence |
| `end` | Closing slide with optional presenter photo and contact block |

---

## Components

### `Block`

Titled content panel with solid accent header bar and corner brackets.

```vue
<Block type="info" title="API AUTHENTICATION">

All requests require a bearer token. Tokens expire after 24 hours.

</Block>
```

**Props:**
- `type`: `'default'` (mauve) | `'info'` (blue) | `'success'` (green) | `'warning'` (yellow) | `'danger'` (red) | `'example'` (teal)
- `title`: string (optional — omit for left-border-only titleless variant)
- `compact`: boolean (reduces body padding)

### `SvgDiagram`

Fetches an SVG file and renders it inline so CSS custom properties
(`var(--vp-*)`) resolve inside the SVG. Use this instead of `<img>` for
diagrams that should adapt to dark/light mode.

```vue
<SvgDiagram src="/assets/my-diagram.svg" />
```

SVG files should use `var(--vp-base)`, `var(--vp-mauve)`, etc. instead of
hardcoded hex values. See `assets/fig_1-1.svg` for a reference example.

**Props:** `src` — path to the SVG file (relative to Slidev's public root)

### `Callout`

Inline advisory notice with left-border accent and tinted background.

```vue
<Callout type="warning">

**WARNING.** This action cannot be undone.

</Callout>
```

> **Note:** Slot content must be surrounded by blank lines for Slidev to
> process inline markdown (`**bold**`, `_italic_`, etc.).

**Props:**
- `type`: `'warning'` | `'caution'` | `'note'` | `'important'`

### `Banner`

Full-width label strip for persistent deck identity.

```vue
<Banner text="INTERNAL — NOT FOR DISTRIBUTION" variant="accent" />
```

**Props:**
- `text`: string (renders nothing if absent)
- `variant`: `'default'` (muted background) | `'accent'` (mauve background)

Used via `bannerText` prop on `cover`, `end`, and `image-full` layouts.

### `CodeBlock`

Inline code panel with border, header bar, and caption — available on any layout.

```vue
<CodeBlock title="CONFIG LOADER" lang="typescript" caption="src/config.ts">

```typescript
export const config = loadConfig()
```

</CodeBlock>
```

**Props:** `title`, `lang`, `caption`

### `FigureCaption`

Standardized figure label rendered below images.

```vue
<FigureCaption number="1-1" label="SYSTEM ARCHITECTURE DIAGRAM" />
```

Used automatically by image layouts via `figNumber` and `figLabel` front matter props.

### `VesperHeader` / `VesperFooter`

Included automatically by all layouts. Override individual slots via layout props:
- `title` — center slot (slide title)
- `sectionNumber` — footer left slot
- `author` — header right slot (falls back to global `author` from front matter)
- `date` — footer center (falls back to global `date`)

---

## Color System

All colors flow from CSS custom properties. Toggle dark/light with the `d` key during a presentation.

### Catppuccin Mocha (dark — default)

| Semantic Token | Value | Role |
|---|---|---|
| `--color-bg` | `#1e1e2e` Base | Slide background |
| `--color-bg-alt` | `#181825` Mantle | Secondary background, code headers |
| `--color-bg-panel` | `#313244` Surface0 | Panel backgrounds |
| `--color-fg` | `#cdd6f4` Text | Primary foreground |
| `--color-fg-muted` | `#bac2de` Subtext1 | Secondary text |
| `--color-fg-subtle` | `#a6adc8` Subtext0 | Muted text |
| `--color-accent` | `#cba6f7` Mauve | Primary accent |
| `--color-accent-alt` | `#89b4fa` Blue | Secondary accent |
| `--color-rule` | `#7f849c` Overlay1 | Dividing rules |
| `--color-rule-light` | `#585b70` Surface2 | Subtle rules |

### Catppuccin Latte (light)

| Semantic Token | Value | Role |
|---|---|---|
| `--color-bg` | `#eff1f5` Base | Slide background |
| `--color-bg-alt` | `#e6e9ef` Mantle | Secondary background |
| `--color-bg-panel` | `#ccd0da` Surface0 | Panel backgrounds |
| `--color-fg` | `#4c4f69` Text | Primary foreground |
| `--color-accent` | `#8839ef` Mauve | Primary accent |
| `--color-accent-alt` | `#1e66f5` Blue | Secondary accent |
| `--color-rule` | `#8c8fa1` Overlay1 | Dividing rules |

Additional raw palette vars: `--vp-red`, `--vp-green`, `--vp-yellow`, `--vp-teal`, `--vp-peach`, `--vp-sky`, `--vp-lavender` — available in both modes.

---

## Mermaid Configuration

Catppuccin Mocha theme variables are set automatically via `slidev.defaults`
in `package.json` — no front matter needed. Diagrams render with the correct
palette in both dark and light modes without any extra configuration.

---

## CSS Utilities

| Class | Description |
|---|---|
| `.vp-label` | Monospaced uppercase label style |
| `.vp-bracketed` | Corner brackets via `::before`/`::after` |
| `.vp-bracket-bl` / `.vp-bracket-br` | Bottom corner bracket spans |
| `.vp-image-frame` | Ruled frame with corner brackets around an image |
| `.vp-list` | Parenthesized list markers: (1), (2), (3) |
| `.vp-section-id` | Section number label style |

---

## License

MIT

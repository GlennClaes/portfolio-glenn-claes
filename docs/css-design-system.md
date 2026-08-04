---
tags:
  - design
  - css
  - tokens
type: reference
status: stable
created: 2026-08-04
---

# CSS Design System — globals.css

> The entire visual system lives in one file: `src/app/globals.css`. This is how it's organized.

**Related:** [[architecture]] | [[components]] | [[config-files#tailwind.config.ts]] | [[app/api-reference/adapters/use-cases#6. Design Token System]]

---

## Overview

1638 lines of CSS. No CSS-in-JS, no styled-components, no CSS modules. Everything is plain CSS classes with Tailwind utility classes used selectively. The design is driven by CSS custom properties (design tokens) so the whole palette can be swapped from one place.

---

## Design Tokens (`:root`)

See also: [[app/api-reference/adapters/use-cases#6. Design Token System]].

All visual values are defined as custom properties on `:root`. Every component references these instead of hardcoding colors or sizes.

### Colors

```css
--bg: #f8fafc;              /* Page background — very light blue-gray */
--bg-elevated: #ffffff;     /* Cards, modals, elevated surfaces */
--bg-soft: #eef2f7;         /* Subtle backgrounds (tech strip, bands) */
--border: #e2e8f0;          /* Default border color */
--border-strong: #cbd5e1;   /* Hover states, emphasized borders */

--ink: #0f172a;             /* Primary text — near-black */
--ink-2: #1f2937;           /* Secondary text */
--ink-mute: #475569;        /* Muted/tertiary text */
--ink-soft: #64748b;        /* Soft text (labels, statuses) */

--accent: #1d4ed8;          /* Brand blue — the main accent */
--accent-ink: #ffffff;      /* Text on accent backgrounds */
--accent-hover: #1e40af;    /* Accent on hover (darker) */
--accent-tint: #dbeafe;     /* Light accent tint (badges, icon bgs) */
```

### Border Radius

```css
--r-sm: 10px;    /* Small elements (badges, inputs) */
--r-md: 14px;    /* Medium elements (cards, modals) */
--r-lg: 20px;    /* Large elements (project cards) */
--r-xl: 28px;    /* Extra large (hero canvas, about portrait) */
```

### Shadows

Five shadow levels, each with two layers for realistic depth:

```css
--shadow-xs:      /* Minimal — project cards at rest */
--shadow-sm:      /* Subtle — nav, info cards */
--shadow-md:      /* Medium — canvas, about portrait */
--shadow-lg:      /* Heavy — modal sheet, project hover */
--shadow-accent:  /* Blue glow — primary buttons */
```

### Fonts

```css
--font-sans: var(--font-manrope), var(--font-jakarta), system-ui, ...;
--font-serif: var(--font-instrument-serif), Georgia, serif;
--font-mono: var(--font-jetbrains-mono), ui-monospace, ...;
```

The actual font families are loaded by `next/font/google` in `layout.tsx` and set as CSS variables (`--font-manrope`, `--font-jakarta`, etc.). The `--font-sans` stack tries Manrope first, falls back to Plus Jakarta Sans, then system fonts.

### Layout

```css
--container: 1180px;  /* Max width for .container */
```

---

## Typography Classes

| Class | Size | Weight | Font | Use |
|-------|------|--------|------|-----|
| `.h-display` | 76px → 58px → 40px | 700 | sans | Hero heading |
| `.h-display . italic-serif` | 1.04em | 400 | serif italic | "Glenn" in hero |
| `.h-section` | 50px → 38px → 32px | 700 | sans | Section headings |
| `.h-card` | 22px | 700 | sans | Card titles |
| `.eyebrow` | 12.5px | 600 | sans | Section labels (uppercase, accent color, with ::before line) |
| `.lead` | 19px → 17px | 400 | sans | Body text, paragraphs |
| `.body-mute` | — | — | — | Muted text color |

The `.eyebrow` class has a `::before` pseudo-element that draws a 22px blue line before the text.

---

## Button System

Three button variants + one size modifier:

| Class | Background | Border | Shadow |
|-------|-----------|--------|--------|
| `.btn-primary` | accent blue | none | blue glow |
| `.btn-secondary` | white | border-strong | xs shadow |
| `.btn-ghost` | transparent | none | none |
| `.btn-sm` | — | — | 38px height (default is 48px) |

All buttons: pill shape (`border-radius: 999px`), flex centered, 600 weight, 15px font. The `.btn-arrow` icon slides 3px right on hover via CSS transition.

`:active` state adds `translateY(1px)` for a subtle press effect.

---

## Layout Primitives

### Container

```css
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px;  /* 22px on mobile */
}
```

### Section

```css
.section {
  padding: 110px 0;  /* 80px on mobile */
}
section {
  scroll-margin-top: 80px;  /* offset for sticky nav */
}
```

### Band

```css
.band {
  background: var(--bg-soft);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
```

Used by the Process section to give it a distinct background.

---

## Navigation

### Sticky Nav

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(14px) saturate(160%);
  background: rgba(248, 250, 252, 0.78);  /* semi-transparent */
}
.nav.scrolled {
  border-bottom-color: var(--border);
  background: rgba(248, 250, 252, 0.92);  /* more opaque when scrolled */
}
```

The glass-morphism effect is CSS-only: `backdrop-filter: blur + saturate` with a semi-transparent background.

### Nav Links

Pill-shaped, 14px, hover gets a soft background. Hidden below 760px (replaced by the language switcher and CTA).

---

## Hero Section

Two-column grid (`1.05fr : 0.95fr`) that collapses to single column at 960px.

The canvas has:
- Radial gradient background (blue to white to gray)
- Border + shadow
- `cursor: grab` / `cursor: grabbing` when active
- The `.scene-tag` floating label with a color swatch dot

---

## Cards

### Generic Card

```css
.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-xs);
  padding: 28px;
}
.card-hover:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
```

### Project Card

Custom card (uses `.project-card`, not `.card`). Two-column grid on desktop, single column below 800px. Hover: `translateY(-4px)` + heavy shadow.

### Service Card

`.service-card` — flex column, 320px min-height. The icon background transitions from `accent-tint` to solid `accent` on hover. The "benefit" line is separated by a dashed border.

---

## Modal System

Three layers:

1. **`.modal-backdrop`** — fixed overlay with `rgba(15, 23, 42, 0.58)` background + 6px blur. Flex centered. Scrollable. Fades in (0.2s).

2. **`.modal-scrim`** — invisible full-screen button behind the sheet. Clicking it closes the modal.

3. **`.modal-sheet`** — the actual content panel. Max 880px wide, rounded corners, heavy shadow. Slides up + scales in (0.28s cubic-bezier). On mobile (< 720px): full screen, no border radius.

**Animations:** Two keyframes — `fadeIn` (backdrop) and `sheetIn` (sheet entry with translateY + scale).

---

## Form System

### Field Layout

```css
.field { display: flex; flex-direction: column; gap: 8px; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
```

`.field-row` collapses to single column at 600px.

### Inputs

15px font, 13px/16px padding, medium border radius. Focus state: accent border + 4px accent tint ring. Error state: red border via `aria-invalid="true"`.

### Error Messages

```css
.field-error { color: #b63b22; font-size: 12.5px; font-weight: 600; }
```

### Sent Confirmation

```css
.sent {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  border-radius: var(--r-md);
}
```

---

## Footer

Dark background (`#020617`), light text (`#cbd5e1`). Four-column grid that collapses: 2-col at 800px, 1-col at 500px.

Links turn accent blue on hover. Social links have inline SVG icons with gap spacing.

---

## Scroll Reveal System

```css
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
              transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
  will-change: opacity, transform;
}
.reveal.in {
  opacity: 1;
  transform: translateY(0);
}
```

Staggered delays via data attributes:
```css
.reveal[data-delay='1'] { transition-delay: 0.08s; }
.reveal[data-delay='2'] { transition-delay: 0.16s; }
.reveal[data-delay='3'] { transition-delay: 0.24s; }
.reveal[data-delay='4'] { transition-delay: 0.32s; }
```

---

## Language Switcher

Positioned dropdown (`position: absolute`, `z-index: 60`). Trigger is a pill button with border. Chevron rotates 180° when open.

Menu items: flex row with code, name, and optional check icon. Active item gets accent color.

---

## Tech Strip

Horizontal bar with flex-wrap centering. Each item gets a blue dot via `::before` pseudo-element (4px circle, 60% opacity). Items separated by 56px gap.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|-----------|---------|
| 1100px | `.h-display` shrinks to 58px |
| 960px | Hero grid → single column |
| 900px | About, contact, process grids → single column; services → single column |
| 800px | `.h-section` → 38px; sections → 80px padding; projects → single column; footer → 2-col |
| 760px | Nav links hidden (only logo + language + CTA remain) |
| 720px | Modal → full screen, no border radius |
| 700px | Modal facts → 2-col grid; modal body padding reduced |
| 600px | Container padding → 22px; `.h-display` → 40px; `.h-section` → 32px; field-row → single column |
| 500px | Footer → single column |

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}
```

All animations and transitions are instantly completed. Reveal elements are immediately visible. This respects the OS-level setting.

---

## Focus Styles

```css
:focus-visible {
  outline: 3px solid rgba(29, 78, 216, 0.36);
  outline-offset: 4px;
}
```

Visible only on keyboard navigation (not mouse clicks). Blue outline with offset for clear visibility.

---

*Last updated: August 2026*

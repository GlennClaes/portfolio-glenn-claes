---
tags:
  - concepts
  - architecture
type: guide
status: stable
created: 2026-08-04
---

# Core Concepts — Glenn Claes Portfolio

> Fundamental ideas and patterns that shape the architecture. Understanding these makes the codebase easier to navigate.

---

## 1. Single-Page Architecture

Everything lives on one route (`/`). No client-side routing, no URL segments for sections. Navigation uses smooth scroll with `scroll-margin-top` offset for the sticky nav.

**Why:** Simpler mental model, faster initial load, no route transition jank.

**Trade-off:** No deep linking to specific sections (though hash URLs would work).

**Related:** [[architecture#Overview]], [[architecture-graph#2]]

---

## 2. Zero Backend Philosophy

No API routes, no server functions, no database. Contact form uses `mailto:`. Language preference lives in `localStorage`. Project data is hardcoded in TypeScript.

**Why:** Zero maintenance, zero server costs, zero security surface.

**Trade-off:** No server-side features (analytics, form validation, dynamic content).

**Related:** [[app/api-reference/adapters/use-cases#8. Zero-Backend Contact Flow]]

---

## 3. Design Token System

Every visual value is a CSS custom property. Components never hardcode colors, sizes, or fonts. Tailwind utilities map to these tokens via `var(--token-name)`.

**Why:** Change the entire palette from one place. Consistency by default.

**Tokens:**
- `--bg`, `--ink`, `--accent` — core colors
- `--r-sm` through `--r-xl` — border radii
- `--font-sans`, `--font-serif`, `--font-mono` — typography

**Related:** [[css-design-system#Design Tokens]], [[app/api-reference/adapters/use-cases#6. Design Token System]]

---

## 4. Client-Side i18n

No URL locale segments (`/nl/about`). No server-side language detection. Language preference stored in `localStorage`, synced via `useSyncExternalStore`.

**Why:** No server, no hydration mismatch, instant language switching.

**Trade-off:** SEO is English-only. Social share URLs don't preserve language.

**Related:** [[architecture#i18n]], [[app/api-reference/adapters/use-cases#1. Multi-Language Content Delivery]]

---

## 5. CSS-First Animations

No animation libraries (Framer Motion, GSAP). All animations are CSS transitions triggered by class changes via IntersectionObserver.

**Why:** Smaller bundle, simpler debugging, no runtime overhead.

**Pattern:**
```css
.reveal { opacity: 0; transform: translateY(18px); }
.reveal.in { opacity: 1; transform: translateY(0); }
```

**Related:** [[css-design-system#Scroll Reveal System]], [[components#useReveal.ts]]

---

## 6. Custom Events for Cross-Cutting Concerns

When components far apart in the tree need to communicate, use DOM CustomEvents on `window` instead of prop drilling.

**Why:** Decouples sender from receiver. Any component can trigger the action.

**Example:** Process section → Contact form prefill via `window.dispatchEvent(new CustomEvent('open-contact', { detail }))`.

**Trade-off:** Harder to trace data flow. Not type-safe without extra effort.

**Related:** [[architecture#How Components Talk]], [[app/api-reference/adapters/use-cases#2. Cross-Component Communication]]

---

## 7. Raw Three.js (No React Wrapper)

The hero 3D scene uses Three.js directly, not `@react-three/fiber`. Scene setup, animation loop, and cleanup happen in a `useEffect`.

**Why:** Full control, no abstraction overhead, simpler debugging.

**Trade-off:** More boilerplate. React state integration is manual.

**Related:** [[architecture#Three.js Hero Scene]], [[components#hero-scene.ts]]

---

## 8. Single-Source Project Data

Each project is defined once in `projectDefinitions`: shared `meta` (tags, stack, year) paired with per-locale `texts`. `getProjects(locale)` derives the merged `Project[]` at runtime.

**Why:** Adding a project = appending one array entry + filling `texts` for all four locales. No casts, no parallel records.

**Related:** [[architecture#Data Layer]], [[app/api-reference/adapters/use-cases#7. Type-Safe Project Data]]

---

## 9. Strict TypeScript Throughout

No `any`, no loose mode. `tsc --noEmit` runs in CI. All props, state, and data structures are typed.

**Why:** Catch errors at compile time. Better IDE support.

**Trade-off:** More upfront work. Some verbose type definitions.

**Related:** [[config-files#tsconfig.json]]

---

## 10. Sequential Quality Gates

CI pipeline: Lint → TypeCheck → Unit Tests → E2E Tests → Build → Deploy. Each step gates the next.

**Why:** Fast feedback. Cheaper checks run first. Failed tests never deploy.

**Related:** [[testing#CI Pipeline Order]], [[app/api-reference/adapters/use-cases#10. Quality Gates in CI]]

---

## Quick Reference

| Concept | Key Benefit | Main Trade-off |
|---------|-------------|----------------|
| Single-page | Simpler routing | No deep linking |
| Zero backend | Zero maintenance | No server features |
| Design tokens | Consistency | Learning curve |
| Client-side i18n | No server dependency | SEO limitation |
| CSS-first animations | Small bundle | Limited interactivity |
| Custom events | Decoupling | Harder to trace |
| Raw Three.js | Full control | More boilerplate |
| Data separation | Easy localization | Two sources |
| Strict TypeScript | Compile-time safety | Verbose types |
| Sequential gates | Fast feedback | Longer CI time |

---

*Last updated: August 2026*

---
tags:
  - architecture
  - system
type: reference
status: stable
created: 2026-08-04
---

# Architecture — Glenn Claes Portfolio

> Everything under the hood. How the site is built, how data flows, how it gets deployed.

**Related:** [[architecture-graph]] | [[components]] | [[css-design-system]] | [[config-files]] | [[testing]]

---

## Overview

This is a **single-page developer portfolio** for Glenn Claes. It's a Next.js app using the App Router, React 19, TypeScript in strict mode, and Tailwind CSS. The whole thing lives inside the `frontend/` directory.

The design philosophy is pretty straightforward: one page, no backend, clean types, real tests. The contact form uses `mailto:` so there's no server to maintain. Languages are handled client-side. The 3D hero is raw Three.js, no abstraction layer on top.

**Key decisions:**

- Single-page layout — everything on one route, smooth scroll between sections
- No backend — contact goes straight to email via `mailto:`
- Strict TypeScript throughout — `tsc --noEmit` runs in CI
- Four languages (EN, NL, DE, FR) with a context provider and localStorage sync
- Dual deployment: Vercel (primary) + GitHub Pages (static fallback)
- Quality gates: ESLint, TypeScript, Vitest, Playwright, axe accessibility

---

## Tech Stack

### Runtime and Framework

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js ≥ 20.19.0 |
| Framework | Next.js (App Router) |
| UI Library | React 19 |
| Language | TypeScript (strict mode) — see [[config-files#tsconfig.json]] |

### Styling

| Layer | Details |
|-------|---------|
| CSS framework | Tailwind CSS 3.4 |
| PostCSS plugins | autoprefixer, postcss-import, postcss-nested |
| Design tokens | CSS custom properties — see [[css-design-system#Design Tokens]] |
| Fonts | Outfit (body/UI), Instrument Serif (name/logo accent), JetBrains Mono (code) — all loaded via `next/font/google` with `display: 'swap'` |
| Icons | lucide-react |

### 3D and Interaction

| Layer | Details |
|-------|---------|
| 3D engine | Three.js (raw WebGL, no React wrapper) |
| Scene variants | `primitives` (default) — a composition of 8 floating shapes; `cube` — single rotating cube |
| Animations | CSS class-based reveals via IntersectionObserver (`useReveal` hook) |
| Mouse tracking | Direct `mousemove` listener on canvas, smooth lerp interpolation |

### Testing

| Type | Tool | Config file |
|------|------|-------------|
| Unit / Component | Vitest + @testing-library/react + jest-dom | [[config-files#vitest.config.ts]] |
| E2E / Accessibility | Playwright + @axe-core/playwright | [[config-files#playwright.config.ts]] |
| Linting | ESLint 9 + @next/eslint-plugin-next + jsx-a11y | [[config-files#eslint.config.mjs]] |
| Formatting | Prettier | [[config-files#.prettierrc.json]] |
| Type checking | `tsc --noEmit` | [[config-files#tsconfig.json]] |

See [[testing]] for full test strategy.

### Deployment

| Target | Tool | Trigger |
|--------|------|---------|
| Production | Vercel | Push to `main` |
| Fallback | GitHub Pages (static export) | Push to `main` |
| CI/CD | GitHub Actions | Push to `main` |

---

## Directory Structure

```
frontend/src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, JSON-LD, LanguageProvider wrapper
│   ├── page.tsx                # Home route — just renders <PortfolioPage />
│   ├── not-found.tsx           # Custom 404 page (i18n-aware)
│   ├── opengraph-image.tsx     # Auto-generated 1200×630 PNG via next/og ImageResponse
│   ├── robots.ts               # Robots.txt — allow all, sitemap URL
│   ├── sitemap.ts              # Sitemap.xml — single URL with hreflang alternates
│   └── globals.css             # Full design system — see css-design-system
│
├── components/
│   ├── PortfolioPage.tsx       # Main component — assembles all sections
│   ├── Nav.tsx                 # Top navigation bar (scroll-aware)
│   ├── BrandLogo.tsx           # "G Glenn Claes" logo mark
│   ├── LanguageSwitcher.tsx    # Language dropdown (EN/NL/DE/FR)
│   ├── Hero.tsx                # Hero section with Three.js canvas
│   ├── TechStrip.tsx           # Horizontal technology ticker
│   ├── About.tsx               # About section with portrait placeholder + stats
│   ├── Services.tsx            # Three service cards
│   ├── Projects.tsx            # Project grid — opens modal on click
│   ├── ProjectThumb.tsx        # SVG illustrations (web vs. app variant)
│   ├── CaseStudyModal.tsx      # Full-screen project detail modal
│   ├── Process.tsx             # Process/workflow section
│   ├── Contact.tsx             # Contact form (mailto) + info cards
│   ├── Footer.tsx              # Footer with nav, contact, socials
│   ├── Contact.test.tsx        # Component test — form validation
│   └── Projects.test.tsx       # Component test — project rendering
│
├── data/
│   └── projects.ts             # Project metadata — split into base data + per-locale text
│
├── hooks/
│   └── useReveal.ts            # IntersectionObserver-based scroll reveal
│
├── i18n/
│   ├── messages.ts             # All translations (EN, NL, DE, FR) — typed as a const
│   └── LanguageProvider.tsx    # React context + localStorage sync + fade transition
│
├── lib/
│   ├── hero-scene.ts           # Three.js scene setup, animation loop, cleanup
│   └── navigation.ts           # Smooth scroll helper + contact form prefill via CustomEvent
│
└── test/
    └── setup.ts                # Vitest setup — imports @testing-library/jest-dom
```

See [[components]] for details on each file.

---

## How the Components Fit Together

### Render Tree

```
RootLayout (layout.tsx)
  └── <LanguageProvider>            ← wraps everything, provides locale context
        └── <html lang="en">
              └── <body>
                    └── <PortfolioPage>    ← the only page
                          ├── <Nav>
                          │     ├── <BrandLogo>
                          │     ├── <LanguageSwitcher>
                          │     └── CTA button → #contact
                          ├── <Hero>             ← Three.js canvas lives here
                          ├── <TechStrip>        ← simple list of tech tags
                          ├── <About>
                          ├── <Services>
                          ├── <Projects>         ← passes onOpen to parent state
                          │     └── (click) → <CaseStudyModal>
                          ├── <Process>
                          ├── <Contact>          ← mailto form + direct contact info
                          └── <Footer>
```

### State Management

There's no Redux, no Zustand, no external state library. Everything is either local `useState` or React context:

| What | Where | How |
|------|-------|-----|
| Current language | `LanguageProvider` | `useSyncExternalStore` reading localStorage |
| Open project modal | `PortfolioPage` | `useState<Project \| null>` — passed down as props |
| Nav scroll state | `Nav` | `useState<boolean>` — true when `scrollY > 12` |
| Contact form fields | `Contact` | `useState<ContactForm>` |
| Language dropdown open | `LanguageSwitcher` | `useState<boolean>` |
| Modal prefill data | `Contact` | Custom DOM event `open-contact` (see below) |

### How Components Talk to Each Other

Two patterns:

**1. Props (top-down)** — `PortfolioPage` holds the `openProject` state. `Projects` gets an `onOpen` callback. `CaseStudyModal` gets the `project` object and an `onClose` callback. Straightforward.

**2. Custom DOM Events (cross-cutting)** — See [[app/api-reference/adapters/use-cases#2. Cross-Component Communication|Use Case: Cross-Component Communication]].

When you click "Start a project" in the Process section, it needs to scroll to Contact and pre-fill the form. Instead of threading props through multiple levels, `openContact()` dispatches a `CustomEvent('open-contact')` on `window`. The `Contact` component listens for it with `addEventListener`, reads the preset data from `event.detail`, and updates its form state. It also auto-focuses the message textarea after a 650ms delay. This keeps the coupling loose — any component anywhere can trigger a pre-filled contact scroll without knowing anything about the Contact component's internals.

```typescript
// lib/navigation.ts — the sender
export function openContact(preset: ContactPreset = {}) {
  return (event?: MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    window.dispatchEvent(new CustomEvent<ContactPreset>('open-contact', { detail: preset }));
    // then scroll to #contact
  };
}

// Contact.tsx — the listener
useEffect(() => {
  const onPrefill = (event: Event) => {
    const detail = (event as CustomEvent<ContactPreset>).detail ?? {};
    setForm(current => ({ ...current, ...detail }));
    // focus textarea, etc.
  };
  window.addEventListener('open-contact', onPrefill);
  return () => window.removeEventListener('open-contact', onPrefill);
}, []);
```

### Scroll Reveal System

See [[components#useReveal.ts]] and [[css-design-system#Scroll Reveal System]].

The `useReveal()` hook is dead simple. On mount, it grabs every element with `.reveal` and sets up an `IntersectionObserver`. When an element crosses the threshold (6% visible, 8% root margin from bottom), it adds the `.in` class once and unobserves. CSS transitions handle the rest. If the browser doesn't support `IntersectionObserver`, all elements just get `.in` immediately.

```typescript
// hooks/useReveal.ts
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);  // one-shot — never re-triggers
    });
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
);
```

---

## Internationalization (i18n)

See also: [[components#i18n]] and [[app/api-reference/adapters/use-cases#1. Multi-Language Content Delivery|Use Case: Multi-Language Content Delivery]].

### How It Works

Client-side only — no URL segments like `/nl/` or locale detection on the server. The language preference lives in `localStorage` under the key `glenn-locale`.

The `LanguageProvider` component uses `useSyncExternalStore` to read from localStorage, which avoids hydration mismatches (server always returns `'en'`, client reads the real value). When the user switches language, there's a 150ms CSS fade-out, then the text swaps, then it fades back in. This masks the layout reflow that happens when translated strings are different lengths.

### Supported Languages

| Code | Language |
|------|----------|
| `en` | English (default) |
| `nl` | Dutch |
| `de` | German |
| `fr` | French |

### Data Flow

```
localStorage (glenn-locale)
       ↓
useSyncExternalStore
       ↓
LanguageProvider → LanguageContext { locale, setLocale, messages }
       ↓
useLanguage() hook (used by every component)
       ↓
messages.hero.heading, messages.nav.about, etc.
```

The `getProjects(locale)` function in `data/projects.ts` merges base project metadata with locale-specific text. This keeps the structural data (tags, stack, client, year) separate from the translatable content (title, description, body paragraphs, highlights).

### Adding a New Language

1. Add the locale code to the `LOCALES` array in `messages.ts`
2. Copy the `en` messages object and translate everything
3. Add it to the `dictionaries` record
4. Add the language name to the `languageNames` map in `LanguageSwitcher.tsx`
5. Add translated project texts to `projectTexts` in `projects.ts`

---

## Data Layer

### Project Data Structure

Projects are split into two layers in `data/projects.ts`:

```typescript
// Structural data — language-independent
const baseProjects: Record<ProjectId, BaseProject> = {
  portfolio: {
    id: 'portfolio',
    kind: 'web',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    client: 'Glenn Claes',
    year: '2026',
    platform: 'Web - Vercel',
    stack: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Vercel', 'GitHub Actions'],
    available: true,
    cta: { label: '', href: 'https://github.com/GlennClaes/portfolio-glenn-claes' },
  },
  // ...
};

// Text data — per locale
const projectTexts: Record<Locale, Record<ProjectId, ProjectText>> = {
  en: {
    portfolio: {
      title: 'Glenn Claes Portfolio',
      desc: 'A clean personal portfolio with a responsive one-page layout...',
      body: ['This portfolio is built as...', ...],
      highlights: ['Vercel deployment configured...', ...],
      // ...
    },
  },
  nl: { /* dutch translations */ },
  de: { /* german translations */ },
  fr: { /* french translations */ },
};

// Merged at runtime
export function getProjects(locale: Locale): Project[] { ... }
```

This separation makes it easy to add new projects (just add to both objects) or add new languages (just add a new locale key to `projectTexts`).

---

## Three.js Hero Scene

### What's Happening

The hero section renders an interactive 3D scene inside a `<canvas>` element. It uses raw Three.js — no React wrapper like `@react-three/fiber`. The scene is initialized in a `useEffect` in `Hero.tsx` and cleaned up on unmount.

### Scene Composition (primitives variant)

The default scene has 8 objects:

| Object | Geometry | Material | Behavior |
|--------|----------|----------|----------|
| Center cube | `BoxGeometry(1.55)` | Primary (accent color) | Slow rotation, float |
| Icosahedron | `IcosahedronGeometry(0.6, 0)` | Soft (light gray) | Fast rotation, wider float |
| Cone | `ConeGeometry(0.55, 1.05, 5)` | Accent blue | Medium float |
| Torus | `TorusGeometry(0.45, 0.16)` | Ink (dark) | Fast rotation |
| Small cube | `BoxGeometry(0.55)` | Ink (dark) | Fast rotation, float |
| Octahedron | `OctahedronGeometry(0.34)` | Accent glow (emissive) | Very fast float |
| Dodecahedron wireframe | `DodecahedronGeometry(0.62)` | Accent (55% opacity) | Slow float |
| Tetrahedron | `TetrahedronGeometry(0.32)` | Ink (dark) | Medium float |
| Ground disc | `CircleGeometry(3.6, 48)` | Light gray (60% opacity) | Static floor |

Each object has its own sinusoidal animation parameters (amplitude, speed, phase) stored in a `DynamicObject[]` array.

### Lighting

- Hemisphere light (sky blue → gray, 0.9 intensity)
- Directional key light (white, 1.6 intensity, positioned top-right)
- Directional rim light (accent color, 0.6 intensity, positioned bottom-left)
- Point fill light (blue tint, 0.7 intensity)

### Mouse Interaction

The canvas listens for `mousemove` events. The cursor position relative to the canvas center is lerped (factor 0.06) into the scene group's rotation. This gives a smooth, slightly delayed parallax effect. On mouse leave, the rotation smoothly returns to center.

### Performance Considerations

- `devicePixelRatio` is capped at 2 (prevents Retina overhead on 3x screens)
- `powerPreference: 'high-performance'` requests the discrete GPU
- `preserveDrawingBuffer: true` is set for potential accessibility screenshots
- If WebGL context creation fails, the function returns `null` and the canvas just stays empty — no crash

### Cleanup

The `dispose()` function handles everything:
- Cancels the `requestAnimationFrame` loop
- Disconnects the `ResizeObserver`
- Removes `mousemove` and `mouseleave` event listeners
- Disposes the WebGL renderer
- Traverses the scene graph and disposes all geometries and materials

---

## CSS Design System

See [[css-design-system]] for full documentation.

The entire visual system is built on CSS custom properties defined in `globals.css`:

```css
:root {
  --bg: #F8FAFC;        /* Canvas background */
  --ink: #0F172A;       /* Primary text */
  --accent: #1D4ED8;    /* Brand blue */
  --r-sm: 8px;          /* Small border radius */
  --r-md: 12px;         /* Medium border radius */
  --r-lg: 18px;         /* Large border radius */
  --r-xl: 24px;         /* Extra large border radius */
}
```

Tailwind picks these up via `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      canvas: 'var(--bg)',
      ink: 'var(--ink)',
      accent: 'var(--accent)',
    },
    fontFamily: {
      sans: ['var(--font-sans)'],
      serif: ['var(--font-serif)'],
      mono: ['var(--font-mono)'],
    },
  },
},
```

This means you can use `bg-canvas`, `text-ink`, `text-accent`, `font-serif` etc. in Tailwind classes. The actual font families are set as CSS variables by the `next/font` loader in `layout.tsx`.

---

## Testing Strategy

See [[testing]] for full strategy and [[config-files]] for test configurations.

### Unit and Component Tests (Vitest)

Located next to the components they test: `Contact.test.tsx`, `Projects.test.tsx`. Uses jsdom environment with `@testing-library/react` for rendering and `@testing-library/jest-dom` for DOM assertions.

```bash
npm run test          # Run all tests once
```

Config: `vitest.config.ts` — sets up `@/` path alias to match Next.js, enables CSS processing.

### E2E Tests (Playwright)

Located in `tests/e2e/smoke.spec.ts`. Tests run against a real browser (Chromium) with the dev server spun up automatically.

```bash
npm run test:e2e      # Starts dev server + runs Playwright
```

Config: `playwright.config.ts` — base URL `http://127.0.0.1:3000`, retries 2x in CI, single worker in CI, HTML + GitHub reporter in CI.

The E2E tests cover:
- Basic page load and render
- Project modal open/close behavior
- Contact form interaction
- Canvas rendering check
- Accessibility audit via @axe-core/playwright
- Responsive breakpoint checks

### Quality Gates

```bash
npm run lint          # ESLint — zero warnings, zero errors
npm run typecheck     # TypeScript strict check
npm run test          # Vitest
npm run test:e2e      # Playwright
npm run format:check  # Prettier
```

All of these run in CI before deployment. If any of them fail, the deploy doesn't happen.

---

## SEO, structured data, and crawlability

- **Meta description:** static English string in `layout.tsx` (server-rendered, not locale-aware since the site is a single-page client-localized app).
- **OG image:** `src/app/opengraph-image.tsx` generates a1200×630 branded PNG at build time via `next/og` ImageResponse (`export const dynamic = 'force-static'` required for `output: export`). Serves both `og:image` and `twitter:image` (summary_large_image card).
- **Structured data (JSON-LD):** `Person` + `WebSite` schemas injected via `<Script type="application/ld+json">` in `layout.tsx` (present on every page including 404). Includes `sameAs` for LinkedIn/GitHub.
- **Robots.txt:** `src/app/robots.ts` — allow all; explicit allow for GPTBot, ClaudeBot, anthropic-ai; sitemap URL.
- **Sitemap.xml:** `src/app/sitemap.ts` — single canonical URL with `hreflang` alternates for all four locales, `changefreq: monthly`, `priority: 1`.
- **LLMs.txt:** `public/llms.txt` — plaintext summary for LLM crawlers.
- **`lang` attribute:** updated client-side via `LanguageProvider` (`document.documentElement.lang = locale`) on locale change and initial load; default server-rendered value is `en`.
- **External link attributes:** social links in `Footer.tsx` use `rel="noreferrer noopener me"` (`rel="me"` for Google rel=me verification).
- **Known limitation:** On GH Pages (basePath = `/portfolio-glenn-claes`), the auto-generated `og:image` URL from `opengraph-image.tsx` omits the basePath prefix — a known Next.js issue with metadata routes + `basePath`. This affects social previews on the GH Pages fallback; the primary Vercel deployment has the correct URL.

---

## Deployment

### Vercel (Primary)

The site is deployed to Vercel on every push to `main`. The Next.js App Router handles SSR, so the Vercel deployment gets full server-side rendering benefits.

**Vercel Root Directory = `frontend`.** The project's build lives entirely in `frontend/`, so the Vercel project Root Directory must be set to `frontend` (project settings → General). The single source of truth is `frontend/vercel.json` (`framework: nextjs`, `installCommand: npm ci`, `buildCommand: npm run build`). There is **no** root-level `vercel.json`. If the PR preview/production deploy fails, first confirm the Root Directory is `frontend` and that only `frontend/vercel.json` exists.

Environment variables:
- `NEXT_PUBLIC_SITE_URL` — the canonical URL (defaults to `http://127.0.0.1:3000`)
- `NEXT_PUBLIC_BASE_PATH` — for subdirectory deployments

### GitHub Pages (Fallback)

A static export is built separately using `next export` (output goes to `out/`). This is configured for the repository subpath (`/portfolio-glenn-claes/`). The build is handled by `scripts/build-pages.mjs`.

### CI/CD Pipeline (GitHub Actions)

```
Push to main
  │
  ├── Setup Node.js + npm install
  ├── ESLint (max-warnings=0)
  ├── TypeScript strict check
  ├── Vitest unit/component tests
  ├── Playwright E2E tests
  ├── Next.js production build
  │
  ├── Deploy to Vercel
  │
  └── Static export → Deploy to GitHub Pages
```

CodeQL (`security-and-quality`) runs on push/PR/weekly and is configured in `.github/workflows/codeql.yml`. It uses `paths-ignore: ['**/.github/**']` so it only analyzes the app's own code — the vendored `.github/skills/impeccable` tool (a third-party JS/`mjs` Claude Code skill) is excluded and does not raise alerts.

Every step has to pass before the next one runs. If linting fails, tests don't run. If tests fail, the build doesn't happen. If the build fails, deployment is skipped.

---

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase `.tsx` | `Nav.tsx`, `Hero.tsx`, `CaseStudyModal.tsx` |
| Custom hooks | camelCase with `use` prefix | `useReveal.ts` |
| Utility functions | camelCase `.ts` | `navigation.ts`, `hero-scene.ts` |
| Data files | lowercase `.ts` | `projects.ts` |
| i18n files | lowercase `.ts` / PascalCase `.tsx` | `messages.ts`, `LanguageProvider.tsx` |
| Tests | Co-located `*.test.tsx` | `Contact.test.tsx` |
| E2E tests | `tests/e2e/*.spec.ts` | `smoke.spec.ts` |
| Path alias | `@/` maps to `src/` | `import { Hero } from '@/components/Hero'` |

---

## Accessibility

- Semantic HTML throughout: `<nav>`, `<main>`, `<footer>`, `<section>`, `<button>`, `<form>`
- ARIA labels on all interactive elements (language switcher, modal close, project cards)
- `role="dialog"` + `aria-modal="true"` on the case study modal
- `aria-live="polite"` on form submission feedback
- Keyboard navigation: Escape closes modal, Enter/Space opens projects
- `aria-describedby` on form fields with validation errors
- Three.js canvas has `role="img"` + descriptive `aria-label`
- Color contrast meets WCAG guidelines (blue accent on white/light gray)
- Focus management: modal traps focus, close button auto-focuses on open

---

*Last updated: August 2026*

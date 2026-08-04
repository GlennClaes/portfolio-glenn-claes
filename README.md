# Glenn Claes — Developer Portfolio

![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions)

> A clean, single-page developer portfolio built with Next.js, React, TypeScript and Tailwind CSS. Interactive 3D hero, four languages, and a quality-first delivery pipeline.

## What It Is

One-page portfolio. No backend. The contact form opens the user's email client via `mailto:`. Everything loads on a single route, with smooth scroll between sections. Four languages (EN, NL, DE, FR) handled entirely client-side.

The hero section has an interactive 3D scene built with raw Three.js — floating geometric primitives that follow your mouse. Scroll-reveal animations powered by IntersectionObserver.

Deployment goes to **Vercel** (primary) with a **GitHub Pages** static fallback. Every push to main runs lint, typecheck, unit tests, E2E tests, and accessibility checks before deploying.

## Quick Start

```bash
git clone https://github.com/GlennClaes/portfolio-glenn-claes.git
cd portfolio-glenn-claes/frontend
npm install
npm run dev
# → http://localhost:3000
```

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Next.js dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint — zero warnings allowed |
| `npm run typecheck` | TypeScript strict check (`tsc --noEmit`) |
| `npm run test` | Vitest unit + component tests |
| `npm run test:e2e` | Playwright E2E tests (auto-starts dev server) |
| `npm run test:unit` | Alias for Vitest |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting (CI) |
| `npm run build:pages` | Static export for GitHub Pages |
| `npm run start:static` | Serve the static export locally |

## Stack

```
Next.js 15 (App Router)  ·  React 19  ·  TypeScript (strict)
Tailwind CSS 3.4  ·  Three.js (raw WebGL)  ·  lucide-react
Vitest  ·  Playwright  ·  axe-core  ·  ESLint 9  ·  Prettier
```

**Fonts:** Manrope, Plus Jakarta Sans, Instrument Serif, JetBrains Mono — all loaded via `next/font/google`.

## Project Structure

```
portfolio-glenn-claes/
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js App Router (layout, page, globals.css)
│   │   ├── components/        # 14 React components
│   │   │   ├── PortfolioPage   # Main — assembles all sections
│   │   │   ├── Nav             # Scroll-aware top navigation
│   │   │   ├── Hero            # Three.js canvas + hero text
│   │   │   ├── TechStrip       # Horizontal tech ticker
│   │   │   ├── About           # Portrait placeholder + stats
│   │   │   ├── Services        # Three service cards
│   │   │   ├── Projects        # Project grid → opens modal
│   │   │   ├── CaseStudyModal  # Full-screen project details
│   │   │   ├── Process         # Workflow section
│   │   │   ├── Contact         # Mailto form + info cards
│   │   │   ├── Footer          # Nav, contact, socials
│   │   │   ├── BrandLogo       # Logo mark
│   │   │   ├── LanguageSwitcher # EN/NL/DE/FR dropdown
│   │   │   └── ProjectThumb    # SVG illustrations
│   │   ├── data/              # Project metadata (type-safe, multilingual)
│   │   ├── hooks/             # useReveal (IntersectionObserver)
│   │   ├── i18n/              # translations + LanguageProvider
│   │   ├── lib/               # hero-scene.ts, navigation.ts
│   │   └── test/              # Vitest setup (jest-dom)
│   ├── tests/e2e/            # Playwright specs
│   ├── vitest.config.ts
│   ├── playwright.config.ts
│   └── tailwind.config.ts
├── docs/                      # Architecture documentation + diagrams
│   ├── README.md
│   ├── architecture.md
│   └── architecture-graph.md
└── README.md                  # ← you are here
```

## How It Works

**Rendering:** `RootLayout` wraps everything in a `LanguageProvider`. The single page route renders `PortfolioPage`, which stacks all sections inside `<main>`. No routing, no pages, no dynamic imports — just one component tree.

**State:** All local `useState`, except language which uses React context + `useSyncExternalStore` backed by `localStorage`. No Redux, no Zustand.

**Cross-component comms:** Clicking "Start a project" in Process needs to scroll to Contact and pre-fill the form. Instead of threading props through three levels, it dispatches a `CustomEvent('open-contact')` on `window`. Contact listens for it and updates its form. Loose coupling, no state library needed.

**i18n:** Client-side only. Language stored in `localStorage` (`glenn-locale`). Provider reads it with `useSyncExternalStore` to avoid hydration mismatches. Switching language triggers a 150ms fade-out, swaps text, fades back in.

**3D hero:** Raw Three.js in `hero-scene.ts`. Eight floating objects (cube, icosahedron, cone, torus, etc.) with sinusoidal animation. Mouse position is lerped into group rotation for parallax. Falls back silently if WebGL fails.

**Reveal animations:** `useReveal()` hook sets up one `IntersectionObserver` for all `.reveal` elements. When visible, adds `.in` class once. CSS transitions handle the rest.

## Deployment

### Vercel (Primary)

```bash
npm run build    # production build
npm run start    # serve it
```

Recommended Vercel setup:

1. Import the GitHub repo in Vercel
2. Set **Root Directory** to `frontend`
3. Framework Preset: `Next.js`
4. Add env var: `NEXT_PUBLIC_SITE_URL=https://your-domain`

If you see `404: NOT_FOUND` — check that root directory is `frontend`, you're using the Vercel URL (not the GitHub Pages path), and the latest `main` is deployed.

If Vercel says `No Next.js version detected` — the build is running from the wrong directory. Set Root Directory to `frontend` and redeploy with cleared cache.

### GitHub Actions → Vercel

The workflow deploys to Vercel on merges to `main` when these secrets exist:

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

Optional variable:

```
NEXT_PUBLIC_SITE_URL=https://your-vercel-or-custom-domain
```

If the secrets are missing, the Vercel deploy step is skipped (no failure).

### GitHub Pages (Fallback)

Same workflow publishes a static export:

```
https://glennclaes.github.io/portfolio-glenn-claes/
```

Enable GitHub Pages in repo settings, source: GitHub Actions. The Pages deploy uses:

```
GITHUB_PAGES=true
NEXT_PUBLIC_BASE_PATH=/portfolio-glenn-claes
NEXT_PUBLIC_SITE_URL=https://glennclaes.github.io/portfolio-glenn-claes
```

### CI Pipeline

```
push to main
  → npm install
  → ESLint (max-warnings=0)
  → TypeScript strict
  → Vitest unit + component tests
  → Playwright E2E + accessibility
  → Next.js build
  → Deploy to Vercel
  → Static export → Deploy to GitHub Pages
```

Every step gates the next. If lint fails, tests don't run. If tests fail, build is skipped. If build fails, no deploy.

## Documentation

Detailed architecture docs live in [`docs/`](./docs/):

| File | What's in it |
|------|-------------|
| [`docs/architecture.md`](./docs/architecture.md) | Full technical architecture — stack, data flow, Three.js scene, testing, deployment |
| [`docs/architecture-graph.md`](./docs/architecture-graph.md) | Visual Mermaid diagrams — render natively in JetBrains, GitHub, VS Code |

## License

MIT

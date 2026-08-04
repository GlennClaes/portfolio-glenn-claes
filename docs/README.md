# Glenn Claes — Developer Portfolio

![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)

> A clean, single-page developer portfolio built with Next.js, React, TypeScript and Tailwind CSS. Interactive 3D hero, four languages, and a quality-first delivery pipeline.

---

## Documentation

### Core Documentation

| File | What it covers |
|------|---------------|
| [[architecture]] | Full technical architecture — stack, structure, data flow, i18n, testing, deployment |
| [[architecture-graph]] | Visual Mermaid diagrams of the entire system (renders in JetBrains, GitHub, VS Code) |
| [[components]] | Every component, hook, and library file — props, state, how it works, what it renders |
| [[css-design-system]] | The full CSS system — tokens, typography, buttons, layouts, modals, responsive breakpoints |
| [[config-files]] | Every config file explained — tsconfig, ESLint, Tailwind, Vitest, Playwright, Prettier |
| [[testing]] | Testing strategy — what's covered, how tests are structured, how to add new ones |

### Concepts & Patterns

| File | What it covers |
|------|---------------|
| [[concepts]] | Fundamental ideas — single-page architecture, zero backend, design tokens, client-side i18n |
| [[patterns]] | Reusable code patterns — React hooks, CSS classes, data merging, event handling |
| [[decisions]] | Design decisions with rationale — why things are the way they are |
| [[app/api-reference/adapters/use-cases]] | Real-world scenarios — multi-language, cross-component communication, 3D interaction |

### Quick Help

| File | What it covers |
|------|---------------|
| [[quick-reference]] | Fast lookup — commands, tokens, CSS classes, common patterns |
| [[troubleshooting]] | Common issues and fixes — dev errors, test failures, deployment problems |

## Quick start

```bash
# Clone the repo
git clone https://github.com/GlennClaes/portfolio-glenn-claes.git
cd portfolio-glenn-claes/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev

# Open http://localhost:3000
```

## Available commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Next.js dev server on port 3000 |
| `npm run build` | Production build (Next.js) |
| `npm run start` | Start production server |
| `npm run lint` | ESLint — zero warnings allowed |
| `npm run typecheck` | TypeScript strict mode check (`tsc --noEmit`) |
| `npm run test` | Run Vitest unit and component tests |
| `npm run test:e2e` | Run Playwright E2E tests (spins up dev server automatically) |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check Prettier formatting (CI) |

## Project structure

```
portfolio-glenn-claes/
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router (layout, page, global CSS)
│   │   ├── components/          # All React components (14 total)
│   │   ├── data/                # Project data — type-safe, multilingual
│   │   ├── hooks/               # Custom hooks (useReveal)
│   │   ├── i18n/                # Internationalization (EN, NL, DE, FR)
│   │   ├── lib/                 # Helpers (Three.js scene, navigation)
│   │   └── test/                # Vitest setup
│   ├── tests/e2e/              # Playwright E2E specs
│   ├── vitest.config.ts
│   ├── playwright.config.ts
│   ├── tailwind.config.ts
│   └── package.json
├── docs/                        # This folder
└── README.md
```

## How it works — the short version

This is a **one-page portfolio**. Everything loads on a single route (`/`). There's no backend — the contact form opens the user's mail client via `mailto:`. The site supports **four languages** (English, Dutch, German, French) handled entirely on the client side with a React context provider that syncs to `localStorage`.

The hero section has an **interactive 3D scene** built with raw Three.js — floating geometric primitives that react to mouse movement. Scroll-reveal animations are powered by a single `IntersectionObserver` hook.

Deployment goes to **Vercel** (primary) with a **GitHub Pages** fallback. GitHub Actions handles CI: lint, typecheck, unit tests, E2E tests, build, then deploy both targets.

Read the [full architecture doc](./architecture.md) for the deep dive, or check out the [visual diagrams](./architecture-graph.md).

---

*Last updated: August 2026*

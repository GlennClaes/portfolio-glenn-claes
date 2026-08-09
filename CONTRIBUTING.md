# Contributing — Glenn Claes Portfolio

Thanks for considering contributing! This guide covers the developer workflow, code
standards, and how to extend the project.

## Prerequisites

- **Node.js 22+** (see `frontend/package.json` `engines`)
- **Python 3.11+** (only needed for the `python/` tools)
- **Docker** (optional — for container workflows)
- **Git** with Git Bash on Windows

## Quick setup

```bash
# One-command setup (frontend only)
scripts/setup.sh

# Include Python tools
scripts/setup.sh --python
```

## Available scripts

All live in `scripts/` — see [scripts/README.md](scripts/README.md) for the full list.
Key ones:

```bash
scripts/dev.sh          # Start the dev server
scripts/check.sh        # Full quality gate (lint + typecheck + tests + build)
scripts/version.sh patch # Bump version, commit + tag
scripts/health-check.sh # Verify deployments are live
```

## Code standards

- **TypeScript, strict** — the app is 100% TS. `npm run typecheck` must pass.
- **ESLint, zero warnings** — `npm run lint` must pass cleanly.
- **Prettier** — run `npm run format` before committing.
- **Tests** — Vitest unit/component + Playwright E2E. `npm run test` must pass.
- **No `any`** — avoid type escapes; prefer explicit types.

## How to add a project

Project data lives in `frontend/src/data/projects.ts` as a single-source
`projectDefinitions` array. To add a project:

1. Append one entry to `projectDefinitions`.
2. Set a unique `meta.id`, `kind`, `tags`, `stack`, etc.
3. Fill `texts` for **all four** locales: `en`, `nl`, `de`, `fr`.

`getProjects(locale)` picks it up automatically — no other files need changes.
Validate with: `portfolio-tools validate`.

## How to add a language

1. Add the locale code to `LOCALES` in `frontend/src/i18n/messages.ts`.
2. Copy the `en` messages object and translate it.
3. Add it to the `dictionaries` record.
4. Add the language name to `languageNames` in `LanguageSwitcher.tsx`.
5. Add a `texts[<locale>]` entry to every project in `projects.ts`.

## Git workflow

- Work on a feature branch, not `main`.
- Run `scripts/check.sh` before opening a PR.
- Keep commits focused; use clear messages.
- The `release.yml` workflow tags releases automatically on schedule or via
  `workflow_dispatch`.

## Deployment

- **Vercel** is the primary target (auto-deploys on push to `main`).
- **GitHub Pages** is a static fallback (also auto-deploys on `main`).
- All deploys run lint, typecheck, unit tests, and E2E tests first (see `ci-cd.yml`).

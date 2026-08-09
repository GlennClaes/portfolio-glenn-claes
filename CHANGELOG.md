# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- Monitoring & audit scripts: `health-check.sh`, `ssl-check.sh`, `security-headers.sh`,
  `link-check.sh`, `dep-audit.sh`
- Developer experience scripts: `setup.sh`, `clean.sh`, `scripts/README.md`
- Python tools: `health` and `links` workflows (plus CLI registration)
- Daily health-check GitHub Actions workflow (`health-check.yml`) that opens an issue if
  a deployment is down
- `CONTRIBUTING.md` onboarding guide
- This changelog
- Container workflows: production `Dockerfile`, `.dockerignore`, `docker-compose.yml`
  (web / static / python profiles)

### Changed
- **Project data** refactored to a single-source `projectDefinitions` array in
  `frontend/src/data/projects.ts` — adding a project no longer requires casts or
  parallel records, just one array entry with all four locales
- GitHub Pages pipeline hardened with `timeout-minutes` (jobs + deploy step)
- Vercel config: immutable cache headers for hashed assets + expanded security headers
  (`Permissions-Policy`, etc.)
- `release.yml` now syncs both root and frontend `package.json` versions before tagging
- GitHub Actions action versions unified to `@v7`

### Fixed
- Documented the GitHub Pages deploy-timeout fix (settings required for Pages to build
  from Actions with no environment protection rules)
- Removed stale `baseProjects`/`projectTexts` references from docs

## [1.0.0] - 2026-08-09

Initial production-ready release of the Glenn Claes portfolio:
Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS, Three.js hero,
four languages (EN/NL/DE/FR), Vercel + GitHub Pages deployment.

# Scripts

All scripts are POSIX sh and work in Git Bash on Windows.

## Setup & Development

| Script | What it does |
|--------|-------------|
| `setup.sh [--python]` | One-command fresh setup after clone |
| `dev.sh` | Start Next.js dev server on :3000 |
| `check.sh` | Full quality gate: lint + typecheck + tests + build |
| `clean.sh [--deep]` | Remove build artifacts; `--deep` also removes node_modules |
| `lint-all.sh` | Run all linters (frontend + Python ruff) |

## Version Management

| Script | What it does |
|--------|-------------|
| `version.sh [patch\|minor\|major] [--push]` | Bump version in both package.json files, commit + tag |
| `rollback.sh [vX.Y.Z]` | List tags or checkout a previous release |
| `sync-version.sh [--set X.Y.Z]` | Detect or fix version mismatch between root and frontend |

## Monitoring & Auditing

| Script | What it does |
|--------|-------------|
| `health-check.sh [url]` | Check if the site is live (Vercel + Pages) |
| `ssl-check.sh <domain>` | Check SSL certificate expiry |
| `security-headers.sh <url>` | Verify security headers are applied |
| `link-check.sh <url>` | Crawl page and find broken links |
| `dep-audit.sh` | Run npm audit + pip audit for vulnerabilities |

## Docker

| Script | What it does |
|--------|-------------|
| `docker-build.sh` | Build all Docker images (web + python) |
| `docker-up.sh [web\|tools\|static]` | Start docker-compose services |
| `preview-static.sh` | Build + serve the GitHub Pages export locally |

## Usage

All scripts accept `--help` for usage info (where applicable). Run from the repo root
or from any directory — they resolve paths relative to themselves.

```bash
# Quick start after clone
scripts/setup.sh

# Daily health check
scripts/health-check.sh

# Full quality gate before pushing
scripts/check.sh

# Bump and tag a release
scripts/version.sh minor --push
```

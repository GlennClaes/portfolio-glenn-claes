---
tags:
  - automation
  - devops
  - monitoring
type: reference
status: stable
created: 2026-08-09
---

# Automations

> Every automated system in this project: git hooks, GitHub Actions, monitoring,
> notifications, versioning, and developer tooling.

---

## Git Hooks

Tracked in `.githooks/`, enabled via `core.hooksPath`. Set up automatically by
`scripts/setup.sh` or manually with `scripts/setup-hooks.sh`.

| Hook | When it runs | What it does |
|------|-------------|-------------|
| `post-merge` | After `git pull` / `git merge` | Checks if `package.json` or `pyproject.toml` changed → runs `npm ci` / `pip install` automatically |
| `pre-push` | Before `git push` | Runs lint + typecheck as a quick quality gate; blocks push on failure |
| `post-checkout` | After `git checkout` (branch switch) | Same as post-merge: installs deps if package files changed |

**Skip a hook:** `git push --no-verify` (pre-push only).

**Re-enable:** `scripts/setup-hooks.sh` or `git config core.hooksPath .githooks`.

---

## GitHub Actions Workflows

| Workflow | Trigger | What it does |
|----------|---------|-------------|
| `ci-cd.yml` | push/PR to main | Lint → typecheck → unit tests → E2E → build → deploy (Vercel + Pages) |
| `release.yml` | weekly (Fri 18:00 UTC) + manual | Bump version (both package.json files) → commit → tag → changelog → GitHub Release |
| `version-check.yml` | PR to main | Validates semver format + root/frontend version sync |
| `codeql.yml` | push/PR to main + weekly | CodeQL security analysis for JavaScript/TypeScript |
| `dependency-review.yml` | PR to main | Checks new dependencies for known vulnerabilities |
| `health-check.yml` | daily (06:23 UTC) + manual | Checks Vercel + Pages are live; creates issue + ntfy push if down |
| `auto-merge.yml` | dependabot PR | Auto-approves + auto-merges patch/minor dependabot updates after CI passes |
| `labeler.yml` | PR opened/updated | Auto-labels PRs by changed file paths (frontend, python, scripts, ci, docs, docker) |
| `stale.yml` | daily (03:37 UTC) | Marks issues/PRs stale after60 days; closes after30 more days |

---

## Monitoring & Auditing

Run from the repo root via `scripts/`:

| Script | What it checks |
|--------|---------------|
| `health-check.sh [url]` | HTTP status + title tag on Vercel + GitHub Pages (follows redirects) |
| `ssl-check.sh <domain>` | SSL certificate issuer, expiry date, days remaining |
| `security-headers.sh <url>` | Security headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy |
| `link-check.sh <url>` | Crawls the page and reports broken links (4xx/5xx) |
| `dep-audit.sh` | `npm audit` (frontend) + `pip audit` (python) + `npm outdated` |

---

## Phone Notifications (ntfy.sh)

When the site goes down, the `health-check.yml` workflow sends a push notification
to your phone via [ntfy.sh](https://ntfy.sh) — a free, no-account push notification
service.

### Setup

1. **Install the ntfy app** on your phone ([iOS](https://apps.apple.com/app/ntfy/id1625396347) / [Android](https://play.google.com/store/apps/details?id=io.heckel.ntfy)).
2. **Subscribe to a topic** — open the app, tap "+", enter a topic name (e.g. `portfolio-alerts`).
3. **Add the topic to GitHub** — go to repo **Settings → Secrets and variables → Actions → New repository secret**:
   - Name: `NTFY_TOPIC`
   - Value: your topic name (e.g. `portfolio-alerts`)
4. That's it. The next time the health check fails, you'll get a push notification on your phone.

### Manual notifications

```bash
scripts/notify.sh "Deploy" "New version deployed to Vercel"
scripts/notify.sh "Alert" "Something needs attention"
```

Requires `curl` (available everywhere). Set `NTFY_TOPIC` to use a custom topic.

---

## Versioning

| Script / Workflow | What it does |
|-------------------|-------------|
| `version.sh [patch\|minor\|major] [--push]` | Bumps version in root + frontend package.json, commits, tags |
| `rollback.sh [vX.Y.Z]` | Lists tags or checks out a previous release on a new branch |
| `sync-version.sh [--set X.Y.Z]` | Detects or fixes version mismatch between root and frontend |
| `release.yml` | Automated weekly: bump → commit → tag → changelog → GitHub Release |
| `version-check.yml` | CI guard: validates semver + sync on every PR |

---

## Auto-pull Watcher

`scripts/watch-deploy.sh [interval]` polls `origin/main` and pulls when new commits
are detected. Useful to keep a local dev server in sync after deploys.

```bash
# Run in background
scripts/watch-deploy.sh &

# Custom interval (default: 60s)
scripts/watch-deploy.sh 30
```

---

## Docker

| Command | What it does |
|---------|-------------|
| `docker compose up --build web` | Production Next.js server on :3000 |
| `docker compose --profile static up --build static` | GitHub Pages preview on :8080 |
| `docker compose --profile tools run python <cmd>` | Python CLI tools |
| `scripts/docker-build.sh` | Build all images (web + python) |
| `scripts/docker-up.sh [web\|tools\|static]` | Start a specific service |

---

## Python Tools

```bash
portfolio-tools changelog <from> <to>     # Git log → formatted changelog
portfolio-tools validate [--data-file]    # Validate projects.ts structure
portfolio-tools seo-audit <url>           # Check SEO tags
portfolio-tools health <url>              # HTTP status, response time, title
portfolio-tools links <url>               # Crawl and find broken links
```

Extend by adding modules in `python/src/portfolio_tools/workflows/`.

---

*Last updated: August 2026*

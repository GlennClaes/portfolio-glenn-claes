# Glenn Claes - Developer Portfolio

Next.js App Router portfolio for Glenn Claes, built with TypeScript, Tailwind CSS, component tests, Playwright smoke checks, Vercel deployment and a GitHub Pages fallback.

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
```

Playwright includes smoke coverage for desktop, tablet and mobile breakpoints plus an axe accessibility check.

## Build

For Vercel and normal Next.js hosting:

```bash
npm run build
npm run start
```

For GitHub Pages static export:

```bash
npm run build:pages
npm run start:static
```

## Deploy To Vercel

Recommended setup:

1. Import this GitHub repository in Vercel.
2. Set the Vercel project **Root Directory** to `frontend`.
3. Use Framework Preset `Next.js`.
4. Keep Build Command as `npm run build`.
5. Add `NEXT_PUBLIC_SITE_URL` in Vercel Project Settings, for example:

```text
NEXT_PUBLIC_SITE_URL=https://portfolio-glenn-claes.vercel.app
```

Use your real Vercel or custom domain for that value.

If you saw `404: NOT_FOUND`, check these first:

- Use the Vercel root URL, for example `https://portfolio-glenn-claes.vercel.app/`.
- Do not use the GitHub Pages path on Vercel. `/portfolio-glenn-claes/` is for GitHub Pages.
- Confirm the Vercel project root directory is `frontend`.
- Redeploy the latest `main` branch.
- Confirm your custom domain points to this Vercel project.

The project also includes `frontend/vercel.json`, which redirects `/portfolio-glenn-claes/...` back to the Vercel root to avoid that common path-based 404.

## Deploy With GitHub Actions To Vercel

The workflow can deploy to Vercel after merges to `main` when these repository secrets exist:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

Optional repository variable:

```text
NEXT_PUBLIC_SITE_URL=https://your-vercel-or-custom-domain
```

If the Vercel secrets are missing, the workflow skips the Vercel deploy instead of failing.

## Deploy To GitHub Pages

The same workflow also publishes a static export to GitHub Pages after merges to `main`:

```text
https://glennclaes.github.io/portfolio-glenn-claes/
```

Enable GitHub Pages for the repository and set the source to GitHub Actions.

The Pages deploy uses:

```text
GITHUB_PAGES=true
NEXT_PUBLIC_BASE_PATH=/portfolio-glenn-claes
NEXT_PUBLIC_SITE_URL=https://glennclaes.github.io/portfolio-glenn-claes
```

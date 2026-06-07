# Ben Baeyens — Freelance Unity Developer

Pixel-focused Next.js remake of [benbaeyens.com](https://www.benbaeyens.com/) built with the App Router, TypeScript and Tailwind CSS.

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

Playwright includes smoke coverage for desktop/tablet/mobile breakpoints and an axe accessibility check.

## Build

```bash
npm run build
npm run start
```

## Deploy

The GitHub Actions workflow runs install, lint, typecheck, unit/component tests, build and Playwright E2E checks.

Production deploys are configured for Vercel after merges to `main`. Add these repository secrets:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

## Environment Variables

No runtime environment variables are required for the site itself. The deploy workflow only needs the Vercel secrets listed above.

# Glenn Claes Portfolio Frontend

Next.js App Router frontend for the Glenn Claes portfolio.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
npm run start
npm run build:pages
npm run start:static
```

`npm run build` creates the normal Next.js build for Vercel. `npm run build:pages` creates the GitHub Pages static export in `out`.

For Vercel, set the project root directory to `frontend`. Deployment is handled either by Vercel's Git integration or by the optional Vercel job in `.github/workflows/CI.yml`.

GitHub Pages is handled by `.github/workflows/CI.yml` and publishes after merges to `main`.

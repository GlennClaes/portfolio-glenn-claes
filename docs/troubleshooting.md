---
tags:
  - troubleshooting
  - debugging
type: guide
status: stable
created: 2026-08-04
---

# Troubleshooting — Glenn Claes Portfolio

> Common issues and how to fix them. Start here when something breaks.

---

## Development Issues

### "Cannot find module '@/...'"

**Cause:** Path alias not resolved.

**Fix:**
1. Check `tsconfig.json` has `"paths": { "@/*": ["./src/*"] }`
2. Check `vitest.config.ts` has matching alias
3. Restart TypeScript server in IDE

**Related:** [[config-files#tsconfig.json]]

---

### "window is not defined" in Component

**Cause:** Code that uses `window` runs during SSR.

**Fix:**
```tsx
useEffect(() => {
  // Code that uses window
}, []);

// Or check before use
if (typeof window !== 'undefined') {
  window.scrollTo(...);
}
```

**Related:** [[architecture#i18n]] (see `useSyncExternalStore` pattern)

---

### Hydration Mismatch

**Cause:** Server and client render different content.

**Common causes:**
1. Using `Date.now()` or `Math.random()` in render
2. Reading `localStorage` during initial render
3. Conditional rendering based on browser-only values

**Fix:** Use `useSyncExternalStore` for client-only values, or move to `useEffect`.

**Related:** [[components#LanguageProvider.tsx]]

---

### Three.js Canvas Blank

**Cause:** WebGL context failed or scene not initialized.

**Debug steps:**
1. Check console for WebGL errors
2. Verify `initHeroScene` returns non-null
3. Check canvas dimensions (width/height > 0)
4. Verify `preserveDrawingBuffer: true` for pixel reads

**Related:** [[architecture#Three.js Hero Scene]]

---

### Scroll Reveal Not Triggering

**Cause:** Observer threshold or root margin misconfigured.

**Check:**
1. Elements have `.reveal` class
2. Elements are in DOM when observer created
3. `IntersectionObserver` is supported (check polyfill)
4. Element actually enters viewport (not hidden by CSS)

**Fix:** Add debug logging:
```tsx
entries.forEach((entry) => {
  console.log(entry.target, entry.isIntersecting);
});
```

**Related:** [[components#useReveal.ts]]

---

## Styling Issues

### Tailwind Classes Not Applying

**Cause:** Class not in content paths or using dynamic values.

**Fix:**
1. Check `tailwind.config.ts` content paths include your file
2. Avoid dynamic class construction: `text-${color}-500` doesn't work
3. Use full class names: `text-blue-500`

**Related:** [[config-files#tailwind.config.ts]]

---

### CSS Custom Property Not Working

**Cause:** Variable not defined or typo.

**Check:**
1. Variable defined in `:root` block in `globals.css`
2. Correct syntax: `var(--accent)` not `--accent`
3. No spaces around `:` in definition: `--accent: #1D4ED8;`

**Related:** [[css-design-system#Design Tokens]]

---

### Font Not Loading

**Cause:** Font not in `next/font` setup or wrong variable name.

**Fix:**
1. Check `layout.tsx` imports the font
2. Check font variable matches CSS variable: `--font-manrope`
3. Check `font-family: var(--font-sans)` in CSS

**Related:** [[architecture#Styling]]

---

## Testing Issues

### Vitest: "Cannot find module '@/...'"

**Cause:** Path alias not configured in `vitest.config.ts`.

**Fix:**
```ts
resolve: {
  alias: { '@': new URL('./src', import.meta.url).pathname }
}
```

**Related:** [[config-files#vitest.config.ts]]

---

### Vitest: "window.scrollTo is not a function"

**Cause:** jsdom doesn't implement `scrollTo`.

**Fix:** Mock in `src/test/setup.ts`:
```ts
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});
```

**Related:** [[config-files#src/test/setup.ts]]

---

### Playwright: Timeout Waiting for Selector

**Cause:** Element not visible or page not loaded.

**Fix:**
1. Increase timeout: `await page.goto('/', { timeout: 30000 })`
2. Wait for specific state: `await expect(page.locator('.hero')).toBeVisible()`
3. Check dev server is running

**Related:** [[testing#E2E Tests (Playwright)]]

---

### Playwright: Canvas WebGL Test Failing

**Cause:** Headless browser or GPU acceleration disabled.

**Fix:**
1. Use headed mode for debugging: `npx playwright test --headed`
2. Check `preserveDrawingBuffer: true` in WebGL context
3. Add explicit wait before pixel read

**Related:** [[testing#E2E Tests (Playwright)]]

---

## Build Issues

### "Type 'X' is not assignable to type 'Y'"

**Cause:** Type mismatch after code change.

**Fix:**
1. Run `npm run typecheck` to see all errors
2. Check recent changes to shared types
3. May need to regenerate types if using generated code

**Related:** [[config-files#tsconfig.json]]

---

### ESLint Failing with Warnings

**Cause:** New warnings introduced (max-warnings=0).

**Fix:**
1. Run `npm run lint` to see all warnings
2. Fix or disable specific rules in `eslint.config.mjs`
3. Don't use `// eslint-disable-next-line` without good reason

**Related:** [[config-files#eslint.config.mjs]]

---

### Static Export Missing Pages

**Cause:** Dynamic routes not supported in static export.

**Fix:** This project has no dynamic routes, but if added:
1. Use `generateStaticParams` for dynamic segments
2. Or switch to SSR deployment (Vercel)

**Related:** [[architecture#Deployment]]

---

## Deployment Issues

### Vercel Build Failing

**Cause:** Missing env vars or failing quality gate.

**Debug steps:**
1. Check build logs for specific error
2. Verify all required env vars are set
3. Check if tests passed in CI

**Related:** [[architecture#Deployment]]

---

### GitHub Pages 404

**Cause:** Base path not configured.

**Fix:**
1. Check `NEXT_PUBLIC_BASE_PATH` env var
2. Check `scripts/build-pages.mjs` sets correct base path
3. Verify all links use relative paths or `next/link`

**Related:** [[architecture#Deployment]]

---

## i18n Issues

### Language Not Persisting

**Cause:** localStorage blocked or key mismatch.

**Check:**
1. localStorage enabled in browser
2. Key is `glenn-locale`
3. Value is valid locale: `en`, `nl`, `de`, or `fr`

**Related:** [[components#LanguageProvider.tsx]]

---

### Translation Missing

**Cause:** Key not in messages object.

**Fix:**
1. Check `messages.ts` for the key
2. Add to all language objects
3. Regenerate types if using type-safe messages

**Related:** [[components#messages.ts]]

---

## Quick Diagnostic Commands

```bash
# Check types
npm run typecheck

# Check linting
npm run lint

# Run unit tests
npm run test

# Run E2E tests (headed)
npm run test:e2e -- --headed

# Build for production
npm run build

# Check formatting
npm run format:check
```

---

*Last updated: August 2026*

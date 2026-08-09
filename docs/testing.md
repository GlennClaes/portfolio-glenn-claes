---
tags:
  - testing
  - quality
type: reference
status: stable
created: 2026-08-04
---

# Testing Strategy

> How the test suite is organized, what each layer covers, and how to add new tests.

**Related:** [[architecture#Testing Strategy]] | [[config-files]] | [[components#Test Files]] | [[app/api-reference/adapters/use-cases#10. Quality Gates in CI]]

---

## Three Layers

The project has three layers of testing, each catching different things:

| Layer | Tool | Speed | What it catches |
|-------|------|-------|----------------|
| Unit / Component | Vitest + jsdom | ~2s | Logic bugs, DOM output, event handling |
| E2E | Playwright (Chromium) | ~30s | Real browser behavior, WebGL rendering, keyboard nav |
| Accessibility | axe-core (via Playwright) | ~15s | WCAG violations at multiple breakpoints |

Plus static analysis (not "tests" per se, but runs in the same CI pipeline):
- **ESLint** — code quality, React hooks rules, Next.js rules, a11y rules
- **TypeScript** — type errors, strict mode violations
- **Prettier** — formatting consistency

---

## Unit & Component Tests (Vitest)

### Setup

- **Config:** `vitest.config.ts`
- **Environment:** jsdom (simulates a browser DOM)
- **Setup file:** `src/test/setup.ts`
- **Globals:** enabled — `describe`, `it`, `expect` available without importing
- **CSS:** processed (not ignored) so class names resolve
- **Path alias:** `@/` → `src/` (mirrors tsconfig)

### Setup File (`src/test/setup.ts`)

Does two things:
1. Imports `@testing-library/jest-dom/vitest` — adds custom matchers like `toBeInTheDocument()`, `toHaveAttribute()`, `toHaveValue()`
2. Mocks `window.scrollTo` — jsdom doesn't implement it, but components call it for smooth scroll navigation

### Existing Tests

**`Contact.test.tsx`** — 2 tests:

1. **Validation messages** — renders Contact, clicks "Send message" with empty fields, asserts:
   - Three error messages appear ("Please enter your name", etc.)
   - Name input gets `aria-invalid="true"` attribute
   - Tests the accessible error flow, not just visual output

2. **Event prefill** — renders Contact, dispatches `CustomEvent('open-contact')` with type and message, asserts:
   - Project type dropdown shows "Automation"
   - Message textarea contains the pre-filled text
   - Tests the cross-component communication pattern

**`Projects.test.tsx`** — 1 test:

1. **Renders and opens** — renders Projects inside LanguageProvider, asserts:
   - Both project titles are visible ("Glenn Claes Portfolio", "Quality-First Delivery System")
   - Clicking the first project card calls `onOpen` with the correct project data
   - Uses `getProjects('en')` to verify the exact data shape

### How to Run

```bash
npm run test          # Run all tests once
npm run test:unit     # Same thing (alias)
```

### How to Add a New Test

Create a file next to the component: `src/components/YourComponent.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { YourComponent } from '@/components/YourComponent';
import { LanguageProvider } from '@/i18n/LanguageProvider';

// Most components need the LanguageProvider because they call useLanguage()
const renderComponent = () =>
  render(
    <LanguageProvider>
      <YourComponent />
    </LanguageProvider>,
  );

describe('YourComponent', () => {
  it('renders something', () => {
    renderComponent();
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });
});
```

**Key pattern:** Wrap components that use `useLanguage()` in `<LanguageProvider>`. Without it, the context hook throws.

---

## E2E Tests (Playwright)

### Setup

- **Config:** `playwright.config.ts`
- **Browser:** Chromium only (Desktop Chrome device profile)
- **Base URL:** `http://127.0.0.1:3000`
- **Web server:** Auto-started via `npm run dev -- --hostname 127.0.0.1 --port 3000`
- **Server timeout:** 120 seconds
- **Retries:** 2 in CI, 0 locally
- **Workers:** 1 in CI (single-threaded), unlimited locally

### Existing Tests (`tests/e2e/smoke.spec.ts`)

**Test 1: "renders the one-page portfolio and interactive states"**

This is the main smoke test. It:
1. Navigates to `/`
2. Checks the page title contains "Glenn Claes"
3. Checks the h1 heading is visible ("Hi, I'm Glenn")
4. Checks the "Contact me" link is visible
5. **WebGL pixel check** — waits 750ms for the Three.js scene to render, then reads pixels from the canvas at 5 sample points. If any pixel has non-zero RGBA values, the scene is rendering.
6. Opens a project modal by clicking the first project card
7. Verifies the modal (`role="dialog"`) is visible
8. Closes it with the Escape key
9. Verifies the modal is hidden
10. Clicks "Send message" on the empty contact form
11. Verifies validation error appears

The WebGL check is notable — it doesn't just check if the canvas element exists, it actually reads pixels to confirm Three.js rendered something. This uses `preserveDrawingBuffer: true` on the renderer (set in `hero-scene.ts`).

**Test 2: "has no serious accessibility violations at core breakpoints"**

Runs axe-core accessibility checks at three viewport sizes:
- **Desktop:** 1440 × 1100
- **Tablet:** 834 × 1112 (iPad)
- **Mobile:** 390 × 844 (iPhone 14)

For each viewport:
1. Sets the viewport size
2. Navigates to `/`
3. Waits 1400ms (for animations to complete)
4. Runs axe with tags: `wcag2a`, `wcag2aa`, `best-practice`
5. Filters violations to only `critical` and `serious` impact levels
6. Asserts the list is empty

The test has a 90-second timeout because it runs three full page loads with accessibility scans.

### How to Run

```bash
npm run test:e2e      # Starts dev server + runs Playwright
```

The dev server is started automatically by Playwright. If it's already running locally, Playwright reuses it (`reuseExistingServer: !process.env.CI`).

### How to Add a New E2E Test

Add a test to `tests/e2e/smoke.spec.ts` or create a new `.spec.ts` file in the same directory:

```typescript
import { expect, test } from '@playwright/test';

test('your test name', async ({ page }) => {
  await page.goto('/');
  
  // Interact with the page
  await page.getByRole('button', { name: /some button/i }).click();
  
  // Assert
  await expect(page.getByText('expected text')).toBeVisible();
});
```

---

## Accessibility Testing

axe-core is integrated directly into the Playwright tests, not as a separate step. It checks against WCAG 2.0 Level A, Level AA, and best practices.

The three breakpoints (desktop, tablet, mobile) ensure accessibility holds across responsive layouts — a common place where things break (hidden elements still in tab order, insufficient contrast at smaller sizes, etc.).

Only `critical` and `serious` violations fail the test. `moderate` and `minor` issues are reported but don't block CI.

---

## CI Pipeline Order

```
ESLint → TypeScript → Vitest → Playwright → Build → Deploy
```

Each step gates the next. If ESLint fails, TypeScript doesn't run. If Vitest fails, Playwright doesn't run. This fast-fail approach means you get feedback on the cheapest checks first.

---

## Coverage

Currently the test suite covers:

| Area | Covered | Notes |
|------|---------|-------|
| Contact form validation | ✅ | Unit test + E2E |
| Contact form prefill (CustomEvent) | ✅ | Unit test |
| Project rendering | ✅ | Unit test |
| Project modal open/close | ✅ | E2E |
| Keyboard navigation (Escape) | ✅ | E2E |
| Three.js canvas rendering | ✅ | E2E (pixel check) |
| Accessibility (3 breakpoints) | ✅ | E2E (axe-core) |
| Language switching | ❌ | Not tested yet |
| Scroll reveal animations | ❌ | Not tested yet |
| Nav scroll state | ❌ | Not tested yet |
| Mobile hamburger menu (open/close, link choose) | ✅ | Unit test (`Nav.test.tsx`) |
| TechStrip rendering | ❌ | Not tested yet |
| About/Services/Process content | ❌ | Not tested yet |
| Footer links | ❌ | Not tested yet |

The priority was testing the interactive parts (modal, form, canvas) and accessibility. Content rendering is lower risk since it's just reading from the messages object.

---

## Operational Health & Monitoring

Beyond the test suite, the project ships live-check tooling to verify deployments and
dependencies stay healthy in production.

| Tool | What it checks | Run with |
|------|----------------|----------|
| `scripts/health-check.sh` | Vercel + Pages return 200 with a `<title>` | `scripts/health-check.sh` |
| `scripts/ssl-check.sh` | SSL cert expiry (warns < 30 days) | `scripts/ssl-check.sh <domain>` |
| `scripts/security-headers.sh` | Security headers actually applied | `scripts/security-headers.sh <url>` |
| `scripts/link-check.sh` | Broken links on the site | `scripts/link-check.sh <url>` |
| `scripts/dep-audit.sh` | npm audit + pip audit vulnerabilities | `scripts/dep-audit.sh` |
| `portfolio-tools health` | HTTP status, response time, title (Python) | `cd python && portfolio-tools health <url>` |
| `portfolio-tools links` | Crawl + broken link detection (Python) | `cd python && portfolio-tools links <url>` |
| `.github/workflows/health-check.yml` | Daily scheduled check; opens an issue if a deployment is down | Auto — daily 06:23 UTC + manual dispatch |

**Related:** [[architecture#Python Tools]] | [[scripts/README.md]]

---

*Last updated: August 2026*

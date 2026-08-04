# Configuration Files

> Every config file in the project, what it does, and why it's set up that way.

**Related:** [[architecture]] | [[testing]] | [[css-design-system]]

---

## tsconfig.json

TypeScript configuration. Key settings:

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",           // Modern JS output
    "strict": true,               // All strict checks enabled — no way to turn them off
    "noEmit": true,               // TypeScript only checks, doesn't emit files (Next.js handles bundling)
    "module": "esnext",           // ES module syntax
    "moduleResolution": "bundler", // Matches Next.js bundler resolution
    "jsx": "react-jsx",          // Automatic JSX transform (no import React needed)
    "isolatedModules": true,      // Required for Vite/esbuild compatibility
    "incremental": true,          // Faster re-checks on large codebases
    "esModuleInterop": true,      // CommonJS interop
    "resolveJsonModule": true,    // Allow importing .json files
    "paths": { "@/*": ["./src/*"] } // Path alias — @/ maps to src/
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "dist", "build"]
}
```

The `@/*` path alias means `import { Hero } from '@/components/Hero'` resolves to `src/components/Hero`. This is used everywhere instead of relative paths.

`noEmit: true` means TypeScript is purely for type checking. The actual compilation is done by Next.js (which uses SWC under the hood).

---

## eslint.config.mjs

ESLint 9 flat config format. This replaced the old `.eslintrc` pattern.

**Plugins used:**
- `@eslint/js` — ESLint recommended rules
- `typescript-eslint` — TypeScript-specific rules
- `@next/eslint-plugin-next` — Next.js rules (recommended + core-web-vitals)
- `eslint-plugin-jsx-a11y` — Accessibility rules for JSX
- `eslint-plugin-react-hooks` — Rules for hooks (exhaustive deps, etc.)

**Ignored paths:** `.next/`, `coverage/`, `dist/`, `build/`, `node_modules/`, `out/`, `playwright-report/`, `test-results/`, and some legacy Vue files.

**Disabled rules:**
- `@next/next/no-html-link-for-pages: off` — allows `<a>` tags in pages (needed for some navigation patterns)
- `jsx-a11y/no-autofocus: off` — autofocus is used intentionally in the modal close button

The config applies different settings per file type:
- `.js/.mjs/.cjs` files: Node.js globals
- `.ts/.tsx` files: Browser + Node globals, JSX enabled, all three plugin rule sets active

---

## tailwind.config.ts

Extends Tailwind with the project's design tokens:

```typescript
theme: {
  extend: {
    colors: {
      canvas: 'var(--bg)',      // bg-canvas utility
      ink: 'var(--ink)',        // text-ink utility
      accent: 'var(--accent)',  // bg-accent, text-accent utilities
    },
    fontFamily: {
      sans: ['var(--font-sans)'],    // font-sans utility
      serif: ['var(--font-serif)'],  // font-serif utility
      mono: ['var(--font-mono)'],    // font-mono utility
    },
    borderRadius: {
      sm: 'var(--r-sm)',
      md: 'var(--r-md)',
      lg: 'var(--r-lg)',
      xl: 'var(--r-xl)',
    },
  },
},
content: ['./src/**/*.{ts,tsx}', './tests/**/*.{ts,tsx}'],
```

This means you can write `bg-canvas`, `text-accent`, `font-serif`, `rounded-xl` in JSX and they map to the CSS custom properties defined in `globals.css`.

Note: Most of the styling is done in `globals.css` with plain CSS classes. Tailwind utilities are available but used sparingly — the project leans toward semantic class names.

---

## postcss.config.mjs

```javascript
const config = {
  plugins: {
    tailwindcss: {},    // Processes @tailwind directives
    autoprefixer: {},   // Adds vendor prefixes for browser compat
  },
};
```

Minimal PostCSS setup. `postcss-import` and `postcss-nested` are listed in `package.json` dependencies but aren't in this config — they may have been used earlier or are available for manual use.

---

## vitest.config.ts

```typescript
export default defineConfig({
  plugins: [react()],            // React JSX transform for tests
  test: {
    environment: 'jsdom',        // Browser-like environment (DOM, window, document)
    globals: true,               // describe/it/expect available without import
    setupFiles: ['./src/test/setup.ts'],  // Runs before every test file
    css: true,                   // Process CSS imports (don't ignore them)
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },  // Match tsconfig paths
  },
});
```

The `@` alias mirrors the tsconfig path alias so imports like `@/components/Hero` work in tests too.

---

## src/test/setup.ts

```typescript
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});
```

Two things:
1. Imports jest-dom matchers for Vitest (adds `toBeInTheDocument()`, `toHaveAttribute()`, etc.)
2. Mocks `window.scrollTo` — jsdom doesn't implement it, and several components call it (navigation, contact prefill)

---

## playwright.config.ts

```typescript
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,                    // Run tests in parallel
  forbidOnly: !!process.env.CI,          // Fail if .only is left in CI
  retries: process.env.CI ? 2 : 0,       // Retry failed tests in CI
  workers: process.env.CI ? 1 : undefined, // Single worker in CI (resource constrained)
  reporter: process.env.CI ? [['html'], ['github']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',             // Record trace only on first retry
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },  // Chrome only
  ],
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,  // 2 minutes to start
  },
});
```

Key decisions:
- **Chromium only** — no Firefox/Safari testing. Keeps CI fast.
- **Web server auto-started** — Playwright starts the Next.js dev server before tests and waits for it to be ready.
- **120s timeout** for server start — Next.js can be slow on first build.
- **Single worker in CI** — prevents resource contention on GitHub Actions runners.
- **`forbidOnly`** — catches accidental `.only()` in PRs.

---

## .prettierrc.json

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100
}
```

Three rules: semicolons on, single quotes, 100-char line width. That's it.

---

## .prettierignore

Mirrors the ESLint ignores: `.next/`, `coverage/`, `dist/`, `build/`, `node_modules/`, `out/`, `playwright-report/`, `test-results/`, and legacy Vue files.

---

## .editorconfig

```ini
[*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue,css,scss,sass,less,styl}]
charset = utf-8
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
end_of_line = lf
max_line_length = 100
```

Ensures consistent formatting across editors (VS Code, WebStorm, etc.). 2-space indent, UTF-8, LF line endings, trailing whitespace trimmed.

---

## .vscode/settings.json

```json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json, env.d.ts",
    "vite.config.*": "jsconfig*, vitest.config.*, ...",
    "package.json": "package-lock.json, .eslint*, .prettier*, ..."
  },
  "editor.codeActionsOnSave": { "source.fixAll": "explicit" },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

File nesting groups related config files together in the explorer. Auto-format on save with Prettier.

---

## .vscode/extensions.json

Recommends these extensions for contributors:
- `Vue.volar` — Vue support (legacy, from earlier project iteration)
- `vitest.explorer` — Vitest test explorer
- `ms-playwright.playwright` — Playwright test support
- `dbaeumer.vscode-eslint` — ESLint integration
- `EditorConfig.EditorConfig` — EditorConfig support
- `oxc.oxc-vscode` — OXC linter (fast Rust-based alternative)
- `esbenp.prettier-vscode` — Prettier formatting

---

## .gitignore

Standard Next.js ignores: `node_modules/`, `dist/`, `build/`, `.env*`, logs, IDE files (`.vscode/`, `.idea/`), OS files (`.DS_Store`, `Thumbs.db`), test coverage, and cache folders.

Note: `.vscode/` is in `.gitignore` but the settings and extensions files are tracked — this is likely because they were added with `git add -f` to share project settings.

---

## package.json Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start dev server (port 3000) |
| `build` | `next build` | Production build |
| `build:pages` | `node scripts/build-pages.mjs` | Static export for GitHub Pages |
| `start` | `next start` | Start production server |
| `start:static` | `node scripts/serve-static.mjs out` | Serve static export locally |
| `lint` | `eslint . --max-warnings=0` | Lint with zero tolerance |
| `typecheck` | `tsc --noEmit` | Type check only |
| `test` | `vitest run` | Run all Vitest tests once |
| `test:unit` | `vitest run` | Alias for test |
| `test:e2e` | `playwright test` | Run Playwright E2E tests |
| `format` | `prettier --write .` | Format all files |
| `format:check` | `prettier --check .` | Check formatting (CI) |

---

*Last updated: August 2026*

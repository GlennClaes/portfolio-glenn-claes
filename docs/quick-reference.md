---
tags:
  - reference
  - cheatsheet
type: reference
status: stable
created: 2026-08-04
---

# Quick Reference — Glenn Claes Portfolio

> Fast lookup for common tasks. Copy-paste ready.

---

## Development Commands

```bash
# Start dev server
npm run dev

# Type check
npm run typecheck

# Lint
npm run lint

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Format code
npm run format

# Production build
npm run build
```

---

## Project Structure

```
frontend/src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home route
│   └── globals.css      # Design system
├── components/          # React components
├── data/                # Project data
├── hooks/               # Custom hooks
├── i18n/                # Translations
├── lib/                 # Utilities
└── test/                # Test setup
```

---

## Design Tokens

### Colors

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#F8FAFC` | Page background |
| `--bg-elevated` | `#FFFFFF` | Cards, modals |
| `--ink` | `#0F172A` | Primary text |
| `--accent` | `#1D4ED8` | Brand blue |
| `--border` | `#E2E8F0` | Default borders |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--r-sm` | `10px` | Badges, inputs |
| `--r-md` | `14px` | Cards, modals |
| `--r-lg` | `20px` | Project cards |
| `--r-xl` | `28px` | Hero canvas |

### Fonts

| Token | Font | Use |
|-------|------|-----|
| `--font-sans` | Outfit | Body / UI text |
| `--font-serif` | Instrument Serif | Name & logo accent (italic) |
| `--font-mono` | JetBrains Mono | Code |

---

## Component Quick Reference

### Access Language

```tsx
const { locale, messages, setLocale } = useLanguage();
```

### Get Projects

```tsx
const projects = getProjects(locale);
```

### Scroll to Section

```tsx
jumpTo('contact')(event);
```

### Open Contact with Prefill

```tsx
openContact({ type: 'Automation', message: 'Hello' })();
```

---

## CSS Classes

### Layout

| Class | Use |
|-------|-----|
| `.container` | Max-width 1180px, centered |
| `.section` | 110px vertical padding |
| `.band` | Gray background + borders |

### Typography

| Class | Use |
|-------|-----|
| `.h-display` | Hero heading (76px → 40px) |
| `.h-section` | Section heading (50px → 32px) |
| `.h-card` | Card title (22px) |
| `.eyebrow` | Section label (12.5px, uppercase) |
| `.lead` | Body text (19px → 17px) |

### Buttons

| Class | Style |
|-------|-------|
| `.btn-primary` | Blue background, white text |
| `.btn-secondary` | White background, border |
| `.btn-ghost` | Transparent |
| `.btn-sm` | 38px height (default 48px) |

### Animations

| Class | Effect |
|-------|--------|
| `.reveal` | Hidden, translateY(18px) |
| `.reveal.in` | Visible, translateY(0) |
| `data-delay="1"` | 0.08s delay |
| `data-delay="2"` | 0.16s delay |

---

## i18n

### Supported Locales

- `en` — English (default)
- `nl` — Dutch
- `de` — German
- `fr` — French

### Add New Language

1. Add to `LOCALES` in `messages.ts`
2. Add translations to `dictionaries`
3. Add to `languageNames` in `LanguageSwitcher.tsx`
4. Add a `texts[<locale>]` entry to every project in `projects.ts`

---

## Testing

### Run Specific Test File

```bash
npm run test -- Contact.test.tsx
```

### Run Specific E2E Test

```bash
npm run test:e2e -- -g "renders the one-page"
```

### Debug E2E Tests

```bash
npm run test:e2e -- --headed --debug
```

---

## Three.js Scene

### Scene Variants

- `primitives` — 8 floating shapes (default)
- `cube` — Single rotating cube

### Performance Settings

- `devicePixelRatio` capped at 2
- `powerPreference: 'high-performance'`
- `preserveDrawingBuffer: true`

---

## Accessibility

### Modal Pattern

```tsx
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">...</h2>
  <button aria-label="Close">×</button>
</div>
```

### Form Error Pattern

```tsx
<input aria-invalid={hasError} aria-describedby="error-id" />
{hasError && <span id="error-id">Error message</span>}
```

---

## Git Workflow

### Create Feature Branch

```bash
git checkout -b feature/my-feature
```

### Commit with Conventional Commits

```bash
git commit -m "feat: add new component"
git commit -m "fix: correct button styling"
git commit -m "docs: update README"
```

### Push and Create PR

```bash
git push -u origin feature/my-feature
gh pr create --title "feat: add new component" --body "Description..."
```

---

## Environment Variables

| Variable | Use | Default |
|----------|-----|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | `http://127.0.0.1:3000` |
| `NEXT_PUBLIC_BASE_PATH` | Subpath deployment | `/portfolio-glenn-claes` |

---

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase.tsx | `CaseStudyModal.tsx` |
| Hooks | use + camelCase.ts | `useReveal.ts` |
| Utilities | camelCase.ts | `navigation.ts` |
| Data | lowercase.ts | `projects.ts` |
| Tests | *.test.tsx | `Contact.test.tsx` |

---

## Common Patterns

### Language-Aware Component

```tsx
export function MyComponent() {
  const { messages } = useLanguage();
  return <h2>{messages.mySection.title}</h2>;
}
```

### Event Listener with Cleanup

```tsx
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('event', handler);
  return () => window.removeEventListener('event', handler);
}, []);
```

### Scroll Lock

```tsx
useEffect(() => {
  document.body.style.overflow = 'hidden';
  return () => { document.body.style.overflow = ''; };
}, []);
```

---

## Version Management

```bash
# Bump version (patch/minor/major), commit + tag
scripts/version.sh patch
scripts/version.sh minor --push   # bump + push

# Rollback to a previous release
scripts/rollback.sh               # list available tags
scripts/rollback.sh v1.0.0        # checkout that tag

# Sync root ↔ frontend versions
scripts/sync-version.sh           # detect + prompt
scripts/sync-version.sh --set 2.0.0  # set both
```

Both `package.json` files (root + frontend) are kept in sync. The `release.yml`
workflow also syncs them on automated releases.

---

## Python Tools

```bash
# Local
cd python && pip install -e ".[dev]"
portfolio-tools changelog v1.0.0 HEAD
portfolio-tools validate
portfolio-tools seo-audit http://localhost:3000

# Docker
docker compose --profile tools run python validate
```

---

*Last updated: August 2026*

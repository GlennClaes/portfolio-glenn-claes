# Use Cases — Glenn Claes Portfolio

> Real-world scenarios this portfolio demonstrates. Use this to quickly understand what problems the codebase solves.

---

## Overview

This document maps out concrete use cases that the portfolio architecture addresses. Each use case links to the relevant components, files, and patterns.

---

## 1. Multi-Language Content Delivery

**Problem:** Visitors from different regions need content in their native language without URL routing complexity.

**Solution:** Client-side i18n with [[LanguageProvider]], localStorage persistence, and CSS fade transitions.

**Key Files:**
- [[LanguageProvider.tsx]] — React context + useSyncExternalStore
- [[messages.ts]] — All translations (EN/NL/DE/FR)
- [[projects.ts]] — Locale-aware project text merging

**Flow:**
```
User clicks language → setLocale() → localStorage → CSS fade → New messages object
```

**Related:** [[architecture#i18n]], [[architecture-graph#7]]

---

## 2. Cross-Component Communication

**Problem:** Process section needs to prefill Contact form without prop drilling through multiple components.

**Solution:** Custom DOM events on `window` object.

**Key Files:**
- [[navigation.ts]] — `openContact()` dispatcher
- [[Contact.tsx]] — Event listener + form state update

**Pattern:**
```typescript
// Sender
window.dispatchEvent(new CustomEvent('open-contact', { detail: preset }));

// Receiver
useEffect(() => {
  const handler = (e) => setForm(prev => ({ ...prev, ...e.detail }));
  window.addEventListener('open-contact', handler);
  return () => window.removeEventListener('open-contact', handler);
}, []);
```

**Related:** [[architecture#How Components Talk]], [[components#Contact]]

---

## 3. Accessible Modal System

**Problem:** Project details need full-screen presentation with keyboard navigation, screen reader support, and scroll lock.

**Solution:** Portal-style modal with ARIA attributes, Escape handler, and body scroll lock.

**Key Files:**
- [[CaseStudyModal.tsx]] — Full implementation
- [[globals.css]] — `.modal-backdrop`, `.modal-sheet` styles

**Accessibility Features:**
- `role="dialog"` + `aria-modal="true"`
- Focus trap on close button
- Escape key closes
- Body scroll locked when open

**Related:** [[css-design-system#Modal System]], [[testing#E2E Tests]]

---

## 4. 3D Scene with Mouse Interaction

**Problem:** Hero section needs an interactive WebGL scene that responds to cursor movement without React wrapper complexity.

**Solution:** Raw Three.js with direct canvas manipulation and lerp-based mouse tracking.

**Key Files:**
- [[hero-scene.ts]] — Scene setup, animation loop, dispose
- [[Hero.tsx]] — Canvas mount + cleanup via useEffect

**Performance Optimizations:**
- `devicePixelRatio` capped at 2
- `powerPreference: 'high-performance'`
- Proper cleanup on unmount

**Related:** [[architecture#Three.js Hero Scene]], [[architecture-graph#8]]

---

## 5. Scroll-Triggered Animations

**Problem:** Sections need staggered reveal animations without heavy animation libraries.

**Solution:** IntersectionObserver-based CSS class toggling with data attributes for delays.

**Key Files:**
- [[useReveal.ts]] — Observer setup
- [[globals.css]] — `.reveal` + `.in` transition styles

**Pattern:**
```html
<div class="reveal" data-delay="1">...</div>
<div class="reveal" data-delay="2">...</div>
```

**Related:** [[architecture#Scroll Reveal System]], [[css-design-system#Scroll Reveal]]

---

## 6. Design Token System

**Problem:** Consistent colors, spacing, and typography without Tailwind config sprawl.

**Solution:** CSS custom properties defined once in `:root`, consumed by Tailwind and plain CSS.

**Key Files:**
- [[globals.css]] — All tokens defined
- [[tailwind.config.ts]] — Token mapping

**Tokens:**
- Colors: `--bg`, `--ink`, `--accent`, `--border`
- Radius: `--r-sm` through `--r-xl`
- Fonts: `--font-sans`, `--font-serif`, `--font-mono`

**Related:** [[css-design-system#Design Tokens]], [[architecture-graph#6]]

---

## 7. Type-Safe Project Data

**Problem:** Project metadata needs to be structured, type-safe, and locale-aware without duplication.

**Solution:** Single-source `projectDefinitions` array — each entry pairs shared `meta` with per-locale `texts`. `getProjects(locale)` derives the merged `Project[]`.

**Key Files:**
- [[projects.ts]] — Data layer

**Types:**
```typescript
type ProjectKind = 'web' | 'app';
interface ProjectDefinition { meta: ProjectMeta; texts: Record<Locale, ProjectText> }
// getProjects(locale) → Project[]
```

**Related:** [[architecture#Data Layer]], [[components#Projects]]

---

## 8. Zero-Backend Contact Flow

**Problem:** Contact form without server maintenance, API endpoints, or third-party services.

**Solution:** `mailto:` URL construction with subject/body prefill.

**Key Files:**
- [[Contact.tsx]] — Form validation + mailto generation

**Flow:**
```
Submit → Validate → Construct mailto: URL → window.location.href → Opens email client
```

**Related:** [[architecture#Overview]], [[components#Contact]]

---

## 9. Dual Deployment Pipeline

**Problem:** Primary Vercel deployment with GitHub Pages fallback for reliability.

**Solution:** Separate build scripts, same repo. Vercel gets SSR, Pages gets static export.

**Key Files:**
- `scripts/build-pages.mjs` — Static export
- `.github/workflows/` — CI pipeline

**Related:** [[architecture#Deployment]], [[architecture-graph#5]]

---

## 10. Quality Gates in CI

**Problem:** Catch issues early without manual code review for every PR.

**Solution:** Sequential CI steps where each gates the next.

**Pipeline:**
```
ESLint → TypeScript → Vitest → Playwright → Build → Deploy
```

**Key Files:**
- [[eslint.config.mjs]]
- [[tsconfig.json]]
- [[vitest.config.ts]]
- [[playwright.config.ts]]

**Related:** [[testing#CI Pipeline Order]], [[architecture-graph#5]]

---

## Quick Reference

| Use Case | Primary Files | Architecture Section |
|----------|--------------|---------------------|
| Multi-language | LanguageProvider, messages | [[architecture#i18n]] |
| Cross-component comms | navigation, Contact | [[architecture#Custom Events]] |
| Accessible modals | CaseStudyModal | [[components#CaseStudyModal]] |
| 3D interaction | hero-scene, Hero | [[architecture#Three.js]] |
| Scroll animations | useReveal | [[architecture#Scroll Reveal]] |
| Design tokens | globals.css, tailwind.config | [[css-design-system#Tokens]] |
| Type-safe data | projects.ts | [[architecture#Data Layer]] |
| Zero-backend contact | Contact | [[components#Contact]] |
| Dual deployment | build scripts, workflows | [[architecture#Deployment]] |
| Quality gates | config files | [[testing#CI Pipeline]] |

---

*Last updated: August 2026*

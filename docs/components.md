---
tags:
  - components
  - reference
type: reference
status: stable
created: 2026-08-04
---

# Components — Every File Explained

> What each component does, how it works internally, what props it takes, and what it renders.

**Related:** [[architecture]] | [[css-design-system]] | [[testing]] | [[app/api-reference/adapters/use-cases]]

---

## PortfolioPage.tsx

**Role:** The main page component. This is the only thing `page.tsx` renders.

**How it works:** Holds one piece of state — `openProject` — which tracks whether a case study modal is open and which project it shows. Passes `setOpenProject` down to `Projects` as `onOpen`, and passes `openProject` + a clear function to `CaseStudyModal`. Calls `useReveal()` to set up scroll animations for all `.reveal` elements on mount.

```tsx
const [openProject, setOpenProject] = useState<Project | null>(null);
useReveal();  // one call, sets up all scroll reveals
```

**Renders:** `<Nav>`, `<Hero>`, `<TechStrip>`, `<About>`, `<Services>`, `<Projects>`, `<Process>`, `<Contact>`, `<Footer>`, `<CaseStudyModal>`. All sections go inside `<main>`.

**State:** `openProject: Project | null` — the currently selected project for the modal.

---

## Nav.tsx

**Role:** Sticky top navigation bar. Shows logo, section links, language switcher, and a CTA button.

**How it works:** Listens to `scroll` events (passive) and sets `scrolled` to true when `scrollY > 12`. When scrolled, the nav gets a border and slightly more opaque background via CSS `.nav.scrolled`.

**Props:** None — reads everything from `useLanguage()`.

**Renders:** `<BrandLogo>`, four `<Link>` elements for About/Services/Projects/Process (each with `jumpTo()` click handler), `<LanguageSwitcher>`, and a "Contact me" CTA link.

**Navigation links:** Each calls `jumpTo(id)` which does `event.preventDefault()` + `scrollTo()` with a 60px offset to account for the sticky nav height.

---

## BrandLogo.tsx

**Role:** Renders the "G Glenn Claes" logo mark.

**Props:** `footer?: boolean` — when true, renders a `<div>` instead of a `<Link>`. Footer doesn't need to link anywhere.

**Renders:** A `<span>` with class `logo-mark` containing "G" (styled with gradient background, serif italic font) followed by "Glenn Claes" text.

---

## LanguageSwitcher.tsx

**Role:** Dropdown button that lets users switch between EN, NL, DE, FR.

**How it works:** Toggle button with `aria-haspopup="listbox"`. When open, renders a positioned dropdown (`lang-menu`) with all four locales. Each option shows the code (e.g. "EN"), the language name ("English"), and a check icon if active.

**Click outside / Escape:** Sets up `mousedown` and `keydown` listeners when open. Click outside closes it. Escape closes it.

**State:** `open: boolean` — whether the dropdown is visible.

**On language change:** Calls `setLocale(code)` from the language provider, which triggers the 150ms fade-out transition and localStorage update.

---

## Hero.tsx

**Role:** The hero section at the top of the page. Split into two columns: text on the left, 3D canvas on the right.

**See also:** [[architecture#Three.js Hero Scene]] and [[app/api-reference/adapters/use-cases#4. 3D Scene with Mouse Interaction]].

**How it works:** Uses a `useRef` for the canvas element. On mount, calls `initHeroScene(canvas, { variant: 'primitives', accent: '#1D4ED8' })`. Returns a cleanup function that calls `scene?.dispose()`.

**Renders:**
- Availability badge ("Available for freelance projects — 2026")
- Main heading with the name "Glenn" in italic serif
- Lead text
- Two CTA buttons: "Contact me" (→ #contact) and "View projects" (→ #projects)
- Three meta items: Frontend, Belgium, Delivery
- The Three.js `<canvas>` with a "Move your cursor to interact" tag overlay

**Data delay:** Uses `data-delay="1"` through `data-delay="4"` for staggered reveal animations.

---

## TechStrip.tsx

**Role:** Horizontal strip of technology tags below the hero.

**How it works:** Renders a hardcoded array of 11 tech names. Each gets a blue dot (::before pseudo-element) and wraps in a flex container.

**Data:** `['Next.js', 'React', 'TypeScript', 'Python', 'AI & LLMs', 'Tailwind CSS', 'Vercel', 'GitHub Pages', 'Playwright', 'Accessibility', 'CI/CD']`

**No props, no state.** Pure presentational.

---

## About.tsx

**Role:** "About me" section with portrait area, stats, and bio text.

**How it works:** Reads all text from `useLanguage()`. The portrait area is a styled gradient placeholder with "GC" initials (via CSS `::before`). A commented-out `<Image>` tag shows where a real photo would go.

**Renders:**
- Portrait placeholder (gradient background with initials)
- Four stat cards: "40+ Builds delivered", "AI Python & LLM workflows", "TS Strict TypeScript", "100% Quality focused"
- Three paragraphs of bio text (lead1, lead2, lead3)
- Eyebrow label

---

## Services.tsx

**Role:** Three service cards (Web Development, AI & Python, Automation).

**How it works:** Maps over `messages.services.items` to render three cards. Each card has an icon (lucide-react), title, description, and a "benefit" line separated by a dashed border.

**Icons:** `Monitor` (web), `Brain` (AI), `Workflow` (automation) — imported from lucide-react.

**Layout:** 3-column grid on desktop, single column on mobile (via CSS media query at 900px).

---

## Projects.tsx

**Role:** Grid of project cards that open a case study modal when clicked.

**Props:** `onOpen: (project: Project) => void` — callback to open the modal.

**How it works:** Calls `getProjects(locale)` to get the current language's project data. Renders each as a `<button>` (not a `<div>`) for keyboard accessibility. Handles `Enter` and `Space` key presses via `openWithKeyboard`.

**Renders per project:**
- SVG thumbnail via `<ProjectThumb kind={project.kind}>`
- Label badge ("Website - 2026 - Vercel")
- Title, description, tags
- "View case study" button with arrow
- Availability status ("Ready for Vercel" or "Under NDA")

---

## ProjectThumb.tsx

**Role:** SVG illustrations for project cards and the modal hero.

**Props:** `kind: 'web' | 'app'`, `accent?: string` (defaults to `var(--accent)`)

**How it works:** Returns a different SVG based on `kind`:
- **`web`:** A browser window illustration with a gradient background, dots in the title bar, a hero banner, placeholder text lines, and a decorative wave
- **`app`:** A workflow/pipeline illustration with three checkmark rows (lint, types, tests), a terminal window, and dashed connection lines

Both SVGs use `viewBox="0 0 400 250"` with `preserveAspectRatio="xMidYMid slice"`.

---

## CaseStudyModal.tsx

**Role:** Full-screen modal that shows detailed project information.

**See also:** [[css-design-system#Modal System]] and [[app/api-reference/adapters/use-cases#3. Accessible Modal System]].

**Props:** `project: Project | null`, `onClose: () => void`

**How it works:**
- When a project is set, locks `body.overflow = 'hidden'` (scroll lock)
- Listens for Escape key to close
- Auto-focuses the close button on open
- Renders a backdrop with blur + a scrollable sheet

**Renders:**
- SVG hero with gradient overlay and project title
- Four metadata fields (role, client, year, platform)
- Body paragraphs
- Highlights checklist (with check icons)
- Stack tags
- Credits text
- Two CTAs: "View repository" (external link) and "Get in touch about this" (triggers `openContact()`)

**Accessibility:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title, `aria-label` on close button.

**The "Get in touch" button:** After closing the modal, it waits 80ms then calls `openContact()` with a pre-filled message asking about the specific project. This dispatches the `open-contact` CustomEvent.

---

## Process.tsx

**Role:** "How I work" section with a checklist and decorative code card.

**How it works:** Reads process checks from `messages.process.checks` (5 items). Renders them with check icons. The right side shows a decorative visual with a code card (syntax-highlighted `const checks = [...]`), two floating chips ("Sprint 03 - Deploy" and "Vercel ready").

**CTAs:** Two buttons — "Start a project" (pre-fills contact with project message) and "Ask a question" (pre-fills with question message). Both use `openContact()`.

---

## Contact.tsx

**Role:** Contact form + direct contact info cards.

**See also:** [[app/api-reference/adapters/use-cases#2. Cross-Component Communication]] and [[app/api-reference/adapters/use-cases#8. Zero-Backend Contact Flow]].

**How it works:**
- Form fields: name, email, project type (select), message (textarea)
- Validates on submit: name required, email must contain `@`, message min 8 chars
- On valid submit: constructs a `mailto:` URL with subject `[Type] enquiry from Name` and body with all field values, then sets `window.location.href` to trigger the email client
- Shows "Your mail app should be opening" message for 8 seconds after submit

**Prefill system:** Listens for `open-contact` CustomEvent on `window`. When received, updates form fields from `event.detail` and optionally focuses the textarea after 650ms.

**State:** `form: ContactForm`, `sent: boolean`, `errors: ContactErrors`

**Accessibility:** `aria-invalid` on fields with errors, `aria-describedby` linking to error messages, `aria-live="polite"` on the sent confirmation.

**Exported constant:** `CONTACT_EMAIL = 'contact@glennclaes.be'`

---

## Footer.tsx

**Role:** Site footer with navigation, contact links, and social links.

**How it works:** Four-column grid on desktop:
1. Brand logo + tagline
2. Navigation links (About, Services, Projects, Process)
3. Contact links (email, project enquiry, automation enquiry)
4. Social links (LinkedIn, GitHub — with inline SVG icons)

**Social links:** LinkedIn and GitHub icons are inline SVGs (not lucide-react) for precise control. Both open in new tabs with `target="_blank" rel="noreferrer"`.

**Dynamic year:** `new Date().getFullYear()` for the copyright line.

---

## Hooks

### useReveal.ts

**Role:** Sets up IntersectionObserver-based scroll reveal for all `.reveal` elements.

**See also:** [[css-design-system#Scroll Reveal System]] and [[app/api-reference/adapters/use-cases#5. Scroll-Triggered Animations]].

**How it works:**
1. Grabs all elements with `document.querySelectorAll('.reveal')`
2. If no IntersectionObserver support: adds `.in` to all immediately
3. Otherwise: creates an observer with `rootMargin: '0px 0px -8% 0px'` and `threshold: 0.06`
4. When element intersects: adds `.in` class, unobserves (one-shot)
5. Cleanup: disconnects observer

**CSS that makes it work:** `.reveal` starts at `opacity: 0; transform: translateY(18px)`. `.reveal.in` transitions to `opacity: 1; transform: translateY(0)` over 0.7s with a custom cubic-bezier. `data-delay="1"` through `"4"` add 80ms increments of `transition-delay`.

---

## Libraries

### hero-scene.ts

**Role:** Creates and manages the Three.js hero scene.

**Exported:** `initHeroScene(canvas, options)` → `HeroSceneHandle | null`

**Options:** `{ variant?: 'primitives' | 'cube', accent?: string }`

**Internal structure:**
- Creates WebGLRenderer, PerspectiveCamera, Scene
- Adds 4 lights (hemisphere, directional key, directional rim, point fill)
- Creates 8 meshes with different geometries and materials
- Each mesh has animation parameters in a `DynamicObject[]` array
- Animation loop: sinusoidal Y position + rotation per object, group rotation driven by mouse
- Mouse tracking: smooth lerp (factor 0.06) from cursor to rotation
- ResizeObserver handles canvas resizing
- `dispose()` cleans up everything

### navigation.ts

**Role:** Two helper functions for in-page navigation.

**`jumpTo(id: string)`** — Returns an event handler that prevents default and smooth-scrolls to the element with that ID, offset by 60px for the sticky nav.

**`openContact(preset: ContactPreset)`** — Returns an event handler that:
1. Dispatches a `CustomEvent('open-contact')` with the preset data
2. After 30ms, smooth-scrolls to `#contact`

**`ContactPreset` interface:** `{ type?, message?, name?, email?, focus?: 'message' }`

---

## i18n

### LanguageProvider.tsx

**Role:** React context provider for language state. Wraps the entire app.

**See also:** [[architecture#i18n]] and [[app/api-reference/adapters/use-cases#1. Multi-Language Content Delivery]].

**How it works:**
- Uses `useSyncExternalStore` to read locale from localStorage (avoids hydration mismatch)
- Server snapshot always returns `'en'`
- `setLocale(next)` triggers a 150ms fade-out, updates localStorage, notifies listeners, fades back in
- Sets `document.documentElement.lang` on locale change
- Stores listeners in a `Set` for the external store subscription

**Context value:** `{ locale: Locale, setLocale: (locale: Locale) => void, messages: Messages }`

**`useLanguage()` hook:** Convenience wrapper — throws if used outside the provider.

### messages.ts

**Role:** All translation strings for all four languages.

**Structure:** Each language exports a `Messages` object (typed as `typeof en`) with keys for every section: `nav`, `hero`, `about`, `services`, `projects`, `process`, `contact`, `footer`, `modal`.

**The `modal.getInTouchMessage` function:** Takes a project title and returns a pre-filled contact message. Each language has its own version.

**Exports:** `LOCALES` array, `Locale` type, `dictionaries` record, individual language objects (`en`, `nl`, `de`, `fr`), `Messages` type.

---

## Data

### projects.ts

**Role:** Project metadata and translations, merged at runtime.

**See also:** [[architecture#Data Layer]] and [[app/api-reference/adapters/use-cases#7. Type-Safe Project Data]].

**Structure:**
- `baseProjects` — language-independent data (id, kind, tags, stack, client, year, platform, available, cta href)
- `projectTexts` — per-locale text (title, label, desc, role, body paragraphs, highlights, credits, cta label)
- `getProjects(locale)` — merges base + text, returns `Project[]`

**Types:**
- `ProjectKind = 'web' | 'app'`
- `ProjectId = 'portfolio' | 'delivery-system'`
- `Project` — full merged type with all fields
- `ProjectText` — text-only subset
- `BaseProject` — everything except text fields

---

## Test Files

### Contact.test.tsx

Two tests:
1. **Validation messages** — submits empty form, checks that all three error messages appear and fields get `aria-invalid="true"`
2. **Event prefill** — dispatches `open-contact` CustomEvent with type and message, verifies form fields are updated

### Projects.test.tsx

One test:
1. **Renders and opens** — renders Projects, checks both project titles are visible, clicks the first project card, verifies `onOpen` was called with the correct project data

### smoke.spec.ts (E2E)

See [[testing#E2E Tests (Playwright)]] for full details.

Two tests:
1. **Renders and interactive states** — loads page, checks title and heading, verifies canvas has drawn pixels (WebGL check), opens/closes modal via click and Escape, submits empty contact form to check validation
2. **Accessibility** — runs axe-core at three viewport sizes (1440, 834, 390), checks no critical or serious violations

---

*Last updated: August 2026*

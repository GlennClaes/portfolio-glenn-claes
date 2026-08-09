---
tags:
  - decisions
  - architecture
type: guide
status: stable
created: 2026-08-04
---

# Design Decisions — Glenn Claes Portfolio

> Why things are the way they are. Each decision includes context, options considered, and trade-offs.

---

## Decision 1: Single-Page Layout

**Context:** Portfolio needs to showcase work quickly without navigation complexity.

**Options Considered:**
1. Multi-page with React Router
2. Single-page with smooth scroll (chosen)
3. Traditional server-rendered pages

**Decision:** Single-page with smooth scroll.

**Rationale:**
- No route transition jank
- Simpler mental model
- Faster perceived performance
- All content visible without navigation

**Trade-offs:**
- ✅ Faster initial load
- ✅ No navigation state to manage
- ❌ No deep linking to sections
- ❌ All content loads upfront (acceptable for small portfolio)

**Related:** [[concepts#1. Single-Page Architecture]]

---

## Decision 2: Zero Backend

**Context:** Contact form needs to work without maintaining a server.

**Options Considered:**
1. Serverless function (Vercel Functions)
2. Third-party form service (Formspree, Netlify Forms)
3. `mailto:` link (chosen)

**Decision:** `mailto:` with client-side validation.

**Rationale:**
- Zero server maintenance
- Zero cost
- Zero security surface
- User controls their own email client

**Trade-offs:**
- ✅ Zero backend complexity
- ✅ Zero cost
- ❌ Requires user's email client
- ❌ No server-side validation
- ❌ No spam protection

**Related:** [[concepts#2. Zero Backend Philosophy]]

---

## Decision 3: Client-Side i18n

**Context:** Site needs four languages without server rendering.

**Options Considered:**
1. Next.js i18n routing (`/en/`, `/nl/`)
2. Server-side content negotiation
3. Client-side with localStorage (chosen)

**Decision:** Client-side with `useSyncExternalStore`.

**Rationale:**
- No server required
- Instant language switching
- Language persists across sessions
- No hydration mismatch

**Trade-offs:**
- ✅ Zero server dependency
- ✅ Instant switching with fade transition
- ❌ SEO is English-only
- ❌ No language-specific URLs
- ❌ Social shares lose language context

**Related:** [[concepts#4. Client-Side i18n]]

---

## Decision 4: Raw Three.js

**Context:** Hero section needs interactive 3D scene.

**Options Considered:**
1. `@react-three/fiber` + `@react-three/drei`
2. Pre-rendered WebGL video
3. Raw Three.js (chosen)

**Decision:** Raw Three.js in `useEffect`.

**Rationale:**
- Full control over scene lifecycle
- No abstraction overhead
- Simpler debugging
- Smaller bundle (no R3F dependencies)

**Trade-offs:**
- ✅ Full control
- ✅ No framework lock-in
- ❌ More boilerplate than R3F
- ❌ Manual React integration

**Related:** [[concepts#7. Raw Three.js]]

---

## Decision 5: CSS-First Animations

**Context:** Sections need reveal animations without heavy libraries.

**Options Considered:**
1. Framer Motion
2. GSAP + ScrollTrigger
3. CSS transitions + IntersectionObserver (chosen)

**Decision:** CSS classes toggled by IntersectionObserver.

**Rationale:**
- Zero runtime overhead
- Smaller bundle
- Native browser optimization
- Simple debugging (just CSS)

**Trade-offs:**
- ✅ Zero library overhead
- ✅ Simple implementation
- ❌ Limited to CSS capabilities
- ❌ No complex sequences or timelines

**Related:** [[concepts#5. CSS-First Animations]]

---

## Decision 6: CSS Custom Properties for Tokens

**Context:** Need consistent design values across the codebase.

**Options Considered:**
1. Tailwind theme extension only
2. CSS-in-JS (styled-components, emotion)
3. CSS custom properties + Tailwind (chosen)

**Decision:** Define tokens in `:root`, consume via Tailwind utilities.

**Rationale:**
- Single source of truth
- Works with plain CSS and Tailwind
- Easy theme switching potential
- No runtime cost

**Trade-offs:**
- ✅ Single source of truth
- ✅ Works with both CSS and Tailwind
- ❌ Slightly more verbose than pure Tailwind
- ❌ Two places to check for values

**Related:** [[concepts#3. Design Token System]]

---

## Decision 7: Custom Events for Cross-Cutting Communication

**Context:** Process section needs to prefill Contact form.

**Options Considered:**
1. Prop drilling through intermediate components
2. Global state (Redux, Zustand)
3. React context
4. Custom DOM events (chosen)

**Decision:** `window.dispatchEvent(new CustomEvent(...))`.

**Rationale:**
- Decouples sender from receiver
- Works across component tree
- No additional dependencies
- Any component can trigger

**Trade-offs:**
- ✅ Zero prop drilling
- ✅ No state library needed
- ❌ Harder to trace in codebase
- ❌ Not type-safe without extra work

**Related:** [[concepts#6. Custom Events for Cross-Cutting Concerns]]

---

## Decision 8: Separate Base and Text Data

**Context:** Project data needs locale support.

**Options Considered:**
1. Duplicate full project objects per locale
2. Single source with locale fields
3. Separate structure from text (chosen)

**Decision:** Single-source `projectDefinitions` array — each entry pairs shared `meta` with per-locale `texts`.

**Rationale:**
- Add a project by appending one array entry (no casts, no parallel records)
- Add a language by adding a `texts[locale]` key to each project
- Clear separation of concerns within one structure
- Type-safe: `getProjects(locale)` derives `Project[]` at runtime

**Trade-offs:**
- ✅ Easy to add languages
- ✅ Easy to add projects
- ❌ Two sources to maintain
- ❌ Merge step required

**Related:** [[concepts#8. Separation of Structure and Text]]

---

## Decision 9: Strict TypeScript

**Context:** Need type safety without slowing development.

**Options Considered:**
1. Loose TypeScript (no strict mode)
2. JavaScript with JSDoc
3. Strict TypeScript (chosen)

**Decision:** `strict: true` with `noEmit: true`.

**Rationale:**
- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code
- Industry standard

**Trade-offs:**
- ✅ Compile-time error catching
- ✅ Better tooling support
- ❌ More upfront work
- ❌ Some verbose type definitions

**Related:** [[concepts#9. Strict TypeScript Throughout]]

---

## Decision 10: Sequential Quality Gates in CI

**Context:** Prevent broken deployments.

**Options Considered:**
1. Run all checks in parallel
2. Run all checks in sequence
3. Sequential with fast-fail (chosen)

**Decision:** Lint → TypeCheck → Unit → E2E → Build → Deploy, each gating the next.

**Rationale:**
- Fast feedback (cheap checks first)
- No wasted CI time on failing builds
- Clear pass/fail progression
- E2E only runs if unit tests pass

**Trade-offs:**
- ✅ Fast feedback loop
- ✅ No wasted resources
- ❌ Longer total time if last step fails
- ❌ Sequential dependency

**Related:** [[concepts#10. Sequential Quality Gates]]

---

## Decision Summary

| Decision | Chosen | Main Benefit | Main Cost |
|----------|--------|--------------|-----------|
| Page layout | Single-page | Simpler model | No deep linking |
| Backend | Zero (mailto) | Zero maintenance | Requires email client |
| i18n | Client-side | No server | SEO limitation |
| 3D | Raw Three.js | Full control | More boilerplate |
| Animations | CSS-first | Zero overhead | Limited complexity |
| Design tokens | CSS variables | Single source | Two places to check |
| Cross-cutting comms | Custom events | Decoupling | Harder to trace |
| Data structure | Separate base/text | Easy i18n | Two sources |
| TypeScript | Strict mode | Compile safety | Verbose types |
| CI gates | Sequential | Fast feedback | Longer total time |

---

*Last updated: August 2026*

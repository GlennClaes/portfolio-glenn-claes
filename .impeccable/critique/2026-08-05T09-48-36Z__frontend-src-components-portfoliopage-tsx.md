---
target: the entire portfolio
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
p2_count: 2
timestamp: 2026-08-05T09-48-36Z
slug: frontend-src-components-portfoliopage-tsx
---
# Design Critique — Glenn Claes Portfolio
**Method: dual-agent (A: `a2886ed7c516be923` · B: `a1056640a6bce66a0`)**
Mode: **Experience** (portfolio/showcase) · Target: `frontend/src/components/PortfolioPage.tsx` (full surface)

## Design Health Score

Heuristics **7 (Flexibility & Efficiency)** and **10 (Help & Documentation)** scored `n/a` — a single-purpose showcase has no power-user workflows and expects no help docs. **Applicable max = 32.**

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Send button silently hands off to `mailto:` with no confirmed success |
| 2 | Match System / Real World | 3 | Hardcoded English in Process code card; "Move your cursor" on a cursor-less touch hero |
| 3 | User Control and Freedom | 4 | Esc/scrim/close/logo-return all clean; menu resets on resize |
| 4 | Consistency and Standards | 3 | Two near-identical self-referential cards read repetitive; mobile duplicates Contact |
| 5 | Error Prevention | 3 | Email validated only by `includes('@')`; mailto can silently fail |
| 6 | Recognition Rather Than Recall | 3 | Default EN hides language choice from DE/NL/FR visitors |
| 7 | Flexibility and Efficiency | n/a | Single-purpose showcase; presets already cover it |
| 8 | Aesthetic and Minimalist Design | 3 | Calm tokens, but dense hero + spinning canvas competes with the CTA |
| 9 | Error Recovery | 3 | Helpful messages, but not announced to screen readers |
| 10 | Help and Documentation | n/a | No docs expected on a showcase |
| **Total** | | **25/32** | **Good** (78%) |

## Design Specificity Verdict

**Structurally category-interchangeable, with one genuine signature.** The sticky blur nav, 76px/50px Manrope display headings, pill CTAs, banded sections, 2-col grids, and `reveal` fade-ups are the generic "premium one-page developer portfolio" template. The palette (`#1D4ED8` accent on `#f8fafc`/slate) is stock Tailwind blue-on-slate — nothing in the *visual language* says "this is Glenn." Any freelancer could drop their name into `messages.ts`.

**Where it *is* specific, it's specific to developers — the wrong audience.** The two most original artifacts — the **Process code card** (`const checks = [...]` / `checks.forEach(ship)` / "Sprint03 – Deploy") and the **ProjectThumb SVG mockups** — speak fluent engineer. A small business owner staring at a code snippet gets zero product signal, and small business owners are the primary buyer.

The **one** truly product-specific visual moment is the **serif-italic "Glenn"** in the hero heading (`globals.css:98-104`) — the page's single identity signature, used exactly once.

**Detector scan** (Assessment B): **2 real warnings**, both `overused-font` — `Plus Jakarta Sans` (body) and `Instrument Serif` (headings), both sourced to `frontend/src/app/layout.tsx`. Both are on the detector's hardcoded overused list; the pairing is deliberate but the faces themselves are the AI-UI defaults the detector flags. No card-wall, flat-type, or contrast rules fired. *No browser inspection was available (no browser tool in this session), so this is CLI-scan evidence only.*

## Overall Impression

A **calm, well-engineered, genuinely converting** portfolio hiding a contradiction: it sells "no noise, no overbuilt stack," yet its flagship moment is an always-spinning WebGL gallery, and its About section ships **no human face at all** — a monogram where a person should be. The conversion engineering is excellent; the identity is generic; and the two highest-stakes moments (About trust, contact send) are where it leaks.

**Single biggest opportunity:** put a person (and the calm, not the WebGL noise) at the top of the page — that's the highest-leverage move for a small-business-owner buyer making a trust decision.

## What's Working

1. **The serif-italic "Glenn"** — the one original, human moment; proves the page *can* have character.
2. **The typed-enquiry preset system** — every CTA dispatches a context-tagged `open-contact` event that pre-fills the form, scrolls, and focuses the message field. Real conversion engineering: a committed visitor reaches an inbox in ~4 fields.
3. **The reassurance architecture at the contact point** — "Within 24 hours," "No spam, ever," a real `contact@glennclaes.be`, direct channels sidebar, honest-scope framing. The form is the best-engineered part of the surface.

## Priority Issues

### P1 — About ships no human face
- **What:** `About.tsx:14-20` has the portrait `next/image` commented out; the 4:5 frame renders a decorative gradient + "GC" monogram.
- **Why it matters:** small business owners buy people, not pixels. A "GC" monogram is the aesthetic choice that costs inquiries.
- **Fix:** restore a real portrait, or if none exists, ship something honest and personal (candid workspace, working photo, signature) instead of an abstract placeholder.
- **Suggested command:** `/impeccable polish` (asset work), `/impeccable onboard`

### P1 — Case-study modal lacks a true focus trap and doesn't restore focus
- **What:** `CaseStudyModal.tsx` focuses the close button on open (line 32) and closes on Escape (line 27), but Tab walks into the page behind the backdrop, and focus is lost on close. Contradicts the product's own WCAG "focus trap" claim.
- **Why it matters:** a shipped a11y regression on a site that pitches accessibility as a differentiator ("Accessibility" is even a TechStrip item).
- **Fix:** trap Tab/Shift+Tab within the modal (cycle first↔last focusable), restore focus to the opened project card on close.
- **Suggested command:** `/impeccable audit` then `/impeccable polish`

### P1 — Contact errors are invisible to screen readers; mailto handoff is a silent failure point
- **What:** errors render as `.field-error` spans (Contact.tsx:169, 186, 215) with **no `aria-live`/`role="alert"`** — only the success message has one (line 227). Submit fires `window.location.href = 'mailto:'` (line 95) and *unconditionally* shows success; if no mail client is configured, nothing was sent and it says the mail app "should" be opening.
- **Why it matters:** both hit at the conversion peak — the one moment the whole product exists to succeed.
- **Fix:** wrap errors in `aria-live="assertive"` (or per-error `role="alert"`); add honest pre-submit microcopy ("This opens your email app — press send there to confirm").
- **Suggested command:** `/impeccable clarify` / `/impeccable harden`

### P1 — Auto-rotating WebGL hero ignores `prefers-reduced-motion` and is always-on
- **What:** `hero-scene.ts` runs a continuous rAF loop (line 304) with auto-rotation and object bobbing regardless of OS reduced-motion; only `mousemove` (line 268) drives parallax. The CSS reduced-motion block (`globals.css:1708-1722`) only tames CSS transitions, not this loop.
- **Why it matters:** vestibular risk for motion-sensitive users, battery drain on mobile, and a visual that competes with the "Contact me" CTA at the moment of truth.
- **Fix:** gate the scene under `matchMedia('(prefers-reduced-motion: reduce)')`, stop auto-rotation when idle/not hovered, render a static frame on touch.
- **Suggested command:** `/impeccable animate` / `/impeccable adapt`

### P2 — Only two self-referential projects → thin credibility
- **What:** `projects.ts` contains only the portfolio itself and its delivery pipeline. Stats claim "40+ builds" in About, disconnected from any proof on the page.
- **Why it matters:** small business owners see zero client work; a skeptical buyer notices the "40+ → 2 shown" gap.
- **Fix:** reframe each card around the *outcome* it demonstrates, and bridge stat→evidence explicitly. (Nothing fabricated, per PRODUCT.md.)
- **Suggested command:** `/impeccable clarify` / `/impeccable layout`

### P2 — Mobile duplicates Contact, 5-link menu, and i18n leaks English
- **What:** on ≤760px the nav CTA pill *and* the hamburger both expose Contact (twice per screen), and the menu has 5 links (above the ≤4 rule). Separately, `Process.tsx` hardcodes English ("Sprint03 – Deploy", "Vercel ready", `// Quality gate`) unreachable via `messages.ts`.
- **Why it matters:** contradicts both "≤4 choices" and the "four languages is a committed feature" brand commitment.
- **Fix:** drop the duplicate top-bar Contact on mobile; move Process chips/code strings into `messages.ts`.
- **Suggested command:** `/impeccable adapt` / `/impeccable harden`

## Persona Red Flags

**Jordan (first-timer, small business owner):** the hero is a confusion point — auto-rotating 3D canvas + badge + 76px heading + two CTAs + three meta pairs all at once; the Process code card reads as undecodable decoration; default EN hides the language switch; the "GC" monogram is a face-shaped void at the trust moment.

**Casey (distracted mobile):** "Move your cursor to interact" on a device with no cursor; the canvas is a dead, battery-draining square on touch; continuous rAF spins the GPU while scrolling; logo + language pill + Contact pill + hamburger crowd the thumb zone; card-lift hovers are mouse-only (no touch cue that cards open).

**Sam (accessibility-dependent):** no focus trap/restore in the modal (Tab into background, focus lost on close); form errors not announced (`aria-live` missing on `.field-error`); continuous motion with no reduced-motion opt-out; `role="listbox"` buttons without arrow-key nav; the `.modal-scrim` is a focusable full-screen button first in DOM order.

## Minor Observations
- "100% Quality focused" is marketing-speak against the no-noise ethos.
- The `sent` confirmation auto-clears after 8s and has no close button.
- Email validation is only `includes('@')` — `"@@@"` passes.
- `hero-scene.ts` registers a single global `mousemove` — fragile if the scene ever mounts twice.
- Duplicate `--font-sans`/`--font-serif` re-declared on `body` (harmless redundancy).
- Process CTA prefill messages end with a trailing space (intentional, but fragile).

## Questions to Consider
- **"No noise, no overbuilt stack" is the positioning, yet the flagship hero is an always-spinning WebGL gallery** — is the loudest, most resource-heavy element the calmest possible expression of that brand, and would a calmer hero convert better?
- **The conversion moment hands the visitor out of the site to an external mail app and says it "should" be opening** — at the most important moment, does `mailto:` protect the no-backend positioning or silently leak the inquiries the site exists to win?
- **A person is selling trust, and About ships an abstract monogram where a face should be** — is removing the face the right trade for a high-end aesthetic?

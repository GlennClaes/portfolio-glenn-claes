# Design Critique — Glenn Claes Portfolio (re-run)
**Method: dual-agent (A: `acae0542e677d9768` · B: `adb7672aeae51fbb8`)**
Mode: **Experience** · Target: `frontend/src/components/PortfolioPage.tsx` (full surface)

## Design Health Score
Heuristics **7 (Flexibility & Efficiency)** and **10 (Help & Documentation)** scored `n/a` (single-purpose showcase). **Applicable max = 32.** Score **26/32** (was 25/32).

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
|1 | Visibility of System Status |3 | Sent confirmation auto-dismisses after 8s and can be missed |
|2 | Match System / Real World |3 | Plain voice, but heavy tech jargon ("Strict TypeScript", "CI/CD", "LLM") misfires for the small-business primary persona |
|3 | User Control and Freedom |3 | Esc/close/scrim present; `mailto:` handoff leaves the page with no return path |
|4 | Consistency and Standards |4 | Tokens/buttons/tags/radii/shadows rigorously consistent; strong semantic/ARIA baseline |
|5 | Error Prevention |3 | Proper email regex + min message + `sendHint`; but `noValidate` with no backend |
|6 | Recognition Rather Than Recall |4 | Sticky nav, labeled sections, repeated CTA affordances; nothing to memorize |
|7 | Flexibility and Efficiency | n/a | Single-purpose showcase |
|8 | Aesthetic and Minimalist Design |3 | Clean, but hero above-fold is dense; About is a 3-paragraph wall |
|9 | Error Recovery |3 | `role="alert"` errors cleared on change; focus not moved to first invalid field |
|10 | Help and Documentation | n/a | No docs expected on a showcase |
| **Total** | | **26/32** | **Good** |

Scores that moved from the fixes: **#9** (role=alert + regex + sendHint), **#5** (sendHint pre-empts mailto surprise), **#4** (focus trap + reduced-motion). Honest, not inflated.

## Design Specificity Verdict
Partially moved the needle — not yet "unmistakably Glenn." The Outfit swap + serif-only-accent + generous scale gives the site an actual editorial voice (vs the default SaaS look). The `italic-serif` "Glenn" + `logo-mark` "G" are the most distinctive visual idea; the type scale (18/21/52/80px) reads calm and confident; dropping forced antialiasing is the right call for Windows ClearType. But the palette (#1D4ED8 = stock Tailwind blue-700 on white/gray/slate), the layout skeleton (sticky blur nav → hero → tech strip → about → services → projects → process → contact), and the `GC` monogram + low-poly WebGL primitives are all stock "developer vibe." Reads as "a talented developer with a tasteful template," not "this is Glenn Claes."

**Detector scan (Assessment B):** 1 real-trigger warning, `overused-font` on **Instrument Serif** — the deliberate minimal serif accent (user's intentional choice), not a defect. **Outfit** confirmed present; Plus Jakarta Sans / Manrope / Lato / Archivo / Familjen Grotesk / Roboto / Space Grotesk / Geist all gone from the built CSS. No browser inspection available (no browser tool in session); CLI-scan evidence only.

## Overall Impression
A calm, well-crafted, quality-credible portfolio whose type system and a11y/craft upgrades are real and visible. Its two sharpest problems are strategic, not visual: the copy speaks technical to a small-business primary audience, and the only proof of work is the site itself. Fix those two and the polish starts converting.

## What's Working
1. **Mature, distinctive type system** — Outfit + serif-only-accent + generous scale + native subpixel AA = a calm, confident editorial voice with good Windows rendering.
2. **Conversion architecture** — pre-filled enquiry presets flow through every touchpoint; the mailto path is low-friction; reassurance microcopy de-risks the final act.
3. **Craft is demonstrated, not claimed** — the Process code visual, Playwright/axe/ESLint gates, focus trap, reduced-motion, and 4-locale i18n make the quality-first pitch tangible.

## Priority Issues
### P1 — Copy/persona mismatch (primary audience = small business owners)
- **What:** Services/Process/About/Projects lean on "Strict TypeScript," "Python & LLM workflows," "CI/CD," "Vercel/GitHub Pages," "smoke checks." Hero meta opens "Frontend / React, Next.js & TypeScript."
- **Why:** PRODUCT.md declares small-business owners primary and "offerings stated plainly" a core principle. The jargon means nothing to Jordan and reads as "this developer speaks to machines."
- **Fix:** Lead each service with an outcome sentence; demote stack names to secondary tags; reserve tech detail for the case-study modals/footer.
- **Suggested command:** `/impeccable clarify`

### P1 — Both case studies are self-referential (credibility gap)
- **What:** The only two projects are the portfolio itself and its delivery system — both `client: 'Glenn Claes'`.
- **Why:** Proves Glenn can build his own site, not that he can deliver for a client — the biggest trust shortfall, exactly where visitors look for proof.
- **Fix (no fabrication):** Reframe the section honestly as "How I build — this site is a working example," make the delivery system the primary story, lean on process + direct-inquiry CTA. Real client work becomes the P0 the moment it exists.
- **Suggested command:** `/impeccable clarify` / `/impeccable layout`

### P2 — About section is a text wall
- **What:** `lead1 + lead2 + lead3` render as three unbroken paragraphs under the heading.
- **Why:** Stalls the emotional pace after the hero peak; high reading effort for both personas.
- **Fix:** Cut to two paragraphs, or convert `lead3` into a styled pull-quote/statement for a resting point.
- **Suggested command:** `/impeccable layout` / `/impeccable distill`

### P2 — Above-the-fold density in the hero
- **What:** Badge + 80px headline + lead + 2 CTAs + 3 meta chips + 3D canvas + scene tag all compete.
- **Why:** Multiple focal points dilute the single message ("available, contact me"); the meta labels are the least meaningful to a small-business visitor.
- **Fix:** Reduce meta to 2 high-signal items or move it below the CTAs; keep one dominant focal point.
- **Suggested command:** `/impeccable layout` / `/impeccable distill`

### P3 — "sent" confirmation auto-dismisses; mailto can silently fail
- **What:** `setTimeout(→setSent(false), 8000)`; on a device with no mail client, `window.location.href` does nothing visible.
- **Why:** The send is the riskiest moment; a broken/unclear handoff loses the very inquiry the site exists for.
- **Fix:** Keep the confirmation visible (or much longer), add a fallback that reveals `contact@glennclaes.be` or a copy-to-clipboard affordance if no mailto handler exists.
- **Suggested command:** `/impeccable harden`

## Persona Red Flags
**Jordan (first-timer, small business owner):** jargon wall undermines trust; both projects self-referential (can he build *my* site?); the project-type dropdown forces self-classification ("Automation" vs "Web app") at the momentum moment. Positive: "most projects start with a short call to scope honestly" de-risks cost/scope fear.

**Casey (mobile):** hero's "Move your cursor to interact" is mouse-only (mousemove parallax, no touch) — misleading on a phone; the 3D scene stacks below the hero text on mobile, far down the fold. Positive: mobile menu Esc/scroll-lock, single-column grids, full-bleed modal.

**Sam (accessibility):** focus trap + reduced-motion correct; but focus is not moved to the first invalid field on submit; the language menu uses `role="listbox"` buttons without arrow-key navigation/roving tabindex; `--ink-soft #64748b` is ~4.6:1 on white — weak for 14px labels.

## Minor Observations
- About portrait is a placeholder (commented `Image`, `GC` monogram) — reads unfinished.
- Footer legal uses literal `(c)` instead of the © symbol.
- `.reveal { will-change }` applied broadly — potential layer-churn on low-end devices.
- Tech strip wraps into a multi-line blob on small screens.
- `btn-arrow` micro-interaction on nearly every button slightly dilutes the accent.
- Process code sample (`lint/typecheck/tests/build/ship`) stays English in all locales — acceptable (code).

## Questions to Consider
- If both projects are self-referential, is "Projects" the right section, or should it be a living "How I build" demo until real client work exists?
- What would a single signature color/motif (beyond Tailwind blue-700) be that a returning visitor could name back as "that's Glenn"?
- Does the mouse-bound 3D hero earn its cost for the primary persona — would a crisp outcome-statement hero convert a small-business owner better?
- Is "AI & Python" helping or hurting trust with non-technical buyers, or mainly speaking to the recruiter/developer audience?
- If the contact form needs an external mail client, is a one-field "quick question" fallback worth adding as a zero-barrier path?

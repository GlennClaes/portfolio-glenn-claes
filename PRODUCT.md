# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is **small business owners** who need a website, web app, or automation built and want a dependable freelancer. Secondary audience is **recruiters/employers** evaluating Glenn as a candidate. The visitor's job is to quickly judge whether Glenn is credible, capable and easy to work with, then reach out via the contact form. The site's success metric is **inbound project inquiries**.

## Product Purpose

A single-page freelance developer portfolio for Glenn Claes that earns inbound project inquiries by demonstrating a calm, quality-first, delivery-focused way of building. It both impresses (interactive 3D hero, polished craft) and converts (clear services, process, and a low-friction contact form).

## Positioning

The distinguishing position is **quality-first delivery with no overbuilt stack**: "No noise, no overbuilt stack. Just sharp execution, readable code and a site that is ready to ship." Glenn pairs clean, tested, deployable web work with two differentiated offerings many freelancers don't: AI features (Python + LLM workflows) and practical automations (CI/CD, scripts, deployment). The tone is calm and detail-driven, not loud.

## Operating Context

- Single-page site with smooth-scroll navigation between sections (About, Services, Projects, Process, Contact).
- **Four languages** — English (default), Dutch, German, French — switched client-side and persisted in `localStorage` (`glenn-locale`).
- Belgium-based, remote-friendly, working across European time zones.
- No backend: the contact form opens the visitor's email client via `mailto:`.
- Deployed primarily to Vercel, with a GitHub Pages static fallback.

## Capabilities and Constraints

- **Three service lines**: Web Development (Next.js, React, TypeScript, responsive UI), AI & Python (LLM integrations, data processing, smart tools), and Automation (CI/CD, workflows, deployment setup).
- Two case-study projects in the grid — the portfolio itself and its delivery system — both self-referential; each opens a full-screen modal.
- Interactive Three.js hero (raw WebGL) with a silent fallback if WebGL fails.
- Quality gates before every release: ESLint (zero warnings), strict TypeScript, Vitest component tests, Playwright E2E + axe accessibility, production build.
- Contact form supports typed enquiry presets (project vs. automation) pre-filled from any CTA.

## Brand Commitments

- Name: **Glenn Claes** (written as "G Glenn Claes" logo mark).
- **Blue, white, gray and black palette** on a "high-end one-page" structure.
- **Calm, detail-driven voice**; honest scoping; "no noise" ethos.
- Four languages (EN, NL, DE, FR) are a committed feature, not a nicety.
- Fonts: Manrope, Plus Jakarta Sans, Instrument Serif, JetBrains Mono (via `next/font/google`, `display: swap`).

## Evidence on Hand

- Real, keep-as-is stats: **"40+ builds delivered"** and **"100% quality focused"**, plus AI (Python & LLM workflows) and strict TypeScript.
- Two real projects: the portfolio build and its quality-first delivery workflow (with public repository links).
- No external client testimonials, case studies, logos, or third-party results exist — future work must **not fabricate** them.

## Product Principles

- **Quality is the pitch**: tested, typed, deployable output is the core differentiator; never soften it.
- **Calm over loud**: the voice and pace convey dependability; that calm is a feature.
- **Honest scope**: most projects start with a short call to scope the work honestly — reflect this in CTAs and process.
- **Small business clarity**: offerings and outcomes stated plainly so a non-technical owner understands the value.
- **Reach without friction**: four languages and a `mailto:` contact path keep barriers to inquiry low.

## Accessibility & Inclusion

The site targets WCAG-compliant contrast (blue accent on white/light gray), keyboard-friendly modals (Esc closes, focus trap), semantic HTML, ARIA labels, `aria-live` form feedback, and automated axe audits in CI. Preserve these as a baseline.

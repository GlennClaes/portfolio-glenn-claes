# Architecture Diagrams — Glenn Claes Portfolio

> Visual overview of the entire system. These diagrams render natively in JetBrains (WebStorm/IntelliJ), GitHub, VS Code with Mermaid extension, Notion, and most modern Markdown editors.

**Related:** [[architecture]] | [[components]] | [[app/api-reference/adapters/use-cases]]

---

## 1. System Overview

The big picture — how all the pieces connect, from the browser to deployment.

```mermaid
graph TB
    subgraph External["External"]
        Vercel["Vercel\n(Production)"]
        GH_Pages["GitHub Pages\n(Fallback)"]
        GH_Actions["GitHub Actions\n(CI/CD)"]
        GH_Repo["GitHub Repository"]
        Browser["Browser\n(Visitor)"]
    end

    subgraph Repo["Repository — frontend/"]
        direction TB
        APP["app/\nlayout + page + globals.css"]
        COMP["components/\n14 React components"]
        DATA["data/\nprojects.ts"]
        HOOKS["hooks/\nuseReveal"]
        I18N["i18n/\nmessages + LanguageProvider"]
        LIB["lib/\nhero-scene + navigation"]
    end

    subgraph Core["Runtime Architecture"]
        direction TB
        ROOT["RootLayout"]
        LANG["LanguageProvider\n(React Context)"]
        PAGE["PortfolioPage\n(Main Component)"]

        subgraph UI["UI Components"]
            NAV["Nav"]
            HERO["Hero"]
            TECH["TechStrip"]
            ABOUT["About"]
            SERVICES["Services"]
            PROJECTS["Projects"]
            PROCESS["Process"]
            CONTACT["Contact"]
            FOOTER["Footer"]
            MODAL["CaseStudyModal"]
        end

        subgraph Lib["Libraries"]
            SCENE["Three.js Scene\n(hero-scene.ts)"]
            REVEAL["useReveal Hook\n(IntersectionObserver)"]
            NAV_LIB["navigation.ts\n(jumpTo, openContact)"]
            PROJECT_DATA["getProjects(locale)\n(data/projects.ts)"]
        end
    end

    subgraph I18nSys["i18n System"]
        MSGS["messages.ts\nEN / NL / DE / FR"]
        LS["localStorage\n(glenn-locale)"]
        BROWSER_LANG["navigator.language\n(Fallback)"]
    end

    subgraph Testing["Quality Gates"]
        VITEST["Vitest\n(Unit + Component)"]
        PLAYWRIGHT["Playwright\n(E2E + a11y)"]
        ESLINT["ESLint\n(max-warnings=0)"]
        TSC["TypeScript\n(strict)"]
        PRETTIER["Prettier\n(formatting)"]
    end

    Browser -->|"visits"| Vercel
    Browser -->|"visits"| GH_Pages
    GH_Actions -->|"deploy"| Vercel
    GH_Actions -->|"static export"| GH_Pages
    GH_Repo -->|"push to main"| GH_Actions

    ROOT --> LANG
    LANG --> PAGE
    PAGE --> NAV & HERO & TECH & ABOUT & SERVICES & PROJECTS & PROCESS & CONTACT & FOOTER

    NAV --> NAV_LIB & LANG
    HERO --> SCENE & LANG
    ABOUT --> LANG
    SERVICES --> LANG
    PROJECTS --> LANG & PROJECT_DATA
    PROJECTS -->|"onOpen callback"| MODAL
    MODAL --> NAV_LIB & LANG
    PROCESS --> LANG & NAV_LIB
    CONTACT --> LANG
    CONTACT -->|"CustomEvent"| NAV_LIB
    FOOTER --> LANG & NAV_LIB

    LANG --> MSGS & LS
    LANG -.->|"fallback"| BROWSER_LANG
    PROJECT_DATA --> MSGS

    PAGE --> REVEAL

    GH_Actions --> VITEST & PLAYWRIGHT & ESLINT & TSC & PRETTIER
```

---

## 2. Component Render Tree

How the React component tree is structured — who renders whom.

```mermaid
graph TD
    ROOT["RootLayout"] --> LANG["LanguageProvider"]
    LANG --> HTML["html + body"]
    HTML --> PAGE["PortfolioPage"]

    PAGE --> NAV["Nav"]
    PAGE --> MAIN["main"]
    PAGE --> FOOTER["Footer"]
    PAGE --> MODAL["CaseStudyModal"]

    NAV --> LOGO["BrandLogo"]
    NAV --> LS["LanguageSwitcher"]
    NAV --> CTA["CTA -> #contact"]

    MAIN --> HERO["Hero"]
    MAIN --> TECH["TechStrip"]
    MAIN --> ABOUT["About"]
    MAIN --> SERVICES["Services"]
    MAIN --> PROJECTS["Projects"]
    MAIN --> PROCESS["Process"]
    MAIN --> CONTACT["Contact"]

    HERO --> CANVAS["canvas (Three.js)"]

    PROJECTS --> CARD["Project Cards"]
    CARD -->|"click"| MODAL

    MODAL --> THUMB["ProjectThumb (SVG)"]
    MODAL --> CLOSE["Close + Escape"]
    MODAL --> CTA2["CTA -> Contact"]

    CONTACT --> FORM["form (mailto:)"]
    CONTACT --> INFO["Info Cards"]
```

---

## 3. Data Flow — Language Switch

What happens when a user picks a different language.

```mermaid
sequenceDiagram
    participant U as User
    participant LS as LanguageSwitcher
    participant LP as LanguageProvider
    participant LS2 as localStorage
    participant C as Components

    Note over LP: On load: reads locale from localStorage<br/>fallback: navigator.language -> 'en'

    U->>LS: Clicks language dropdown
    LS->>LP: setLocale('de')
    LP->>LP: Set transitioning = true (fade out, 150ms)
    LP->>LS2: localStorage.setItem('glenn-locale', 'de')
    LP->>LP: Notify useSyncExternalStore listeners
    LP->>LP: Set transitioning = false (fade in)
    LP->>C: New messages object (German)
    C->>C: Re-render with translated text
```

---

## 4. Data Flow — Project Modal

What happens when a user clicks a project card.

```mermaid
sequenceDiagram
    participant U as User
    participant P as Projects
    participant PP as PortfolioPage
    participant M as CaseStudyModal
    participant C as Contact

    U->>P: Clicks project card
    P->>PP: onOpen(project)
    PP->>PP: setOpenProject(project)
    PP->>M: project={project} onClose={clear}
    M->>M: Lock body scroll, focus close button
    M->>M: Render project details

    U->>M: Clicks "Get in touch about this"
    M->>C: openContact({type, message, focus:'message'})
    Note over C: CustomEvent('open-contact') dispatched on window
    C->>C: Prefill form, scroll to #contact, focus textarea
```

---

## 5. Deployment Pipeline

What happens on every push to main.

```mermaid
flowchart LR
    DEV["Developer"] --> PUSH["git push main"]
    PUSH --> CI["GitHub Actions"]

    subgraph CI["CI Pipeline"]
        direction TB
        INSTALL["npm install"]
        LINT["ESLint\n(max-warnings=0)"]
        TYPECHECK["TypeScript\n(strict)"]
        TEST["Vitest\n(unit + component)"]
        E2E["Playwright\n(E2E + a11y)"]
        BUILD["Next.js Build"]

        INSTALL --> LINT --> TYPECHECK --> TEST --> E2E --> BUILD
    end

    CI --> DEPLOY_VERCEL["Vercel Deploy"]
    CI --> STATIC["Static Export"]
    STATIC --> DEPLOY_PAGES["GitHub Pages Deploy"]

    DEPLOY_VERCEL --> LIVE["Live on Vercel"]
    DEPLOY_PAGES --> FALLBACK["Fallback on GitHub Pages"]
```

---

## 6. Design Token System

How CSS custom properties flow through Tailwind into components.

```mermaid
graph LR
    subgraph Tokens["CSS Custom Properties (globals.css)"]
        BG["--bg\n#F8FAFC"]
        INK["--ink\n#0F172A"]
        ACCENT["--accent\n#1D4ED8"]
        FONTS["--font-sans\n--font-serif\n--font-mono"]
        RADIUS["--r-sm\n--r-md\n--r-lg\n--r-xl"]
    end

    subgraph TW["Tailwind Config"]
        TW_C["colors: canvas, ink, accent"]
        TW_F["fontFamily: sans, serif, mono"]
        TW_R["borderRadius: sm, md, lg, xl"]
    end

    subgraph Usage["In Components"]
        N["Nav"]
        H["Hero"]
        A["About"]
        Etc["...all components"]
    end

    BG --> TW_C
    INK --> TW_C
    ACCENT --> TW_C
    FONTS --> TW_F
    RADIUS --> TW_R

    TW_C --> N & H & A & Etc
    TW_F --> N & H & A & Etc
    TW_R --> N & H & A & Etc
```

---

## 7. i18n Architecture

How the language system is wired up.

```mermaid
graph TD
    STORE["localStorage\nglenn-locale"]
    NAV_LANG["navigator.language\n(browser fallback)"]
    SYNC["useSyncExternalStore\n(React)"]

    STORE --> SYNC
    NAV_LANG -.->|"if empty"| SYNC

    SYNC --> PROVIDER["LanguageProvider"]
    PROVIDER --> CTX["LanguageContext\n{ locale, setLocale, messages }"]

    MSGS["messages.ts\nen / nl / de / fr"] --> PROVIDER

    CTX --> NAV3["Nav"]
    CTX --> HERO3["Hero"]
    CTX --> ABOUT3["About"]
    CTX --> SERVICES3["Services"]
    CTX --> PROJECTS3["Projects"]
    CTX --> PROCESS3["Process"]
    CTX --> CONTACT3["Contact"]
    CTX --> FOOTER3["Footer"]
    CTX --> MODAL3["CaseStudyModal"]

    SWITCHER["LanguageSwitcher"] -->|"setLocale()"| PROVIDER
```

---

## 8. Three.js Scene Composition

What's in the hero 3D scene (primitives variant).

```mermaid
graph TD
    SCENE["Three.js Scene"]

    SCENE --> CAM["PerspectiveCamera\nfov: 38, pos: 0, 0.4, 6.5"]
    SCENE --> LIGHTS["Lighting"]
    SCENE --> OBJECTS["Objects (8 total)"]
    SCENE --> GROUND["Ground Disc"]

    LIGHTS --> L1["HemisphereLight\nsky: #dbeafe, ground: #e2e8f0"]
    LIGHTS --> L2["DirectionalLight (key)\nwhite, intensity 1.6"]
    LIGHTS --> L3["DirectionalLight (rim)\naccent color, intensity 0.6"]
    LIGHTS --> L4["PointLight (fill)\nblue tint, intensity 0.7"]

    OBJECTS --> O1["Center Cube\nBoxGeometry 1.55\nPrimary material"]
    OBJECTS --> O2["Icosahedron\nradius 0.6\nSoft material"]
    OBJECTS --> O3["Cone\n5-sided\nAccent blue"]
    OBJECTS --> O4["Torus\nink material"]
    OBJECTS --> O5["Small Cube\nink material"]
    OBJECTS --> O6["Octahedron\naccent glow (emissive)"]
    OBJECTS --> O7["Dodecahedron\nwireframe only"]
    OBJECTS --> O8["Tetrahedron\nink material"]

    GROUND --> GD["CircleGeometry 3.6\nlight gray, 60% opacity"]

    SCENE --> LOOP["Animation Loop\nsinusoidal float + rotation"]
    SCENE --> MOUSE["Mouse Interaction\nlerp factor 0.06"]
```

---

*Last updated: August 2026*

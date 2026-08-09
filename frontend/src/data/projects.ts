import type { Locale } from '@/i18n/messages';

export type ProjectKind = 'web' | 'app';

export interface Project {
  id: string;
  kind: ProjectKind;
  title: string;
  label: string;
  desc: string;
  tags: string[];
  client: string;
  role: string;
  year: string;
  platform: string;
  stack: string[];
  available: boolean;
  body: string[];
  highlights: string[];
  credits: string;
  cta: {
    label: string;
    href: string;
  };
}

/**
 * Shared (language-independent) project fields. Kept together with the
 * localized copy so each project is defined in exactly one place.
 */
interface ProjectMeta {
  id: string;
  kind: ProjectKind;
  tags: string[];
  client: string;
  year: string;
  platform: string;
  stack: string[];
  available: boolean;
  ctaHref: string;
}

/** Localized project copy. Every project must provide this for all locales. */
interface ProjectText {
  title: string;
  label: string;
  desc: string;
  role: string;
  body: string[];
  highlights: string[];
  credits: string;
  ctaLabel: string;
}

interface ProjectDefinition {
  meta: ProjectMeta;
  texts: Record<Locale, ProjectText>;
}

/**
 * HOW TO ADD A PROJECT
 * --------------------
 * 1. Add one entry to `projectDefinitions` below.
 * 2. Give it a unique `meta.id` plus the shared fields (kind, tags, stack, ...).
 * 3. Fill in `texts` for ALL four locales: en, nl, de, fr.
 *
 * `getProjects()` picks new entries up automatically — the projects grid, the
 * case-study modal and the tests need no other changes.
 */
const projectDefinitions: ProjectDefinition[] = [
  {
    meta: {
      id: 'portfolio',
      kind: 'web',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      client: 'Glenn Claes',
      year: '2026',
      platform: 'Web - Vercel',
      stack: [
        'Next.js App Router',
        'TypeScript',
        'Tailwind CSS',
        'Three.js',
        'Vercel',
        'GitHub Actions',
      ],
      available: true,
      ctaHref: 'https://github.com/GlennClaes/portfolio-glenn-claes',
    },
    texts: {
      en: {
        title: 'Glenn Claes Portfolio',
        label: 'Website - 2026 - Vercel',
        desc: 'A clean personal portfolio with a responsive one-page layout, interactive 3D hero, Vercel deployment and a GitHub Pages fallback.',
        role: 'Design adaptation, frontend build and deployment setup',
        body: [
          'This portfolio is built as a Vercel-ready Next.js site with a separate static export path for GitHub Pages.',
          'The visual system keeps the original high-end one-page structure but changes the brand direction to a blue, white, gray and black palette for Glenn Claes.',
          'The implementation includes responsive sections, an interactive WebGL hero, reusable React components, SEO metadata, Open Graph assets and automated quality checks.',
        ],
        highlights: [
          'Vercel deployment configured for the root domain',
          'Static export configured for the repository path on GitHub Pages',
          'Responsive desktop, tablet and mobile layouts',
          'Accessible color contrast and keyboard-friendly project modals',
          'CI workflow for install, lint, typecheck, tests, Vercel deploy and Pages deploy',
        ],
        credits:
          'Built for Glenn Claes. Hosted primarily with Vercel, with GitHub Pages available as a fallback.',
        ctaLabel: 'View the repository',
      },
      nl: {
        title: 'Glenn Claes Portfolio',
        label: 'Website - 2026 - Vercel',
        desc: 'Een strak persoonlijk portfolio met een responsive one-page layout, interactieve 3D-hero, Vercel-deployment en een GitHub Pages fallback.',
        role: 'Design-aanpassing, frontend-bouw en deployment-setup',
        body: [
          'Dit portfolio is gebouwd als een Vercel-ready Next.js-site met een apart statisch exportpad voor GitHub Pages.',
          'Het visuele systeem behoudt de originele high-end one-page structuur, maar geeft het merk een blauw-wit-grijs-zwarte richting voor Glenn Claes.',
          'De implementatie omvat responsive secties, een interactieve WebGL-hero, herbruikbare React-componenten, SEO-metadata, Open Graph-assets en geautomatiseerde kwaliteitschecks.',
        ],
        highlights: [
          'Vercel-deployment geconfigureerd voor het rootdomein',
          'Statische export geconfigureerd voor het repository-pad op GitHub Pages',
          'Responsive layouts voor desktop, tablet en mobiel',
          'Toegankelijk kleurcontrast en toetsenbordvriendelijke projectmodals',
          'CI-workflow voor install, lint, typecheck, tests, Vercel-deploy en Pages-deploy',
        ],
        credits: 'Gebouwd voor Glenn Claes. Vooral gehost op Vercel, met GitHub Pages als fallback.',
        ctaLabel: 'Bekijk de repository',
      },
      de: {
        title: 'Glenn Claes Portfolio',
        label: 'Website - 2026 - Vercel',
        desc: 'Ein klares persönliches Portfolio mit responsivem One-Page-Layout, interaktivem 3D-Hero, Vercel-Deployment und GitHub-Pages-Fallback.',
        role: 'Design-Anpassung, Frontend-Build und Deployment-Setup',
        body: [
          'Dieses Portfolio ist als Vercel-ready Next.js-Seite mit separatem statischem Exportpfad für GitHub Pages gebaut.',
          'Das visuelle System behält die ursprüngliche hochwertige One-Page-Struktur, setzt aber für Glenn Claes auf eine blau-weiß-grau-schwarze Farbwelt.',
          'Die Umsetzung umfasst responsive Sektionen, einen interaktiven WebGL-Hero, wiederverwendbare React-Komponenten, SEO-Metadaten, Open-Graph-Assets und automatisierte Qualitätsprüfungen.',
        ],
        highlights: [
          'Vercel-Deployment für die Root-Domain konfiguriert',
          'Statischer Export für den Repository-Pfad auf GitHub Pages konfiguriert',
          'Responsive Layouts für Desktop, Tablet und Mobil',
          'Barrierefreier Farbkontrast und tastaturfreundliche Projekt-Modals',
          'CI-Workflow für Install, Lint, Typecheck, Tests, Vercel-Deploy und Pages-Deploy',
        ],
        credits:
          'Gebaut für Glenn Claes. Hauptsächlich auf Vercel gehostet, mit GitHub Pages als Fallback.',
        ctaLabel: 'Repository ansehen',
      },
      fr: {
        title: 'Glenn Claes Portfolio',
        label: 'Site web - 2026 - Vercel',
        desc: 'Un portfolio personnel épuré avec une mise en page one-page responsive, un hero 3D interactif, un déploiement Vercel et un repli GitHub Pages.',
        role: 'Adaptation du design, développement frontend et mise en place du déploiement',
        body: [
          "Ce portfolio est construit comme un site Next.js prêt pour Vercel, avec un chemin d'export statique séparé pour GitHub Pages.",
          "Le système visuel conserve la structure one-page haut de gamme d'origine, mais oriente la marque vers une palette bleu, blanc, gris et noir pour Glenn Claes.",
          "L'implémentation comprend des sections responsives, un hero WebGL interactif, des composants React réutilisables, des métadonnées SEO, des assets Open Graph et des contrôles qualité automatisés.",
        ],
        highlights: [
          'Déploiement Vercel configuré pour le domaine racine',
          'Export statique configuré pour le chemin du dépôt sur GitHub Pages',
          'Mises en page responsives pour desktop, tablette et mobile',
          'Contraste de couleurs accessible et modales de projets accessibles au clavier',
          'Workflow CI pour install, lint, typecheck, tests, déploiement Vercel et Pages',
        ],
        credits:
          'Conçu pour Glenn Claes. Hébergé principalement sur Vercel, avec GitHub Pages en repli.',
        ctaLabel: 'Voir le dépôt',
      },
    },
  },
  {
    meta: {
      id: 'delivery-system',
      kind: 'app',
      tags: ['ESLint', 'Vitest', 'Playwright', 'Vercel'],
      client: 'Glenn Claes',
      year: '2026',
      platform: 'GitHub Actions - Vercel',
      stack: ['ESLint', 'Prettier', 'Vitest', 'Playwright', 'axe', 'Vercel', 'GitHub Pages'],
      available: true,
      ctaHref: '#contact',
    },
    texts: {
      en: {
        title: 'Quality-First Delivery System',
        label: 'Workflow - Vercel - CI/CD',
        desc: 'A practical delivery workflow that keeps the site maintainable: typed components, focused tests, smoke checks and automated Vercel deployment.',
        role: 'Quality workflow and automation setup',
        body: [
          'The delivery system keeps the portfolio deployable by checking the important pieces before every release.',
          'Unit and component tests cover core interactions, while Playwright validates the smoke path, project modal behavior, canvas rendering and accessibility across key breakpoints.',
          'After merges to main, GitHub Actions can deploy the production build to Vercel and publish the static fallback to GitHub Pages.',
        ],
        highlights: [
          'Strict TypeScript and ESLint checks',
          'Component tests for contact and project interactions',
          'Playwright smoke and accessibility checks',
          'Automatic Vercel deployment after main branch updates',
          'GitHub Pages fallback deployment for the repository path',
        ],
        credits: 'Automation configured for the Glenn Claes portfolio repository.',
        ctaLabel: 'Discuss a workflow',
      },
      nl: {
        title: 'Kwaliteitsgerichte Delivery Workflow',
        label: 'Workflow - Vercel - CI/CD',
        desc: 'Een praktische delivery-workflow die de site onderhoudbaar houdt: getypeerde componenten, gerichte tests, smoke checks en geautomatiseerde Vercel-deployment.',
        role: 'Kwaliteitsworkflow en automatisatie-setup',
        body: [
          'Het delivery-systeem houdt het portfolio deploybaar door vóór elke release de belangrijkste onderdelen te controleren.',
          'Unit- en componenttests dekken de kerninteracties, terwijl Playwright het smoke-pad, het gedrag van projectmodals, canvas-rendering en toegankelijkheid op belangrijke breakpoints valideert.',
          'Na merges naar main kan GitHub Actions de productie-build naar Vercel deployen en de statische fallback naar GitHub Pages publiceren.',
        ],
        highlights: [
          'Strikte TypeScript- en ESLint-checks',
          'Componenttests voor contact- en projectinteracties',
          'Playwright smoke- en toegankelijkheidschecks',
          'Automatische Vercel-deployment na updates op de main-branch',
          'GitHub Pages fallback-deployment voor het repository-pad',
        ],
        credits: 'Automatisatie geconfigureerd voor de Glenn Claes portfolio-repository.',
        ctaLabel: 'Bespreek een workflow',
      },
      de: {
        title: 'Qualitätsorientiertes Delivery-System',
        label: 'Workflow - Vercel - CI/CD',
        desc: 'Ein praktischer Delivery-Workflow, der die Website wartbar hält: typisierte Komponenten, fokussierte Tests, Smoke-Checks und automatisiertes Vercel-Deployment.',
        role: 'Qualitäts-Workflow und Automatisierungs-Setup',
        body: [
          'Das Delivery-System hält das Portfolio deploybar, indem es vor jedem Release die wichtigen Bausteine prüft.',
          'Unit- und Komponententests decken die Kerninteraktionen ab, während Playwright den Smoke-Pfad, das Verhalten der Projekt-Modals, das Canvas-Rendering und die Barrierefreiheit an wichtigen Breakpoints validiert.',
          'Nach Merges auf main kann GitHub Actions den Produktions-Build nach Vercel deployen und das statische Fallback auf GitHub Pages veröffentlichen.',
        ],
        highlights: [
          'Strenges TypeScript und ESLint-Checks',
          'Komponententests für Kontakt- und Projektinteraktionen',
          'Playwright-Smoke- und Barrierefreiheits-Checks',
          'Automatisches Vercel-Deployment nach Updates auf main',
          'GitHub-Pages-Fallback-Deployment für den Repository-Pfad',
        ],
        credits: 'Automatisierung für das Glenn-Claes-Portfolio-Repository konfiguriert.',
        ctaLabel: 'Workflow besprechen',
      },
      fr: {
        title: 'Système de livraison orienté qualité',
        label: 'Workflow - Vercel - CI/CD',
        desc: 'Un workflow de livraison pratique qui garde le site maintenable : composants typés, tests ciblés, smoke checks et déploiement Vercel automatisé.',
        role: "Workflow qualité et mise en place de l'automatisation",
        body: [
          'Le système de livraison garde le portfolio déployable en vérifiant les éléments importants avant chaque mise en production.',
          "Les tests unitaires et de composants couvrent les interactions clés, tandis que Playwright valide le parcours smoke, le comportement des modales, le rendu canvas et l'accessibilité aux principaux points de rupture.",
          'Après les fusions vers main, GitHub Actions peut déployer le build de production sur Vercel et publier le repli statique sur GitHub Pages.',
        ],
        highlights: [
          'TypeScript strict et contrôles ESLint',
          'Tests de composants pour les interactions de contact et de projets',
          "Smoke checks et contrôles d'accessibilité Playwright",
          'Déploiement Vercel automatique après les mises à jour de la branche main',
          'Déploiement de repli GitHub Pages pour le chemin du dépôt',
        ],
        credits: 'Automatisation configurée pour le dépôt du portfolio de Glenn Claes.',
        ctaLabel: "Discuter d'un workflow",
      },
    },
  },
];

export function getProjects(locale: Locale): Project[] {
  return projectDefinitions.map(({ meta, texts }) => {
    const text = texts[locale];
    return {
      id: meta.id,
      kind: meta.kind,
      title: text.title,
      label: text.label,
      desc: text.desc,
      tags: meta.tags,
      client: meta.client,
      role: text.role,
      year: meta.year,
      platform: meta.platform,
      stack: meta.stack,
      available: meta.available,
      body: text.body,
      highlights: text.highlights,
      credits: text.credits,
      cta: { label: text.ctaLabel, href: meta.ctaHref },
    };
  });
}

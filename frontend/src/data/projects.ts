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

export const projects: Project[] = [
  {
    id: 'portfolio',
    kind: 'web',
    title: 'Glenn Claes Portfolio',
    label: 'Website - 2026 - Vercel',
    desc: 'A clean personal portfolio with a responsive one-page layout, interactive 3D hero, Vercel deployment and a GitHub Pages fallback.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    client: 'Glenn Claes',
    role: 'Design adaptation, frontend build and deployment setup',
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
    cta: {
      label: 'View the repository',
      href: 'https://github.com/GlennClaes/portfolio-glenn-claes',
    },
  },
  {
    id: 'delivery-system',
    kind: 'app',
    title: 'Quality-First Delivery System',
    label: 'Workflow - Vercel - CI/CD',
    desc: 'A practical delivery workflow that keeps the site maintainable: typed components, focused tests, smoke checks and automated Vercel deployment.',
    tags: ['ESLint', 'Vitest', 'Playwright', 'Vercel'],
    client: 'Glenn Claes',
    role: 'Quality workflow and automation setup',
    year: '2026',
    platform: 'GitHub Actions - Vercel',
    stack: ['ESLint', 'Prettier', 'Vitest', 'Playwright', 'axe', 'Vercel', 'GitHub Pages'],
    available: true,
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
    cta: {
      label: 'Discuss a workflow',
      href: '#contact',
    },
  },
];

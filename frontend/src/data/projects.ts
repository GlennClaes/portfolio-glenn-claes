export type ProjectKind = 'dday' | 'app';

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
    id: 'dday',
    kind: 'dday',
    title: 'Virtual D-Day',
    label: 'Game · 2026 · Steam',
    desc: 'A 3D virtual staff ride of the D-Day landings. I built the specialised guided camera system that drives the narrated experience and free-exploration mode.',
    tags: ['Unity', 'C#', 'Game Development', 'Camera Systems'],
    client: 'FORCES Inc · Purdue University',
    role: 'Specialised guided camera system',
    year: '2026',
    platform: 'Steam (PC)',
    stack: ['Unity', 'C#', 'Custom camera rig', 'Cinemachine', 'Timeline'],
    available: true,
    body: [
      "Virtual D-Day is a historically grounded 3D simulation of the Normandy landings, developed by FORCES Inc — a Purdue-affiliated startup — and launching on Steam as part of Purdue's America250 celebrations.",
      'The experience reconstructs the terrain, infrastructure, fleet, and specific units of the morning of June 6, 1944 — beginning with the seizure of Pointe du Hoc on Omaha Beach, and expanding to cover the 101st Airborne airdrop near Sainte-Mère-Église and the British glider capture of Pegasus Bridge.',
      'My contribution focused on the specialised guided camera system: a hybrid rig that drives the narrated, cinematic mode while still handing off smoothly to a fully interactive exploration mode. The goal was a camera that feels editorial when it needs to teach, and free when it needs to get out of the way.',
    ],
    highlights: [
      'Hybrid scripted / free-look camera state machine',
      'Smooth blend between cinematic beats and player control',
      "Used in Purdue's Master of Science in Strategy & Security program",
      'Tech disclosed to Purdue Innovates OTC — US patent granted',
    ],
    credits:
      'Developed at FORCES Inc. Project lead: Sorin Adam Matei. Chief software architect: Matthew Konkoly. Co-founder: Robert Kirchubel.',
    cta: {
      label: 'Read the Purdue news release',
      href: 'https://www.purdue.edu/newsroom/',
    },
  },
  {
    id: 'rlc',
    kind: 'app',
    title: 'Red Letter Christians — Daily Companion App',
    label: 'App · Releasing July 2026',
    desc: 'A mobile companion to a forthcoming book — a calm, minimal daily-content app I took from first design through to a shipped product on iOS and Android.',
    tags: ['Mobile App', 'iOS & Android', 'End-to-end', 'UX/UI'],
    client: 'Red Letter Christians',
    role: 'Design & development lead — end-to-end',
    year: 'Releasing July 2026',
    platform: 'iOS · Android',
    stack: ['Figma', 'Cross-platform mobile', 'Push notifications', 'Custom content tooling'],
    available: true,
    body: [
      'A daily-content companion app for Red Letter Christians — the digital extension of their forthcoming book. The app opens on today\'s content and lets the reader move through morning, midday and evening sections, plus a daily "Waymaker" card, each paired with original artwork commissioned for the project.',
      'I took this one end-to-end: scoping the requirements with the client and publisher, designing every screen in Figma across multiple review rounds, planning a lightweight app architecture that stays adaptable for future content, and developing the cross-platform build. Going from initial design to a complete, shipped product — including publishing prep with the client and their publisher — was my responsibility throughout.',
      'The brief asked for a calm, minimal, deeply readable experience, so the design leans into restraint: simple type, generous spacing, and a strong central role for the daily artwork. Each day has its own image, surfaced front-and-centre on the landing screen and visually anchoring the four daily sections beneath it.',
    ],
    highlights: [
      'End-to-end ownership — requirements, design, architecture, development, publishing prep',
      '366 days of content with rotating original artwork for each day',
      'Landing screen "Today\'s Liturgy" highlights the right section by time of day',
      'Per-section push notifications users schedule themselves',
      'Search across daily content, occasional content, themes, and dates',
      "Custom import tooling to turn the publisher's source files into app content automatically",
    ],
    credits:
      'Client: Red Letter Christians. Artwork commissioned for the project. Releasing on iOS & Android, July 2026.',
    cta: {
      label: 'Discuss an app project',
      href: '#contact',
    },
  },
];

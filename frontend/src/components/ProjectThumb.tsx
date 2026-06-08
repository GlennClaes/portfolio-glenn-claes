import type { ProjectKind } from '@/data/projects';

interface ProjectThumbProps {
  kind: ProjectKind;
  accent?: string;
}

const workflowRows = [
  ['lint', 0, '#FFFFFF'],
  ['types', 62, '#FFFFFF'],
  ['tests', 124, '#FFFFFF'],
] as const;

export function ProjectThumb({ kind, accent = 'var(--accent)' }: ProjectThumbProps) {
  if (kind === 'web') {
    return (
      <svg
        className="thumb-art"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="webBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#DCE7F7" />
          </linearGradient>
          <linearGradient id="webPanel" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EFF6FF" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill="url(#webBg)" />
        <circle cx="62" cy="52" r="34" fill={accent} opacity="0.14" />
        <circle cx="340" cy="202" r="54" fill="#111827" opacity="0.08" />
        <g transform="translate(52 46)">
          <rect width="296" height="158" rx="18" fill="#FFFFFF" stroke="#CBD5E1" />
          <rect width="296" height="34" rx="18" fill="#111827" />
          <circle cx="22" cy="17" r="5" fill="#DBEAFE" />
          <circle cx="40" cy="17" r="5" fill="#94A3B8" />
          <circle cx="58" cy="17" r="5" fill="#1D4ED8" />
          <rect x="24" y="58" width="92" height="18" rx="9" fill={accent} />
          <rect x="24" y="90" width="152" height="8" rx="4" fill="#1F2937" opacity="0.76" />
          <rect x="24" y="108" width="116" height="8" rx="4" fill="#64748B" />
          <rect
            x="210"
            y="54"
            width="58"
            height="58"
            rx="14"
            fill="url(#webPanel)"
            stroke="#CBD5E1"
          />
          <path d="M232 90h28M246 76v28" stroke={accent} strokeWidth="6" strokeLinecap="round" />
          <rect x="24" y="136" width="70" height="20" rx="10" fill="#EFF6FF" stroke="#BFDBFE" />
          <rect x="106" y="136" width="70" height="20" rx="10" fill="#F1F5F9" stroke="#CBD5E1" />
        </g>
        <path
          d="M64 210 C110 184 142 236 190 208 S286 184 338 214"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          opacity="0.55"
        />
      </svg>
    );
  }

  return (
    <svg
      className="thumb-art"
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="workflowBg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#workflowBg)" />
      <circle cx="78" cy="188" r="52" fill={accent} opacity="0.1" />
      <circle cx="326" cy="58" r="36" fill="#111827" opacity="0.1" />
      <g transform="translate(58 48)">
        {workflowRows.map(([label, y, fill]) => (
          <g key={label} transform={`translate(0 ${y})`}>
            <rect width="178" height="42" rx="12" fill={fill} stroke="#CBD5E1" />
            <circle cx="22" cy="21" r="8" fill={accent} opacity="0.16" />
            <path
              d="M18 21l4 4 8-10"
              fill="none"
              stroke={accent}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect x="44" y="14" width="76" height="7" rx="3.5" fill="#111827" opacity="0.72" />
            <rect x="44" y="26" width="110" height="5" rx="2.5" fill="#64748B" />
          </g>
        ))}
      </g>
      <g transform="translate(254 62)">
        <rect width="92" height="126" rx="18" fill="#111827" />
        <rect x="14" y="18" width="64" height="10" rx="5" fill="#FFFFFF" opacity="0.92" />
        <rect x="14" y="42" width="64" height="48" rx="12" fill={accent} />
        <rect x="24" y="104" width="44" height="6" rx="3" fill="#FFFFFF" opacity="0.7" />
      </g>
      <path
        d="M214 70h34M214 132h34"
        stroke={accent}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 10"
      />
    </svg>
  );
}

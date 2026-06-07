import type { ProjectKind } from '@/data/projects';

interface ProjectThumbProps {
  kind: ProjectKind;
  accent?: string;
}

export function ProjectThumb({ kind, accent = 'var(--accent)' }: ProjectThumbProps) {
  if (kind === 'dday') {
    return (
      <svg
        className="thumb-art"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFE0B8" />
            <stop offset="60%" stopColor="#F4B97A" />
            <stop offset="100%" stopColor="#D88149" />
          </linearGradient>
          <linearGradient id="sea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#9B7152" />
            <stop offset="100%" stopColor="#5B432F" />
          </linearGradient>
        </defs>
        <rect width="400" height="170" fill="url(#sky)" />
        <circle cx="310" cy="82" r="28" fill="#FFF1D6" opacity="0.85" />
        <ellipse cx="80" cy="60" rx="42" ry="7" fill="#FFF1D6" opacity="0.6" />
        <ellipse cx="220" cy="45" rx="60" ry="6" fill="#FFF1D6" opacity="0.5" />
        <rect y="170" width="400" height="80" fill="url(#sea)" />
        <path d="M0 170 L0 110 L70 100 L110 130 L150 120 L180 170 Z" fill="#3F2E20" />
        <path
          d="M250 170 L260 145 L300 150 L330 140 L400 155 L400 170 Z"
          fill="#5C4330"
          opacity="0.7"
        />
        {[
          [125, 78],
          [170, 55],
          [265, 72],
          [345, 40],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <path
              d={`M${cx - 12} ${cy} Q${cx} ${cy - 10} ${cx + 12} ${cy} L${cx + 8} ${
                cy + 4
              } L${cx - 8} ${cy + 4} Z`}
              fill="#2A1F16"
              opacity="0.85"
            />
            <line
              x1={cx - 8}
              y1={cy + 4}
              x2={cx - 2}
              y2={cy + 16}
              stroke="#2A1F16"
              strokeWidth="0.7"
            />
            <line
              x1={cx + 8}
              y1={cy + 4}
              x2={cx + 2}
              y2={cy + 16}
              stroke="#2A1F16"
              strokeWidth="0.7"
            />
            <circle cx={cx} cy={cy + 19} r="2.4" fill="#2A1F16" />
          </g>
        ))}
        <path d="M30 200 L70 200 L65 212 L35 212 Z" fill="#2A1F16" />
        <path d="M120 215 L160 215 L155 226 L125 226 Z" fill="#2A1F16" />
        <path d="M260 195 L295 195 L290 206 L265 206 Z" fill="#2A1F16" />
        <circle cx="310" cy="82" r="6" fill={accent} />
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
        <linearGradient id="rlcBg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F5EDDF" />
          <stop offset="100%" stopColor="#E6D6BC" />
        </linearGradient>
        <linearGradient id="rlcArt" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFE0BD" />
          <stop offset="60%" stopColor="#F4A266" />
          <stop offset="100%" stopColor="#B8552A" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#rlcBg)" />
      <circle cx="58" cy="58" r="34" fill={accent} opacity="0.16" />
      <circle cx="350" cy="195" r="46" fill={accent} opacity="0.10" />
      <g transform="translate(130 22)">
        <rect width="140" height="206" rx="22" fill="#FFFFFF" stroke="#D8CDBE" strokeWidth="1.2" />
        <rect x="56" y="8" width="28" height="6" rx="3" fill="#D8CDBE" />
        <g transform="translate(18 22)">
          <rect width="104" height="22" rx="11" fill="#F4F1EB" stroke="#E5DECC" />
          <circle cx="14" cy="11" r="4" fill={accent} />
          <rect x="24" y="6" width="48" height="4" rx="2" fill="#1A1613" opacity="0.55" />
          <rect x="24" y="13" width="34" height="3.5" rx="1.75" fill="#1A1613" opacity="0.3" />
        </g>
        <g transform="translate(18 52)">
          <rect width="104" height="68" rx="10" fill="url(#rlcArt)" />
          <circle cx="52" cy="32" r="13" fill="#FFF1D6" opacity="0.85" />
          <path d="M0 56 Q26 44 52 50 T104 52 L104 68 L0 68 Z" fill="#2A1F16" opacity="0.35" />
          <path d="M0 62 Q30 56 60 60 T104 60 L104 68 L0 68 Z" fill="#2A1F16" opacity="0.5" />
        </g>
        {[0, 1, 2, 3].map((index) => (
          <g key={index} transform={`translate(18 ${128 + index * 18})`}>
            <rect
              width="104"
              height="14"
              rx="7"
              fill={index === 1 ? accent : '#F4F1EB'}
              stroke={index === 1 ? 'transparent' : '#E5DECC'}
            />
            <circle
              cx="10"
              cy="7"
              r="3"
              fill={index === 1 ? '#FFFFFF' : accent}
              opacity={index === 1 ? 1 : 0.85}
            />
            <rect
              x="20"
              y="4.5"
              width={[36, 30, 34, 44][index]}
              height="3.2"
              rx="1.6"
              fill={index === 1 ? '#FFFFFF' : '#1A1613'}
              opacity={index === 1 ? 1 : 0.55}
            />
            <rect
              x="20"
              y="9.5"
              width={[22, 18, 20, 28][index]}
              height="2.4"
              rx="1.2"
              fill={index === 1 ? '#FFFFFF' : '#1A1613'}
              opacity={index === 1 ? 0.8 : 0.3}
            />
          </g>
        ))}
      </g>
      <g transform="translate(38 150)">
        <rect width="74" height="38" rx="10" fill="#FFFFFF" stroke="#E5DECC" />
        <circle cx="14" cy="19" r="6" fill={accent} opacity="0.85" />
        <rect x="26" y="13" width="38" height="3.5" rx="1.75" fill="#1A1613" opacity="0.55" />
        <rect x="26" y="20" width="28" height="3" rx="1.5" fill="#1A1613" opacity="0.3" />
      </g>
      <g transform="translate(290 60)">
        <rect width="78" height="44" rx="10" fill="#FFFFFF" stroke="#E5DECC" />
        <rect x="10" y="10" width="58" height="6" rx="3" fill="#1A1613" opacity="0.7" />
        <rect x="10" y="22" width="44" height="3" rx="1.5" fill="#1A1613" opacity="0.4" />
        <rect x="10" y="28" width="50" height="3" rx="1.5" fill="#1A1613" opacity="0.3" />
        <rect x="10" y="34" width="34" height="3" rx="1.5" fill="#1A1613" opacity="0.3" />
      </g>
    </svg>
  );
}

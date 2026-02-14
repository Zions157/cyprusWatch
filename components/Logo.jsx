'use client';

export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#F4E4BC', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Outer circle - watch bezel */}
      <circle cx="100" cy="100" r="95" fill="url(#blueGradient)" />
      <circle cx="100" cy="100" r="88" fill="#1e1b4b" />

      {/* Inner dial */}
      <circle cx="100" cy="100" r="75" fill="#0f0d24" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="url(#goldGradient)" strokeWidth="1" />

      {/* Hour markers */}
      <g fill="url(#goldGradient)">
        <rect x="97" y="32" width="6" height="15" rx="2" />
        <rect x="97" y="153" width="6" height="15" rx="2" />
        <rect x="32" y="97" width="15" height="6" rx="2" />
        <rect x="153" y="97" width="15" height="6" rx="2" />
      </g>

      {/* Small hour markers */}
      <g fill="#D4AF37" opacity="0.7">
        <circle cx="100" cy="40" r="2" />
        <circle cx="130" cy="48" r="2" />
        <circle cx="152" cy="70" r="2" />
        <circle cx="160" cy="100" r="2" />
        <circle cx="152" cy="130" r="2" />
        <circle cx="130" cy="152" r="2" />
        <circle cx="100" cy="160" r="2" />
        <circle cx="70" cy="152" r="2" />
        <circle cx="48" cy="130" r="2" />
        <circle cx="40" cy="100" r="2" />
        <circle cx="48" cy="70" r="2" />
        <circle cx="70" cy="48" r="2" />
      </g>

      {/* Hour hand */}
      <path d="M97 100 L97 65 Q100 60 103 65 L103 100 Z" fill="url(#goldGradient)" />

      {/* Minute hand */}
      <path d="M98 100 L98 45 Q100 40 102 45 L102 100 Z" fill="#ffffff" />

      {/* Second hand */}
      <line x1="100" y1="110" x2="100" y2="50" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="100" cy="110" r="3" fill="#EF4444" />

      {/* Center cap */}
      <circle cx="100" cy="100" r="8" fill="url(#goldGradient)" />
      <circle cx="100" cy="100" r="5" fill="#1e1b4b" />
      <circle cx="100" cy="100" r="3" fill="url(#goldGradient)" />

      {/* Cyprus "CW" letter subtle watermark */}
      <text
        x="100"
        y="130"
        fontFamily="Georgia, serif"
        fontSize="24"
        fontWeight="bold"
        fill="url(#goldGradient)"
        opacity="0.3"
        textAnchor="middle"
      >
        CW
      </text>
    </svg>
  );
}

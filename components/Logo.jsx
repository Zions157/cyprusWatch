'use client';

export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#F5E6A3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="crownGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#B8960C', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Crown base - 5 pointed crown similar to luxury watch brands */}
      <g fill="url(#crownGold)" stroke="url(#crownGoldDark)" strokeWidth="1">
        {/* Left outer spike */}
        <path d="M15 70 L22 35 L30 55 L30 70 Z" />
        
        {/* Left inner spike */}
        <path d="M30 70 L35 25 L43 50 L43 70 Z" />
        
        {/* Center spike (tallest) */}
        <path d="M43 70 L50 15 L57 70 Z" />
        
        {/* Right inner spike */}
        <path d="M57 70 L65 25 L70 55 L70 70 Z" />
        
        {/* Right outer spike */}
        <path d="M70 70 L78 35 L85 70 Z" />
      </g>

      {/* Crown jewels/dots at tips */}
      <g fill="url(#crownGold)">
        <circle cx="22" cy="33" r="4" />
        <circle cx="35" cy="23" r="4" />
        <circle cx="50" cy="13" r="5" />
        <circle cx="65" cy="23" r="4" />
        <circle cx="78" cy="33" r="4" />
      </g>

      {/* Crown band/base */}
      <rect x="12" y="70" width="76" height="15" rx="3" fill="url(#crownGold)" stroke="url(#crownGoldDark)" strokeWidth="1" />
      
      {/* Decorative line on band */}
      <rect x="15" y="74" width="70" height="2" fill="url(#crownGoldDark)" opacity="0.5" />
      <rect x="15" y="80" width="70" height="2" fill="url(#crownGoldDark)" opacity="0.5" />

      {/* Small gems on the band */}
      <g fill="#FFFFFF" opacity="0.8">
        <circle cx="30" cy="77" r="2" />
        <circle cx="50" cy="77" r="2" />
        <circle cx="70" cy="77" r="2" />
      </g>
    </svg>
  );
}

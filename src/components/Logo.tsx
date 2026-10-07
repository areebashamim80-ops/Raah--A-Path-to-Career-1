import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'horizontal';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  theme = 'light',
  showTagline = true,
}) => {
  // Dimensions based on size
  const iconSizes = {
    sm: 32,
    md: 44,
    lg: 56,
    xl: 76,
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#182238';
  const subtextColor = isDark ? '#94A3B8' : '#475569';
  const amberColor = '#F59E0B';
  const sunGradientId = `raah-sun-${size}-${theme}`;

  // Dedicated SVG Icon component
  const LogoIcon = (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="RAAH Logo"
    >
      <defs>
        {/* Warm Golden Sunrise Gradient */}
        <radialGradient
          id={sunGradientId}
          cx="60%"
          cy="40%"
          r="60%"
          fx="50%"
          fy="30%"
        >
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
        {/* Soft shadow for depth */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Warm Sun in background */}
      <circle cx="95" cy="58" r="32" fill={`url(#${sunGradientId})`} opacity="0.95" />

      {/* Main R Body (Dark Slate Navy) */}
      <g filter="url(#shadow)">
        {/* Vertical Left Stem of R */}
        <path
          d="M 44 42 L 68 42 L 68 128 L 44 128 Z"
          fill="#1A253D"
        />

        {/* Upper Loop / Bowl of R */}
        <path
          d="M 68 42 C 104 42 120 54 120 74 C 120 92 104 100 78 100 L 68 100 Z"
          fill="#1A253D"
        />

        {/* Right Leg of R */}
        <path
          d="M 72 94 L 102 94 L 128 128 L 98 128 Z"
          fill="#1A253D"
        />
      </g>

      {/* Mortarboard / Graduation Cap on top-left of R */}
      <g>
        {/* Diamond Cap Plate */}
        <polygon
          points="28,34 56,22 84,34 56,46"
          fill="#1A253D"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        {/* Cap skull base */}
        <path
          d="M 42 40 C 42 46 70 46 70 40 Z"
          fill="#0F172A"
        />
        {/* Tassel Button & Dangling Cord */}
        <circle cx="56" cy="34" r="2.5" fill={amberColor} />
        {/* Dangling Tassel on the left */}
        <path
          d="M 56 34 Q 38 38 34 52"
          stroke={amberColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tassel end bulb */}
        <polygon
          points="31,52 37,52 36,60 32,60"
          fill={amberColor}
        />
      </g>

      {/* The Winding Road / Path (White & perspective curve) */}
      {/* Top entry of curve passing through the R loop */}
      <path
        d="M 124 64 C 98 64 62 76 52 98 C 48 106 50 118 76 128 C 66 126 58 116 62 104 C 70 86 102 78 124 74 Z"
        fill="#FFFFFF"
      />
      {/* Road center dash / perspective divider */}
      <path
        d="M 112 68 C 96 70 76 80 68 98 C 65 106 67 114 74 120"
        stroke="#CBD5E1"
        strokeWidth="1.8"
        strokeDasharray="4 3"
        fill="none"
      />

      {/* Origami Paper Airplane Flying to upper right */}
      <g transform="translate(112, 44) rotate(-15) scale(0.95)">
        {/* Left wing */}
        <polygon
          points="0,8 24,0 12,20"
          fill="#F59E0B"
        />
        {/* Right wing/underside */}
        <polygon
          points="12,20 24,0 16,14"
          fill="#D97706"
        />
        {/* Keel fold */}
        <polygon
          points="12,20 16,14 13,16"
          fill="#B45309"
        />
      </g>
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  // Stylized RAAH Wordmark with peak carets for 'A'
  const Wordmark = (
    <div className="flex flex-col">
      <div className="flex items-center tracking-wider font-extrabold select-none leading-none">
        <span
          style={{ color: textColor }}
          className={`font-black tracking-widest ${
            size === 'sm'
              ? 'text-lg'
              : size === 'md'
              ? 'text-2xl'
              : size === 'lg'
              ? 'text-3xl'
              : 'text-4xl'
          }`}
        >
          R
          <span className="inline-block mx-[1px] transform -translate-y-[0.5px]">Λ</span>
          <span className="inline-block mx-[1px] transform -translate-y-[0.5px]">Λ</span>
          H
        </span>
      </div>
      {showTagline && (
        <div className="flex items-center space-x-1.5 mt-0.5 select-none">
          <span className="h-[1.5px] w-3 rounded-full" style={{ backgroundColor: amberColor }} />
          <span
            className={`font-medium tracking-wide uppercase ${
              size === 'sm'
                ? 'text-[8px]'
                : size === 'md'
                ? 'text-[10px]'
                : size === 'lg'
                ? 'text-[11px]'
                : 'text-xs'
            }`}
            style={{ color: subtextColor }}
          >
            Your Path to Career
          </span>
          <span className="h-[1.5px] w-3 rounded-full" style={{ backgroundColor: amberColor }} />
        </div>
      )}
    </div>
  );

  return (
    <div className={`group inline-flex items-center gap-3 cursor-pointer ${className}`}>
      {LogoIcon}
      {Wordmark}
    </div>
  );
};

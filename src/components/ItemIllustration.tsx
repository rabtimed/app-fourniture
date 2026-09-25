import React from 'react';

interface ItemIllustrationProps {
  itemId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'projector';
}

export const ItemIllustration: React.FC<ItemIllustrationProps> = ({
  itemId,
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
    projector: 'w-64 h-64 md:w-72 md:h-72',
  };

  const currentSize = sizeMap[size];

  switch (itemId) {
    case 'book':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Back cover */}
            <rect x="36" y="24" width="132" height="152" rx="14" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="4" />
            <path d="M42 24 H54 V176 H42 Z" fill="#1E3A8A" />
            {/* Gold decorative spine line */}
            <line x1="58" y1="28" x2="58" y2="172" stroke="#FBBF24" strokeWidth="3" strokeDasharray="6 4" />
            {/* Pages bulk */}
            <rect x="52" y="32" width="112" height="136" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
            {/* Page lines */}
            <line x1="68" y1="52" x2="148" y2="52" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            <line x1="68" y1="72" x2="148" y2="72" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            <line x1="68" y1="92" x2="148" y2="92" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            <line x1="68" y1="112" x2="132" y2="112" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            {/* Front cover opening slant */}
            <path d="M50 30 C 90 28, 140 26, 168 34 L 168 166 C 140 160, 90 162, 50 168 Z" fill="#3B82F6" stroke="#2563EB" strokeWidth="4" />
            {/* Book emblem */}
            <circle cx="108" cy="98" r="28" fill="#FEF08A" stroke="#EAB308" strokeWidth="3" />
            <text x="108" y="106" textAnchor="middle" fontSize="26" fill="#854D0E">📖</text>
            {/* Ribbon bookmark */}
            <path d="M96 28 V120 L104 112 L112 120 V28 Z" fill="#EF4444" />
          </svg>
        </div>
      );

    case 'notebook':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Notebook cover */}
            <rect x="36" y="24" width="130" height="154" rx="14" fill="#F97316" stroke="#EA580C" strokeWidth="4" />
            {/* Notebook inner sheet */}
            <rect x="52" y="32" width="106" height="138" rx="8" fill="#FFFBEB" stroke="#FED7AA" strokeWidth="2" />
            {/* Ruled lines */}
            <line x1="62" y1="58" x2="146" y2="58" stroke="#93C5FD" strokeWidth="2.5" />
            <line x1="62" y1="78" x2="146" y2="78" stroke="#93C5FD" strokeWidth="2.5" />
            <line x1="62" y1="98" x2="146" y2="98" stroke="#93C5FD" strokeWidth="2.5" />
            <line x1="62" y1="118" x2="146" y2="118" stroke="#93C5FD" strokeWidth="2.5" />
            <line x1="62" y1="138" x2="130" y2="138" stroke="#93C5FD" strokeWidth="2.5" />
            {/* Margin vertical red line */}
            <line x1="78" y1="36" x2="78" y2="166" stroke="#FCA5A5" strokeWidth="2" />
            {/* Notebook label sticker */}
            <rect x="80" y="82" width="66" height="38" rx="6" fill="#FFFFFF" stroke="#FDBA74" strokeWidth="2" />
            <line x1="88" y1="94" x2="138" y2="94" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="88" y1="106" x2="128" y2="106" stroke="#CBD5E1" strokeWidth="2" />
            {/* Wire binding spirals */}
            {[38, 54, 70, 86, 102, 118, 134, 150, 164].map((y, idx) => (
              <g key={idx}>
                <circle cx="36" cy={y} r="5" fill="#475569" />
                <path d={`M32 ${y - 4} C 22 ${y - 6}, 22 ${y + 6}, 42 ${y + 4}`} stroke="#94A3B8" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            ))}
          </svg>
        </div>
      );

    case 'pen':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(-38 100 100)">
              {/* Pen barrel */}
              <rect x="88" y="50" width="24" height="100" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
              {/* Grip grooves */}
              <rect x="88" y="115" width="24" height="35" rx="3" fill="#38BDF8" />
              <line x1="88" y1="124" x2="112" y2="124" stroke="#0284C7" strokeWidth="2" />
              <line x1="88" y1="134" x2="112" y2="134" stroke="#0284C7" strokeWidth="2" />
              <line x1="88" y1="144" x2="112" y2="144" stroke="#0284C7" strokeWidth="2" />
              {/* Pen cone */}
              <path d="M88 150 L100 180 L112 150 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              {/* Nib tip */}
              <circle cx="100" cy="180" r="3" fill="#0F172A" />
              {/* Pen clicker / cap end */}
              <rect x="92" y="32" width="16" height="20" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              <rect x="95" y="24" width="10" height="10" rx="2" fill="#64748B" />
              {/* Clip */}
              <path d="M86 52 H80 V110 C80 114 84 114 86 110" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Sparkle highlight */}
              <line x1="94" y1="60" x2="94" y2="105" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      );

    case 'eraser':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(18 100 100)">
              {/* Rubber body */}
              <rect x="42" y="55" width="116" height="88" rx="14" fill="#F43F5E" stroke="#E11D48" strokeWidth="4" />
              {/* Left clean white eraser side */}
              <path d="M42 69 C42 61 48 55 56 55 H90 V143 H56 C48 143 42 137 42 129 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />
              {/* Protective cardboard sleeve */}
              <rect x="76" y="51" width="54" height="96" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
              {/* Eraser brand badge stripe */}
              <rect x="80" y="70" width="46" height="24" rx="4" fill="#FDE047" />
              <text x="103" y="86" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1E3A8A">ERASER</text>
              <line x1="82" y1="110" x2="124" y2="110" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
              <line x1="82" y1="122" x2="114" y2="122" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
              {/* Beveled corner on rubber edge */}
              <path d="M42 55 L56 70" stroke="#F1F5F9" strokeWidth="2" />
            </g>
          </svg>
        </div>
      );

    case 'ruler':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(-30 100 100)">
              {/* Ruler body */}
              <rect x="20" y="75" width="160" height="50" rx="8" fill="#FACC15" stroke="#EAB308" strokeWidth="4" />
              {/* Measurement marks */}
              {[28, 38, 48, 58, 68, 78, 88, 98, 108, 118, 128, 138, 148, 158, 168].map((x, i) => (
                <g key={i}>
                  <line
                    x1={x}
                    y1="75"
                    x2={x}
                    y2={i % 2 === 0 ? '98' : '88'}
                    stroke="#854D0E"
                    strokeWidth={i % 2 === 0 ? '3' : '2'}
                  />
                  {i % 2 === 0 && (
                    <text x={x} y="112" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713F12">
                      {i / 2}
                    </text>
                  )}
                </g>
              ))}
              {/* Centimeter symbol */}
              <text x="168" y="114" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#854D0E">cm</text>
              {/* Ruler glossy shine */}
              <rect x="24" y="78" width="152" height="6" rx="3" fill="#FEF08A" opacity="0.8" />
            </g>
          </svg>
        </div>
      );

    case 'sharpener':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Plastic body with side grip notches */}
            <path
              d="M45 45 C45 35 55 30 75 30 H125 C145 30 155 35 155 45 L150 155 C150 165 140 170 125 170 H75 C60 170 50 165 50 155 Z"
              fill="#A855F7"
              stroke="#7E22CE"
              strokeWidth="4"
            />
            {/* Ergonomic grip indentation */}
            <path d="M48 80 C60 95 60 105 48 120" stroke="#6B21A8" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M152 80 C140 95 140 105 152 120" stroke="#6B21A8" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Metal blade */}
            <rect x="70" y="55" width="60" height="90" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
            {/* Razor cutting edge highlight */}
            <line x1="72" y1="58" x2="72" y2="142" stroke="#FFFFFF" strokeWidth="3" />
            <line x1="76" y1="58" x2="76" y2="142" stroke="#64748B" strokeWidth="1.5" />
            {/* Screw in center */}
            <circle cx="100" cy="100" r="10" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
            <line x1="93" y1="100" x2="107" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            {/* Pencil insertion hole at top */}
            <ellipse cx="100" cy="38" rx="18" ry="8" fill="#3B0764" stroke="#581C87" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'backpack':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top handle */}
            <path d="M80 32 C80 18 120 18 120 32" stroke="#1E3A8A" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Main bag body */}
            <rect x="36" y="32" width="128" height="142" rx="28" fill="#2563EB" stroke="#1D4ED8" strokeWidth="5" />
            {/* Top flap / zipper */}
            <path d="M42 70 C70 58 130 58 158 70" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
            {/* Front pocket */}
            <rect x="52" y="90" width="96" height="74" rx="16" fill="#38BDF8" stroke="#0284C7" strokeWidth="4" />
            {/* Pocket zipper */}
            <line x1="62" y1="104" x2="138" y2="104" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
            <circle cx="100" cy="104" r="5" fill="#F8FAFC" />
            {/* Side bottle net pocket */}
            <path d="M36 100 C26 100 26 145 36 150" stroke="#60A5FA" strokeWidth="5" fill="none" />
            <path d="M164 100 C174 100 174 145 164 150" stroke="#60A5FA" strokeWidth="5" fill="none" />
            {/* Cute star badge */}
            <circle cx="100" cy="136" r="14" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            <text x="100" y="142" textAnchor="middle" fontSize="14">⭐</text>
          </svg>
        </div>
      );

    case 'pencil_case':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main pencil case pouch */}
            <rect x="25" y="70" width="150" height="75" rx="24" fill="#EC4899" stroke="#DB2777" strokeWidth="5" />
            {/* Zipper running along top */}
            <path d="M35 78 C80 72 120 72 165 78" stroke="#FDE047" strokeWidth="6" strokeDasharray="5 4" strokeLinecap="round" />
            {/* Zipper pull tab */}
            <circle cx="152" cy="80" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <path d="M152 87 L148 104 H156 Z" fill="#F59E0B" />
            {/* Cute dots decorative pattern */}
            <circle cx="55" cy="105" r="5" fill="#FBCFE8" />
            <circle cx="80" cy="115" r="5" fill="#FBCFE8" />
            <circle cx="105" cy="105" r="5" fill="#FBCFE8" />
            <circle cx="130" cy="115" r="5" fill="#FBCFE8" />
            {/* Front label tag */}
            <rect x="75" y="122" width="50" height="16" rx="4" fill="#FFFFFF" opacity="0.9" />
            <text x="100" y="134" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#BE185D">مقلمتي</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`flex items-center justify-center bg-slate-100 rounded-2xl ${currentSize} ${className}`}>
          <span className="text-4xl">🎒</span>
        </div>
      );
  }
};

/* Gem icon */

import React from 'react';

interface GemIconProps {
  color: string;
  size?: number;
  className?: string;
}

export const GemIcon: React.FC<GemIconProps> = ({
  color,
  size = 72,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md shrink-0 ${className}`}
    >
      <defs>
        {/* 전달받은 color 단일값으로 어두운 그라데이션 자동 생성 */}
        <linearGradient id="gem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* 1. 외곽 베이스 프레임 (다크 테두리) */}
      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        fill="#18181b"
        stroke={color}
        strokeWidth="3"
        strokeOpacity="0.4"
      />

      {/* 2. 보석 외곽 테두리 */}
      <polygon
        points="50,12 82,30 82,70 50,88 18,70 18,30"
        fill={color}
        opacity="0.2"
      />

      {/* 3. 보석 3D 입체 절면 (Cube 형태) */}
      {/* 상단 윗면 (밝은 하이라이트) */}
      <polygon
        points="50,22 75,37 50,50 25,37"
        fill={color}
        opacity="0.95"
      />
      {/* 좌측 하단면 (그라데이션 중간 톤) */}
      <polygon
        points="25,37 50,50 50,78 25,63"
        fill="url(#gem-grad)"
        opacity="0.8"
      />
      {/* 우측 하단면 (어두운 그림자 톤) */}
      <polygon
        points="50,50 75,37 75,63 50,78"
        fill="#000000"
        opacity="0.35"
      />
      <polygon
        points="50,50 75,37 75,63 50,78"
        fill={color}
        opacity="0.5"
      />
    </svg>
  );
};
interface CameroonStarProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CameroonStar({ size = 40, className = '', style = {} }: CameroonStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.6))', ...style }}
    >
      <polygon
        points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="2"
      />
    </svg>
  );
}

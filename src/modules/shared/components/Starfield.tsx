import React from 'react';

interface StarfieldProps {
  count?: number;
}

export default function Starfield({ count = 50 }: StarfieldProps) {
  const stars = Array.from({ length: count }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      opacity: 0.6,
    };
    return <div key={i} className="star" style={style} />;
  });

  return <div className="starfield" aria-hidden>{stars}</div>;
}


import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-40 h-40'
  };

  const iconSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-5xl',
    xl: 'text-7xl'
  };

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <div className={`relative flex items-center justify-center ${sizes[size]} ${className}`}>
      {/* Outer Rotating Ring */}
      <MDiv
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-2xl border-2 border-dashed border-neon-red/30"
      />
      
      {/* Inner Pulsing Hexagon/Square */}
      <MDiv
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-2 rounded-xl bg-gradient-to-br from-neon-red to-rose-700 shadow-[0_0_30px_rgba(255,49,49,0.4)] flex items-center justify-center"
      >
        <span className={`${iconSizes[size]} font-black italic text-white tracking-tighter select-none`}>
          N
        </span>
      </MDiv>
      
      {/* Orbiting Particles */}
      <MDiv
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-10%] border border-neon-lime/20 rounded-full"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neon-lime rounded-full shadow-[0_0_10px_#ccff00]" />
      </MDiv>
    </div>
  );
};

export default AnimatedLogo;

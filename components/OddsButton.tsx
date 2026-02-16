
import React from 'react';
import { motion } from 'framer-motion';

interface OddsButtonProps {
  label: string;
  value: number;
  isSelected?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
}

const OddsButton: React.FC<OddsButtonProps> = ({ label, value, isSelected, onClick, className = '' }) => {
  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MButton = motion.button as any;
  const MDiv = motion.div as any;

  return (
    <MButton
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all duration-200 min-h-[54px] relative overflow-hidden
        ${isSelected 
          ? 'bg-[#ff3131] border-[#ff3131] text-white shadow-[0_8px_20px_-4px_rgba(255,49,49,0.5)] scale-[1.03] z-10' 
          : 'bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white hover:border-neon-red/40 hover:bg-neon-red/[0.04]'}
        ${className}
      `}
    >
      {isSelected && (
        <MDiv 
          layoutId="glow"
          className="absolute inset-0 bg-white/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
      <span className={`text-[8px] lg:text-[9px] font-black uppercase tracking-tight mb-0.5 transition-colors duration-200 ${isSelected ? 'text-white/80' : 'text-slate-400 dark:text-white/30'}`}>
        {label}
      </span>
      <span className={`text-sm lg:text-base font-black tracking-tighter leading-none transition-colors duration-200 ${isSelected ? 'text-white' : 'text-[#ff3131]'}`}>
        {value.toFixed(2)}
      </span>
    </MButton>
  );
};

export default OddsButton;

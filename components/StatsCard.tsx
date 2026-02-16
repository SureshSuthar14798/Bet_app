
import React from 'react';
import GlassCard from './GlassCard';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string; // Optional unit or description
  className?: string; // Additional classes for customization (e.g. background)
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, subValue, className = '' }) => {
  return (
    <GlassCard animate={false} className={`p-3 lg:p-4 border border-slate-200 dark:border-white/10 flex items-center justify-between bg-white dark:bg-black/40 ${className}`}>
       <div className="flex items-center gap-2 lg:gap-4">
         <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red shrink-0">
           {icon}
         </div>
         <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/60">{label}</span>
       </div>
       <div className="flex items-center gap-1">
          <span className="text-xs font-black text-slate-900 dark:text-white">{value}</span>
          {subValue && (
            <span className="text-xs font-bold text-slate-400 dark:text-white/40">{subValue}</span>
          )}
       </div>
    </GlassCard>
  );
};

export default StatsCard;

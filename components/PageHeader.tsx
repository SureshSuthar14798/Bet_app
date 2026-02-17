
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  className?: string; // Allow custom classNames for flexibility
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, onBack, className = '' }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {onBack && (
        <button 
          onClick={onBack}
          className="p-2.5 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-neon-red hover:text-white transition-all shadow-sm group shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
      )}
      <div>
         <h1 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase leading-none">{title}</h1>
         {subtitle && (
           <p className="text-[10px] text-slate-400 dark:text-white/30 font-bold uppercase tracking-widest italic mt-1">{subtitle}</p>
         )}
      </div>
    </div>
  );
};

export default PageHeader;

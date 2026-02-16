
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, label, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <div className={`relative space-y-2 ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] ml-1 block transition-colors">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white dark:bg-black/40 border rounded-xl py-3.5 px-2 text-sm font-black text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-all outline-none group 
          ${isOpen
            ? 'border-neon-red/40 ring-2 ring-neon-red/10 dark:ring-neon-red/20'
            : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
          }`}
      >
        <span className="truncate uppercase tracking-tight">{selectedOption?.label}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 dark:text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-neon-red' : 'group-hover:text-slate-900 dark:group-hover:text-white'}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <MDiv
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-2 z-[70] bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar py-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  style={{ background: 'transparent' }}
                  className={`w-full px-3 dark:bg-red-500! !py-1 text-sm font-black text-left flex items-center justify-between transition-all group uppercase tracking-tight
                    ${value === option.value
                      ? 'bg-neon-red/5 text-neon-red'
                      : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}
                  `}
                >
                  <span className="truncate">{option.label}</span>
                  {value === option.value && (
                    <MDiv initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check size={16} className="text-neon-red" strokeWidth={3} />
                    </MDiv>
                  )}
                </button>
              ))}
            </div>
          </MDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;

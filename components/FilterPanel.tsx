
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CustomSelect from './CustomSelect';
import { Target, Shield, Zap } from 'lucide-react';

interface FilterPanelProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ activeFilter, onFilterChange }) => {
  const [betLimit, setBetLimit] = useState('all');
  const [profitRate, setProfitRate] = useState('all');

  const betLimitOptions = [
    { value: 'all', label: 'ALL LIMITS' },
    { value: 'low', label: '$0 - $100' },
    { value: 'med', label: '$100 - $1000' },
    { value: 'high', label: '$1000+' },
  ];

  const profitRateOptions = [
    { value: 'all', label: 'ALL RATES' },
    { value: 'mid', label: '0.5% - 1.0%' },
    { value: 'over10', label: 'OVER 1.0%' },
  ];

  const sports = [
    { id: 'SOCCER', label: 'FOOTBALL', count: 42 },
    { id: 'BASKET', label: 'BASKETBALL', count: 18 },
    { id: 'BASEBALL', label: 'BASEBALL', count: 5 }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-neon-red/5 px-4 py-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
        <h2 className="text-neon-red text-[10px] font-black italic tracking-widest uppercase">Filter Intel</h2>
        <Zap size={12} className="text-neon-red animate-pulse" />
      </div>
      
      <div className="p-4 space-y-5">
        {/* Protocols Section with Check/Uncheck functionality */}
        <div className="space-y-3">
          <h3 className="text-slate-400 dark:text-white/20 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
            <Target size={10} /> PROTOCOLS
          </h3>
          <div className="grid grid-cols-1 gap-1">
            {sports.map(sport => {
              const isSelected = activeFilter === sport.id;
              return (
                <button 
                  key={sport.id} 
                  onClick={() => onFilterChange(isSelected ? 'ALL' : sport.id)}
                  className={`flex items-center justify-between group cursor-pointer w-full p-1.5 rounded-lg transition-all ${isSelected ? 'bg-white/5' : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'}`}
                >
                  <div className="flex items-center gap-2">
                    {/* Radio Button Style */}
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-neon-red bg-neon-red/10' : 'border-slate-200 dark:border-white/10'}`}>
                      <div className={`w-1.5 h-1.5 bg-neon-red rounded-full transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'}`} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                      {sport.label}
                    </span>
                  </div>
                  <span className={`text-[9px] font-black ${isSelected ? 'text-neon-red' : 'text-slate-300 dark:text-white/10'}`}>
                    {sport.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-slate-100 dark:bg-white/5" />

        {/* Filters Section */}
        <div className="space-y-4">
          <CustomSelect 
            label="BETTING LIMIT"
            options={betLimitOptions}
            value={betLimit}
            onChange={setBetLimit}
            className="[&_label]:text-[9px] [&_button]:py-2 [&_button]:text-[10px] [&_button]:rounded-lg [&_button]:bg-slate-50 dark:[&_button]:bg-white/5"
          />

          <CustomSelect 
            label="PROFIT MARGIN"
            options={profitRateOptions}
            value={profitRate}
            onChange={setProfitRate}
            className="[&_label]:text-[9px] [&_button]:py-2 [&_button]:text-[10px] [&_button]:rounded-lg [&_button]:bg-slate-50 dark:[&_button]:bg-white/5"
          />
        </div>

        <div className="w-full h-px bg-slate-100 dark:bg-white/5" />

        {/* System Status Section */}
        <div className="space-y-3">
          <h3 className="text-slate-400 dark:text-white/20 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
            <Shield size={10} /> SYSTEM STATUS
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: "Encrypted Node", status: "Active" },
              { label: "Risk Scanner", status: "Nominal" },
              { label: "Settlement Unit", status: "Standby" }
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">{item.label}</span>
                <span className="text-[8px] font-black text-neon-red uppercase">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

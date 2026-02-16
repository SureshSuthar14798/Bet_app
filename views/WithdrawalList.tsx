
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpCircle, Search } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const WithdrawalList: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeFilter, setActiveFilter] = useState('Total');

  const filters = ['Total', 'Pending', 'Successful', 'Canceled'];

  const mockData = [
    { id: 'WD-2211', date: '2024-05-14 18:45', method: 'USDT (TRC20)', amount: 150.00, status: 'Pending' },
    { id: 'WD-1142', date: '2024-05-12 10:10', method: 'Bank Transfer', amount: 3500.00, status: 'Successful' },
    { id: 'WD-0988', date: '2024-05-10 16:30', method: 'Skrill', amount: 45.00, status: 'Successful' },
    { id: 'WD-0521', date: '2024-05-08 12:00', method: 'USDT (ERC20)', amount: 800.00, status: 'Successful' },
  ];

  const filteredData = activeFilter === 'Total' 
    ? mockData 
    : mockData.filter(item => item.status === activeFilter);

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <div className="max-w-6xl mx-auto lg:py-6 space-y-4 lg:space-y-8 w-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white dark:bg-white/5 text-slate-900 dark:text-white hover:bg-[#a11c1c] hover:text-white transition-all shadow-sm border border-slate-200 dark:border-transparent group"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase">Withdrawal List</h1>
          <p className="text-[10px] text-slate-500 dark:text-white/30 font-bold uppercase tracking-widest italic">Historical extraction records</p>
        </div>
      </div>

      {/* Custom Filter Bar - Matches User Image exactly with Grey Background and Red Borders */}
      <div className="w-full overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <div className="flex md:inline-flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl gap-1 min-w-max md:min-w-0">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all whitespace-nowrap
                ${activeFilter === filter 
                  ? 'bg-white dark:bg-[#1a1a25] text-neon-red shadow-sm border border-slate-200 dark:border-white/10' 
                  : 'text-slate-400 dark:text-white/40 hover:text-slate-700 dark:hover:text-white'}
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/5 rounded-md lg:rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5">
                <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 whitespace-nowrap">Record ID</th>
                <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 whitespace-nowrap">Timeline</th>
                <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 whitespace-nowrap">Channel</th>
                <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 whitespace-nowrap">Extraction</th>
                <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 text-right whitespace-nowrap">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-3 py-2 text-[11px] font-black text-slate-900 dark:text-white tracking-tight whitespace-nowrap">{item.id}</td>
                  <td className="px-3 py-2 text-[10px] font-bold text-slate-500 dark:text-white/40 whitespace-nowrap">{item.date}</td>
                  <td className="px-3 py-2 text-[11px] font-black text-slate-700 dark:text-white/80 italic whitespace-nowrap">{item.method}</td>
                  <td className="px-3 py-2 text-[12px] font-black text-slate-900 dark:text-white tabular-nums whitespace-nowrap">${item.amount.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full border
                      ${item.status === 'Successful' ? 'bg-neon-lime/10 text-emerald-600 dark:text-neon-lime border-emerald-200 dark:border-neon-lime/20' : 
                        item.status === 'Pending' ? 'bg-[#ff3131]/10 text-[#ff3131] border-[#ff3131]/20' : 
                        'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 border-slate-200 dark:border-white/5'}
                    `}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-30">
                       <Search size={40} className="text-slate-400 dark:text-white" />
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white italic">No settlement records synchronized</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalList;

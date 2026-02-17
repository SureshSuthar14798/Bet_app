
import React from 'react';
import { motion } from 'framer-motion';
import { BetRecord } from '../types';
import { Trophy, Clock, History, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PageHeader from '../components/PageHeader';

interface MyBetsProps {
  placedBets: BetRecord[];
}

const MyBets: React.FC<MyBetsProps> = ({ placedBets }) => {
  const router = useRouter();
  // Group bets by match title for the UI layout
  const groupedBets = placedBets.reduce((acc, bet) => {
    if (!acc[bet.matchTitle]) {
      acc[bet.matchTitle] = {
        title: bet.matchTitle,
        bettingTime: bet.date,
        gameTime: bet.date, // Mock game time
        totalBetAmount: 0,
        lines: []
      };
    }
    acc[bet.matchTitle].totalBetAmount += bet.stake;
    acc[bet.matchTitle].lines.push({
      select: bet.selection,
      odds: bet.odds,
      betAmount: bet.stake,
      winnings: bet.potentialWin,
      situation: bet.status
    });
    return acc;
  }, {} as Record<string, any>);

  const displayGroups = Object.values(groupedBets);

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <div className="max-w-6xl mx-auto lg:py-6 space-y-8 w-full">
      <PageHeader 
        title="My Bets History"
        subtitle="History of established market positions"
        onBack={() => router.back()}
      />

      <div className="space-y-6">
        {displayGroups.length === 0 ? (
          <div className="h-64 border border-dashed border-slate-200 dark:border-white/5 rounded-3xl flex flex-col items-center justify-center opacity-30">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">No records established</p>
          </div>
        ) : (
          displayGroups.map((group, groupIdx) => (
            <MDiv 
              key={groupIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.1 }}
              className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0f] shadow-sm"
            >
              {/* Themed Header */}
              <div className="bg-gray-300 dark:bg-black p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy size={14} className="text-black dark:text-white" />
                    <h3 className="text-sm font-black text-black dark:text-white italic tracking-tight uppercase">
                      {group.title}
                    </h3>
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-black/50 dark:text-white/50">
                      🛡️
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 dark:text-white text-[9px] font-black uppercase tracking-widest">
                     Market Open
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-black/60 dark:text-white/60 uppercase tracking-widest">
                     <Clock size={10} /> Betting: {group.bettingTime}
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-black/60 dark:text-white/60 uppercase tracking-widest">
                     <Clock size={10} /> Match: {group.gameTime}
                  </div>
                </div>
              </div>

              {/* Table Header */}
              <div className="px-6 py-5 overflow-x-auto scrollbar-hide">
                <div className="min-w-[500px]">
                  <div className="grid grid-cols-5 gap-4 text-center border-b border-slate-100 dark:border-white/5 pb-3 mb-4">
                    <span className="text-[9px] font-black text-slate-400 dark:text-white/60 uppercase tracking-widest">select</span>
                    <span className="text-[9px] font-black text-slate-400 dark:text-white/60 uppercase tracking-widest">odds</span>
                    <span className="text-[9px] font-black text-slate-400 dark:text-white/60 uppercase tracking-widest">stake</span>
                    <span className="text-[9px] font-black text-slate-400 dark:text-white/60 uppercase tracking-widest">winnings</span>
                    <span className="text-[9px] font-black text-slate-400 dark:text-white/60 uppercase tracking-widest">status</span>
                  </div>

                  {/* Table Rows */}
                  <div className="space-y-4">
                    {group.lines.map((line: any, idx: number) => (
                      <div key={idx} className="grid grid-cols-5 gap-4 text-center items-center">
                        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">{line.select}</span>
                        <span className="text-[10px] font-black text-slate-900 dark:text-white">{line.odds.toFixed(2)}</span>
                        <span className="text-[10px] font-black text-slate-900 dark:text-white">${line.betAmount.toFixed(2)}</span>
                        <span className="text-[10px] font-black text-slate-900 dark:text-white">${line.winnings.toFixed(2)}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${line.situation === 'won' ? 'text-neon-lime' : line.situation === 'active' ? 'text-neon-blue' : 'text-slate-400 dark:text-white/20'}`}>
                          {line.situation}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary Section */}
                  <div className="mt-8 p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">Aggregated Stake</span>
                      <div className="flex-1 border-b border-dashed border-slate-200 dark:border-white/10 mx-4 translate-y-1" />
                      <span className="text-sm font-black text-slate-900 dark:text-white">${group.totalBetAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">Total Yield</span>
                      <div className="flex-1 border-b border-dashed border-slate-200 dark:border-white/10 mx-4 translate-y-1" />
                      <span className="text-[11px] font-black text-neon-red uppercase tracking-[0.2em] italic">Settlement Pending</span>
                    </div>
                    
                    <div className="pt-6">
                      <p className="text-[9px] leading-tight text-slate-400 dark:text-white/10 font-bold uppercase tracking-widest max-w-lg">
                        Yield distribution is subject to regulatory protocol and partnership establishment agreements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MDiv>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBets;

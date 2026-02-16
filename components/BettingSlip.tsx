"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, ShoppingCart, Loader2 } from 'lucide-react';
import { useBetting } from '@/components/providers/BettingProvider';
import { MOCK_MATCHES } from '@/lib/mockData';

const BettingSlip: React.FC = () => {
  const { selections, removeSelection, clearSelections, user, placeBet } = useBetting();
  const balance = user.balance;
  
  const [stake, setStake] = useState<string>('0');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const wagerValue = parseFloat(stake) || 0;
  
  // Find the match for the first selection to get the profit rate
  const firstMatch = selections.length > 0 ? MOCK_MATCHES.find(m => m.id === selections[0].matchId) : null;
  const profitPercentage = firstMatch?.profit || '0.57%';
  const profitRateValue = parseFloat(profitPercentage) / 100;

  const quickStakes = [
    { label: 'RST', value: '0', className: 'bg-slate-100 dark:bg-white/80 text-slate-900 dark:text-[#a11c1c] font-black' },
    { label: '$10', value: '10', className: 'bg-slate-100 dark:bg-white/80 text-slate-900 dark:text-black font-black' },
    { label: '$50', value: '50', className: 'bg-slate-100 dark:bg-white/80 text-slate-900 dark:text-black font-black' },
    { label: '$100', value: '100', className: 'bg-slate-100 dark:bg-white/80 text-slate-900 dark:text-black font-black' },
    { label: '$1,000', value: '1000', className: 'bg-slate-100 dark:bg-white/80 text-slate-900 dark:text-black font-black' },
    { label: 'MAX', value: balance.toFixed(2), className: 'bg-[#ff3131] text-white font-black border-transparent' },
  ];

  const handleBetClick = async () => {
    setError(null);
    if (!agreed) { setError("Authorization Required"); return; }
    if (wagerValue <= 0) { setError("Zero Stake detected"); return; }
    if (wagerValue > balance) { setError("Credit Limit Exceeded"); return; }
    
    setIsProcessing(true);
    // Artificial delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    placeBet(wagerValue);
    setStake('0');
    setAgreed(false);
    setIsProcessing(false);
  };

  const totalWin = selections.length > 0 ? (wagerValue * selections[0].odds) : 0;
  const bettingFee = 0; 
  const finalNetProfit = wagerValue * profitRateValue;
  
  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <MDiv
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-full lg:w-[320px] h-full bg-white dark:bg-black border-l border-slate-200 dark:border-white/10 flex flex-col overflow-hidden transition-all duration-300 shadow-2xl font-sans relative z-40 shrink-0"
    >
      {/* Fixed Top Section */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-white dark:bg-black z-10">
        <h2 className="text-[14px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-tight">
          {selections.length} section
        </h2>
        {selections.length > 0 && (
          <button 
            onClick={clearSelections}
            className="text-[10px] font-black text-neon-red uppercase hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Scrollable Selections List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col p-4 space-y-5">
        <AnimatePresence mode="popLayout">
          {selections.length === 0 ? (
            <MDiv 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6"
            >
              <div className="opacity-10 dark:opacity-20 scale-125 text-slate-900 dark:text-white">
                 <ShoppingCart size={80} strokeWidth={1} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-black italic text-slate-900 dark:text-white uppercase leading-tight">YOUR BETSLIP IS EMPTY!</h3>
                <p className="text-[9px] text-slate-400 dark:text-white/30 font-bold uppercase tracking-[0.2em] leading-relaxed">
                  ADD BETS TO YOUR SELECTION BY CLICKING ON THE ODDS
                </p>
              </div>
            </MDiv>
          ) : (
            <MDiv 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Reference to first match league/teams just for display context if multiple - assuming single league context or mixed */}
              <div className="space-y-2">
                <h3 className="text-[13px] font-black text-[#a11c1c] uppercase italic">
                  {firstMatch?.league || 'Premier League'}
                </h3>
                <div className="flex items-center gap-2">
                  <img src={firstMatch?.homeTeam.logo} className="w-4 h-4 object-contain" alt="" />
                  <span className="text-[13px] font-black text-slate-800 dark:text-white/80">
                    {firstMatch?.homeTeam.name} vs {firstMatch?.awayTeam.name}
                  </span>
                  <img src={firstMatch?.awayTeam.logo} className="w-4 h-4 object-contain" alt="" />
                </div>
              </div>

              {/* Selection Summary */}
              <div className="bg-slate-50 dark:bg-[#12121a] border border-slate-200 dark:border-white/10 rounded-lg p-3 space-y-2">
                {selections.map((s) => (
                  <div key={`${s.matchId}-${s.selection}`} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2 text-[12px] font-black text-slate-700 dark:text-white/80">
                      <span className="text-slate-300 dark:text-white/40">•</span>
                      <span className="text-slate-400 dark:text-white/40">Result</span>
                      <span className="uppercase">{s.selection}</span>
                      <span className="text-slate-500 dark:text-white/60">{s.odds.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => removeSelection(`${s.matchId}-${s.selection}`)}
                      className="text-slate-300 dark:text-white/20 hover:text-neon-red p-1 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Potential Winnings Rows */}
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-[#1a1a25] border border-slate-200 dark:border-white/20 rounded-md">
                   <span className="text-[11px] font-black text-slate-500 dark:text-white/60 uppercase">Potential winnings</span>
                </div>
                
                <div className="space-y-2 px-1">
                  {selections.map((s, i) => (
                    <div key={i} className="grid grid-cols-3 gap-2 items-center">
                       <span className="text-[12px] font-black text-slate-600 dark:text-white/60 uppercase">{s.selection}</span>
                       <span className="text-[12px] font-black text-slate-900 dark:text-white/80">${(wagerValue).toFixed(2)}</span>
                       <span className="text-[12px] font-black text-slate-900 dark:text-white/80">WIN{(wagerValue * s.odds).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MDiv>
          )}
        </AnimatePresence>
      </div>
      
      {/* Fixed Wager & Bet Section (The red box area) */}
      <AnimatePresence>
        {selections.length > 0 && (
          <MDiv 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="shrink-0 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-black p-4 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_20px_rgba(0,0,0,0.5)]"
          >
            <div className="space-y-3">
              <div className="inline-block px-4 py-1 bg-slate-100 dark:bg-[#1a1a25] border border-slate-200 dark:border-white/20 rounded-md">
                 <span className="text-[11px] font-black text-slate-500 dark:text-white/60 uppercase">Wager</span>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={stake}
                    onChange={(e) => setStake(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="w-full bg-slate-50 dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/20 rounded-sm py-2 px-3 text-lg font-black text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neon-red/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-300 dark:text-white/30">$</span>
                </div>
                <div className="bg-[#a11c1c] rounded-sm px-3 flex flex-col justify-center items-center min-w-[100px]">
                  <span className="text-[10px] font-bold text-white/80 uppercase">Profit</span>
                  <span className="text-sm font-black text-white italic">{profitPercentage}</span>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-1">
                {quickStakes.map((btn) => (
                  <button 
                    key={btn.label} 
                    type="button"
                    onClick={() => setStake(btn.value)} 
                    className={`py-1.5 rounded-sm text-[10px] transition-all border border-slate-200 dark:border-transparent active:scale-95 ${btn.className}`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations Summary */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between group">
                <span className="text-[12px] font-black text-slate-700 dark:text-white/80 whitespace-nowrap uppercase tracking-tight">Total win</span>
                <div className="mx-2 h-px border-b border-dotted border-slate-200 dark:border-white/20 flex-1 translate-y-2"></div>
                <span className="text-[13px] font-black text-slate-900 dark:text-white">${totalWin.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-black text-slate-700 dark:text-white/80 whitespace-nowrap uppercase tracking-tight">Betting Fee</span>
                <div className="mx-2 h-px border-b border-dotted border-slate-200 dark:border-white/20 flex-1 translate-y-2"></div>
                <span className="text-[13px] font-black text-slate-400 dark:text-white/30">${bettingFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-black text-slate-700 dark:text-white/80 whitespace-nowrap uppercase tracking-tight">Final net profit</span>
                <div className="mx-2 h-px border-b border-dotted border-slate-200 dark:border-white/20 flex-1 translate-y-2"></div>
                <span className="text-[13px] font-black text-neon-red">${finalNetProfit.toFixed(2)}</span>
              </div>
            </div>

            {/* Legal Checkbox */}
            <div className="flex gap-3 items-start pt-2">
              <button 
                onClick={() => setAgreed(!agreed)} 
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border transition-all flex items-center justify-center ${agreed ? 'bg-[#a11c1c] border-[#a11c1c]' : 'border-slate-300 dark:border-white/20'}`}
              >
                {agreed && <Check size={12} className="text-white" />}
              </button>
              <p className="text-[10px] leading-snug text-slate-400 dark:text-white/40 font-bold uppercase">
                distributed through partnerships with subsidiaries and partners.
              </p>
            </div>

            {error && (
              <MDiv 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-black text-neon-red uppercase bg-neon-red/10 p-2 rounded flex items-center gap-1"
              >
                <AlertCircle size={12} /> {error}
              </MDiv>
            )}

            {/* Main Action Button */}
            <button 
              onClick={handleBetClick} 
              disabled={isProcessing}
              className="w-full bg-[#a11c1c] text-white py-2 rounded-lg font-black text-lg uppercase tracking-tighter shadow-sm shadow-[#a11c1c]/20 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                'bet'
              )}
            </button>
          </MDiv>
        )}
      </AnimatePresence>
      
      {/* Wallet Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#050508] flex items-center justify-between z-10">
        <span className="text-[10px] font-black text-slate-300 dark:text-white/20 uppercase tracking-[0.2em]">AVAILABLE</span>
        <span className="text-sm font-black text-slate-900 dark:text-white italic tracking-tighter">${balance.toFixed(2)}</span>
      </div>
    </MDiv>
  );
};

export default BettingSlip;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { ChevronDown, Info, List } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const WithdrawPage: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const [currency, setCurrency] = useState('USDT');
  const [method, setMethod] = useState('on-chain');
  const [network, setNetwork] = useState('USDT-TRC20');

  const currencyOptions = [
    { value: 'USDT', label: 'USDT' },
    { value: 'USDC', label: 'USDC' },
    { value: 'BTC', label: 'BTC' },
  ];

  const methodOptions = [
    { value: 'on-chain', label: 'On-chain' },
    { value: 'internal', label: 'Internal Transfer' },
  ];

  const networkOptions = [
    { value: 'USDT-TRC20', label: 'USDT-TRC20' },
    { value: 'USDT-ERC20', label: 'USDT-ERC20' },
    { value: 'USDT-BEP20', label: 'USDT-BEP20' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase">Withdraw</h1>
        <button className="flex items-center gap-2 bg-neon-red/10 border border-neon-red px-4 py-1.5 rounded-full text-neon-red hover:bg-neon-red hover:text-white transition-all group">
          <List size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Withdraw List</span>
        </button>
      </div>

      <div className="relative pl-10 space-y-12">
        {/* Stepper Vertical Line */}
        <div className="absolute left-[15px] top-8 bottom-8 w-px bg-slate-200 dark:bg-white/10" />

        {/* Step 1 */}
        <div className="relative space-y-6">
          <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm z-10 shadow-lg">
            1
          </div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white tracking-wide uppercase italic">Select the currency you want to withdraw</h3>
          
          <div className="space-y-6 max-w-xl">
            <CustomSelect 
              options={currencyOptions} 
              value={currency} 
              onChange={setCurrency} 
            />

            <CustomSelect 
              label="Withdrawal Method"
              options={methodOptions} 
              value={method} 
              onChange={setMethod} 
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative space-y-6">
          <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm z-10 shadow-lg">
            2
          </div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white tracking-wide uppercase italic">Withdrawal Details</h3>

          <div className="space-y-6 max-w-xl">
            {/* Address Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">USDT Address</label>
                <span className="text-[10px] font-bold text-slate-300 dark:text-white/20 uppercase tracking-widest">First-time Registration Only</span>
              </div>
              <div className="relative group">
                <input 
                  type="text" 
                  defaultValue="TTNYzj88EyX1EyQhaebExo8sYDzDtShm34"
                  className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-5 text-[13px] font-black text-slate-900 dark:text-white focus:outline-none focus:border-neon-red/30 focus:bg-slate-50 dark:focus:bg-white/5 transition-all"
                />
              </div>
            </div>

            {/* Network Selection */}
            <CustomSelect 
              label="Network"
              options={networkOptions}
              value={network}
              onChange={setNetwork}
            />

            {/* Amount Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter amount"
                className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-5 pr-24 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-neon-red/30 focus:bg-slate-50 dark:focus:bg-white/5 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">USDT</span>
                <div className="w-px h-3 bg-slate-200 dark:bg-white/10" />
                <button className="text-[11px] font-black text-slate-600 dark:text-white hover:text-neon-lime transition-colors">All</button>
              </div>
            </div>

            {/* Info Text */}
            <div className="space-y-3 px-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Balance : 0.12 USDT</span>
                <Info size={10} className="text-slate-300 dark:text-white/20" />
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Received Amount</span>
                <span className="text-sm font-black text-slate-900 dark:text-white italic">USDT</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Fee</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">-</span>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex gap-3 items-start pt-4">
              <button 
                onClick={() => setAgreed(!agreed)}
                className={`mt-1 flex-shrink-0 w-4 h-4 rounded border transition-all flex items-center justify-center
                  ${agreed ? 'bg-neon-red border-neon-red' : 'border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40'}
                `}
              >
                {agreed && <CheckIcon size={10} className="text-white" />}
              </button>
              <p className="text-[10px] leading-relaxed text-slate-500 dark:text-white/30 font-bold uppercase tracking-wide">
                I agree to authorize the Company to collect information related to my withdrawals for compliance purposes.
              </p>
            </div>

            {/* Continue Button */}
            <button className="w-full bg-neon-red py-4 rounded-xl font-black text-white text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,49,49,0.2)]">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default WithdrawPage;


import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';

interface ReferralFeePageProps {
  onBack?: () => void;
}

const ReferralFeePage: React.FC<ReferralFeePageProps> = ({ onBack }) => {
  // Use locally casted components to resolve environment-specific TS errors
  const MDiv = motion.div as any;

  const commissionData = [
    { date: '02-16 03:35', member: 'sinsungjk33@gmail.com', bet: '1,054.16', comm: '0.30 %', fee: '3.16', after: '378.62' },
    { date: '02-16 03:35', member: 'sinsungjk33@gmail.com', bet: '527.18', comm: '0.30 %', fee: '1.58', after: '375.46' },
    { date: '02-16 03:35', member: 'sinsungjk33@gmail.com', bet: '335.67', comm: '0.30 %', fee: '1.01', after: '373.87' },
    { date: '02-16 03:35', member: 'guswns7711@gmail.com', bet: '1,233.43', comm: '0.30 %', fee: '3.70', after: '372.87' },
    { date: '02-16 03:35', member: 'guswns7711@gmail.com', bet: '616.83', comm: '0.30 %', fee: '1.85', after: '369.17' },
    { date: '02-16 03:35', member: 'guswns7711@gmail.com', bet: '392.75', comm: '0.30 %', fee: '1.18', after: '367.32' },
    { date: '02-16 03:35', member: 'kkln89899@gmail.com', bet: '2,199.60', comm: '0.30 %', fee: '6.60', after: '366.14' },
    { date: '02-16 03:35', member: 'kkln89899@gmail.com', bet: '1,100.00', comm: '0.30 %', fee: '3.30', after: '359.54' },
    { date: '02-16 03:35', member: 'kkln89899@gmail.com', bet: '700.40', comm: '0.30 %', fee: '2.10', after: '356.24' },
    { date: '02-16 03:35', member: 'ml9848787@gmail.com', bet: '2,199.60', comm: '0.30 %', fee: '6.60', after: '354.14' },
    { date: '02-16 03:35', member: 'ml9848787@gmail.com', bet: '1,100.00', comm: '0.30 %', fee: '3.30', after: '347.54' },
    { date: '02-16 03:35', member: 'ml9848787@gmail.com', bet: '700.40', comm: '0.30 %', fee: '2.10', after: '344.24' },
  ];

  return (
    <MDiv
      className="max-w-5xl mx-auto lg:py-6 space-y-8 w-full lg:px-4 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHeader 
        title="Referral fee" 
        subtitle="Manage and convert your referral commissions" 
        onBack={onBack} 
      />

      <div className="space-y-4 lg:space-y-6">
        {/* Conversion Section */}
        <GlassCard className="p-6 md:p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-black/40 space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">The referral fee can be converted to an amount on the date specified by SML.</p>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500">2026-02-16 ~ 2026-02-16</p>
          </div>

          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/60">Total Referral Bet Money (Betting amount eligible for commission payment)</label>
                <div className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/60 shadow-inner">
                    <span className="text-lg font-black text-slate-900 dark:text-white tracking-widest">$ 126,206.00</span>
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/60">Referral fee</label>
                <div className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/60 shadow-inner">
                    <span className="text-lg font-black text-slate-900 dark:text-white tracking-widest">$ 378.62</span>
                </div>
             </div>
          </div>

          <div className="space-y-2 pl-1">
            <div className="flex flex-col gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
               <p>• <span className="text-neon-yellow">Referral members (with bets in the last 7 days)</span> = <span className="text-neon-red">Your Level : 5</span></p>
               <div className="pl-3 space-y-0.5 text-slate-400 dark:text-slate-500">
                  <p>Level 3 commission: 0.10 %</p>
                  <p>Level 4 commission: 0.20 %</p>
                  <p className="text-neon-red">Level 5 commission: 0.30 % Your</p>
               </div>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
               • The minimum amount for fee conversion is <span className="text-neon-red">$10</span>. Any fees not converted will be carried over to the next settlement.
            </p>
          </div>

          <button className="w-full py-4 bg-[#a11c1c] hover:bg-[#8a1818] text-white font-black uppercase tracking-[0.1em] rounded-xl shadow-lg shadow-neon-red/20 transition-all active:scale-[0.98]">
            Submit
          </button>
        </GlassCard>

        {/* Recent Payments Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white pl-1">Recent 20 Commission Payments</h3>
          
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/40">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/60">
                    <th className="p-3 text-center border-r border-slate-200 dark:border-white/5 last:border-0">Date</th>
                    <th className="p-3 text-center border-r border-slate-200 dark:border-white/5 last:border-0">Referral Members</th>
                    <th className="p-3 text-center border-r border-slate-200 dark:border-white/5 last:border-0">Bet</th>
                    <th className="p-3 text-center border-r border-slate-200 dark:border-white/5 last:border-0">Comm</th>
                    <th className="p-3 text-center border-r border-slate-200 dark:border-white/5 last:border-0">Fee</th>
                    <th className="p-3 text-center last:border-0">After</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {commissionData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors text-[11px] font-bold text-slate-700 dark:text-slate-200">
                      <td className="p-3 text-center whitespace-nowrap border-r border-slate-100 dark:border-white/5">{row.date}</td>
                      <td className="p-3 text-center whitespace-nowrap border-r border-slate-100 dark:border-white/5">{row.member}</td>
                      <td className="p-3 text-center whitespace-nowrap border-r border-slate-100 dark:border-white/5 text-neon-blue">$ {row.bet}</td>
                      <td className="p-3 text-center whitespace-nowrap border-r border-slate-100 dark:border-white/5 text-slate-400 dark:text-slate-500">{row.comm}</td>
                      <td className="p-3 text-center whitespace-nowrap border-r border-slate-100 dark:border-white/5 text-neon-red">$ {row.fee}</td>
                      <td className="p-3 text-center whitespace-nowrap font-black">$ {row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MDiv>
  );
};

export default ReferralFeePage;


import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Calendar, Wallet, Users, ChevronRight, UserPlus, ArrowDownCircle, ArrowUpCircle, Banknote, TrendingUp, ChevronDown } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import PageHeader from '@/components/PageHeader';

interface SublistPageProps {
  onBack?: () => void;
}

const SublistPage: React.FC<SublistPageProps> = ({ onBack }) => {
  // Use locally casted components to resolve environment-specific TS errors
  const MDiv = motion.div as any;
  
  const [expandedUsers, setExpandedUsers] = React.useState<string[]>([]);

  // Added mock balance for a "richer" list look along with additional details
  const subUsers = [
    { email: 'tjsgkswo1@naver.com', date: '2026-02-12', time: '20:56', balance: '1,240.50', deposits: '2,500.00', withdrawals: '1,200.00', bettingAmount: '5,430.00', bettingProfit: '1,240.50' },
    { email: 'pak3923@naver.com', date: '2026-02-09', time: '23:30', balance: '560.00', deposits: '1,000.00', withdrawals: '200.00', bettingAmount: '890.00', bettingProfit: '-50.00' },
    { email: 'kingdagu@naver.com', date: '2026-02-08', time: '19:44', balance: '3,100.25', deposits: '5,000.00', withdrawals: '1,000.00', bettingAmount: '12,000.00', bettingProfit: '2,100.25' },
    { email: 'tjswlek1@gmail.com', date: '2026-02-07', time: '18:44', balance: '890.10', deposits: '1,500.00', withdrawals: '500.00', bettingAmount: '2,300.00', bettingProfit: '390.10' },
    { email: 'qazpooh66@gmail.com', date: '2026-02-02', time: '19:50', balance: '12,450.00', deposits: '20,000.00', withdrawals: '5,000.00', bettingAmount: '45,000.00', bettingProfit: '7,450.00' },
    { email: 'valet7097@gmail.com', date: '2026-02-01', time: '16:06', balance: '45.00', deposits: '100.00', withdrawals: '0.00', bettingAmount: '55.00', bettingProfit: '-55.00' },
    { email: 'dogu03@naver.com', date: '2026-01-26', time: '14:55', balance: '2,300.75', deposits: '3,000.00', withdrawals: '500.00', bettingAmount: '6,700.00', bettingProfit: '1,300.75' },
    { email: 'zxz0849@naver.com', date: '2026-01-22', time: '19:28', balance: '150.00', deposits: '500.00', withdrawals: '300.00', bettingAmount: '450.00', bettingProfit: '50.00' },
    { email: 'kimdy5821024@gmail.com', date: '2026-01-21', time: '21:12', balance: '8,900.50', deposits: '10,000.00', withdrawals: '2,000.00', bettingAmount: '25,000.00', bettingProfit: '4,900.50' },
    { email: 'zzmm20712071@gmail.com', date: '2026-01-20', time: '20:03', balance: '670.20', deposits: '800.00', withdrawals: '100.00', bettingAmount: '1,200.00', bettingProfit: '170.20' },
    { email: 'hjhun96@naver.com', date: '2026-01-17', time: '00:19', balance: '340.00', deposits: '500.00', withdrawals: '100.00', bettingAmount: '600.00', bettingProfit: '40.00' },
    { email: 'qazpooh77@gmail.com', date: '2026-01-17', time: '00:05', balance: '1,100.00', deposits: '2,000.00', withdrawals: '500.00', bettingAmount: '3,500.00', bettingProfit: '600.00' },
    { email: 'pcg17171@gmail.com', date: '2026-01-16', time: '19:20', balance: '500.00', deposits: '1,000.00', withdrawals: '400.00', bettingAmount: '1,100.00', bettingProfit: '100.00' },
    { email: 'jominkyu008989@gmail.com', date: '2026-01-11', time: '00:46', balance: '2,150.80', deposits: '4,000.00', withdrawals: '1,500.00', bettingAmount: '8,000.00', bettingProfit: '1,150.80' },
  ];

  const toggleUser = (email: string) => {
    setExpandedUsers(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email) 
        : [...prev, email]
    );
  };

  const statItems = [
    { label: 'USD Balance', key: 'balance', icon: Wallet },
    { label: 'Deposits', key: 'deposits', icon: ArrowDownCircle },
    { label: 'Withdrawals', key: 'withdrawals', icon: ArrowUpCircle },
    { label: 'Betting Amount', key: 'bettingAmount', icon: Banknote },
    { label: 'Betting Profit', key: 'bettingProfit', icon: TrendingUp },
  ];

  return (
    <MDiv
      className="max-w-4xl mx-auto lg:py-6 space-y-8 w-full lg:px-4 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHeader 
        title="Sublist Details" 
        subtitle="View detailed breakdown of your referral network" 
        onBack={onBack} 
      />

      <div className="space-y-4 lg:space-y-8">
        {/* Stats Section with Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard animate={false} className="p-4 lg:p-5 border border-slate-200 dark:border-white/10 flex items-center justify-between bg-white dark:bg-black/40">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red">
                 <Wallet size={24} />
               </div>
               <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/60">Total money held</label>
                  <p className="text-lg font-black text-slate-900 dark:text-white tracking-wide mt-1">$ 100,458.15</p>
               </div>
            </div>
          </GlassCard>

          <GlassCard animate={false} className="p-4 lg:p-6 border border-slate-200 dark:border-white/10 flex items-center justify-between bg-white dark:bg-black/40">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red">
                 <Users size={24} />
               </div>
               <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/60">Total Members</label>
                  <p className="text-lg font-black text-slate-900 dark:text-white tracking-wide mt-1">20 Active Users</p>
               </div>
            </div>
          </GlassCard>
        </div>

        {/* Tree Structure / List */}
        <div className="bg-slate-50 dark:bg-white/[0.02] rounded-3xl p-4 lg:p-6 border border-slate-200 dark:border-white/5">
           {/* Root Node (Head Office) */}
           <div className="flex items-start gap-4 mb-8 relative group">
             <div className="absolute left-[19px] top-10 bottom-[-32px] w-[2px] bg-gradient-to-b from-neon-red/50 to-slate-200 dark:to-white/5 z-0"></div>
             
             <div className="w-10 h-10 rounded-full bg-neon-red flex items-center justify-center text-white shrink-0 z-10 shadow-lg shadow-neon-red/30 relative">
               <UserPlus size={18} />
               <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-black"></div>
             </div>
             
             <div className="pt-1 flex-1">
               <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">gusdnd8448@gmail.com</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-neon-red/10 text-neon-red text-[10px] font-black uppercase tracking-widest border border-neon-red/20">
                    Head Office
                  </span>
               </div>
               <p className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wide mt-1">Steam Account • Level 5 Partner</p>
             </div>
           </div>

           {/* Children Container */}
           <div className="space-y-3 relative pl-4 md:pl-0">
              {subUsers.map((user, idx) => {
                const isExpanded = expandedUsers.includes(user.email);
                
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex flex-col relative group"
                  >
                     {/* Connector Line Logic */}
                     {/* Vertical line segment connecting from top */}
                     <div className="absolute left-[3px] -top-4 h-[calc(100%+16px)] w-[2px] bg-slate-200 dark:bg-white/5 md:left-[19px] group-last:h-[calc(50%+16px)]"></div>
                     
                     <div className="flex items-center gap-4 relative">
                       {/* Horizontal connector */}
                       <div className="absolute left-[3px] top-12 md:top-9 w-4 h-[2px] bg-slate-200 dark:bg-white/5 md:left-[19px] md:w-6"></div>
                       
                       {/* User Card */}
                       <div 
                        onClick={() => toggleUser(user.email)}
                        className={`ml-6 md:ml-12 flex-1 p-3 md:p-4 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer shadow-sm z-10 
                          ${isExpanded ? 'ring-1 ring-neon-red/50 border-neon-red/50 dark:border-neon-red/50' : ''}`}
                       >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/5 dark:to-white/10 flex items-center justify-center text-slate-400 dark:text-white/40 shrink-0">
                                 <User size={18} />
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-neon-red transition-colors">{user.email}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                     <Calendar size={10} className="text-slate-400 dark:text-white/30" />
                                     <span className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">
                                       Reg: {user.date} <span className="opacity-50 mx-1">|</span> {user.time}
                                     </span>
                                  </div>
                               </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-dashed border-slate-100 dark:border-white/5 mt-1 md:mt-0">
                               <div className="text-right">
                                  <p className="text-[9px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-0.5">Balance</p>
                                  <p className="text-sm font-black text-slate-900 dark:text-white">${user.balance}</p>
                               </div>
                               <ChevronDown size={14} className={`text-slate-300 dark:text-white/10 group-hover:text-slate-400 dark:group-hover:text-white/40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                       </div>
                     </div>

                     {/* Expanded Stats Details */}
                     <AnimatePresence>
                       {isExpanded && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.3, ease: "easeInOut" }}
                           className="overflow-hidden ml-6 md:ml-12 pl-4 border-l-2 border-dashed border-slate-200 dark:border-white/5 mt-2 space-y-2 relative"
                         >
                           {/* Add extra connector for the stats block */}
                           <div className="absolute left-[-2px] top-9 w-4 h-[2px] bg-slate-200 dark:bg-white/5 bg-opacity-50"></div>

                            {statItems.map((stat, i) => (
                              <div key={stat.key} className="flex items-center justify-between lg:p-3 p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 relative">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60">
                                    <stat.icon size={14} className={i === 0 ? "text-neon-red" : ""} />
                                  </div>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">
                                    {stat.label}
                                  </span>
                                </div>
                                <span className="text-xs font-black text-slate-900 dark:text-white tabular-nums">
                                  {user[stat.key as keyof typeof user]} / $
                                </span>
                              </div>
                            ))}
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </motion.div>
                );
              })}

              {/* Connector line fading out at the bottom */}
              <div className="hidden lg:block absolute left-[3px] top-0 bottom-6 w-[2px] bg-gradient-to-b from-slate-200 via-slate-200 to-transparent dark:from-white/5 dark:via-white/5 -z-10 md:left-[19px]"></div>
           </div>
        </div>
      </div>
    </MDiv>
  );
};

export default SublistPage;

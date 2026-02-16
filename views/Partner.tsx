
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  BarChart2, 
  Activity,
  ArrowLeft 
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import PageHeader from '@/components/PageHeader';
import StatsCard from '@/components/StatsCard';

interface PartnerPageProps {
  onNavigate?: (path: string) => void;
  onBack?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const PartnerPage: React.FC<PartnerPageProps> = ({ onNavigate, onBack }) => {
  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <MDiv 
      className="max-w-6xl mx-auto py-6 space-y-8 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MDiv variants={itemVariants}>
         <PageHeader 
           title="Partner" 
           subtitle="Manage your referral program and earnings" 
           onBack={onBack} 
         />
      </MDiv>

      {/* Week's Fee Section */}
      <MDiv variants={itemVariants} className="space-y-2">
        <label className="text-sm font-bold text-slate-400 dark:text-white/60">This week's fee</label>
        <div className="w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/40 shadow-sm flex items-center">
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-widest">$ 0.00 USDT</span>
        </div>
      </MDiv>

      {/* Info Grid */}
      <MDiv variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
         {/* Sub-users Count */}
         <div className="bg-white dark:bg-dark-950 p-6 flex flex-col items-center text-center space-y-3 group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="w-12 h-12 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red mb-1 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Number of Sub-users : 20 (Max 30)</p>
         </div>

         {/* Sub-user Details Link */}
         <div 
             onClick={() => onNavigate?.('sublist')}
             className="bg-white dark:bg-dark-950 p-6 flex flex-col items-center text-center space-y-3 group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors border-l border-slate-100 dark:border-white/5"
         >
            <div className="w-12 h-12 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red mb-1 group-hover:scale-110 transition-transform">
              <BarChart2 size={24} />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Sub-user Details (Click to view)</p>
         </div>
      </MDiv>

      {/* Stats List */}
      <MDiv variants={itemVariants} className="space-y-3">
         <StatsCard 
           icon={<Users size={18} />} 
           label="Total Sub-user USD Balance" 
           value="9.87" 
           subValue="/ $" 
         />
         <StatsCard 
           icon={<ArrowDownCircle size={18} />} 
           label="Total Sub-user Deposits" 
           value="130,375.00" 
           subValue="/ $" 
         />
         <StatsCard 
           icon={<ArrowUpCircle size={18} />} 
           label="Total Sub-user Withdrawals" 
           value="51,240.00" 
           subValue="/ $" 
         />
         <StatsCard 
           icon={<Activity size={18} />} 
           label="Total Sub-user Betting Amount" 
           value="12,703,711.36" 
           subValue="/ $" 
         />
         <StatsCard 
           icon={<TrendingUp size={18} />} 
           label="Total Sub-user Betting Profit" 
           value="40,977.56" 
           subValue="/ $" 
         />
      </MDiv>
    </MDiv>
  );
};

export default PartnerPage;

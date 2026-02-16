

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ChevronRight, 
  TrendingUp, 
  Users, 
  Star, 
  Mail, 
  MessageSquare, 
  Trophy,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface ProfilePageProps {
  onNavigate?: (tab: string) => void;
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

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <MDiv 
      className="max-w-6xl mx-auto lg:py-6 space-y-4 lg:space-y-6 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MDiv variants={itemVariants}>
        <h1 className="text-xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase">My information</h1>
      </MDiv>

      {/* User ID Card */}
      <MDiv variants={itemVariants}>
        <GlassCard 
          onClick={() => onNavigate?.('edit-profile')}
          animate={false}
          className="p-3 lg:p-4 border border-slate-200 dark:border-white/10 flex items-center justify-between group cursor-pointer hover:border-slate-300 dark:hover:border-white/20 transition-all bg-white dark:bg-black/40"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-neon-red to-rose-600 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-100 dark:bg-dark-950 flex items-center justify-center overflow-hidden">
                 <img src="https://picsum.photos/seed/user-main/100/100" className="w-full h-full object-cover opacity-80" alt="" />
              </div>
            </div>
            <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">gusdnd8448@gmail.com</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            <span className="hidden text-[10px] font-bold uppercase tracking-widest">Edit information</span>
            <span className="lg:hidden block text-[10px] font-bold uppercase tracking-widest">Edit</span>
            <ChevronRight size={14} />
          </div>
        </GlassCard>
      </MDiv>
      
      {/* Identity Verification */}
      <MDiv variants={itemVariants}>
        <GlassCard animate={false} className="p-3 lg:p-4 border border-slate-200 dark:border-white/10 flex items-center justify-between bg-white dark:bg-black/40">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-neon-red/10 flex items-center justify-center text-neon-red">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Identity Verification</h4>
              <p className="text-[10px] text-slate-400 dark:text-white/40 font-medium">Complete KYC to unlock all features</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-neon-red font-black">
            <div className="w-4 h-4 rounded-full border border-neon-red flex items-center justify-center">
              <CheckIcon size={8} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
          </div>
        </GlassCard>
      </MDiv>

      {/* Statistics Grid */}
      <MDiv variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
        {/* Position Value */}
        <div className="bg-white dark:bg-dark-950 p-3 lg:p-6 flex flex-col items-center text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red mb-1">
            <Wallet size={20} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 leading-none">Positions value</p>
            <p className="text-sm font-black text-slate-900 dark:text-white">$ 0.12</p>
          </div>
          <div className="w-full flex gap-2 items-center">
            <button onClick={() => onNavigate?.('wallet')} className="w-full bg-neon-red text-white text-[9px] font-black uppercase tracking-widest py-1.5 px-2 rounded-lg hover:brightness-110 transition-all">Deposit</button>
            <button onClick={() => onNavigate?.('withdraw')} className="w-full bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest py-1.5 px-2 rounded-lg hover:brightness-110 transition-all">Withdrawal</button>
          </div>
        </div>

        {/* My Profit */}
        <div className="bg-white dark:bg-dark-950 p-3 lg:p-6 flex flex-col items-center text-center space-y-3 border-l border-slate-100 dark:border-white/5">
          <div className="w-10 h-10 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red mb-1">
            <TrendingUp size={20} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 leading-none">My Profit</p>
            <p className="text-sm font-black text-slate-900 dark:text-white">$ 532.49</p>
          </div>
          <button onClick={() => onNavigate?.('my-bets')} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white text-[9px] font-black uppercase tracking-widest py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all mt-auto">Bet History</button>
        </div>

        {/* Referral List */}
        <div className="bg-white dark:bg-dark-950 p-3 lg:p-6 flex flex-col items-center text-center space-y-3 border-l border-slate-100 dark:border-white/5">
          <div className="w-10 h-10 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red mb-1">
            <Users size={20} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 leading-none">Referral List</p>
            <p className="text-sm font-black text-slate-900 dark:text-white">20 People</p>
          </div>
          <button onClick={() => onNavigate?.('partner')} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white text-[9px] font-black uppercase tracking-widest py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all mt-auto">View List</button>
        </div>

        {/* Referral Fee */}
        <div className="bg-white dark:bg-dark-950 p-3 lg:p-6 flex flex-col items-center text-center space-y-3 border-l border-slate-100 dark:border-white/5">
          <div className="w-10 h-10 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red mb-1">
            <Star size={20} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 leading-none">Referral fee</p>
            <p className="text-sm font-black text-slate-900 dark:text-white">$ 14,371.99</p>
          </div>
          <button onClick={() => onNavigate?.('referral-fee')} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white text-[9px] font-black uppercase tracking-widest py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all mt-auto">View List</button>
        </div>
      </MDiv>

      {/* Deposit/Withdrawal Lists */}
      <MDiv variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard 
          onClick={() => onNavigate?.('deposit-list')}
          animate={false}
          className="p-3 lg:p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer border-slate-200 dark:border-white/10 bg-white dark:bg-black/40"
        >
          <div className="flex items-center gap-3">
            <ArrowDownCircle size={18} className="text-neon-red" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Deposit List</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 dark:text-white/20" />
        </GlassCard>
        <GlassCard 
          onClick={() => onNavigate?.('withdrawal-list')}
          animate={false}
          className="p-3 lg:p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer border-slate-200 dark:border-white/10 bg-white dark:bg-black/40"
        >
          <div className="flex items-center gap-3">
            <ArrowUpCircle size={18} className="text-neon-red" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Withdrawal List</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 dark:text-white/20" />
        </GlassCard>
      </MDiv>

      {/* Detailed Info List */}
      <MDiv variants={itemVariants} className="space-y-2">
        {[
          { icon: Trophy, label: 'Membership level', value: 'PARTNER' },
          { icon: Mail, label: 'Email address', value: 'gusdnd8448@gmail.com' },
          { icon: Users, label: 'Referral Code', value: 'EXCVP' },
          { icon: MessageSquare, label: 'Request for e-mail consultation', value: '' }
        ].map((item, idx) => (
          <GlassCard key={idx} animate={false} className="p-3 lg:p-4 border border-slate-200 dark:border-white/5 flex items-center gap-4 hover:border-slate-300 dark:hover:border-white/15 transition-all cursor-pointer bg-white dark:bg-black/40">
            <div className="w-8 h-8 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red">
              <item.icon size={14} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{item.label} :</span>
              <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{item.value}</span>
            </div>
          </GlassCard>
        ))}
      </MDiv>
    </MDiv>
  );
};

// Helper components
const CheckIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default ProfilePage;



import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Match, BetSelection } from '../types';
import MatchCard from '../components/MatchCard';
import AnimatedCounter from '../components/AnimatedCounter';
import FilterPanel from '../components/FilterPanel';
import { MOCK_MATCHES } from '../lib/mockData';
import { Flame, TrendingUp, DollarSign, ListFilter, Zap, ChevronDown } from 'lucide-react';

interface DashboardProps {
  onBetSelect: (match: Match, selection: 'home' | 'draw' | 'away', odds: number) => void;
  onMatchSelect: (id: string) => void;
  selectedSelections: BetSelection[];
}

const Dashboard: React.FC<DashboardProps> = ({ onBetSelect, onMatchSelect, selectedSelections }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Cinematic slow motion
      videoRef.current.muted = true; // Force mute for browser compliance
      videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    }
  }, []);

  const stats = [
    { label: 'LIVE OPS', value: 124, icon: Flame, color: 'text-neon-red' },
    { label: 'DEPLOYED', value: 1450200, icon: DollarSign, color: 'text-neon-red', prefix: '$' },
    { label: 'AVG YIELD', value: 82.4, icon: TrendingUp, color: 'text-neon-purple', suffix: '%' }
  ];

  const filteredMatches = MOCK_MATCHES.filter(match => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'LIVE') return match.isLive;
    if (activeFilter === 'SOCCER') return match.sport === 'Football';
    if (activeFilter === 'BASKET') return match.sport === 'Basketball';
    return true;
  });

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;
  const MH1 = motion.h1 as any;
  const MP = motion.p as any;

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start">
      {/* Sidebar Filter - Left Side Sticky */}
      <div className="w-full lg:w-56 flex-shrink-0 flex flex-col gap-2 lg:gap-4 sticky top-0 z-[100]">
        
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center justify-between w-full bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/5 p-3 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2">
            <ListFilter size={16} className="text-neon-red" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Filter Intel</span>
          </div>
          <motion.div animate={{ rotate: showFilters ? 180 : 0 }}>
             <ChevronDown size={16} className="text-slate-400" />
          </motion.div>
        </button>

        {/* Mobile Filter Content */}
        <div className="lg:hidden">
            <AnimatePresence>
            {showFilters && (
                <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4 overflow-hidden pt-2"
                >
                <FilterPanel activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                <div className="bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/5 rounded-xl p-4 space-y-3 shadow-sm">
                    <h3 className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest border-b border-slate-100 dark:border-white/5 pb-2 italic">Top Performance</h3>
                    {[
                    { name: 'UEFA CL', change: '+12.4%' },
                    { name: 'NBA FINALS', change: '+8.2%' },
                    { name: 'PREMIER LG', change: '+15.1%' }
                    ].map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-slate-900 dark:text-white">{item.name}</span>
                        <span className="text-[10px] font-black text-neon-red">{item.change}</span>
                    </div>
                    ))}
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>

        {/* Desktop Filter Content (Always Visible) */}
        <div className="hidden lg:block space-y-4">
            <FilterPanel activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <div className="bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/5 rounded-xl p-4 space-y-3 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest border-b border-slate-100 dark:border-white/5 pb-2 italic">Top Performance</h3>
                {[
                { name: 'UEFA CL', change: '+12.4%' },
                { name: 'NBA FINALS', change: '+8.2%' },
                { name: 'PREMIER LG', change: '+15.1%' }
                ].map(item => (
                <div key={item.name} className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-slate-900 dark:text-white">{item.name}</span>
                    <span className="text-[10px] font-black text-neon-red">{item.change}</span>
                </div>
                ))}
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-4 overflow-hidden">
        {/* Refined Banner Section */}
        <MDiv 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[280px] lg:h-[320px] rounded-[2rem] overflow-hidden group shadow-2xl flex items-center border border-slate-200 dark:border-white/5 bg-black"
        >

          {/* Animated Background Image (Ken Burns Effect) */}
          <MDiv 
            className="absolute inset-0 z-0"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          >
            <video 
              ref={(el) => {
                if (el) {
                  el.playbackRate = 0.7; // Cinematic slow motion
                  el.muted = true;
                  el.play().catch(e => console.error("Video autoplay blocked", e));
                }
              }}
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
              poster="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-80"
            >
              <source src="/videos/stadium-bg.mp4" type="video/mp4" />
            </video>
          </MDiv>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />
          
          <div className="relative z-20 px-8 lg:px-12 max-w-2xl space-y-4 lg:space-y-6">
            <MDiv 
              initial={{ x: -20, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-neon-red animate-pulse" />
              <span className="text-white text-[8px] font-black uppercase tracking-[0.2em]">
                NETWORK PROTOCOL ACTIVE
              </span>
            </MDiv>

            <div className="space-y-0.5">
              <MH1 
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl lg:text-3xl font-black italic tracking-tighter text-white uppercase leading-[0.9]"
              >
                CHAMPIONS <br /> 
                <span className="text-[#ff3131]">LIMITLESS</span> <br /> 
                SETTLEMENT
              </MH1>
              
              <MP 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/60 text-[9px] lg:text-[10px] font-black max-w-sm lg:max-w-md leading-tight uppercase tracking-widest pt-2 lg:pt-4"
              >
                High-frequency odds processing now active for UEFA finals. <br /> 
                Instant settlement protocols engaged for premium liquidity providers.
              </MP>
            </div>

            <MDiv 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 pt-2"
            >
              <button className="bg-[#a11c1c] text-white px-3 whitespace-nowrap lg:px-8 py-2.5 rounded-lg font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-neon-red/20 flex items-center gap-2 group">
                Deploy Stake
                <Zap size={12} className="group-hover:fill-white transition-all" />
              </button>
              <button className="bg-white/10 backdrop-blur-md whitespace-nowrap border border-white/10 text-white/60 px-3 py-2.5 rounded-lg font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] transition-all hover:bg-white/20 hover:text-white">
                Market Intel
              </button>
            </MDiv>
          </div>

          {/* Side Graphic Elements */}
          <div className="absolute right-5 lg:right-12 top-7 lg:top-1/2 lg:-translate-y-1/2 flex flex-col gap-2 lg:gap-4 z-20">
             <div className="flex flex-col items-end bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
               <span className="text-[7px] lg:text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-1 italic">Volatility</span>
               <span className="text-base lg:text-xl font-black italic text-neon-red tracking-tighter leading-none">HIGH</span>
             </div>
             <div className="flex flex-col items-end bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
               <span className="text-[7px] lg:text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-1 italic">Delay</span>
               <span className="text-base lg:text-xl font-black italic text-white tracking-tighter leading-none tabular-nums">0.00ms</span>
             </div>
          </div>
        </MDiv>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <MDiv
                key={stat.label}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/5 rounded-xl p-3 flex items-center justify-between shadow-sm transition-all"
              >
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-slate-400 dark:text-white/20 uppercase tracking-tight block italic">{stat.label}</span>
                  <div className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-baseline gap-0.5 tabular-nums">
                    <span className="text-[10px] opacity-40">{stat.prefix}</span>
                    <AnimatedCounter value={stat.value} decimals={stat.suffix ? 1 : 0} />
                    <span className="text-[10px] opacity-40">{stat.suffix}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg bg-slate-100 dark:bg-white/5 ${stat.color} shadow-inner`}>
                  <Icon size={16} />
                </div>
              </MDiv>
            );
          })}
        </div>

        {/* Section Control Header */}
        <div className="bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <ListFilter size={12} className="text-neon-red" />
            <h2 className="text-[11px] font-black italic uppercase text-slate-900 dark:text-white tracking-widest">
              HOT PROTOCOLS
            </h2>
          </div>
          <div className="flex gap-1">
            {['ALL', 'LIVE', 'SOCCER', 'BASKET'].map(filter => {
               const isActive = activeFilter === filter;
               return (
                <button 
                  key={filter} 
                  onClick={() => setActiveFilter(filter)}
                  className={`px-1.5 lg:px-3 py-1.5 lg:py-2 rounded-lg text-[8px] lg:text-[10px] font-black uppercase tracking-widest transition-all
                    ${isActive 
                      ? 'bg-[#ff3131] text-white shadow-lg shadow-neon-red/20 scale-105' 
                      : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}
                  `}
                >
                  {filter}
                </button>
               )
            })}
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 pb-10">
          {filteredMatches.map((match) => {
            const selection = selectedSelections.find(s => s.matchId === match.id);
            const betId = selection ? `${match.id}-${selection.selection}` : undefined;
            return (
              <div key={match.id} onClick={() => onMatchSelect(match.id)} className="cursor-pointer">
                <MatchCard
                  match={match}
                  onBetSelect={(m, s, o) => {
                    // Prevent card click when clicking odds
                    event?.stopPropagation();
                    onBetSelect(m, s, o);
                  }}
                  selectedBetId={betId}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

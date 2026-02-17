
import React from 'react';
import { motion } from 'framer-motion';
import { Match, BetSelection } from '../types';
import GlassCard from '../components/GlassCard';
import OddsButton from '../components/OddsButton';
import { ArrowLeft, MapPin, Radio, Activity, BarChart3, Clock, Zap } from 'lucide-react';

interface MatchDetailsProps {
  match: Match;
  onBack: () => void;
  onBetSelect: (match: Match, selection: 'home' | 'draw' | 'away', odds: number) => void;
  selectedBetId?: string;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match, onBack, onBetSelect, selectedBetId }) => {
  // Select background based on sport
  const bgImages: Record<string, string> = {
    'Football': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop',
    'Basketball': 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2070&auto=format&fit=crop',
    'Tennis': 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2070&auto=format&fit=crop'
  };

  const heroBg = bgImages[match.sport] || bgImages.default;

  // Cast motion components
  const MDiv = motion.div as any;

  return (
    <div className="lg:py-6 space-y-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-3 text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-all group"
      >
        <div className="p-2.5 rounded-xl bg-slate-200 dark:bg-white/5 group-hover:bg-[#a11c1c] group-hover:text-white transition-all shadow-sm">
          <ArrowLeft size={18} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest">Back to events</span>
      </button>

      {/* Hero Header with Animated Background */}
      <MDiv 
        whileHover="hover"
        className="relative rounded-[3rem] overflow-hidden min-h-[420px] flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-2xl group/hero bg-black"
      >
        {/* Cinematic Background Layer */}
        <MDiv
          variants={{
            hover: { scale: 1.1, filter: 'brightness(0.7) saturate(1.2)' }
          }}
          animate={{ 
            scale: [1, 1.05, 1],
            x: [0, -10, 0],
            y: [0, 5, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 z-0 origin-center"
        >
          <img 
            src={heroBg} 
            alt="Stadium Background" 
            className="w-full h-full object-cover opacity-40 grayscale-[0.3]"
          />
        </MDiv>

        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(255,49,49,0.1),transparent_70%)]" />
        
        {/* Content Container */}
        <div className="relative z-10 w-full px-4 md:px-20 py-6 flex flex-col items-center">
          
          {/* Top Badge */}
          <MDiv 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center gap-3 mb-10 shadow-2xl"
          >
            <div className="w-2 h-2 bg-neon-red rounded-full animate-pulse shadow-[0_0_10px_#ff3131]" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">LIVE BROADCAST ACTIVE</span>
          </MDiv>

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5 lg:gap-0">
            {/* Home Team */}
            <MDiv 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex flex-col items-center space-y-3 lg:space-y-6 flex-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700" />
                <div className="lg:w-32 lg:h-32 w-20 h-20 rounded-3xl lg:rounded-[2.5rem] bg-white/10 backdrop-blur-3xl border border-white/20 p-3 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all group-hover/hero:scale-110 group-hover/hero:-rotate-3 relative z-10">
                  <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white drop-shadow-lg">{match.homeTeam.name}</h2>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.4em] mt-1">Host Protocol</p>
              </div>
            </MDiv>

            {/* Score Center */}
            <MDiv 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center flex-shrink-0"
            >
              <div className="flex items-center gap-8 md:gap-14">
                <span className="text-5xl md:text-9xl font-black italic tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group-hover/hero:scale-110">
                  {match.score?.home || 0}
                </span>
                <div className="flex flex-col items-center w-5 lg:w-auto ms-3 gap-2 ">
                   <div className="w-2 h-2 rounded-full bg-white/20" />
                   <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-5xl md:text-9xl font-black italic tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group-hover/hero:scale-110">
                  {match.score?.away || 0}
                </span>
              </div>
              
              <MDiv 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-3 lg:mt-8 flex items-center gap-3 px-6 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white/60 text-[11px] font-black uppercase tracking-[0.2em]"
              >
                <Clock size={16} className="text-neon-red" />
                <span>{match.time} IN GAME</span>
              </MDiv>
            </MDiv>

            {/* Away Team */}
            <MDiv 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex flex-col items-center space-y-3 lg:space-y-6 flex-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700" />
                <div className="lg:w-32 lg:h-32 w-20 h-20 rounded-3xl lg:rounded-[2.5rem] bg-white/10 backdrop-blur-3xl border border-white/20 p-3 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all group-hover/hero:scale-110 group-hover/hero:rotate-3 relative z-10">
                  <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-lg lg:text-2xl font-black italic tracking-tighter uppercase text-white drop-shadow-lg">{match.awayTeam.name}</h2>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.4em] mt-1">Visitor Protocol</p>
              </div>
            </MDiv>
          </div>
        </div>

        {/* Dynamic Scan Line Effect */}
        <MDiv 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-[2] pointer-events-none"
        />
      </MDiv>

      {/* Market Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Betting Markets */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          <div className="flex items-center gap-3">
             <Zap size={20} className="text-neon-red" />
             <h3 className="text-xl font-black italic tracking-tight uppercase text-slate-900 dark:text-white">AVAILABLE <span className="text-neon-red">MARKETS</span></h3>
          </div>
          
          <div className="space-y-4">
            <GlassCard className="p-4 lg:p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0f]">
              <div className="flex items-center justify-between mb-2 lg:mb-6">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-white/60">Match Result (1X2)</span>
                <span className="px-3 py-1 rounded-lg bg-neon-red/10 text-neon-red text-[10px] font-black uppercase tracking-widest">POPULAR</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <OddsButton label="Home" value={match.odds.home} isSelected={selectedBetId === `${match.id}-home`} onClick={() => onBetSelect(match, 'home', match.odds.home)} />
                <OddsButton label="Draw" value={match.odds.draw || 3.0} isSelected={selectedBetId === `${match.id}-draw`} onClick={() => onBetSelect(match, 'draw', match.odds.draw || 3.0)} />
                <OddsButton label="Away" value={match.odds.away} isSelected={selectedBetId === `${match.id}-away`} onClick={() => onBetSelect(match, 'away', match.odds.away)} />
              </div>
            </GlassCard>

            <GlassCard className="p-4 lg:p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0f]">
              <div className="flex items-center justify-between mb-2 lg:mb-6">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-white/60">Double Chance</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <OddsButton label="1X" value={1.34} />
                <OddsButton label="12" value={1.25} />
                <OddsButton label="X2" value={1.42} />
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-4 lg:space-y-6">
           <div className="flex items-center gap-3">
              <Activity size={20} className="text-neon-red" />
              <h3 className="text-xl font-black italic tracking-tight uppercase text-slate-900 dark:text-white">LIVE <span className="text-neon-blue">STATS</span></h3>
           </div>
           <GlassCard className="p-4 lg:p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0f] space-y-10 shadow-xl">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">
                  <span>Possession</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full flex overflow-hidden border border-slate-200 dark:border-white/5">
                  <div className="h-full bg-neon-red shadow-[0_0_10px_rgba(204,255,0,0.4)]" style={{ width: '58%' }} />
                  <div className="h-full bg-slate-300 dark:bg-white/10" style={{ width: '42%' }} />
                </div>
                <div className="flex justify-between font-black italic text-base text-slate-900 dark:text-white">
                  <span>58%</span>
                  <span>42%</span>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { label: 'Shots on Target', home: 5, away: 3 },
                  { label: 'Corners', home: 7, away: 2 },
                  { label: 'Yellow Cards', home: 1, away: 2 },
                  { label: 'Attacks', home: 124, away: 98 }
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3 transition-colors hover:border-neon-blue/20">
                    <span className="text-xl font-black italic text-slate-900 dark:text-white">{stat.home}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">{stat.label}</span>
                    <span className="text-xl font-black italic text-slate-900 dark:text-white">{stat.away}</span>
                  </div>
                ))}
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;

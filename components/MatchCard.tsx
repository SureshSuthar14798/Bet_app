
import React, { useState } from 'react';
import { Match } from '../types';
import OddsButton from './OddsButton';
import { Trophy, Clock, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MatchCardProps {
  match: Match;
  onBetSelect: (match: Match, selection: 'home' | 'draw' | 'away', odds: number) => void;
  selectedBetId?: string;
}

const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [error, setError] = useState(false);

  // Use a themed avatar-like fallback if the original logo fails
  const fallbackUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${alt}&backgroundColor=1a1a25`;

  return (
    <img 
      src={error || !src ? fallbackUrl : src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)} 
    />
  );
};

const MatchCard: React.FC<MatchCardProps> = ({ match, onBetSelect, selectedBetId }) => {
  const [videoError, setVideoError] = useState(false);

  // Static background images mapped to sports if video fails
  const backgroundImages: Record<string, string> = {
    'Football': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000',
    'Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1000',
    'default': 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1000'
  };

  const sportVideos: Record<string, string> = {
    'Football': '/videos/football.mp4',
    'Basketball': '/videos/baseketball.mp4',
    'Baseball': '/videos/baseball.mp4',
  };

  const videoSrc = sportVideos[match.sport] || match.videoUrl;
  const showVideo = videoSrc && !videoError;

  const heroBg = backgroundImages[match.sport] || backgroundImages.default;
  
  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <div className="group relative">
      {/* Dynamic Hover Glow */}
      <div className="absolute inset-0 bg-neon-red opacity-0 group-hover:opacity-[0.05] transition-opacity blur-[60px] rounded-[2rem] pointer-events-none" />
      
      <div className="relative bg-white dark:bg-[#08080c] border border-slate-200 dark:border-white/10 rounded-[1.5rem] overflow-hidden transition-all hover:border-neon-red/30 shadow-xl flex flex-col group/card">
        
        {/* League Header */}
        <div className="px-5 py-3 flex items-center gap-2.5 bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5">
          <span className="text-sm drop-shadow-sm">{match.leagueFlag || '⚽'}</span>
          <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.15em]">
            {match.league}
          </span>
        </div>

        {/* Hero Area */}
        <div className="relative h-48 overflow-hidden bg-slate-950">
          {/* Static Fallback / Background Image */}
          <div 
            className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 group-hover/card:scale-110 ${showVideo ? 'opacity-0' : 'opacity-100'}`}
            style={!showVideo ? { backgroundImage: `url(${heroBg})` } : undefined}
          />

          {/* Background Video */}
          {showVideo && (
            <video 
              autoPlay muted loop playsInline 
              className="absolute inset-0 z-10 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover/card:scale-105"
              onError={() => setVideoError(true)}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
          
          {/* Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent z-20" />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-20" /> */}

          {/* Top Info Bar */}
          <div className="absolute top-4 left-5 z-30">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2.5 shadow-2xl">
               <div className="flex items-center gap-2">
                 <ImageWithFallback src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-4 h-4 object-contain rounded-full shadow-lg" />
                 <span className="text-[10px] font-black text-white italic">{match.homeTeam.shortName}</span>
               </div>
               <div className="flex items-center gap-2 px-3 border-x border-white/10">
                 <span className="text-sm font-black italic text-white leading-none">{match.score?.home ?? 0}</span>
                 <span className="text-sm font-black italic text-white/40 leading-none">:</span>
                 <span className="text-sm font-black italic text-white leading-none">{match.score?.away ?? 0}</span>
               </div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-white italic">{match.awayTeam.shortName}</span>
                 <ImageWithFallback src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-4 h-4 object-contain rounded-full shadow-lg" />
               </div>
               <div className="text-[9px] font-black text-neon-red ml-1 flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-neon-red rounded-full animate-pulse" />
                  47:06
               </div>
            </div>
          </div>

          {/* Profit & Limit Badge - REFINED SIZING */}
          {/* <div className="absolute top-4 right-5 z-30 text-right drop-shadow-2xl flex flex-col items-end">
             <div className="text-[9px] font-black text-[#ff3131] uppercase italic tracking-tighter leading-none">
               PROFIT <span className="text-xl font-black drop-shadow-[0_0_8px_rgba(255,49,49,0.5)]">{match.profit}</span>
             </div>
             <div className="text-[8px] font-black text-[#ff3131] opacity-90 uppercase tracking-[0.1em] italic mt-0.5">
               LIMITED {match.limit}
             </div>
          </div> */}

          {/* Centered Team Visuals */}
          <div className="absolute inset-0 flex items-center justify-center pt-8 px-8 pointer-events-none z-20">
             <div className="flex items-center justify-between w-full max-w-sm">
                <MDiv 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                   <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-2xl p-2.5 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden">
                      <ImageWithFallback src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain" />
                   </div>
                   <span className="text-[10px] font-black text-white uppercase tracking-tight text-center leading-tight drop-shadow-md max-w-[80px]">
                     {match.homeTeam.name}
                   </span>
                   <div className="flex items-center gap-1.5 text-[7px] font-black text-white/50 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full">
                      <div className="w-2.5 h-2.5 bg-yellow-400 rounded-sm flex items-center justify-center text-[6px] text-black font-black">P</div>
                      PARIMATCH
                   </div>
                </MDiv>

                <div className="flex flex-col items-center gap-0.5 px-4 mb-6">
                   <span className="text-[9px] font-black text-white/30 tracking-[0.3em] uppercase">02-13</span>
                   <span className="text-xl font-black text-white italic tracking-tighter drop-shadow-lg">11:30</span>
                   <div className="flex items-center gap-1.5 text-[7px] font-black text-white/50 uppercase mt-1 bg-black/40 px-2 py-0.5 rounded-full">
                      <div className="w-2.5 h-2.5 bg-purple-600 rounded-full flex items-center justify-center text-[6px] text-white font-black">M</div>
                      MOZZART
                   </div>
                </div>

                <MDiv 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                   <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-2xl p-2.5 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden">
                      <ImageWithFallback src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain" />
                   </div>
                   <span className="text-[10px] font-black text-white uppercase tracking-tight text-center leading-tight drop-shadow-md max-w-[80px]">
                     {match.awayTeam.name}
                   </span>
                   <div className="flex items-center gap-1.5 text-[7px] font-black text-white/50 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full">
                      <div className="w-2.5 h-2.5 bg-purple-600 rounded-full flex items-center justify-center text-[6px] text-white font-black">M</div>
                      MOZZART
                   </div>
                </MDiv>
             </div>
          </div>
        </div>

        {/* Odds Section */}
        <div className="p-4 grid grid-cols-3 gap-3 bg-slate-50/50 dark:bg-black/20 backdrop-blur-md">
          <OddsButton 
            label={match.odds.homeLabel || '1'} 
            value={match.odds.home} 
            isSelected={selectedBetId === `${match.id}-home`}
            onClick={(e) => {
              e?.stopPropagation();
              onBetSelect(match, 'home', match.odds.home);
            }}
          />
          {match.odds.draw && (
            <OddsButton 
              label={match.odds.drawLabel || 'X'} 
              value={match.odds.draw} 
              isSelected={selectedBetId === `${match.id}-draw`}
              onClick={(e) => {
                e?.stopPropagation();
                onBetSelect(match, 'draw', match.odds.draw!);
              }}
            />
          )}
          <OddsButton 
            label={match.odds.awayLabel || '2'} 
            value={match.odds.away} 
            isSelected={selectedBetId === `${match.id}-away`}
            onClick={(e) => {
              e?.stopPropagation();
              onBetSelect(match, 'away', match.odds.away);
            }}
          />
        </div>

        {/* Status & Capacity Progress Bar */}
        <div className="px-5 pb-6 pt-2 flex flex-col gap-3">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <span className="text-neon-red">●</span> SOLD OUT {match.soldOut}%
              </span>
              <span className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em]">MAX CAPACITY</span>
           </div>
           <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden border border-slate-100 dark:border-white/5 p-[1px]">
              <MDiv 
                initial={{ width: 0 }}
                animate={{ width: `${match.soldOut}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-neon-red shadow-[0_0_15px_rgba(255,49,49,0.6)] rounded-full"
              />
           </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;


import React from 'react';
import { Match, BetSelection } from '../types';
import { MOCK_MATCHES } from '../lib/mockData';
import MatchCard from '../components/MatchCard';
import { Radio } from 'lucide-react';

interface LiveMatchesProps {
  onBetSelect: (match: Match, selection: 'home' | 'draw' | 'away', odds: number) => void;
  onMatchSelect: (id: string) => void;
  selectedSelections: BetSelection[];
}

const LiveMatches: React.FC<LiveMatchesProps> = ({ onBetSelect, onMatchSelect, selectedSelections }) => {
  const liveMatches = MOCK_MATCHES.filter(m => m.isLive);

  return (
    <div className="py-6 space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-[1.5rem] bg-neon-red/10 border border-neon-red/20 text-neon-red shadow-lg shadow-neon-red/5">
          <Radio size={28} className="animate-pulse" />
        </div>
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none">LIVE <span className="text-neon-red">ACTION</span></h1>
          <p className="text-slate-400 dark:text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Real-time betting with highest dynamic odds</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {liveMatches.map((match) => (
          <div key={match.id} onClick={() => onMatchSelect(match.id)} className="cursor-pointer">
            <MatchCard
              match={match}
              onBetSelect={(m, s, o) => {
                event?.stopPropagation();
                onBetSelect(m, s, o);
              }}
              selectedBetId={selectedSelections.find(s => s.matchId === match.id)?.matchId + '-' + selectedSelections.find(s => s.matchId === match.id)?.selection}
            />
          </div>
        ))}
      </div>

      {liveMatches.length === 0 && (
        <div className="h-64 glass rounded-3xl flex flex-col items-center justify-center border border-slate-200 dark:border-white/10">
          <span className="text-slate-400 dark:text-white/20 text-xs font-black uppercase tracking-[0.2em]">No matches are live at the moment</span>
        </div>
      )}
    </div>
  );
};

export default LiveMatches;

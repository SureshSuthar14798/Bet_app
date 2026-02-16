"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import MatchDetails from '@/views/MatchDetails';
import { useBetting } from '@/components/providers/BettingProvider';
import { Match } from '@/types'; 

interface MatchPageClientProps {
  match: Match;
}

export default function MatchPageClient({ match }: MatchPageClientProps) {
  const { addSelection, selections } = useBetting();
  const router = useRouter();
  
  const selection = selections.find(s => s.matchId === match.id);
  const selectedBetId = selection ? `${match.id}-${selection.selection}` : undefined;

  return (
    <MatchDetails 
      match={match} 
      onBack={() => router.back()}
      onBetSelect={addSelection}
      selectedBetId={selectedBetId}
    />
  );
}

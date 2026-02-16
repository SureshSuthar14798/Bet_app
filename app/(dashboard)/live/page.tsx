"use client";
import React from 'react';
import LiveMatches from '@/views/LiveMatches';
import { useBetting } from '@/components/providers/BettingProvider';
import { useRouter } from 'next/navigation';

export default function LivePage() {
  const { addSelection, selections } = useBetting();
  const router = useRouter();

  return (
    <LiveMatches 
       onBetSelect={addSelection} 
       onMatchSelect={(id) => router.push(`/match/${id}`)}
       selectedSelections={selections}
    />
  );
}

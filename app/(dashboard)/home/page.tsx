"use client";
import React from 'react';
import Dashboard from '@/views/Dashboard';
import { useBetting } from '@/components/providers/BettingProvider';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { addSelection, selections } = useBetting();
  const router = useRouter();

  return (
    <Dashboard 
      onBetSelect={addSelection} 
      onMatchSelect={(id) => router.push(`/match/${id}`)}
      selectedSelections={selections}
    />
  );
}

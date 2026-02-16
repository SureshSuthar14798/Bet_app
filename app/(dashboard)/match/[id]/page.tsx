"use client";
import { useParams, useRouter } from 'next/navigation';
import MatchDetails from '@/views/MatchDetails';
import { useBetting } from '@/components/providers/BettingProvider';
import { MOCK_MATCHES } from '@/lib/mockData';

export default function MatchPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addSelection, selections } = useBetting();
  const router = useRouter();

  const match = MOCK_MATCHES.find(m => m.id === id);

  if (!match) return <div className="p-8 text-center text-white">MATCH INTEL NOT FOUND</div>;

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

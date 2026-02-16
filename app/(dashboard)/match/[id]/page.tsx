import { MOCK_MATCHES } from '@/lib/mockData';
import MatchPageClient from './MatchPageClient';

export function generateStaticParams() {
  return MOCK_MATCHES.map((match) => ({
    id: match.id,
  }));
}

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = MOCK_MATCHES.find(m => m.id === id);

  if (!match) return <div className="p-8 text-center text-white">MATCH INTEL NOT FOUND</div>;

  return <MatchPageClient match={match} />;
}

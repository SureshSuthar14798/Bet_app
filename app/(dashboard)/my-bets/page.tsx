"use client";
import MyBets from '@/views/MyBets';
import { useBetting } from '@/components/providers/BettingProvider';

export default function MyBetsPage() {
  const { placedBets } = useBetting();
  return <MyBets placedBets={placedBets} />;
}

"use client";
import WithdrawalList from '@/views/WithdrawalList';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return <WithdrawalList onBack={() => router.back()} />;
}

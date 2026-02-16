"use client";
import DepositList from '@/views/DepositList';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return <DepositList onBack={() => router.back()} />;
}

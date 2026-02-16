"use client";
import BankTransferDeposit from '@/views/BankTransferDeposit';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return <BankTransferDeposit onBack={() => router.back()} />;
}

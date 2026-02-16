"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBetting } from '@/components/providers/BettingProvider';

export default function Home() {
  const { isAuth } = useBetting();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [isAuth, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-[#ff3131]">
      <span className="font-black uppercase tracking-[0.5em] animate-pulse">Initializing...</span>
    </div>
  );
}

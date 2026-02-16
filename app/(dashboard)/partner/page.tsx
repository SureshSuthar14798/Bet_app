
"use client";
import React from 'react';
import PartnerPage from '@/views/Partner';
import { useRouter } from 'next/navigation';

export default function Partner() {
  const router = useRouter();
  return <PartnerPage onNavigate={(path: string) => router.push(`/${path}`)} onBack={() => router.back()} />;
}

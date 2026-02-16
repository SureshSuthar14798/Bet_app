
"use client";
import React from 'react';
import ReferralFeePage from '@/views/ReferralFee';
import { useRouter } from 'next/navigation';

export default function ReferralFee() {
  const router = useRouter();
  return <ReferralFeePage onBack={() => router.back()} />;
}

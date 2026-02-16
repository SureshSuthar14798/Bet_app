
"use client";
import React from 'react';
import SublistPage from '@/views/Sublist';
import { useRouter } from 'next/navigation';

export default function Sublist() {
  const router = useRouter();
  return <SublistPage onBack={() => router.back()} />;
}

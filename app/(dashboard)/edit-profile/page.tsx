"use client";
import EditProfile from '@/views/EditProfile';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return <EditProfile onBack={() => router.back()} />;
}

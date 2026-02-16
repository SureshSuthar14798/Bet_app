"use client";
import ProfilePage from '@/views/Profile';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return <ProfilePage onNavigate={(tab) => router.push(`/${tab}`)} />;
}

'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export function LogoutButton() {
  const router = useRouter();
  const resetUser = useAuthStore(state => state.clearAuth);

  const handleLogout = () => {
    resetUser();
    localStorage.clear();
    sessionStorage.clear();

    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full cursor-pointer gap-2.5 rounded-[8px] border bg-white p-3"
    >
      <LogOut />
      <span>로그아웃</span>
    </button>
  );
}

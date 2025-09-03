'use client';

import { useRouter } from 'next/navigation';

export function AdminButton() {
  const router = useRouter();

  const handleAdminLogin = () => {
    // 관리자 로그인 페이지로 이동
    router.push('/admin/login');
  };

  return (
    <div className="relative flex h-full w-full max-w-md min-w-[300px]">
      <button
        onClick={handleAdminLogin}
        className="ml-auto flex text-[0.9rem] text-[#A1A9AD]"
      >
        관리자 페이지
      </button>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';

export function AdminButton() {
  const router = useRouter();

  const handleAdminLogin = () => {
    // 관리자 로그인 페이지로 이동
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleAdminLogin}
      className="ml-[380px] flex w-[100px] items-center justify-center text-xs text-[#A1A9AD]"
    >
      관리자 페이지
    </button>
  );
}

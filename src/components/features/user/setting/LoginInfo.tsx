'use client';

import { GoogleIcon, KakaoIcon, NaverIcon } from '@/components/common/icons';
import { useAuthStore } from '@/store/auth.store';
import { UserRound } from 'lucide-react';

export function UserLoginInfo() {
  const currentUser = useAuthStore(state => state.user);
  const loginType = useAuthStore(state => state.loginType);

  return (
    <li className="flex items-center gap-2.5 py-4">
      <UserRound />
      <span className="flex-1">로그인 정보</span>
      <span className="text-sm text-[#555555]">
        {currentUser?.email ?? '-'}
      </span>
      {loginType === 'google' && <GoogleIcon className="size-5" />}
      {loginType === 'kakao' && <KakaoIcon className="size-5" />}
      {loginType === 'naver' && <NaverIcon className="size-5" />}
    </li>
  );
}

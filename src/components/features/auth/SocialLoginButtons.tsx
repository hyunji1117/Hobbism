'use client';

import {
  handleGoogleLogin,
  handleKakaoLogin,
  handleNaverLogin,
} from '@/lib/signInHandler';
import LoginButton from './LoginButton';
import { useEffect, useState } from 'react';
import RecentLogin from './RecentLogin';
import { GoogleIcon, KakaoIcon, NaverIcon } from '@/components/common/icons';

export default function SocialLoginButtons() {
  const [recentLoginType, setRecentLoginType] = useState<string | null>(null);

  useEffect(() => {
    const loginType = localStorage.getItem('recentLoginType');
    setRecentLoginType(loginType);
  }, []);

  return (
    <>
      {/* 구글 로그인 */}
      <div className="relative flex w-full">
        {recentLoginType === 'google' && <RecentLogin className="" />}
        <LoginButton
          className="flex items-center justify-center gap-3.5 rounded-lg border border-[#e5e7eb] bg-white py-3 text-[#4A4A4A] hover:bg-[#F8F8F8]"
          onClick={handleGoogleLogin}
        >
          <GoogleIcon className="size-5" />
          Google로 시작하기
        </LoginButton>
      </div>
      {/* 카카오 로그인 */}
      <div className="relative flex w-full">
        {recentLoginType === 'kakao' && <RecentLogin className="" />}
        <LoginButton
          className="flex items-center justify-center gap-3.5 rounded-lg bg-[#FEE500] py-3 text-[#4A4A4A] hover:bg-[#FDD835]"
          onClick={handleKakaoLogin}
        >
          <KakaoIcon className="size-5" />
          Kakao로 시작하기
        </LoginButton>
      </div>
      {/* 네이버 로그인 */}
      <div className="relative flex w-full">
        {recentLoginType === 'naver' && <RecentLogin className="" />}
        <LoginButton
          className="flex items-center justify-center gap-3.5 rounded-lg bg-[#03C75A] py-3 text-white hover:bg-[#02B851]"
          onClick={handleNaverLogin}
        >
          <NaverIcon className="size-4" />
          Naver로 시작하기
        </LoginButton>
      </div>
    </>
  );
}

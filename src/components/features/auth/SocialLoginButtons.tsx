'use client';

import {
  handleGoogleLogin,
  handleKakaoLogin,
  handleNaverLogin,
} from '@/lib/signInHandler';
import LoginButton from './LoginButton';
import { useEffect, useState } from 'react';
import RecentLogin from './RecentLogin';

export default function SocialLoginButtons() {
  const [recentLoginType, setRecentLoginType] = useState<string | null>(null);

  useEffect(() => {
    const loginType = localStorage.getItem('recentLoginType');
    setRecentLoginType(loginType);
  }, []);

  return (
    <>
      {/* 구글 로그인 */}
      <div className="relative right-11 flex">
        {recentLoginType === 'google' ? (
          <RecentLogin className="relative bottom-5 left-95 max-sm:left-90" />
        ) : (
          <div className="mr-22" />
        )}
        <LoginButton
          className="flex h-[48px] w-[350px] items-center justify-center gap-3.5 rounded-lg border border-[#EAEAEA] text-[#1F2937] hover:border-[#cccccc]"
          iconSrc="/googleIcon.svg"
          width={20}
          height={20}
          onClick={handleGoogleLogin}
        >
          Google로 시작하기
        </LoginButton>
      </div>
      {/* 카카오 로그인 */}
      <div className="relative right-11 flex">
        {recentLoginType === 'kakao' ? (
          <RecentLogin className="relative bottom-5 left-95 max-sm:left-90" />
        ) : (
          <div className="mr-22" />
        )}
        <LoginButton
          className="flex h-[48px] w-[350px] items-center justify-center gap-3.5 rounded-lg bg-[#FEE500] text-[#1F2937] hover:bg-[#FDD835]"
          iconSrc="/kakaoIcon.svg"
          width={20}
          height={20}
          onClick={handleKakaoLogin}
        >
          Kakao로 시작하기
        </LoginButton>
      </div>
      {/* 네이버 로그인 */}
      <div className="relative right-11 flex">
        {recentLoginType === 'naver' ? (
          <RecentLogin className="relative bottom-5 left-95 max-sm:left-90" />
        ) : (
          <div className="mr-22" />
        )}
        <LoginButton
          className="flex h-[48px] w-[350px] items-center justify-center gap-3.5 rounded-lg bg-[#03C75A] text-white hover:bg-[#02B851]"
          iconSrc="/naverIcon.svg"
          width={16}
          height={16}
          onClick={handleNaverLogin}
        >
          Naver로 시작하기
        </LoginButton>
      </div>
    </>
  );
}

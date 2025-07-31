import { signIn } from 'next-auth/react';

export const handleGoogleLogin = () => {
  signIn('google', { callbackUrl: '/' });
  if (typeof window !== 'undefined') {
    localStorage.setItem('recentLoginType', 'google');
  }
};

export const handleKakaoLogin = () => {
  signIn('kakao', { callbackUrl: '/' });
  if (typeof window !== 'undefined') {
    localStorage.setItem('recentLoginType', 'kakao');
  }
};

export const handleNaverLogin = () => {
  signIn('naver', { callbackUrl: '/' });
  if (typeof window !== 'undefined') {
    localStorage.setItem('recentLoginType', 'naver');
  }
};

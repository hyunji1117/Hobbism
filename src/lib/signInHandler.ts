import { signIn } from 'next-auth/react';

export const handleGoogleLogin = () => {
  signIn('google', { callbackUrl: '/' });
};

export const handleKakaoLogin = () => {
  signIn('kakao', { callbackUrl: '/' });
};

export const handleNaverLogin = () => {
  signIn('naver', { callbackUrl: '/' });
};

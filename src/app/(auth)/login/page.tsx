'use client'

import LoginButton from "@/components/features/auth/LoginButton";
import { signIn } from "next-auth/react";
import Image from "next/image";

//로그인 페이지
export default function Login() {

  const handleGoogleLogin = () => {
    signIn('google', {callbackUrl:'/'})
  }

  const handleKakaoLogin = () => {
    signIn('kakao', {callbackUrl:'/'})
  }

  const handleNaverLogin = () => {
    signIn('naver', {callbackUrl:'/'})
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">

        {/* 로고 및 설명 */}
        <div className="flex flex-col items-center">
          <Image className="mb-5" src='/logo.svg' alt="hobbism-logo" width={174} height={46}/>
  
          <p className="text-lg font-semibold">SNS 가입 한 번으로</p>
          <p className="text-lg font-semibold">취미 소통, 굿즈 쇼핑 까지!</p>
        </div>

        {/* 로그인 버튼 */}
        <div className="flex flex-col items-center mt-13 gap-y-4">
          <LoginButton className="w-[350px] h-[48px] rounded-lg text-[#1F2937] border border-[#EAEAEA] hover:border-[#cccccc] flex items-center justify-center gap-3.5" iconSrc="/googleIcon.svg" width={20} height={20} onClick={handleGoogleLogin}>
            Google로 시작하기
          </LoginButton>
          <LoginButton className="w-[350px] h-[48px] rounded-lg text-[#1F2937] bg-[#FEE500] hover:bg-[#FDD835] flex items-center justify-center gap-3.5" iconSrc="/kakaoIcon.svg" width={20} height={20} onClick={handleKakaoLogin}>
            Kakao로 시작하기
          </LoginButton>
          <LoginButton className="w-[350px] h-[48px] rounded-lg text-white bg-[#03C75A] hover:bg-[#02B851] flex items-center justify-center gap-3.5" iconSrc="/naverIcon.svg" width={16} height={16} onClick={handleNaverLogin}>
            Naver로 시작하기
          </LoginButton>
        </div>

        {/* 안내 문구 */}
        <div className="mt-5">
          <p className="text-center text-[12px] text-[#4B5563] mt-5">로그인 시 개인정보 보호정책과 약관에 동의하며, 서비스 이용을 위해 <br /> 이메일, 이름, 프로필 정보를 수집합니다.</p>
          <p className="text-center text-[12px] text-[#4B5563] mt-50">비상업적용도로 제작된 사이트입니다.</p>
        </div>
      </div>
    </>
  )
}

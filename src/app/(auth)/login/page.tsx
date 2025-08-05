import SocialLoginButtons from '@/components/features/auth/SocialLoginButtons';
import Image from 'next/image';

//로그인 페이지
export default function Login() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between px-4 py-12">
        {/* 로고 및 설명 */}
        <div className="mb-8 flex flex-1 flex-col items-center justify-center">
          <Image
            className="w-[300px]"
            src="/images/etc/logo.webp"
            alt="hobbism-logo"
            width={400}
            height={400}
            priority
          />

          <p className="relative -top-12 text-[16px] font-semibold text-[#a4a4a4]">
            한 곳에서 누리는 취미의 모든것!
          </p>
        </div>

        <div className="flex w-full flex-col">
          {/* 로그인 버튼 */}
          <div className="mx-4 flex flex-col items-center gap-y-3">
            <SocialLoginButtons />
          </div>

          {/* 안내 문구 */}
          <div className="mt-5 flex w-full flex-col items-center">
            <p className="mobile-notice-text text-center text-[12px] text-[#c3c3c3]">
              로그인 시 개인정보 보호정책과 약관에 동의하며, 서비스 이용을 위해{' '}
              <br /> 이메일, 이름, 프로필 정보를 수집합니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

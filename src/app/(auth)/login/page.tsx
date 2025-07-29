import SocialLoginButtons from '@/components/features/auth/SocialLoginButtons';
import Image from 'next/image';

//로그인 페이지
export default function Login() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {/* 로고 및 설명 */}
        <div className="flex flex-col items-center">
          <Image
            className="mb-5"
            src="/logo.svg"
            alt="hobbism-logo"
            width={174}
            height={46}
          />

          <p className="text-lg font-semibold">SNS 가입 한 번으로</p>
          <p className="text-lg font-semibold">취미 소통, 굿즈 쇼핑 까지!</p>
        </div>

        {/* 로그인 버튼 */}
        <div className="mt-13 flex flex-col items-center gap-y-4">
          <SocialLoginButtons />
        </div>

        {/* 안내 문구 */}
        <div className="mt-5">
          <p className="mt-5 text-center text-[12px] text-[#4B5563]">
            로그인 시 개인정보 보호정책과 약관에 동의하며, 서비스 이용을 위해{' '}
            <br /> 이메일, 이름, 프로필 정보를 수집합니다.
          </p>
          <p className="mt-50 text-center text-[12px] text-[#4B5563]">
            비상업적용도로 제작된 사이트입니다.
          </p>
        </div>
      </div>
    </>
  );
}

import Script from 'next/script';

export function MyfeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}

export default MyfeedLayout;

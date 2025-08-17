import '@/styles/globals.css';
import localFont from 'next/font/local';
import ModalProvider from '@/components/common/ModalProvider';
import Script from 'next/script';
import { ToastProvider } from '@/components/common/ToastProvider';

const pretendard = localFont({
  src: '../../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata = {
  title: 'Hobbism Admin',
  description: 'Hobbism 관리자 페이지',
  openGraph: {
    title: 'Hobbism Admin',
    description: 'Hobbism 관리자 페이지',
    url: 'https://hobbism.vercel.app/admin',
    siteName: 'Hobbism Admin',
    images: [
      {
        url: '/images/hobbism.png',
        width: 1200,
        height: 630,
        alt: 'Hobbism Admin',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${pretendard.className} min-h-screen bg-gray-50`}>
        <div className="min-h-screen w-full max-w-none">
          {/* PC First 반응형 컨테이너 */}
          <div className="mx-auto min-h-screen w-full bg-white shadow-lg lg:max-w-7xl xl:max-w-screen-2xl">
            <main className="min-h-screen w-full">{children}</main>
          </div>
          <ModalProvider />
          <ToastProvider />
        </div>
      </body>
    </html>
  );
}

import '@/styles/globals.css';
import localFont from 'next/font/local';
import { MobileFrame } from '@/components/layout/moblie-frame/MobileFrame';
import ModalProvider from '@/components/common/ModalProvider';
import Script from 'next/script';
import AdBannerModal from '@/components/features/user/alarm/AdBannerModal';
import { ToastProvider } from '@/components/common/ToastProvider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata = {
  title: 'Hobbism',
  description: '취미기반 쇼핑 커뮤니티 사이트',
  openGraph: {
    title: 'Hobbism',
    description: '취미기반 쇼핑 커뮤니티 사이트',
    url: 'https://hobbism.vercel.app/',
    siteName: 'Hobbism',
    images: [
      {
        url: 'https://hobbism.vercel.app/images/hobbism.png',
        width: 1200,
        height: 630,
        alt: 'Hobbism',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
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
      <body className={`${pretendard.className}`}>
        <MobileFrame>
          {children}
          <AdBannerModal />
          <ModalProvider />
          <ToastProvider />
        </MobileFrame>
      </body>
    </html>
  );
}

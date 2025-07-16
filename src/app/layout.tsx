import '@/styles/globals.css';
import localFont from 'next/font/local';
import { MobileFrame } from '@/components/layout/moblie-frame/MobileFrame';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        <MobileFrame>{children}</MobileFrame>
      </body>
    </html>
  );
}

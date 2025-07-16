import { MobileFrame } from '@/components/layout/moblie-frame/MobileFrame';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <MobileFrame>{children}</MobileFrame>
      </body>
    </html>
  );
}

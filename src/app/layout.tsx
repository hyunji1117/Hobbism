'use client'

import AuthContext from '@/context/AuthContext';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body> 
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}

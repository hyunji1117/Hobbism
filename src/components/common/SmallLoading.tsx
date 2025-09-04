'use client';

import { HashLoader } from 'react-spinners';

export function SmallLoading() {
  return (
    // 상품 상세 페이지 로딩
    <div className="fixed top-1/2 left-1/2 z-5 w-full -translate-1/2">
      <div className="flex min-h-screen flex-col items-center justify-center">
        {/* <div className="h-15 w-15 animate-spin rounded-full border-4 border-gray-400 border-t-transparent" /> */}
        <HashLoader
          size={25}
          color="#4A4A4A"
          cssOverride={{ borderWidth: '1px' }}
        />
      </div>
    </div>
  );
}

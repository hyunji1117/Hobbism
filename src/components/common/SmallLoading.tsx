'use client';

import { PulseLoader } from 'react-spinners';

export function SmallLoading() {
  return (
    // <div className="fixed top-1/2 left-1/2 z-5 w-full -translate-1/2">
    //   <div className="flex min-h-screen flex-col items-center justify-center">
    //     {/* <div className="h-15 w-15 animate-spin rounded-full border-4 border-gray-400 border-t-transparent" /> */}
    //     <PulseLoader color="#4A4A4A" />
    //   </div>
    // </div>
    <div className="fixed top-1/2 left-1/2 z-5 w-full -translate-1/2">
      <div className="flex min-h-screen flex-col items-center justify-center">
        {/* <div className="h-15 w-15 animate-spin rounded-full border-4 border-gray-400 border-t-transparent" /> */}
        <PulseLoader color="#4A4A4A" />
      </div>
    </div>
  );
}

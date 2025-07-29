'use client';

export function SmallLoading() {
  return (
    <div className="fixed top-1/2 left-1/2 z-5 w-full -translate-1/2">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <span className="mb-3 ml-2 text-2xl font-semibold text-[#FE508B]"></span>
        <div className="h-15 w-15 animate-spin rounded-full border-4 border-[#FE508B] border-t-transparent" />
      </div>
    </div>
  );
}

'use client';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto min-h-screen w-full bg-white shadow-lg lg:max-w-7xl xl:max-w-screen-2xl">
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-8 text-6xl font-bold text-red-500">⚠️</div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              문제가 발생했습니다
            </h1>
            <p className="mb-8 text-gray-600">
              일시적인 오류가 발생했습니다. <br />
              잠시 후 다시 시도해주세요.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={reset}
                className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
              >
                다시 시도
              </button>
              <Link
                href="/admin"
                className="rounded-lg bg-gray-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
              >
                관리자 홈으로
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 max-w-2xl rounded-lg bg-gray-100 p-4 text-left">
                <summary className="cursor-pointer font-semibold">
                  에러 상세 정보 (개발 모드에서만 표시)
                </summary>
                <pre className="mt-2 text-sm break-words whitespace-pre-wrap text-red-600">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

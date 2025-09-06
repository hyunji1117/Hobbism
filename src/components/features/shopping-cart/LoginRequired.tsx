export default function LoginRequired() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4">
      <div className="p-12 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          로그인이 필요합니다
        </h1>
        <p className="mb-8 text-lg text-gray-500">
          장바구니를 이용하려면 로그인해주세요
        </p>
        <a
          href="/login"
          className="inline-block min-w-[120px] cursor-pointer rounded-[5px] bg-[#4B5563] px-4 py-2 text-[16px] font-semibold text-white transition-colors hover:bg-[#2c2f33]"
        >
          로그인하기
        </a>
      </div>
    </div>
  );
}

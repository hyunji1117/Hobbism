interface RecentLoginProps {
  className: string;
}
export default function RecentLogin({ className }: RecentLoginProps) {
  return (
    <div
      className={`mobile-recent-login absolute top-0 right-2 flex h-full w-fit items-center ${className}`}
    >
      <div className="recent-login-text w-max px-4 py-2 text-[0.9rem] font-semibold text-[#2A2B2B]">
        최근 로그인
      </div>
    </div>
  );
}

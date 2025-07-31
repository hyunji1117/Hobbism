interface RecentLoginProps {
  className: string;
}
export default function RecentLogin({ className }: RecentLoginProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-max rounded-lg bg-gray-800 px-4 py-2 text-xs text-gray-100">
        최근 로그인
      </div>
      <div className="mt-[-2px] mr-15 h-0 w-0 -rotate-48 border-x-10 border-b-10 border-x-transparent border-b-gray-800" />
    </div>
  );
}

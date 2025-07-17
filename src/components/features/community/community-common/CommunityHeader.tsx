import { ChevronLeft } from 'lucide-react';

// 허용되는 title들만 지정하게 함
type HeaderTitle = '피드등록' | '북마크' | '피드보기';

interface CommunityHeaderProps {
  title: HeaderTitle; // 위에 중에서만 선택 ㄱㄱ
}

export default function CommunityHeader({ title }: CommunityHeaderProps) {
  return (
    <div className="relative flex h-[38px] w-full items-center justify-center px-5">
      {/* 왼쪽 - 뒤로가기 아이콘 */}
      <div className="absolute left-5">
        <ChevronLeft size={24} />
      </div>

      {/* 가운데 - 타이틀 텍스트 */}
      <div>
        <h1 className="text-xl font-bold text-black">{title}</h1>
      </div>
    </div>
  );
}

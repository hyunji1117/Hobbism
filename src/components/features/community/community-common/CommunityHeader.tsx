import { ChevronLeft } from 'lucide-react';

// 허용되는 title들만 지정하게 함
type HeaderTitle = '피드등록' | '북마크' | '피드보기';

interface CommunityHeaderProps {
  title: HeaderTitle; // 위에 중에서만 선택 ㄱㄱ
}

export default function CommunityHeader({ title }: CommunityHeaderProps) {
  return (
    <div>
      {/* 왼쪽 - 뒤로가기 아이콘 */}
      <div>
        <ChevronLeft />
      </div>

      {/* 가운데 - 타이틀 텍스트 */}
      <div>
        <h1>{title}</h1>
      </div>

    </div>
  );
}

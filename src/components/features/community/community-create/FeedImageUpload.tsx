import { Plus } from 'lucide-react';

export default function FeedImageUpload() {
  return (
    <div>
      {/* 상단 - 제목과 안내 텍스트 */}
      <div>
        <span>사진등록</span>
        <span>(최대 5장입니다)</span>
      </div>

      {/* 하단 - 사진 업로드 UI (5개, 100x100, 한줄 슬라이드) */}
      <div>
        {/* 업로드 박스들 - 5개 한줄로 배치(나중에 slide 예정) */}
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index}>
            <Plus size={24} />
          </div>
        ))}
      </div>
    </div>
  );
}

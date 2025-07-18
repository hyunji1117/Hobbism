import { Plus } from 'lucide-react';

export default function FeedImageUpload() {
  return (
    <div className="w-full px-5">
      {/* 상단 - 제목과 안내 텍스트 */}
      <div className="mb-3 flex h-6 items-center gap-1">
        <span className="text-lg font-semibold text-black">사진등록</span>
        <span className="text-sm text-[#C3C3C3]">(최대 5장입니다)</span>
      </div>

      {/* 하단 - 사진 업로드 UI (5개, 100x100, 한줄 슬라이드) */}
      <div className="flex gap-3 overflow-x-auto">
        {/* 업로드 박스들 - 5개 한줄로 배치(나중에 slide 예정) */}
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            className="flex h-[100px] w-[100px] flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-[#C3C3C3]"
          >
            <Plus size={24} className="text-[#C3C3C3]" />
          </button>
        ))}
      </div>
    </div>
  );
}

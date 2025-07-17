export default function FeedCategorySelect() {
  // 7개 카테고리 목록
  const categories = [
    '항수',
    '리빙',
    '홈카페',
    '인테리어',
    '인형',
    '패션',
    '굿즈',
  ];

  return (
    <div className="w-full pl-5">
      {/* 제목 텍스트 */}
      <div className="mb-3">
        <span className="text-sm font-bold text-black">카테고리 설정</span>
      </div>

      {/* 카테고리 버튼들 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className="h-10 w-[82px] rounded-3xl bg-[#F3F4F6] text-sm text-[#4B5563]"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

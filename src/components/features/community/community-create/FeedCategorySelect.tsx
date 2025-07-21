interface FeedCategorySelectProps {
  value?: string;
  onChange?: (category: string) => void;
}

export default function FeedCategorySelect({
  value = '',
  onChange,
}: FeedCategorySelectProps) {
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

  const handleCategoryClick = (category: string) => {
    if (onChange) {
      onChange(category);
    }
  };

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
            onClick={() => handleCategoryClick(category)}
            className={`h-10 w-[82px] rounded-3xl text-sm ${
              value === category
                ? 'bg-[#FE508B] text-white' // 선택된 상태
                : 'bg-[#F3F4F6] text-[#4B5563]' // 기본 상태
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

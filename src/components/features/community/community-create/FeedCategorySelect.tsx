export default function FeedCategorySelect() {
  // 7개 카테고리 목록
  const categories = [
    '학수',
    '리빙',
    '홈카페',
    '인테리어',
    '인형', // 임시
    '패션', // 임시
    '굿즈', // 임시
  ];

  return (
    <div>
      {/* 제목 텍스트 */}
      <div>
        <span>카테고리 설정</span>
      </div>

      {/* 카테고리들들 */}
      <div>
        {categories.map((category, index) => (
          <button key={index}>{category}</button>
        ))}
      </div>
    </div>
  );
}

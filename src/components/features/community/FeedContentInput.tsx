export default function FeedContentInput() {
  return (
    <div>
      {/* 라벨 텍스트 */}
      <div>
        <span>내용</span>
      </div>

      {/* 텍스트 입력 필드 */}
      <div>
        <textarea placeholder="내용을 입력해주세요" rows={8} />
      </div>
    </div>
  );
}

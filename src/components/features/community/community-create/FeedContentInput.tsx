export default function FeedContentInput() {
  return (
    <div className="w-full px-5">
      {/* 라벨 텍스트 */}
      <div className="mb-3">
        <span className="text-lg font-semibold text-black">내용</span>
      </div>

      {/* 텍스트 입력 필드 */}
      <div>
        <textarea
          placeholder="내용을 입력해주세요"
          rows={8}
          className="h-[180px] w-full resize-none rounded-lg border border-[#C3C3C3] bg-[#F3F4F6] p-6 text-sm font-normal text-[#C3C3C3] placeholder-[#C3C3C3] focus:outline-none"
        />
      </div>
    </div>
  );
}

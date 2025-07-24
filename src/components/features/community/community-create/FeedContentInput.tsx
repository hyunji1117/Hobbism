interface FeedContentInputProps {
  placeholder?: string;
}

export default function FeedContentInput({
  placeholder = '내용을 입력해주세요',
}: FeedContentInputProps) {
  return (
    <div className="w-full px-5">
      {/* 라벨 텍스트 */}
      <div className="mb-3">
        <span className="text-lg font-semibold text-black">내용</span>
      </div>

      {/* 텍스트 입력 필드 */}
      <div>
        <textarea
          name="content"
          placeholder={placeholder}
          rows={8}
          className="h-[180px] w-full resize-none rounded-lg border border-[#C3C3C3] bg-[#F3F4F6] p-6 text-sm font-normal text-black placeholder-[#C3C3C3] focus:border-[#FE508B] focus:outline-none"
        />
      </div>
    </div>
  );
}

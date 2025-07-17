import FeedSubmitButton from '../community-create/FeedSubmitButton';

export default function CommentOptionsModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Dim 처리 */}
      <div className="bg-opacity-50 absolute inset-0 bg-black"></div>

      {/* 모달 내용 */}
      <div className="relative z-10 px-5 pb-8">
        {/* 상단 옵션 박스 (350x112) */}
        <div className="mb-[30px] flex h-[112px] w-[350px] flex-col rounded-lg bg-white">
          {/* 삭제하기 버튼 */}
          <button className="flex flex-1 items-center justify-center">
            <span className="text-lg font-semibold text-[#FE508B]">
              삭제하기
            </span>
          </button>

          {/* 구분선 */}
          <div className="border-b border-[#EAEAEA]"></div>

          {/* 수정하기 버튼 */}
          <button className="flex flex-1 items-center justify-center">
            <span className="text-lg font-semibold text-black">수정하기</span>
          </button>
        </div>

        {/* 하단 취소 버튼 */}
        <FeedSubmitButton text="취소" variant="CommentCancel" />
      </div>
    </div>
  );
}
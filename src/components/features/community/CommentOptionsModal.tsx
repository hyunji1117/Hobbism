import FeedSubmitButton from './FeedSubmitButton';

export default function CommentOptionsModal() {
  return (
    <div>
      {/* Dim 처리 */}
      <div></div>

      {/* 모달 내용 */}
      <div>
        {/* 상단 옵션 박스 (350x112) */}
        <div>
          {/* 삭제하기 버튼 */}
          <button>삭제하기</button>

          {/* 구분선 */}
          <div></div>

          {/* 수정하기 버튼 */}
          <button>수정하기</button>
        </div>

        {/* 하단 취소 버튼 */}
        <FeedSubmitButton text="취소" variant="CommentCancel" />
      </div>
    </div>
  );
}

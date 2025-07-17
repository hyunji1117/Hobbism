interface FeedSubmitButtonProps {
  text?: string;
  variant?: 'submitBtn' | 'CommentCancel';
}

export default function FeedSubmitButton({
  text = '작성완료',
  variant = 'submitBtn',
}: FeedSubmitButtonProps) {
  return (
    <button
      className={
        variant === 'submitBtn'
          ? 'bg-pink-500 text-white' // 작성완료 버튼 (등록페이지)
          : 'bg-gray-300 text-gray-700' // 취소 버튼 (댓글취소모달)
      }
    >
      {text}
    </button>
  );
}

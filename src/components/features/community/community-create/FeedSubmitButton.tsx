interface FeedSubmitButtonProps {
  text?: string;
  variant?: 'submitBtn' | 'CommentCancel';
  onClick: () => void;
}

export default function FeedSubmitButton({
  text = '작성완료',
  variant = 'submitBtn',
  onClick,
}: FeedSubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-14 w-[350px] rounded-lg text-xl font-bold ${
        variant === 'submitBtn'
          ? 'bg-[#FE508B] text-white' // 핑크 배경, 흰색 텍스트
          : 'bg-white text-black' // 흰색 배경, 검은색 텍스트
      }`}
    >
      {text}
    </button>
  );
}

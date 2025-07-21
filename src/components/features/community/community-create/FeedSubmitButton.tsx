// components/features/community/community-create/FeedSubmitButton.tsx

interface FeedSubmitButtonProps {
  text?: string;
  variant?: 'submitBtn' | 'CommentCancel';
  onClick: () => void;
  disabled?: boolean;
}

export default function FeedSubmitButton({
  text = '작성완료',
  variant = 'submitBtn',
  onClick,
  disabled = false,
}: FeedSubmitButtonProps) {
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`h-14 w-[350px] rounded-lg text-xl font-bold ${
        disabled
          ? 'cursor-not-allowed bg-gray-300 text-gray-500' // 비활성화 상태
          : variant === 'submitBtn'
            ? 'bg-[#FE508B] text-white'
            : 'bg-white text-black'
      }`}
    >
      {text}
    </button>
  );
}

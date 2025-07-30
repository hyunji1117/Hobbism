import { MessageCircle, SquareArrowOutUpRight, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface CommunityPostActionsProps {
  onCommentClick: () => void;
  onShareClick: () => void;
}

export default function CommunityPostActions({
  onCommentClick,
  onShareClick,
}: CommunityPostActionsProps) {
  const [isCheckBookmark, setIsCheckBookmark] = useState(false);

  const handleCheckBookmark = () => {
    setIsCheckBookmark(!isCheckBookmark);
    // TODO: 북마크 API 연동
  };

  return (
    <div className="flex h-12 items-center justify-between px-5">
      {/* 좌측 댓글,공유 아이콘 */}
      <div className="flex items-center gap-[14px]">
        <button className="cursor-pointer" onClick={onCommentClick}>
          <MessageCircle size={24} className="text-black" />
        </button>
        <button className="cursor-pointer" onClick={onShareClick}>
          <SquareArrowOutUpRight size={24} className="text-black" />
        </button>
      </div>

      {/* 우측 북마크 아이콘 */}
      <button className="cursor-pointer" onClick={handleCheckBookmark}>
        {isCheckBookmark ? (
          <Bookmark size={24} className="fill-black text-black" />
        ) : (
          <Bookmark size={24} className="text-black" />
        )}
      </button>
    </div>
  );
}

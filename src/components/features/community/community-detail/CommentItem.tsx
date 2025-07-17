import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

interface CommentItemProps {
  profileImage: string;
  userName: string;
  timeAgo: string;
  comment: string;
}

export default function CommentItem({
  userName = '댓글 작성자',
  timeAgo = '1시간 전',
  comment = '정말 날씨가 좋네요 저도 싸우러 갈게요!',
  profileImage = '/images/inhwan/profile-default.png',
}: CommentItemProps) {
  return (
    <div className="w-full">
      {/* 댓글 내용 영역 */}
      <div className="flex min-h-[70px] justify-between px-5 py-4">
        {/* 좌측 프로필 + 댓글 내용 */}
        <div className="flex flex-1 gap-3">
          {/* 프로필 이미지 */}
          <div className="h-8 w-8 flex-shrink-0">
            <Image
              src={profileImage}
              alt={`${userName} 프로필`}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>

          {/* 댓글 내용 */}
          <div className="flex-1">
            {/* 작성자, 시간 */}
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm font-normal text-black">{userName}</span>
              <span className="text-sm font-normal text-[#C3C3C3]">{timeAgo}</span>
            </div>

            {/* 댓글 텍스트 */}
            <div>
              <p className="text-sm leading-5 font-normal text-[#4B5563]">
                {comment}
              </p>
            </div>
          </div>
        </div>

        {/* 우측 설정 아이콘 */}
        <div className="flex-shrink-0">
          <MoreHorizontal size={18} className="text-black" />
        </div>
      </div>

      {/* 하단 보더 (1px) */}
      <div className="border-b border-[#EAEAEA]"></div>
    </div>
  );
}

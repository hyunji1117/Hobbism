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
    <div>
      {/* 댓글 내용 영역 */}
      <div>
        {/* 좌측 프로필 ui */}
        <div>
          {/* 프로필 이미지 */}
          <div>
            <Image
              src={profileImage}
              alt={`${userName} 프로필`}
              width={32}
              height={32}
            />
          </div>

          {/* 댓글 내용 */}
          <div>
            {/* 작성자, 시간 */}
            <div>
              <span>{userName}</span>
              <span>{timeAgo}</span>
            </div>

            {/* 댓글 텍스트 */}
            <div>
              <p>{comment}</p>
            </div>
          </div>
        </div>

        {/* 우측 설정 아이콘 */}
        <div>
          <MoreHorizontal size={20} />
        </div>
      </div>

      {/* 하단 보더 (1px) */}
      <div></div>
    </div>
  );
}

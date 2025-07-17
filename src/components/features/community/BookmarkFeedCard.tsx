import Image from 'next/image';
import { MessageCircle, Share, Bookmark } from 'lucide-react';

interface BookmarkFeedCardProps {
  userName: string;
  timeAgo: string;
  image: string;
  description: string;
}

export default function BookmarkFeedCard({
  userName = '오다구',
  timeAgo = '2시간 전',
  description = '드디어 완성된 결계 마왕의 졸개를 처리하느라 힘들었지만 만족스럽다능~',
  image = '/images/inhwan/barrier.webp',
}: BookmarkFeedCardProps) {
  return (
    <div>
      {/* 상단 프로필 영역 (60px) */}
      <div>
        <div>
          {/* 프로필 이미지 */}
          <div>프로필</div>

          {/* 닉네임, 시간 */}
          <div>
            <div>{userName}</div>
            <div>{timeAgo}</div>
          </div>
        </div>
      </div>

      {/* 중간 - 피드 이미지 */}
      <div>
        <Image src={image} alt="피드 이미지" width={390} height={390} />
      </div>

      {/* 아이콘 영역 (48px) */}
      <div>
        {/* 좌측 댓글,공유 아이콘 */}
        <div>
          <MessageCircle size={24} />
          <Share size={24} />
        </div>

        {/* 우측 북마크 아이콘 */}
        <div>
          <Bookmark size={24} />
        </div>
      </div>

      {/* 하단 - 텍스트 영역 (가변형이고 기본높이 48px) */}
      <div>
        <p>{description}</p>
      </div>

      {/* 하단 보더라인 */}
      <div></div>
    </div>
  );
}

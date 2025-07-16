import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface CommunityMainProps {
  userName: string;
  timeAgo: string;
  description: string;
  image: string;
}

export function CommunityMain({
  userName = '오다구',
  timeAgo = '2시간 전',
  description = '드디어 완성된 결계 마왕의 졸개를 처리하느라 ...',
  image = '/images/inhwan/barrier.webp',
}: CommunityMainProps) {
  return (
    <div>
      {/* 상단 - 프로필, 닉네임, 시간 */}
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

      {/* 하단 - 게시글, 상세보기 버튼 */}
      <div>
        <div>{description}</div>
        <div><ChevronRight /></div>
      </div>
    </div>
  );
}

export default CommunityMain;

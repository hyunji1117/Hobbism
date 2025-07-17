import Image from 'next/image';
import { MessageCircle, SquareArrowOutUpRight, Bookmark } from 'lucide-react';

interface BookmarkFeedCardProps {
  profileImage: string;
  userName: string;
  timeAgo: string;
  image: string;
  description: string;
}

export default function BookmarkFeedCard({
  userName = '오다구',
  timeAgo = '2시간 전',
  description = '드디어 완성된 결계 마왕의 졸개를 처리하느라 힘들었지만 만족스럽다고 말하고 싶다',
  image = '/images/inhwan/barrier.webp',
  profileImage = '/images/inhwan/profile-default.png',
}: BookmarkFeedCardProps) {
  return (
    <div className="w-full">
      {/* 상단 프로필 영역 (60px) */}
      <div className="flex h-[60px] items-center px-5">
        <div className="flex items-center gap-2">
          {/* 프로필 이미지 */}
          <div className="h-8 w-8">
            <Image
              src={profileImage}
              alt={`${userName} 프로필`}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>

          {/* 닉네임, 시간 */}
          <div className="flex flex-col">
            <div className="text-sm font-bold text-black">{userName}</div>
            <div className="text-xs font-normal text-[#4B5563]">{timeAgo}</div>
          </div>
        </div>
      </div>

      {/* 중간 - 피드 이미지 (반응형) */}
      <div className="relative aspect-square w-full">
        <Image
          src={image}
          alt="피드 이미지"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* 아이콘 영역 (48px) */}
      <div className="flex h-12 items-center justify-between px-5">
        {/* 좌측 댓글,공유 아이콘 */}
        <div className="flex items-center gap-[14px]">
          <MessageCircle size={24} className="text-black" />
          <SquareArrowOutUpRight size={24} className="text-black" />
        </div>

        {/* 우측 북마크 아이콘 */}
        <div>
          <Bookmark size={24} className="text-black" />
        </div>
      </div>

      {/* 하단 - 텍스트 영역 (가변형이고 기본높이 48px) */}
      <div className="min-h-12 px-5 py-3">
        <p className="text-sm leading-5 font-normal text-black">
          {description}
        </p>
      </div>

      {/* 하단 보더라인 */}
      <div className="border-b border-[#EAEAEA]"></div>
    </div>
  );
}

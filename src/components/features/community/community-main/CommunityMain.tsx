import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CommunityMainProps {
  id: number;
  profileImage: string;
  userName: string;
  timeAgo: string;
  description: string;
  image: string;
}

export default function CommunityMain({
  id,
  userName = '오다구',
  timeAgo = '2시간 전',
  description = '드디어 완성된 결계 마왕의 졸개를 처리하느라 ...',
  image = '/images/inhwan/barrier.webp',
  profileImage = '/images/inhwan/profile-default.png',
}: CommunityMainProps) {
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

      {/* 하단 - 게시글, 상세보기 버튼 */}
      <div className="flex h-[60px] items-center justify-between border-b border-[#EAEAEA] px-4">
        <div className="flex-1 truncate pr-2 text-sm text-black">
          {description}
        </div>
        <Link href={`/community/${id}`}>
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
}

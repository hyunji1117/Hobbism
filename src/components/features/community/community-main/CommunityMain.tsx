import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/types/interface';

interface CommunityMainProps {
  post: Post;
}

export default function CommunityMain({ post }: CommunityMainProps) {
  return (
    <div className="w-full">
      {/* 상단 프로필 영역 (60px) */}
      <div className="flex h-[60px] items-center px-5">
        <div className="flex items-center gap-2">
          {/* 프로필 이미지 */}
          <div className="h-8 w-8">
            <Image
              src={post.user.image || '/images/inhwan/profile-default.png'}
              alt={`${post.user.name} 프로필`}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>

          {/* 닉네임, 시간 */}
          <div className="flex flex-col">
            <div className="text-sm font-bold text-black">{post.user.name}</div>
            <div className="text-xs font-normal text-[#4B5563]">
              {post.createdAt}
            </div>
          </div>
        </div>
      </div>

      {/* 중간 - 피드 이미지 (반응형) */}
      <div className="relative aspect-square w-full">
        <Image
          src="/images/inhwan/barrier.webp" // 일단 기본 이미지 사용
          alt="피드 이미지"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* 하단 - 게시글, 상세보기 버튼 */}
      <div className="flex h-[60px] items-center justify-between border-b border-[#EAEAEA] px-4">
        <div className="flex-1 truncate pr-2 text-sm text-black">
          {post.content}
        </div>
        <Link href={`/community/${post._id}`}>
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
}

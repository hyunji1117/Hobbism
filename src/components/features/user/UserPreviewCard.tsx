'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  id: number;
  name: string;
  introduction: string;
  image?: string;
  onRemove: (id: number) => void;
}

export function UserPreviewCard({
  id,
  name,
  introduction,
  image,
  onRemove,
}: Props) {
  const [isFollowing, setFollowing] = useState(false); // 팔로우 상태 관리

  return (
    <div className="relative flex w-[148px] shrink-0 flex-col items-center justify-center gap-2 rounded-[10px] bg-[#70737C14] p-4 text-center select-none">
      {/* 유저 프로필 링크 */}
      <Link
        href={`/user/${id}`}
        className="flex w-full flex-col items-center"
        draggable={false}
        prefetch={true}
      >
        {/* 유저 이미지 */}
        <Image
          src={image || '/images/discord_profile.webp'}
          alt="프로필 이미지"
          className="pointer-events-none mb-3 size-14 select-none"
          width={56}
          height={56}
          draggable={false}
        />

        {/* 유저 이름 및 소개 */}
        <div className="w-full">
          <p className="font-semibold">{name}</p>
          <p className="max-w-full truncate overflow-hidden text-sm whitespace-nowrap text-[#37383C9C]">
            {introduction}
          </p>
        </div>
      </Link>

      {/* 팔로우/팔로잉 버튼 */}
      <Button
        variant="outline"
        className="w-full border-[#BAD0E5] text-[#BAD0E5]"
        onClick={() => setFollowing(prev => !prev)}
      >
        {isFollowing ? '팔로잉' : '팔로우'}
      </Button>

      {/* 카드 제거 (X 버튼) */}
      <X
        className="absolute top-2 right-2 cursor-pointer"
        size={14}
        stroke="#111111"
        onClick={() => onRemove(id)}
      />
    </div>
  );
}

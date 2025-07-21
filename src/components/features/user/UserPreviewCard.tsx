'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { deleteBookmark, postBookmark } from '@/data/actions/bookmark';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  id: number;
  name: string;
  introduction: string;
  image: string;
  onRemove: (id: number) => void;
  isFollowed?: boolean;
  bookmarkId?: number | null;
}

export function UserPreviewCard({
  id,
  name,
  introduction,
  image,
  onRemove,
  isFollowed,
  bookmarkId: initialBookmarkId,
}: Props) {
  const [isFollowing, setFollowing] = useState<boolean>(false);
  const [bookmarkId, setBookmarkId] = useState<number | null>(null);

  useEffect(() => {
    setFollowing(isFollowed ?? false);
    setBookmarkId(initialBookmarkId ?? null);
  }, [isFollowed, initialBookmarkId]);

  const handleFollow = async () => {
    if (isFollowing && bookmarkId) {
      const res = await deleteBookmark(bookmarkId);
      if (res.ok) {
        setFollowing(false);
        setBookmarkId(null);
      } else {
        alert('팔로우 취소 실패');
      }
    } else {
      const res = await postBookmark('user', id);
      if (res.ok) {
        setFollowing(true);
        setBookmarkId(res.item._id);
      } else {
        alert('팔로우 실패');
      }
    }
  };

  return (
    <div className="relative flex w-[148px] shrink-0 flex-col items-center justify-center gap-2 rounded-[10px] bg-[#70737C14] p-4 text-center select-none">
      <Link
        href={`/user/${id}`}
        className="flex w-full flex-col items-center"
        draggable={false}
        prefetch={true}
      >
        <Image
          src={image}
          alt="프로필 이미지"
          className="pointer-events-none mb-3 size-14 rounded-full select-none"
          width={56}
          height={56}
          draggable={false}
        />
        <div className="w-full">
          <p className="font-semibold">{name}</p>
          <p className="max-w-full truncate overflow-hidden text-sm whitespace-nowrap text-[#37383C9C]">
            {introduction}
          </p>
        </div>
      </Link>

      <Button
        variant="outline"
        className="w-full border-[#BAD0E5] text-[#BAD0E5]"
        onClick={handleFollow}
      >
        {isFollowing ? '팔로우취소' : '팔로우'}
      </Button>

      <X
        className="absolute top-2 right-2 cursor-pointer"
        size={14}
        stroke="#111111"
        onClick={() => onRemove(id)}
      />
    </div>
  );
}

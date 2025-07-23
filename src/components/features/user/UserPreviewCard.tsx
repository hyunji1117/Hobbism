'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { deleteBookmark, postBookmark } from '@/data/actions/bookmark';
import { ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useFollowStore } from '@/store/follow.store';
import { cn } from '@/lib/utils';

interface Props {
  id: number;
  name: string;
  introduction?: string;
  image: string;
  onRemove?: (id: number) => void;
  isFollowed?: boolean;
  bookmarkId?: number | null;
  variant: 'horizontal' | 'vertical';
}

export function UserPreviewCard({
  id,
  name,
  introduction,
  image,
  onRemove,
  isFollowed,
  bookmarkId: initialBookmarkId,
  variant = 'vertical',
}: Props) {
  const [isFollowing, setFollowing] = useState<boolean>(false);
  const [bookmarkId, setBookmarkId] = useState<number | null>(null);
  const accessToken = useAuthStore(state => state.accessToken);
  const increaseFollowing = useFollowStore(state => state.increaseFollowing);
  const decreaseFollowing = useFollowStore(state => state.decreaseFollowing);

  useEffect(() => {
    setFollowing(isFollowed ?? false);
    setBookmarkId(initialBookmarkId ?? null);
  }, [isFollowed, initialBookmarkId]);

  const handleFollow = async () => {
    if (isFollowing && bookmarkId) {
      if (!accessToken) return null;
      const res = await deleteBookmark(bookmarkId, accessToken);
      if (res.ok) {
        setFollowing(false);
        decreaseFollowing();
        setBookmarkId(null);
      }
    } else {
      if (!accessToken) return null;
      const res = await postBookmark('user', id, accessToken);
      if (res.ok) {
        setFollowing(true);
        increaseFollowing();
        setBookmarkId(res.item._id);
      }
    }
  };

  const variantClass =
    variant === 'vertical'
      ? 'flex-col gap-2 w-[148px] bg-[#70737C14]'
      : 'flex-row w-full';

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-between gap-2 rounded-[10px] p-4 text-center select-none',
        variantClass,
      )}
    >
      <Link
        href={`/user/${id}`}
        className={cn(
          'flex w-full items-center',
          variant === 'vertical' ? 'flex-col' : 'flex-row gap-3',
        )}
        draggable={false}
        prefetch={true}
      >
        <Image
          src={image}
          alt="프로필 이미지"
          className={cn(
            'pointer-events-none rounded-full select-none',
            variant === 'vertical' ? 'mb-3 size-14' : 'size-10',
          )}
          width={variant === 'vertical' ? 56 : 40}
          height={variant === 'vertical' ? 56 : 40}
          draggable={false}
        />

        <div
          className={cn(
            'w-full',
            variant === 'horizontal' &&
              'flex flex-col items-start justify-center',
          )}
        >
          <p
            className={cn(
              'truncate overflow-hidden font-semibold',
              variant === 'horizontal' && 'text-sm',
            )}
          >
            {name}
          </p>
          <p
            className={cn(
              'truncate overflow-hidden text-sm text-[#37383C9C]',
              variant === 'horizontal' ? 'max-w-full whitespace-nowrap' : '',
            )}
          >
            {introduction}
          </p>
        </div>
      </Link>
      {variant === 'vertical' ? (
        <Button
          variant="outline"
          onClick={handleFollow}
          className={cn('w-full border-[#BAD0E5] text-[#BAD0E5]')}
        >
          {isFollowing ? '팔로우취소' : '팔로우'}
        </Button>
      ) : (
        <ChevronRight />
      )}

      {variant === 'vertical' && onRemove && (
        <X
          className="absolute top-2 right-2 cursor-pointer"
          size={14}
          stroke="#111111"
          onClick={() => onRemove(id)}
        />
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import { UserPreviewCard } from '@/components/features/user/UserPreviewCard';
import { getBookmarkList } from '@/data/actions/bookmark';
import { User } from '@/types';

interface Props {
  recommendedUser: User[];
}

type ExtendedUser = User & {
  isFollowed?: boolean;
  bookmarkId?: number | null;
};

export default function UserPreviewList({ recommendedUser }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(ref);
  const [users, setUsers] = useState<ExtendedUser[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarkRes = await getBookmarkList('user');

        // 북마크 맵: userId -> bookmarkId
        const bookmarkMap = new Map<number, number>();
        Object.values(bookmarkRes)
          .filter((item: any) => item?.user?._id)
          .forEach((item: any) => {
            bookmarkMap.set(item.user._id, item._id);
          });

        // 추천 유저에 isFollowed, bookmarkId 붙이기
        const enhanced = recommendedUser.map(user => ({
          ...user,
          isFollowed: bookmarkMap.has(user._id),
          bookmarkId: bookmarkMap.get(user._id) ?? null,
        }));

        setUsers(enhanced);
      } catch (err) {
        console.error('북마크 불러오기 실패:', err);
        setUsers(recommendedUser);
      }
    };

    fetchBookmarks();
  }, [recommendedUser]);

  const handleRemove = (id: number) => {
    setUsers(prev => prev.filter(user => user._id !== id));
  };

  return (
    <section className="mb-4 px-5">
      <p className="mb-4 font-semibold">
        같은 취미를 공유하는 사람들을 만나보세요
      </p>

      <div
        ref={ref}
        {...events}
        className="scrollbar-hide flex cursor-grab gap-2 overflow-x-scroll select-none"
      >
        {users.map(user => (
          <UserPreviewCard
            key={user._id}
            id={user._id}
            name={user.name}
            introduction={user.introduction}
            image={
              user.image
                ? `https://fesp-api.koyeb.app/market/${user.image}`
                : '/images/default-profile-image.webp'
            }
            isFollowed={user.isFollowed}
            bookmarkId={user.bookmarkId}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </section>
  );
}

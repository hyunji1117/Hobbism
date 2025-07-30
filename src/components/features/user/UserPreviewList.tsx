'use client';

import { useEffect, useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import UserPreviewCard from '@/components/features/user/UserPreviewCard';
import { getBookmarkList } from '@/data/actions/bookmark';
import { User } from '@/types';
import { useAuthStore } from '@/store/auth.store';
import { getUserImageUrl } from '@/utils';

//          interface: 유저 프리뷰 리스트 컴포넌트 Properties          //
interface Props {
  recommendedUser: User[];
}

//          interface: 유저 & 북마크 확장 Properties          //
interface ExtendedUser extends User {
  isFollowed?: boolean;
  bookmarkId?: number | null;
}

//          component: 유저 프리뷰 리스트 컴포넌트          //
export default function UserPreviewList({ recommendedUser }: Props) {
  //          state: 드래그 요소 참조 상태          //
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  //          state: 추천 유저 상태          //
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  //          state: accessToken 상태          //
  const accessToken = useAuthStore(state => state.accessToken);
  //          function: 드래그 이벤트 처리 함수          //
  const { events } = useDraggable(ref);

  //          event handler: 유저 카드 제거 버튼 클릭 이벤트 처리          //
  const handleRemove = (id: number) => {
    setUsers(prev => prev.filter(user => user._id !== id));
  };

  //          effect: 북마크 정보를 기반으로 추천 유저를 업데이트          //
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (!accessToken) return null;
        const bookmarkRes = await getBookmarkList('user', accessToken);

        // 북마크 맵: userId -> bookmarkId
        const bookmarkMap = new Map<number, number>();
        Object.values(bookmarkRes)
          .filter(item => item?.user?._id)
          .forEach(item => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendedUser]);

  //         render: 유저 프리뷰 리스트 컴포넌트 렌더링          //
  return (
    <section className="mb-4 px-5">
      <p className="mb-4 font-semibold">
        같은 취미를 공유하는 사람들을 만나보세요
      </p>

      <div
        ref={ref}
        {...events}
        className="scrollbar-hide relative flex w-full cursor-grab gap-2 overflow-x-scroll select-none"
      >
        {users.map((user, idx) => (
          <UserPreviewCard
            variant="vertical"
            key={idx}
            id={user._id}
            name={user.name}
            introduction={user.extra?.introduction}
            image={getUserImageUrl(user.image)}
            isFollowed={user.isFollowed}
            bookmarkId={user.bookmarkId}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </section>
  );
}

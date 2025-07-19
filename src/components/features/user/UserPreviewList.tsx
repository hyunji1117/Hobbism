'use client';

import { UserPreviewCard } from '@/components/features/user/UserPreviewCard';
import { User } from '@/types';
import { useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

interface Props {
  recommendedUser: User[];
}

export default function UserPreviewList({ recommendedUser }: Props) {
  // 가로 스크롤 영역을 참조하기 위한 ref 설정
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  // useDraggable 훅을 통해 마우스 드래그로 스크롤 가능하게 함
  const { events } = useDraggable(ref);

  console.log(recommendedUser);
  // 초기 추천 사용자 데이터를 상태로 설정
  const [users, setUsers] = useState<User[]>(recommendedUser ?? []);

  // 특정 유저를 목록에서 제거하는 핸들러
  const handleRemove = (id: number) => {
    setUsers(prev => prev.filter(user => user._id !== id));
  };

  return (
    <section className="mt-4 px-5">
      {/* 섹션 제목 */}
      <p className="mb-4 font-semibold">
        같은 취미를 공유하는 사람들을 만나보세요
      </p>

      {/* 추천 사용자 카드 리스트 (가로 스크롤 & 드래그 가능) */}
      <div
        ref={ref}
        {...events} // 드래그 이벤트 연결
        className="scrollbar-hide flex cursor-grab gap-2 overflow-x-scroll select-none"
      >
        {/* 사용자 카드 반복 렌더링 */}
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
            onRemove={handleRemove}
          />
        ))}
      </div>
    </section>
  );
}

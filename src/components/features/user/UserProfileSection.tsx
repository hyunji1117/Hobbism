'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bookmark, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';
import { useFollowStore } from '@/store/follow.store';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import {
  deleteBookmark,
  getBookmark,
  postBookmark,
} from '@/data/actions/bookmark';
import { getUserImageUrl } from '@/utils';

//          interface: 유저 프로필 섹션 Properties          //
interface Props {
  user: User;
  isMypage: boolean;
}
//          component: 유저 프로필 섹션 컴포넌트          //
export function UserProfileSection({ user, isMypage }: Props) {
  //          variable: 디폴트 이미지 변수          //
  console.log('user.image', user.image);
  const imageUrl = getUserImageUrl(user.image);
  console.log('imageUrl', imageUrl);
  //          state: 팔로잉 카운트 상태          //
  const { followingCount, setFollowingCount } = useFollowStore();
  //          state: accessToken 상태          //
  const accessToken = useAuthStore(state => state.accessToken);
  //          state: 팔로우 상태          //
  const [isFollowed, setIsFollowed] = useState(false);
  //          state: 팔로우 여부 로딩 상태          //
  const [isFollowLoaded, setFollowLoaded] = useState(false);
  //          state: 북마크 ID 상태          //
  const [bookmarkId, setBookmarkId] = useState<number | null>(null);

  //          event handler: 팔로우 토큰 버튼 클릭 이벤트 처리          //
  const handleToggleFollow = async () => {
    try {
      if (!accessToken) return;

      if (isFollowed && bookmarkId) {
        // 팔로우 취소 → 북마크 삭제
        const res = await deleteBookmark(bookmarkId, accessToken);
        console.log('res', res);
        if (res.ok === 1) {
          console.log('삭제됨');
          setIsFollowed(false);
        }
      } else {
        // 팔로우 → 북마크 추가
        const res = await postBookmark('user', user._id, accessToken);
        if (res.ok === 1) {
          setBookmarkId(res.item._id);
          setIsFollowed(true);
        }
      }
    } catch (err) {
      console.error('팔로우 상태 변경 실패:', err);
    }
  };

  //          effect: 유저의 팔로잉 수를 전역 상태로 설정          //
  useEffect(() => {
    if (isMypage && user.bookmark?.users != null) {
      setFollowingCount(user.bookmark.users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMypage, user.bookmark?.users]);

  //          effect: 현재 유저가 이 유저를 팔로우하고 있는지 확인          //
  useEffect(() => {
    if (!isMypage && accessToken) {
      (async () => {
        try {
          const res = await getBookmark('user', user._id, accessToken);
          if (res.ok === 1) {
            setIsFollowed(res.ok === 1);
            setBookmarkId(res.item._id);
          }
        } catch (error) {
          console.error('팔로우 여부 확인 실패:', error);
        } finally {
          setFollowLoaded(true);
        }
      })();
    }
  }, [isMypage, user._id, accessToken]);
  //          render: 유저 프로필 섹션 컴포넌트 렌더링          //
  return (
    <div className="flex flex-col gap-4">
      {/* 프로필 상단 영역 */}
      <div className="flex items-center gap-4">
        {/* 프로필 이미지 */}
        <Image
          src={imageUrl}
          alt="프로필 이미지"
          className="size-16 rounded-full object-cover"
          width={64}
          height={64}
          priority
        />
        {/* 이름과 소개 */}
        <div className="flex flex-col justify-between">
          <span className="text-xl font-semibold">{`${user.name} ${user.extra?.nickname ? `(${user.extra.nickname})` : ''}`}</span>
          <span className="text-muted-foreground font-medium">
            {user.extra?.introduction || '\u00A0'}
          </span>
        </div>

        {/* 우측 버튼: 마이페이지면 '수정', 아니면 '팔로우' */}
        {isMypage ? (
          <Link href="/user/edit" className="ml-auto">
            <Button variant="outline" className="font-normal">
              수정
            </Button>
          </Link>
        ) : (
          isFollowLoaded && (
            <Button
              variant="outline"
              className="ml-auto font-normal"
              onClick={handleToggleFollow}
            >
              {isFollowed ? '팔로우취소' : '팔로우'}
            </Button>
          )
        )}
      </div>

      {/* 통계 정보 영역 (팔로우, 팔로잉, 스크랩) */}
      <div className="flex h-20 w-full overflow-hidden rounded-lg border bg-gray-50 p-4 text-base">
        {/* 팔로우 수 */}
        <Link
          href={`${user._id}/follow?tab=follow`}
          className="flex flex-1 flex-col items-center justify-center"
        >
          <div className="flex items-center gap-1">
            <Bookmark size={16} />
            <span>팔로우</span>
          </div>
          <div className="text-muted-foreground text-xs">
            {user.bookmarkedBy?.users ?? 0}
          </div>
        </Link>

        <Separator orientation="vertical" />

        {/* 팔로잉 수 */}
        <Link
          href={`${user._id}/follow?tab=following`}
          className="flex flex-1 flex-col items-center justify-center"
        >
          <div className="flex items-center gap-1">
            <Star size={16} />
            <span>팔로잉</span>
          </div>

          <div className="text-muted-foreground text-xs">{followingCount}</div>
        </Link>

        {/* 마이페이지일 때만 스크랩 표시 */}
        {isMypage && (
          <>
            <Separator orientation="vertical" />
            <Link
              href={`${user._id}/bookmark`}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <div className="flex items-center gap-1">
                <Bookmark size={16} />
                <span>스크랩</span>
              </div>
              <div className="text-muted-foreground text-xs">
                {user.bookmark?.posts ?? 0}
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

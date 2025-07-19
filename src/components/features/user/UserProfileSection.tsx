'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';

interface Props {
  user: User;
  isMypage: boolean;
}

/**
 * 사용자 프로필 및 통계 정보를 표시하는 섹션 컴포넌트
 * - 프로필 이미지, 이름, 소개글
 * - 팔로우 / 팔로잉 / 스크랩 수치 표시
 * - 마이페이지일 경우 수정 버튼 및 스크랩 탭 표시
 */
export function UserProfileSection({ user, isMypage }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* 프로필 상단 영역 */}
      <div className="flex items-center gap-4">
        {/* 프로필 이미지 */}
        <Image
          src={
            user.image ? `https://fesp-api.koyeb.app/market/${user.image}` : ''
          }
          alt="프로필 이미지"
          className="rounded-full object-cover"
          width={64}
          height={64}
          priority
        />
        {/* 이름과 소개 */}
        <div className="flex flex-col justify-between">
          <span className="text-2xl font-semibold">{user.name}</span>
          <span className="text-muted-foreground font-medium">
            {user.introduction}
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
          <Button variant="outline" className="ml-auto font-normal">
            팔로우
          </Button>
        )}
      </div>

      {/* 통계 정보 영역 (팔로우, 팔로잉, 스크랩) */}
      <div className="flex h-20 w-full overflow-hidden rounded-lg border p-4 text-sm">
        {/* 팔로우 수 */}
        <Link
          href="/following"
          className="flex flex-1 flex-col items-center justify-center"
        >
          <div className="flex items-center gap-1">
            <Bookmark size={16} />
            <span>팔로우</span>
          </div>
          <div className="text-muted-foreground text-xs">
            {user.bookmark.users ?? 0}
          </div>
        </Link>

        <Separator orientation="vertical" />

        {/* 팔로잉 수 */}
        <Link
          href="/following"
          className="flex flex-1 flex-col items-center justify-center"
        >
          <div className="flex items-center gap-1">
            <Bookmark size={16} />
            <span>팔로잉</span>
          </div>
          <div className="text-muted-foreground text-xs">
            {user.bookmarkedBy.users ?? 0}
          </div>
        </Link>

        {/* 마이페이지일 때만 스크랩 표시 */}
        {isMypage && (
          <>
            <Separator orientation="vertical" />
            <Link
              href="/scrap"
              className="flex flex-1 flex-col items-center justify-center"
            >
              <div className="flex items-center gap-1">
                <Bookmark size={16} />
                <span>스크랩</span>
              </div>
              <div className="text-muted-foreground text-xs">
                {user.bookmark.posts ?? 0}
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

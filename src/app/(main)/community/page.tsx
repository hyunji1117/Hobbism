import CommunityFeedList from '@/components/features/community/community-main/CommunityFeedList';
import CommunityFeedSkeleton from '@/components/features/community/community-main/CommunityFeedSkeleton';
import { getBookmarks } from '@/data/actions/bookmark';
import { fetchPosts } from '@/data/functions/CommunityFetch';
import { authOptions } from '@/lib/auth';
import { CirclePlus, Pencil } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function CommunityPage() {
  const res = await fetchPosts('community', 1, 10);

  if (res.ok !== 1 || !res.pagination) return null;

  const session = await getServerSession(authOptions);

  if (!session?.user?._id || !session.accessToken || !session.user) {
    throw new Error('로그인이 필요합니다');
  }

  const bookmarkRes = await getBookmarks('post', session.accessToken);

  if (bookmarkRes.ok !== 1 || !res.item) return null;

  const followRes = await getBookmarks('user', session.accessToken);

  if (followRes.ok !== 1 || !followRes.item) return null;
  const follow = followRes.item;

  return (
    <main className="relative flex w-full flex-1 flex-col bg-white">
      {/* 메인 컨텐츠 */}
      <div className="flex flex-col py-3 text-[#4A4A4A]">
        <div className="flex justify-between px-4">
          <div className="flex flex-1 flex-col gap-1 self-end pb-5">
            <p className="line-clamp-1 text-lg font-bold">
              취미 생활을 공유해보세요
            </p>
            <p className="line-clamp-1 max-w-full truncate text-xs font-semibold">
              피드를 작성하면 포인트를 얻을 수 있습니다
            </p>
            <p className="line-clamp-2 text-xs font-normal break-words text-[#999999]">
              건전한 커뮤니티 환경을 위해 일부 글은 운영 정책에 따라 노출이
              제한된거나 삭제될 수 있습니다{' '}
            </p>
          </div>
          <div className="relative aspect-square min-w-1/3 shrink-0">
            <Image
              src={'/images/character/character-write.webp'}
              alt="캐릭터 글작성"
              fill
              priority
              sizes="200"
            />
          </div>
        </div>
        <Link
          href={'/community/write'}
          className="flex items-center justify-center gap-1 border-t border-[#f2f2f2] py-3"
          prefetch={true}
        >
          <CirclePlus size={20} />
          <span>피드 작성하기</span>
        </Link>
        <div className="h-4 bg-[#f7f7f7]"></div>
      </div>
      {/* 게시물 목록 or 빈 상태 메시지 */}
      {res.item.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-20 text-sm text-gray-400">
          게시물이 없습니다.
        </div>
      ) : (
        <CommunityFeedList
          posts={res.item}
          postBookmarks={bookmarkRes.item}
          userFollows={followRes.item}
          totalPages={res.pagination.totalPages}
        />
      )}
    </main>
  );
}

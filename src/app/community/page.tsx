import CommunityMain from '@/components/features/community/community-main/CommunityMain';
import { fetchPosts } from '@/data/functions/CommunityFetch';
import { Post } from '@/types/';

export default async function CommunityPage() {
  const res = await fetchPosts('community');

  if (res.ok !== 1) return null;

  console.log('피드 전체목록', res.item);
  return (
    <main className="flex w-full flex-col bg-white">
      {/* 상단 헤더 - 고정 */}
      {/* <CommunityMainHeader /> */}

      {/* 메인 컨텐츠 */}
      <div className="scrollbar-hide flex-1">
        {res.item.map((post: Post) => (
          <CommunityMain key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}

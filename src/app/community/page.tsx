import CommunityMain from '@/components/features/community/community-main/CommunityMain';
import { fetchPosts } from '@/data/functions/CommunityFetch';
import { Post } from '@/types/';

export default async function CommunityPage() {
  const res = await fetchPosts('community');

  return (
    <div className="scrollbar-hide flex-1 overflow-y-auto">
      {' '}
      {/* pt-12 추가 - 헤더 공간 */}
      {res.ok ? (
        res.item.map((post: Post) => (
          <CommunityMain key={post._id} post={post} />
        ))
      ) : (
        <div className="p-4 text-center">
          <p className="text-gray-500">{res.message}</p>
        </div>
      )}
    </div>
  );
}

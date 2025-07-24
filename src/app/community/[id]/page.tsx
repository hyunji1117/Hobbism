import { fetchPost } from '@/data/functions/CommunityFetch';
import BookmarkFeedCard from '@/components/features/community/community-bookmark/BookmarkFeedCard';
import CommunityHeader from '@/components/features/community/community-common/CommunityHeader';
import CommentSection from '@/components/features/community/community-detail/CommentSection';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FeedDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FeedDetailPage({ params }: FeedDetailPageProps) {
  const { id } = await params;
  const res = await fetchPost(Number(id));

  if (!res.ok) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="pt-5">
        <CommunityHeader title="피드보기" />
        <hr className="mt-2" />
      </div>

      <div className="scrollbar-hide flex-1 overflow-y-auto">
        {/* 피드 내용 */}
        <BookmarkFeedCard
          postId={res.item._id}
          profileImage={
            res.item.user.image
              ? `${API_URL}${res.item.user.image}`
              : '/images/inhwan/profile-default.png'
          }
          userName={res.item.user.name}
          timeAgo={res.item.createdAt}
          description={res.item.content}
          image={
            res.item.image?.[0]
              ? `${API_URL}/${res.item.image[0]}`
              : '/images/inhwan/barrier.webp'
          }
        />

        {/* 댓글 섹션 */}
        <CommentSection postId={res.item._id} />
      </div>
    </div>
  );
}

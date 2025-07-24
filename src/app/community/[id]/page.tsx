import { fetchPost } from '@/data/functions/CommunityFetch';
import BookmarkFeedCard from '@/components/features/community/community-bookmark/BookmarkFeedCard';
import CommentSection from '@/components/features/community/community-detail/CommentSection';
import CommentInput from '@/components/features/community/community-detail/CommentInput';
import { getUserImageUrl } from '@/utils';

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
      {/* 스크롤 영역 (피드 + 댓글 목록만) */}
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <BookmarkFeedCard
          postId={res.item._id}
          profileImage={getUserImageUrl(res.item.user.image)}
          userName={res.item.user.name}
          timeAgo={res.item.createdAt}
          description={res.item.content}
          image={
            res.item.image?.[0]
              ? `${API_URL}/${res.item.image[0]}`
              : '/images/inhwan/barrier.webp'
          }
        />

        {/* 댓글 목록만 */}
        <CommentSection postId={res.item._id} />
      </div>

      {/* 댓글 입력창 하단 고정 */}
      <div className="border-t bg-white">
        <CommentInput
          postId={res.item._id}
          profileImage="/images/inhwan/profile-default.png"
        />
      </div>
    </div>
  );
}

import BookmarkFeedCard from '@/components/features/community/community-bookmark/BookmarkFeedCard';
import CommunityHeader from '@/components/features/community/community-common/CommunityHeader';

export default function FeedDetailPage() {
  return (
    <div className="flex h-screen flex-col bg-white">
      {/* 상단 헤더 - CommunityHeader와 같은 높이 */}
      <div className="pt-5">
        <CommunityHeader title="피드보기" />
        <hr className="mt-2" />
      </div>

      {/* 메인 컨텐츠 - 스크롤 가능 */}
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        {/* 피드 내용 */}
        <BookmarkFeedCard
          postId={1}
          profileImage="/images/inhwan/profile-default.png"
          userName="사용자"
          timeAgo="방금 전"
          description="게시글 내용"
          image="/images/inhwan/barrier.webp"
        />
      </div>
    </div>
  );
}

import CommentItem from '@/components/features/community/community-detail/CommentItem';
import CommentInput from '@/components/features/community/community-detail/CommentInput';
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
          userName="닉네임"
          timeAgo="2시간 전"
          description="드디어 완성된 우리집 인테리어 화분 배치하느라 힘들었지만 만족스러워요"
          image="/images/inhwan/barrier.webp"
          profileImage="/images/inhwan/profile-default.png"
        />

        {/* 댓글 목록 부분 */}
        <div className="w-full">
          {/* 댓글 타이틀 */}
          <div className="mt-2.5 px-5">
            <span className="text-sm font-bold text-black">댓글</span>
          </div>

          {/* 댓글 목록 */}
          <div className="pb-[74px]">
            {' '}
            {/* 댓글 입력창 높이만큼 패딩 */}
            <CommentItem
              profileImage="/images/inhwan/profile-default.png"
              userName="댓글 작성자"
              timeAgo="1시간 전"
              comment="정말 날씨가 좋네요 저도 싸우러 갈게요!"
            />
            <CommentItem
              profileImage="/images/inhwan/profile-default.png"
              userName="댓글 작성자"
              timeAgo="1시간 전"
              comment="정말 날씨가 좋네요 저도 싸우러 갈게요!"
            />
            <CommentItem
              profileImage="/images/inhwan/profile-default.png"
              userName="댓글 작성자"
              timeAgo="1시간 전"
              comment="정말 날씨가 좋네요 저도 싸우러 갈게요!"
            />
            <CommentItem
              profileImage="/images/inhwan/profile-default.png"
              userName="댓글 작성자"
              timeAgo="1시간 전"
              comment="정말 날씨가 좋네요 저도 싸우러 갈게요!"
            />
            <CommentItem
              profileImage="/images/inhwan/profile-default.png"
              userName="댓글 작성자"
              timeAgo="1시간 전"
              comment="정말 날씨가 좋네요 저도 싸우러 갈게요!"
            />
          </div>
        </div>
      </div>

      {/* 댓글 입력창 - 화면 맨 밑에 고정 */}
      <div className="sticky bottom-0 z-10 bg-white">
        <CommentInput profileImage="/images/inhwan/profile-default.png" />
      </div>
    </div>
  );
}

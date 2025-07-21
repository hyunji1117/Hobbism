import TabBar from '@/components/layout/tabbar/Tabbar';
import CommunityMainHeader from '@/components/features/community/community-main/CommunityMainHeader';
import CommunityMain from '@/components/features/community/community-main/CommunityMain';

export default function CommunityPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      {/* 상단 헤더 - 고정 */}
      <div className="sticky top-0 z-10 bg-white py-4">
        <CommunityMainHeader />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        {/* 피드 아이템 */}
        <CommunityMain
          id={1}
          userName="닉네임"
          timeAgo="2시간 전"
          description="드디어 완성된 결계 마왕의 졸개를 처리하느라 ..."
          image="/images/inhwan/barrier.webp"
          profileImage="/images/inhwan/profile-default.png"
        />

        <CommunityMain
          id={2}
          userName="닉네임"
          timeAgo="2시간 전"
          description="드디어 완성된 결계 마왕의 졸개를 처리하느라 ..."
          image="/images/inhwan/barrier.webp"
          profileImage="/images/inhwan/profile-default.png"
        />

        <CommunityMain
          id={3}
          userName="닉네임"
          timeAgo="2시간 전"
          description="드디어 완성된 결계 마왕의 졸개를 처리하느라 ..."
          image="/images/inhwan/barrier.webp"
          profileImage="/images/inhwan/profile-default.png"
        />
      </div>

      {/* 하단 탭바 - 고정 */}
      <div className="sticky bottom-0 z-10">
        <TabBar />
      </div>
    </div>
  );
}

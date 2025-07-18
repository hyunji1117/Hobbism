import BookmarkFeedCard from "@/components/features/community/community-bookmark/BookmarkFeedCard";
import CommunityHeader from "@/components/features/community/community-common/CommunityHeader";
import TabBar from "@/components/layout/tabbar/Tabbar";

export function MyFeedPage() {

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-white pt-5">
        <CommunityHeader title="북마크" />
        <hr className="mt-2"/>
      </div>
     
     <div>
      <BookmarkFeedCard userName = '오다구' timeAgo = '2시간 전' description = '드디어 완성된 결계 마왕의 졸개를 처리하느라 힘들었지만 만족스럽다고 말하고 싶다' image = '/images/inhwan/barrier.webp' profileImage = '/images/inhwan/profile-default.png'/>
      <BookmarkFeedCard userName = '오다구' timeAgo = '2시간 전' description = '드디어 완성된 결계 마왕의 졸개를 처리하느라 힘들었지만 만족스럽다고 말하고 싶다' image = '/images/inhwan/barrier.webp' profileImage = '/images/inhwan/profile-default.png'/>
      <BookmarkFeedCard userName = '오다구' timeAgo = '2시간 전' description = '드디어 완성된 결계 마왕의 졸개를 처리하느라 힘들었지만 만족스럽다고 말하고 싶다' image = '/images/inhwan/barrier.webp' profileImage = '/images/inhwan/profile-default.png'/>
     </div>

     
     <TabBar />
    </div>
  )
}
export default MyFeedPage;
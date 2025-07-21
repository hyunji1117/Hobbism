import LiveOverlay from '@/app/live/LiveOverlay';
import { LiveComment } from '@/components/features/live/LiveCommentBtn';
import { LiveVideo } from '@/components/features/live/LiveVideo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '라이브 페이지',
  description: '라이브 페이지입니다.',
};

export default function LivePage() {
  return (
    <>
      {/* // 라이브 전체 section */}
      <section className="relative h-screen overflow-hidden">
        <LiveOverlay />
        {/* 라이브 버튼 */}

        {/* 라이브 비디오 */}
        <div className="h-[60%]">
          <LiveVideo />
        </div>
        {/* 라이브 댓글 */}
        <div className="h-[48%]">
          <LiveComment />
        </div>
      </section>
    </>
  );
}

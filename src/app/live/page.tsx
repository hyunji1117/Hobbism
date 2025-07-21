import { LiveCalendarBtn } from '@/components/features/live/LiveCalendarBtn';
import { LiveComment } from '@/components/features/live/LiveCommentBtn';
import { LiveVideo } from '@/components/features/live/LiveVideo';
import moment from 'moment';

export default function LivePage() {
  return (
    <>
      {/* // 라이브 전체 section */}
      <section className="relative h-screen overflow-hidden">
        {/* 라이브 버튼 */}
        <div className="absolute w-full">
          <LiveCalendarBtn />
        </div>
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

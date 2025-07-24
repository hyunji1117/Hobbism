import LiveData from '@/app/live/LiveData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '라이브 페이지',
  description: '라이브 페이지입니다.',
};

export default function LivePage() {
  return (
    <>
      {/* // 라이브 전체 section */}
      <section className="scrollbar-hide relative h-screen touch-pan-y snap-y snap-mandatory overflow-y-auto">
        <LiveData />
      </section>
    </>
  );
}

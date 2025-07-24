import LiveDataUI from '@/app/live/LiveDataUI';
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
        <LiveDataUI />
      </section>
    </>
  );
}

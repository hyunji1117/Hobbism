import LiveData from '@/app/live/LiveData';
import { LiveCalendarBtn } from '@/components/features/live/LiveCalendarBtn';
import { GoBackButton } from '@/components/features/shop/ProductDetail/ProductDetailClient';
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
        {/* 라이브 캘린더 버튼 */}
        <header className="bg-amber-200select-none fixed z-10 w-full max-w-[600px]">
          <ul>
            <li className="absolute top-3.5 left-0 ml-3.5">
              <GoBackButton stroke={'stroke-white'} />
            </li>
            <li className="fixed top-3.5 left-[50%] translate-x-[-50%] text-xl font-bold text-white">
              라이브
            </li>
            <li>
              <LiveCalendarBtn />
            </li>
          </ul>
        </header>

        <LiveData />
      </section>
    </>
  );
}

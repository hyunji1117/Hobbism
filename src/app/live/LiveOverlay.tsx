'use client';

import { LiveCalendarBtn } from '@/components/features/live/LiveCalendarBtn';
import { LiveComment } from '@/components/features/live/LiveComment';
import { LiveProgress } from '@/components/features/live/LiveProgress';
import { LiveVideo } from '@/components/features/live/LiveVideo';
import { GoBackButton } from '@/components/features/shop/ProductDetail/ProductDetailClient';
import { LiveProduct, useLiveStore } from '@/store/live.store';
import moment from 'moment';
import { useState } from 'react';

export default function LiveOverlay({ live }: { live: LiveProduct }) {
  const currentLive = useLiveStore(state => state.currentLive);

  // 오버레이 토글
  const [showOverlay, setShowOverlay] = useState(true);
  const handleClickOverlay = () => {
    setShowOverlay(false);
  };

  const isLiveNow = moment().isBetween(moment(live.start), moment(live.end));

  console.log('🔍 currentLive in LiveOverlay:', currentLive);

  return (
    <>
      {isLiveNow ? (
        <div className="absolute top-[5%] z-5">
          <LiveProgress />
        </div>
      ) : (
        showOverlay && (
          <div
            onClick={handleClickOverlay}
            className="absolute top-0 left-0 z-5 h-[100vh] w-full bg-black/80"
          >
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <p className="text-xl font-semibold">
                현재 방송 중인 Live가 없습니다.
              </p>
              <p className="mt-1 text-xs font-light text-gray-200">
                지난 방송이 궁금하다면 화면을 클릭해 보세요!
              </p>
            </div>
          </div>
        )
      )}

      {/* 라이브 캘린더 버튼 */}
      <header className="bg-amber-200select-none fixed z-10 w-full max-w-[600px]">
        <ul>
          <li className="absolute top-3.5 left-0 ml-3.5">
            <GoBackButton />
          </li>
          <li className="fixed top-3.5 left-[50%] translate-x-[-50%] text-xl font-bold text-white">
            라이브
          </li>
          <li>
            <LiveCalendarBtn />
          </li>
        </ul>
      </header>

      {/* 라이브 비디오 */}
      <div key={live._id} className="h-screen">
        <div className="h-[60%]">
          <LiveVideo
            livePath={live.extra?.live.livePath}
            _id={live._id}
            name={live.name}
            rate={live.extra?.discountRate}
          />
        </div>
        {/* 라이브 댓글 */}
        <div className="h-[48%]">
          <LiveComment liveId={live.extra?.live.liveId} />
        </div>
      </div>
    </>
  );
}

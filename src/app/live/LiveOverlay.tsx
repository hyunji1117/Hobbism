'use client';

import { currentLive } from '@/app/live/LiveData';
import { LiveComment } from '@/components/features/live/LiveComment';
import { LiveProgress } from '@/components/features/live/LiveProgress';
import { LiveVideo } from '@/components/features/live/LiveVideo';
import { useState } from 'react';

interface LiveType {
  id: string;
  start: moment.Moment;
  end: moment.Moment;
  title: string;
  livePath: string;
  liveId: string;
}

export default function LiveOverlay({ live }: { live: LiveType }) {
  // 오버레이 토글
  const [showOverlay, setShowOverlay] = useState(true);
  const handleClickOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <>
      {currentLive ? (
        <div className="absolute top-[5%]">
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

      {/* 라이브 비디오 */}
      <div className="h-screen">
        <div className="h-[60%]">
          <LiveVideo livePath={live.livePath} id={live.id} />
        </div>
        {/* 라이브 댓글 */}
        <div className="h-[48%]">
          <LiveComment liveId={live.liveId} />
        </div>
      </div>
    </>
  );
}

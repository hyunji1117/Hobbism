'use client';

import { LiveCalendarBtn } from '@/components/features/live/LiveCalendarBtn';
import { LiveProgress } from '@/components/features/live/LiveProgress';
import moment from 'moment';
import { useState } from 'react';

export default function LiveOverlay() {
  // 라이브 일정
  const liveData = [
    {
      id: 1,
      start: moment('2025-07-22 02:00'),
      end: moment('2025-07-22 18:00'),
      title: '여름 신상 라이브 세일',
    },
    {
      id: 2,
      start: moment('2025-07-23 13:00'),
      end: moment('2025-07-23 15:00'),
      title: '여름  라이브 세일',
    },
    {
      id: 3,
      start: moment('2025-07-24 14:00'),
      end: moment('2025-07-24 15:00'),
      title: '여름  세일',
    },
  ];

  // 지금 방송 중인 라이브
  const now = moment();
  const currentLive = liveData.find(live =>
    now.isBetween(live.start, live.end),
  );

  // 오버레이 토글
  const [showOverlay, setShowOverlay] = useState(true);
  const handleClickOverlay = () => {
    setShowOverlay(false);
  };
  return (
    <>
      {!currentLive && showOverlay && (
        <div
          onClick={handleClickOverlay}
          className="absolute top-0 left-0 z-1 h-[100vh] w-full bg-black/80"
        >
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <p className="text-xl">현재 방송 중인 Live가 없습니다.</p>
            <p className="font-light">
              지난 방송을 다시 보려면 화면을 클릭하세요!
            </p>
          </div>
        </div>
      )}

      {currentLive && (
        <div className="absolute top-[5%]">
          <LiveProgress />
        </div>
      )}

      <div className="">
        {/* <div className="absolute top-0 left-0 z-1 h-[100vh] w-full bg-black/50"></div> */}
      </div>

      {/* 라이브 캘린더 버튼 */}
      <div className="absolute z-10 w-full select-none">
        <LiveCalendarBtn liveData={liveData} />
      </div>
    </>
  );
}

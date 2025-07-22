'use client';

import { LiveBuyBtn } from '@/components/features/live/LiveBuyBtn';
import { LiveCalendarBtn } from '@/components/features/live/LiveCalendarBtn';
import { LiveComment } from '@/components/features/live/LiveComment';
import { LiveProgress } from '@/components/features/live/LiveProgress';
import { LiveVideo } from '@/components/features/live/LiveVideo';
import moment from 'moment';
import { useState } from 'react';

export default function LiveOverlay() {
  /**
   *예시)
   *src="https://www.youtube.com/embed/VSH2d0qUkpM?si=XQ5FXY5fQjEJp-UD"
   *src="https://www.youtube.com/embed/<여기에 있는 코드가 livePath>"
   *src="https://www.youtube.com/embed/<여기에 있는 코드가 liveId>?si=XQ5FXY5fQjEJp-UD"
   */
  // 라이브 링크 아이디(비디오 가져올 때)
  const livePath = 'hAX63N-mCxs?si=5ZoyVqA0d5n7j5bE';
  // 라이브 아이디(댓글 가져올 때)
  const liveId = 'yf5NOyy1SXU'; // YouTube Live Video ID

  // 라이브 일정
  const liveData = [
    {
      id: 1,
      start: moment('2025-07-22 12:00'),
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
              <p className="text-xl">현재 방송 중인 Live가 없습니다.</p>
              <p className="font-light">
                지난 방송이 궁금하다면 화면을 클릭해 보세요!
              </p>
            </div>
          </div>
        )
      )}
      {/* 라이브 캘린더 버튼 */}
      <div className="absolute z-10 w-full select-none">
        <LiveCalendarBtn liveData={liveData} />
      </div>
      {/* 상품 설명, 제품 보기 링크 */}
      <div className="absolute top-[calc(43%)] z-1 flex w-full justify-between px-3.5 text-white md:top-[calc(49%)] lg:top-[calc(43%)]">
        <span className="flex flex-col justify-end text-xs leading-loose text-[#6B7280]">
          <p>상품 제목 타이틀</p>
          <p>상품 설명 텍스트</p>
        </span>
        <span>
          <p className="text-[40px] font-semibold text-[#FE508B]">20%</p>
          <LiveBuyBtn />
        </span>
      </div>
      {/* 라이브 비디오 */}
      <div className="h-[60%]">
        <LiveVideo livePath={livePath} />
      </div>
      {/* 라이브 댓글 */}
      <div className="h-[48%]">
        <LiveComment liveId={liveId} />
      </div>
    </>
  );
}

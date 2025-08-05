'use client';

import { LiveComment } from '@/components/features/live/LiveComment';
import { LiveProgress } from '@/components/features/live/LiveProgress';
import { LiveVideo } from '@/components/features/live/LiveVideo';
import { LiveProduct, useLiveStore } from '@/store/live.store';
import moment from 'moment';
import { useState } from 'react';

export default function LiveContent({ live }: { live: LiveProduct }) {
  const currentLive = useLiveStore(state => state.currentLive);

  //           state: 방송 중이 아닐 경우 보여 줄 overlay 화면 상태        //
  const [showOverlay, setShowOverlay] = useState(true);
  //          effect: 오버레이 클릭 시 화면 꺼짐        //
  const handleClickOverlay = () => {
    setShowOverlay(false);
  };

  const isLiveNow = moment().isBetween(moment(live.start), moment(live.end));

  //          render: 라이브 화면 렌더        //
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

      <div key={live?._id} className="h-screen overflow-hidden">
        {/* 라이브 댓글 */}
        <div className="absolute bottom-0 h-[60%] w-full">
          <LiveComment liveId={live.extra?.live.liveId} />
        </div>

        {/* 라이브 비디오 */}
        <div className="h-[50%]">
          <LiveVideo
            livePath={live.extra?.live.livePath}
            _id={live?._id}
            name={live.name}
            rate={live.extra?.discountRate}
            imgSrc={live.mainImages[0]?.path}
            price={live.price}
            isLiveNow={moment().isBetween(moment(live.start), moment(live.end))}
          />
        </div>
      </div>
    </>
  );
}

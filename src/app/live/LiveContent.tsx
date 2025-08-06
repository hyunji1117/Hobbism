'use client';

import { LiveComment } from '@/components/features/live/LiveComment';
import { LiveProgress } from '@/components/features/live/LiveProgress';
import { LiveVideo } from '@/components/features/live/LiveVideo';
import { LiveProduct, useLiveStore } from '@/store/live.store';
import { X } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

export default function LiveContent({ live }: { live: LiveProduct }) {
  const currentLive = useLiveStore(state => state.currentLive);

  //           state: 방송 중이 아닐 경우 보여 줄 overlay 화면 상태        //
  const [showOverlay, setShowOverlay] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const isLiveNow = moment().isBetween(moment(live.start), moment(live.end));

  //          render: 라이브 화면 렌더        //
  return (
    <>
      {isLiveNow ? (
        <>
          <div className="absolute top-[5%] z-5">
            <LiveProgress />
          </div>
          {isOpen && (
            <div className="absolute bottom-0 left-1/2 z-15 flex w-[100%] -translate-x-1/2 items-center justify-between bg-[#1a1a1a]/80 p-4 text-xs text-white md:text-sm">
              <p className="block lg:hidden">
                모바일 환경에서는 댓글 작성 기능이 제한될 수 있습니다.
              </p>
              <p className="hidden lg:block">
                유튜브 로그아웃 상태 시 댓글 작성 기능이 제한될 수 있습니다.
              </p>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>
          )}
        </>
      ) : (
        showOverlay && (
          <div
            onClick={() => setShowOverlay(false)}
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

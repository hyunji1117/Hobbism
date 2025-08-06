'use client';

import LiveContent from '@/app/live/LiveContent';
import { useLiveStore } from '@/store/live.store';
import Image from 'next/image';
import { useEffect } from 'react';

export default function LiveData() {
  const liveToShow = useLiveStore(state => state.liveToShow);
  const fetchLive = useLiveStore(state => state.fetchLive);

  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  if (!liveToShow || (Array.isArray(liveToShow) && liveToShow.length === 0)) {
    return;
  }

  const liveToShowArray = Array.isArray(liveToShow) ? liveToShow : [liveToShow];
  const validLives = liveToShowArray.filter(Boolean);

  return (
    <>
      {validLives.length > 0 ? (
        validLives.map(live => (
          <div key={live._id}>
            <LiveContent live={live} />
          </div>
        ))
      ) : (
        <div className="absolute top-1/2 left-1/2 w-full -translate-1/2">
          <div className="relative left-1/2 aspect-square w-[40%] -translate-x-1/2">
            <Image
              fill
              src="/images/character/character-sad.webp"
              alt=""
              priority={false}
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <p className="text-center text-sm text-gray-600">
            판매 중인 라이브 상품이 없습니다.
          </p>
        </div>
      )}
    </>
  );
}

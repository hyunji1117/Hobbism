'use client';

import LiveContent from '@/app/live/LiveContent';
import { useLiveStore } from '@/store/live.store';
import { useEffect } from 'react';

export default function LiveData() {
  const liveToShow = useLiveStore(state => state.liveToShow);
  const fetchLive = useLiveStore(state => state.fetchLive);

  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  if (!liveToShow || (Array.isArray(liveToShow) && liveToShow.length === 0)) {
    return <div>라이브 상품이 없습니다.</div>;
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
        <div>라이브 상품이 없습니다.</div>
      )}
    </>
  );
}

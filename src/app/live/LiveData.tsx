'use client';

import LiveOverlay from '@/app/live/LiveOverlay';
import { useLiveStore } from '@/store/live.store';
import { useEffect } from 'react';

export default function LiveData() {
  const liveToShow = useLiveStore(state => state.liveToShow);
  const fetchLive = useLiveStore(state => state.fetchLive);

  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  const liveToShowArray = Array.isArray(liveToShow) ? liveToShow : [liveToShow];

  console.log('liveToShow', liveToShow);
  console.log('liveToShowArray', liveToShowArray);

  // 값이 아직 비었을 경우 로딩 처리 등
  if (!liveToShowArray || liveToShowArray.length === 0) {
    return <div>로딩 중</div>;
  }

  return (
    <>
      {liveToShowArray.map(live => (
        <div key={live._id} className="snap-start">
          <LiveOverlay live={live} />
        </div>
      ))}
    </>
  );
}

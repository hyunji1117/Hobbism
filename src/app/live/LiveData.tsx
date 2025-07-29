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

  const liveToShowArray = Array.isArray(liveToShow) ? liveToShow : [liveToShow];

  return (
    <>
      {liveToShowArray.map(live => (
        <div key={live._id} className="snap-start">
          <LiveContent live={live} />
        </div>
      ))}
    </>
  );
}

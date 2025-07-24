'use client';

import LiveOverlay from '@/app/live/LiveOverlay';
import moment from 'moment';

/**
 * id: 상품 아이디
 * livePath: 영상 주소 뒷부분
 * liveId: 영상 주소 아이디
 *예시)
 *src="https://www.youtube.com/embed/VSH2d0qUkpM?si=XQ5FXY5fQjEJp-UD"
 *src="https://www.youtube.com/embed/<여기에 있는 코드가 livePath>"
 *src="https://www.youtube.com/embed/<여기에 있는 코드가 liveId>?si=XQ5FXY5fQjEJp-UD"
 */
export const liveDummyData = [
  {
    id: '1',
    start: moment('2025-07-24 00:00'),
    end: moment('2025-07-24 18:00'),
    title: '여름 신상 라이브 세일',
    livePath: 'hAX63N-mCxs?si=5ZoyVqA0d5n7j5bE',
    liveId: 'yf5NOyy1SXU',
  },
  {
    id: '6',
    start: moment('2025-07-24 00:00'),
    end: moment('2025-07-24 18:00'),
    title: '여름 신상 라이브',
    livePath: '2QWVZkuTU4s?si=Vq8BbHgjRGJogEGu',
    liveId: 'yf5NOyy1SXU',
  },
  {
    id: '4',
    start: moment('2025-07-25 00:00'),
    end: moment('2025-07-25 18:00'),
    title: '여름 신상 ',
    livePath: 'hAX63N-mCxs?si=5ZoyVqA0d5n7j5bE',
    liveId: 'yf5NOyy1SXU',
  },
];

// 지금 방송 중인 라이브
const now = moment();
export const currentLive = liveDummyData.filter(live =>
  now.isBetween(live.start, live.end),
);

export const latestPastLive = [...liveDummyData]
  .filter(live => now.isAfter(live.end))
  .sort((a, b) => moment(b.end).diff(moment(a.end)))[0];

export default function LiveData() {
  const liveToShow = currentLive.length > 0 ? currentLive : [latestPastLive];
  return (
    <>
      {liveToShow.map(live => (
        <div key={live.id} className="snap-start">
          <LiveOverlay live={live} />
        </div>
      ))}
    </>
  );
}

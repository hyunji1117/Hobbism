import { fetchLiveProducts } from '@/data/functions/AllProductFetch';
import { Product } from '@/types/interface/product';
import moment from 'moment';
import { create } from 'zustand';

export type LiveProduct = Product & {
  start: moment.Moment;
  end: moment.Moment;
};

interface LiveStore {
  liveCastData: LiveProduct[];
  currentLive: LiveProduct[];
  liveToShow: LiveProduct[] | LiveProduct;
  fetchLive: () => Promise<void>;
}

export const useLiveStore = create<LiveStore>(set => ({
  liveCastData: [],
  currentLive: [],
  liveToShow: [],
  fetchLive: async () => {
    const data = await fetchLiveProducts();
    const liveData = data.filter(item => item?.extra?.isLiveSpecial);

    const now = moment();

    // string 타입의 start, end를 moment(날짜)로 바꿔준 데이터
    const liveCastData = liveData.map(item => ({
      ...item,
      start: moment(item.extra?.live?.start),
      end: moment(item.extra?.live?.end),
    }));

    // 현재 방송 중인 라이브
    const current = liveCastData.filter(live =>
      now.isBetween(live.start, live.end),
    );

    // 바로 이전 라이브
    const latestPastLive = [...liveCastData]
      .filter(live => now.isAfter(live.end))
      .sort((a, b) => moment(b.end).diff(moment(a.end)))[0];

    // 보여 줄 라이브: 현재 방송 중이라면? 현재 방송 중, 아니면? 이전 라이브
    const toShow = current.length > 0 ? current : [latestPastLive];

    set({
      liveCastData,
      currentLive: current,
      liveToShow: toShow,
    });
  },
}));

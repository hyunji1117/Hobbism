import { create } from 'zustand';

type BannerState = {
  showBanner: boolean | undefined;
  setShowBanner: (show: boolean) => void;
  bannerState: () => void;
};

export const useBannerStore = create<BannerState>(set => ({
  showBanner: undefined,
  // 로컬 스토리지에 토글 상태 저장
  setShowBanner: show => {
    set({ showBanner: show });
    if (typeof window !== 'undefined') {
      localStorage.setItem('showBanner', String(show));
    }
  },
  // 로컬 스토리지에 저장된 토글 상태를 가져옴
  bannerState: () => {
    if (typeof window !== 'undefined') {
      const removedCount = clearupExpriedDate();
      if (removedCount > 0) console.log(`만료된 시간 ${removedCount}개 제거`);
      const saved = localStorage.getItem('showBanner');
      //저장된 값이 있으면 그거 사용, 아니면 기본값 true로 설정
      set({ showBanner: saved !== null ? saved === 'true' : true });
    }
  },
}));

// 만료된 시간 로컬스토리지에서 제거
const clearupExpriedDate = () => {
  if (typeof window === 'undefined') return 0;

  const now = Date.now();
  const expiredKey = Object.keys(localStorage)
    .filter(key => key.startsWith('hideAd_'))
    .filter(key => {
      const expiredTime = localStorage.getItem(key);
      return expiredTime && now > Number(expiredTime);
    });
  expiredKey.forEach(key => localStorage.removeItem(key));
  return expiredKey.length;
};

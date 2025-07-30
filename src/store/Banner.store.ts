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
      const saved = localStorage.getItem('showBanner');
      //저장된 값이 있으면 그거 사용, 아니면 기본값 true로 설정
      set({ showBanner: saved !== null ? saved === 'true' : true });
    }
  },
}));

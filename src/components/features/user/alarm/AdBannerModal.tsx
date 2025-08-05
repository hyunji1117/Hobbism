'use client';

import { useAuthStore } from '@/store/auth.store';
import { useBannerStore } from '@/store/Banner.store';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RandomModal from './RandomModal';

export default function AdBannerModal() {
  const [timerActive, setTimerActive] = useState(false);
  const pathname = usePathname();
  const { showBanner, bannerState } = useBannerStore();
  const { user } = useAuthStore();

  const hideUntil =
    typeof window !== 'undefined'
      ? localStorage.getItem(`hideAd_${user?._id}`)
      : null;
  const now = Date.now();
  // hideUntil이 없거나 현재 시간이 저장된 만료시간을 넘었으면 다시 보여줌
  const canShowBanner = !hideUntil || now > Number(hideUntil);

  // 로컬스토리지에서 토글 state를 가져옴
  useEffect(() => {
    bannerState();
  }, [bannerState]);

  // 페이지 진입 후 2초 뒤에 광고 모달 열림
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (pathname === '/shop') {
      timer = setTimeout(() => setTimerActive(true), 2000);
    } else {
      setTimerActive(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
      setTimerActive(false);
    };
  }, [pathname]);

  return (
    <>
      {timerActive && showBanner && canShowBanner && (
        <RandomModal onClose={() => setTimerActive(false)} />
      )}
    </>
  );
}

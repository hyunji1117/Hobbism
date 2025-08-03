'use client';

import { useAuthStore } from '@/store/auth.store';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const modalContent = [
  {
    image: '/ad-notice.png',
    width: 600,
    height: 350,
  },
  {
    image: '/ad-live.png',
    width: 600,
    height: 350,
  },
  {
    image: '/ad-character.png',
    width: 600,
    height: 350,
  },
  {
    image: '/ad-community.png',
    width: 600,
    height: 350,
  },
  {
    image: '/ad-shop.png',
    width: 600,
    height: 350,
  },
];

export default function RandomModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { user } = useAuthStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 자동 슬라이드
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setCurrent(prev => (prev + 1) % modalContent.length);
    }, 3000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused]);

  // 오늘 하루 보지 않기 적용
  const handleTodayClose = () => {
    const expire = new Date();
    expire.setHours(23, 59, 59, 999);
    localStorage.setItem(`hideAd_${user?._id}`, expire.getTime().toString());
    onClose();
  };

  const { image, width, height } = modalContent[current];

  return (
    <div className="fixed inset-0 bottom-[-55px] z-51 flex items-end pb-14">
      <div
        className="absolute bottom-14 left-1/2 h-full w-full max-w-[600px] -translate-x-1/2 bg-black/30"
        onClick={onClose}
      />
      {/* 바텀시트 */}
      <div className="relative mx-auto w-full max-w-[600px] rounded-t-3xl border-gray-200 bg-white pb-2 shadow-xl">
        {/* 슬라이드 컨트롤 */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => setPaused(p => !p)}
            className="rounded-full border bg-gray-100 px-2 py-1 text-sm"
            aria-label={paused ? '재생' : '일시정지'}
          >
            {paused ? '▶' : 'Ⅱ'}
          </button>
          <span className="rounded border bg-white/80 px-2 py-1 text-xs">
            {current + 1} / {modalContent.length}
          </span>
          <button
            onClick={() =>
              setCurrent(
                prev => (prev - 1 + modalContent.length) % modalContent.length,
              )
            }
            className="rounded-full border bg-gray-100 px-2 py-1 text-sm"
            aria-label="이전"
          >
            {'<'}
          </button>
          <button
            onClick={() => setCurrent(prev => (prev + 1) % modalContent.length)}
            className="rounded-full border bg-gray-100 px-2 py-1 text-sm"
            aria-label="다음"
          >
            {'>'}
          </button>
        </div>

        {/* 슬라이더 이미지 */}
        <Image
          src={image}
          alt="광고 이미지"
          width={width}
          height={height}
          className="w-full rounded-t-2xl object-center"
          style={{
            maxHeight: 350,
            background: '#fff',
            display: 'block',
          }}
          priority
        />

        {/* 하단 버튼 영역 */}
        <div className="flex w-full items-center justify-between border-t px-5 pb-3">
          <button
            className={`relative top-2.5 text-sm text-gray-500 underline select-none`}
            onClick={handleTodayClose}
          >
            오늘 하루 보지 않기
          </button>
          <button
            type="button"
            className="relative top-4 mb-3 text-sm text-gray-500 select-none"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

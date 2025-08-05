'use client';

import { useAuthStore } from '@/store/auth.store';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import type { Swiper as SwiperType } from 'swiper';

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
  const { user } = useAuthStore();
  const swiperRef = useRef<SwiperType>(null);

  // 오늘 하루 보지 않기 적용
  const handleTodayClose = () => {
    const expire = new Date();
    expire.setHours(23, 59, 59, 999);
    localStorage.setItem(`hideAd_${user?._id}`, expire.getTime().toString());
    onClose();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrent(swiper.realIndex);
  };

  return (
    <div className="fixed inset-0 bottom-[-55px] z-51 flex items-end pb-14">
      <div
        className="absolute bottom-14 left-1/2 h-full w-full max-w-[600px] -translate-x-1/2 bg-black/30"
        onClick={onClose}
      />
      {/* 바텀시트 */}
      <div className="relative mx-auto w-full max-w-[600px] rounded-t-3xl border-gray-200 bg-white pb-2 shadow-xl">
        {/* 슬라이드 개수 표시 */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="rounded-xl bg-black/40 px-2 py-1 text-xs text-white">
            {current + 1} / {modalContent.length}
          </span>
        </div>
        {/* 슬라이드 컨트롤 */}
        <Swiper
          onSwiper={swiper => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          className="rounded-t-2xl"
        >
          {modalContent.map((content, index) => (
            <SwiperSlide key={index}>
              <Image
                src={content.image}
                alt="광고 이미지"
                width={content.width}
                height={content.height}
                className="w-full rounded-t-2xl object-center"
                style={{
                  maxHeight: 350,
                  background: '#fff',
                  display: 'block',
                }}
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* 하단 버튼 영역 */}
        <div className="flex w-full items-center justify-between border-t px-5 pb-3">
          <button
            className="relative top-2.5 cursor-pointer text-sm text-gray-500 select-none hover:text-gray-600"
            onClick={handleTodayClose}
          >
            오늘 하루 보지 않기
          </button>
          <button
            type="button"
            className="relative top-4 mb-3 cursor-pointer text-sm text-gray-500 select-none hover:text-gray-600"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

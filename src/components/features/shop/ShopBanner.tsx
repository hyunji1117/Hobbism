'use client';

import React from 'react';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import Link from 'next/link';

export const ShopBanner = () => {
  const bannerImgs = [
    {
      src: '/images/ayoung/banner/banner01.webp',
      alt: '고즈넉한 오후를 책임지는홈카페의 시작은 호비즘에서',
      path: '/',
    },
    {
      src: '/images/ayoung/banner/banner00.webp',
      alt: '배송비 부담 ZERO! 무료배송',
      path: '/shop',
    },
    {
      src: '/images/ayoung/banner/banner02.webp',
      alt: '리즈리사 드레스를 50% 할인된 가격으로! 7월 16일 16시 오픈 예정',
      path: '/',
    },
    {
      src: '/images/ayoung/banner/banner03.webp',
      alt: '이번 방학에는 닌텐도 어때요? HOBBISM LIVE에서 파격 세일!',
      path: '/',
    },
  ];

  return (
    <Swiper
      loop={true}
      modules={[Autoplay]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      spaceBetween={50}
      slidesPerView={1}
    >
      {bannerImgs.map((ban, idx) => (
        <SwiperSlide className="w-full" key={`slide-${idx}`}>
          <Link href={ban.path}>
            <div className="relative aspect-[2/1] w-full">
              <Image
                fill
                src={ban.src}
                alt={ban.alt}
                priority={false}
                sizes="(max-width: 768px) 100vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

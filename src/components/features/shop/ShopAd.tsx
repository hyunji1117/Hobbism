'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import Link from 'next/link';

interface imagesType {
  src: string;
  alt: string;
  path: string;
}

export const ShopAd = () => {
  const bannerImgs = [
    {
      src: '/images/ayoung/ad/ad01.webp',
      alt: '조명 하나로 편안하게 주무세요. 무아스 충전식 LED 큐브 타이머 무드등',
      path: '/',
    },
    {
      src: '/images/ayoung/ad/ad02.webp',
      alt: 'Live 예정, 올 여름부터 러닝 시장! 나이키 V5 RNR 러닝화와 함께 달려요',
      path: '/',
    },
    {
      src: '/images/ayoung/banner/banner01.webp',
      alt: 'Live 예정, 올 여름부터 러닝 시장! 나이키 V5 RNR 러닝화와 함께 달려요',
      path: '/',
    },
    {
      src: '/images/ayoung/banner/banner02.webp',
      alt: 'Live 예정, 올 여름부터 러닝 시장! 나이키 V5 RNR 러닝화와 함께 달려요',
      path: '/',
    },
    {
      src: '/images/ayoung/banner/banner03.webp',
      alt: 'Live 예정, 올 여름부터 러닝 시장! 나이키 V5 RNR 러닝화와 함께 달려요',
      path: '/',
    },
  ];

  const [ads, setAds] = useState<imagesType[]>([]);

  useEffect(() => {
    const getRandomAd = (images: imagesType[]): imagesType[] => {
      const random = [...images].sort(() => 0.5 - Math.random());
      const count = Math.floor(Math.random() * 2) + 2;
      return random.slice(0, count);
    };

    setAds(getRandomAd(bannerImgs));
  }, []);

  if (ads.length === 0) return null;

  return (
    <>
      <div className="col-span-2">
        <Swiper
          rewind={true}
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          spaceBetween={50}
          slidesPerView={1}
          effect="fade"
        >
          {ads.map((ban, idx) => (
            <SwiperSlide className="w-full" key={`slide-${idx}`}>
              <Link href={ban.path}>
                <div className="relative aspect-[4/1] w-full">
                  <Image
                    fill
                    src={ban.src}
                    alt={ban.alt}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

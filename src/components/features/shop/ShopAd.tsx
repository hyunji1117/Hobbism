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
      alt: '인테리어 조명의 표준, LEXON MINA M',
      path: '/',
    },
    {
      src: '/images/ayoung/ad/ad02.webp',
      alt: 'Live 예정, 올 여름부터 러닝 시작! 나이키 ZOOM FLY 6 러닝화와 함께 달려요',
      path: '/',
    },
    {
      src: '/images/ayoung/ad/ad03.webp',
      alt: '2022 커스텀돌 콘테스트 그랑프리 Yanfy의 수상작, 엘파라',
      path: '/',
    },
    {
      src: '/images/ayoung/ad/ad04.webp',
      alt: '모모스커피의 첫 번째 시그니처 블렌드 에스 쇼콜라',
      path: '/',
    },
    {
      src: '/images/ayoung/ad/ad05.webp',
      alt: '내 방의 작은 정원, 플랜테리어로 완성하는 나만의 힐링 스팟',
      path: '/',
    },
  ];

  const [ads, setAds] = useState<imagesType[]>([]);

  useEffect(() => {
    const getRandomAd = (): imagesType[] => {
      const random = [...bannerImgs].sort(() => 0.5 - Math.random());
      const count = Math.floor(Math.random() * 2) + 2;
      return random.slice(0, count);
    };

    setAds(getRandomAd());
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
                    sizes="100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
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

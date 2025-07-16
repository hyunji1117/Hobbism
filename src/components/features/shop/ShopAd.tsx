import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

export const ShopAd = () => {
  const bannerImgs = [
    {
      src: '/images/ayoung/ad/ad01.webp',
      alt: '조명 하나로 편안하게 주무세요. 무아스 충전식 LED 큐브 타이머 무드등',
    },
    {
      src: '/images/ayoung/ad/ad02.webp',
      alt: 'Live 예정, 올 여름부터 러닝 시장! 나이키 V5 RNR 러닝화와 함께 달려요',
    },
  ];

  return (
    <Swiper
      loop={true}
      modules={[Autoplay, EffectFade]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      spaceBetween={50}
      slidesPerView={1}
      effect="fade"
      onSlideChange={() => {
        console.log('slide change');
      }}
      onSwiper={swiper => console.log(swiper)}
    >
      {bannerImgs.map(ban => (
        <SwiperSlide className="w-full" key={ban.src}>
          <div className="relative aspect-[4/1] w-full">
            <Image
              fill
              src={ban.src}
              alt={ban.alt}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

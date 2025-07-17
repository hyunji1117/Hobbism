'use client';

import { ShopProduct } from '@/components/features/shop/ShopProduct';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

export const ShopLiveProducts = () => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3.5}
      onSlideChange={() => {
        console.log('slide change');
      }}
      onSwiper={swiper => console.log(swiper)}
    >
      <SwiperSlide className="w-full">
        <ShopProduct wid="w-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <ShopProduct wid="w-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <ShopProduct wid="w-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <ShopProduct wid="w-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <ShopProduct wid="w-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <ShopProduct wid="w-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <ShopProduct wid="w-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <ShopProduct wid="w-full" />
      </SwiperSlide>
    </Swiper>
  );
};

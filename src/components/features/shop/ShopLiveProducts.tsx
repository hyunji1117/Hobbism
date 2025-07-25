'use client';

import { ShopProduct } from '@/components/features/shop/ShopProduct';
import { useLiveStore } from '@/store/live.store';
import { Product } from '@/types';
import moment from 'moment';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

export const ShopLiveProducts = ({ liveData }: { liveData: Product[] }) => {
  const currentLive = useLiveStore(state => state.currentLive);

  const now = moment();

  const sortedLiveData = [...liveData].sort((a, b) => {
    const aLive = currentLive.find(
      live => live._id === a._id && now.isBetween(live.start, live.end),
    );
    const bLive = currentLive.find(
      live => live._id === b._id && now.isBetween(live.start, live.end),
    );

    if (aLive && !bLive) return -1;
    if (!aLive && bLive) return 1;
    return 0;
  });

  const liveProducts = sortedLiveData.map(product => {
    const liveInfo = currentLive.find(
      live => live._id === product._id && now.isBetween(live.start, live.end),
    );

    const isLiveNow = !!liveInfo;

    return (
      <SwiperSlide key={product._id} className="mr-2.5 !w-[calc(100%/3.5)]">
        {!isLiveNow && (
          <div className="absolute z-2 flex aspect-square w-full rounded-2xl bg-black/50 text-white">
            <p className="absolute top-1/2 h-fit w-full -translate-y-1/2 text-center text-sm">
              라이브 예정
            </p>
          </div>
        )}
        <ShopProduct
          _id={product._id}
          price={product.price}
          name={product.name}
          mainImageSrc={product.mainImages[0]?.path}
          category={product.extra.category}
          discountRate={product.extra.discountRate}
          discountPrice={product.extra.discountedPrice}
          recommendedBy={product.extra.recommendedBy}
          textPrice="text-sm"
          liveTitle={product.extra.live.title}
          liveRate={product.extra.live.liveDiscountRate}
          livePrice={product.extra.live.livePrice}
        />
      </SwiperSlide>
    );
  });

  return (
    <Swiper spaceBetween={10} slidesPerView={3.5}>
      {liveProducts}
    </Swiper>
  );
};

'use client';

import { ShopProduct } from '@/components/features/shop/ShopProduct';
import { Product } from '@/types';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

export const ShopLiveProducts = ({ liveData }: { liveData: Product[] }) => {
  const liveProducts = liveData.map(product => (
    // TODO 리팩토링 필요(CSS)
    <SwiperSlide key={product._id} className="mr-2.5 !w-[calc(100%/3.5)]">
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
      />
    </SwiperSlide>
  ));

  return (
    <Swiper spaceBetween={10} slidesPerView={3.5}>
      {liveProducts}
    </Swiper>
  );
};

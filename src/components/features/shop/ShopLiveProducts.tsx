'use client';

import { ShopProduct } from '@/components/features/shop/ShopProduct';
import { Product } from '@/types/interface/product';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

export const ShopLiveProducts = ({ liveData }: { liveData: Product[] }) => {
  const liveProducts = liveData.map(product => (
    <SwiperSlide className="w-full" key={product._id}>
      <ShopProduct
        price={product.price}
        name={product.name}
        mainImageSrc={product.mainImages[0]?.path}
        category={product.extra.category}
        discountRate={product.extra.discountRate}
        discountPrice={product.extra.discountedPrice}
        recommendedBy={product.extra.recommendedBy}
      />
    </SwiperSlide>
  ));

  return (
    <Swiper spaceBetween={10} slidesPerView={3.5}>
      {liveProducts}
    </Swiper>
  );
};

// RecommendProducts.tsx
'use client';

import { ShopProduct } from '@/components/features/shop/ShopProduct';
import { fetchLiveProducts } from '@/data/functions/AllProductFetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react';
import { Product } from '@/types';

interface RecommendProductsProps {
  category: string;
}

export const RecommendProducts = ({ category }: RecommendProductsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAndFilter = async () => {
      const data = await fetchLiveProducts();
      const filtered = data.filter(product =>
        Array.isArray(product.extra.category)
          ? product.extra.category.includes(category)
          : product.extra.category === category,
      );
      setFilteredProducts(filtered);
    };

    fetchAndFilter();
  }, [category]);

  return (
    <Swiper spaceBetween={10} slidesPerView={3.5}>
      {filteredProducts.slice(0, 5).map(product => (
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
      ))}
    </Swiper>
  );
};

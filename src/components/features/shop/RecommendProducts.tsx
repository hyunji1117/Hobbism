// RecommendProducts.tsx
'use client';

import { ShopProduct } from '@/components/features/shop/ShopProduct';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react';
import { Product } from '@/types';

//       interface: 추천 상품 인터페이스        //
interface RecommendProductsProps {
  category: string;
  categoryData: Product[];
}

//        component: 추천 상품 컴포넌트(앞에서부터 5개까지 렌더링)        //
export const RecommendProducts = ({
  category,
  categoryData,
}: RecommendProductsProps) => {
  //        state: 필터된 상품 상태       //
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  //        effect: 카테고리가 바뀔 때 실행될 함수       //
  useEffect(() => {
    const fetchAndFilter = async (): Promise<void> => {
      const filtered = categoryData.filter(product =>
        Array.isArray(product.extra.category)
          ? product.extra.category.includes(category)
          : product.extra.category === category,
      );
      setFilteredProducts(filtered);
    };

    fetchAndFilter();
  }, [category, categoryData]);

  //          render: 추천 상품 컴포넌트 렌더          //
  return (
    <Swiper spaceBetween={7} slidesPerView="auto" watchOverflow={true}>
      {filteredProducts.slice(0, 5).map(product => (
        <SwiperSlide
          key={product._id}
          className="mr-[7px] !w-[calc(100%/3.5)] last:-mr-4"
        >
          <ShopProduct
            _id={product._id}
            price={product.price}
            name={product.name}
            mainImageSrc={product.mainImages[0]?.path}
            category={product.extra.category}
            discountRate={product.extra.discountRate}
            recommendedBy={product.extra.recommendedBy}
            textPrice="text-sm"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

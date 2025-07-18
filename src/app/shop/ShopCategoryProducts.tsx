'use client';

import { ShopAd } from '@/components/features/shop/ShopAd';
import { ShopCategory } from '@/components/features/shop/ShopCategory';
import { ShopProduct } from '@/components/features/shop/ShopProduct';
import { Product } from '@/types/interface/product';
import { useState } from 'react';

export default function ShopCategoryProducts({
  notLiveData,
}: {
  notLiveData: Product[];
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredProducts =
    selectedCategory === 'ALL'
      ? notLiveData
      : notLiveData.filter(product =>
          product.extra.category.includes(selectedCategory),
        );

  const products = filteredProducts.map(product => (
    <ShopProduct
      price={product.price}
      name={product.name}
      mainImageSrc={product.mainImages[0]?.path}
      category={product.extra.category}
      discountRate={product.extra.discountRate}
      discountPrice={product.extra.discountedPrice}
      recommendedBy={product.extra.recommendedBy}
      key={product._id}
    />
  ));

  return (
    <>
      {/* 전체(카테고리 별) 상품 */}
      <section>
        <div className="ml-5">
          <ShopCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="mx-5">
          <div className="grid grid-cols-2 gap-2.5">
            {products}
            <ShopAd />
          </div>
        </div>
      </section>
    </>
  );
}

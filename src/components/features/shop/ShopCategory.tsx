'use client';

import { useRef, useState } from 'react';
import {
  Flower2,
  Grid2x2,
  Footprints,
  Coffee,
  Lamp,
  Panda,
  Shirt,
  Gamepad2,
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

export const ShopCategory = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) => {
  // 상품 카테고리
  const categories = [
    'ALL',
    'PERFUME',
    'RUNNING',
    'HOMECAFE',
    'INTERIOR',
    'DOLL',
    'FASHION',
    'GOODS',
  ] as const; // as const: 문자열 리터럴 타입'

  // 영어 한글 변환
  const categoryLabels: { [key: string]: string } = {
    ALL: '전체',
    PERFUME: '향수',
    RUNNING: '러닝',
    HOMECAFE: '홈카페',
    INTERIOR: '인테리어',
    DOLL: '인형',
    FASHION: '패션',
    GOODS: '굿즈',
  };

  // 카테고리 별 아이콘
  const categoryIcons = {
    ALL: Grid2x2,
    PERFUME: Flower2,
    RUNNING: Footprints,
    HOMECAFE: Coffee,
    INTERIOR: Lamp,
    DOLL: Panda,
    FASHION: Shirt,
    GOODS: Gamepad2,
  };

  // 카테고리 별 stroke 컬러
  const categoryColors = {
    ALL: 'stroke-[#4B5563]',
    PERFUME: 'stroke-[#6E67DA]',
    RUNNING: 'stroke-[#D2E308]',
    HOMECAFE: 'stroke-[#FAB91D]',
    INTERIOR: 'stroke-[#6E67DA]',
    DOLL: 'stroke-[#FE508B]',
    FASHION: 'stroke-[#51AAED]',
    GOODS: 'stroke-[#D2E308]',
  };

  return (
    <>
      <Swiper
        breakpoints={{
          10: {
            slidesPerView: 5.4,
          },
          768: {
            slidesPerView: 8,
          },
        }}
        className="my-4.5"
      >
        {categories.map(cat => {
          const Icon = categoryIcons[cat];
          return (
            <SwiperSlide key={cat}>
              <button
                className="flex w-fit flex-col items-center"
                onClick={() => setSelectedCategory(cat)}
              >
                <div className="scrollbar-hide mb-0.5 aspect-square w-[48px] rounded-3xl bg-[#EAEAEA] p-2.5">
                  <Icon
                    className={`btn-icon h-full w-full ${selectedCategory === cat ? categoryColors[cat] : 'stroke-[black]'}`}
                  />
                </div>
                <p className="text-[12px] select-none">{categoryLabels[cat]}</p>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <h2 className="pb-4 text-lg font-semibold">
        {categoryLabels[selectedCategory]}
      </h2>
    </>
  );
};

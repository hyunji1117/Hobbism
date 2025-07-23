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

  // 드래그 상태
  const dragRef = useRef<HTMLDivElement>(null); // 스크롤 영역을 참조할 ref
  const [isDragging, setIsDragging] = useState(false); // 드래그 중인지 여부
  const [startX, setStartX] = useState(0); // 포인터가 눌린 x좌표
  const [scrollX, setScrollX] = useState(0); // 스크롤 위치

  // 마우스/터치 공통 드래그 시작
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollX(dragRef.current?.scrollLeft ?? 0);
  };

  // 드래그 중이면 스크롤
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (dragRef.current) {
      dragRef.current.scrollLeft = scrollX - dx;
    }
  };

  // 드래그 종료
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div
        ref={dragRef}
        className="flex gap-5 overflow-x-hidden py-10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {categories.map(cat => {
          const Icon = categoryIcons[cat];
          return (
            <button
              key={cat}
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
          );
        })}
      </div>

      <h2 className="pb-4 text-lg font-semibold">
        {categoryLabels[selectedCategory]}
      </h2>
    </>
  );
};

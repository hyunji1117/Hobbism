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

export const ShopCategory = () => {
  // 카테고리
  const categories = [
    '전체',
    '향수',
    '러닝',
    '홈카페',
    '인테리어',
    '인형',
    '패션',
    '굿즈',
  ] as const; // as const: 문자열 리터럴 타입

  // 카테고리 별 아이콘
  const categoryIcons = {
    전체: Grid2x2,
    향수: Flower2,
    러닝: Footprints,
    홈카페: Coffee,
    인테리어: Lamp,
    인형: Panda,
    패션: Shirt,
    굿즈: Gamepad2,
  };

  // 드래그 상태
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  // 마우스/터치 공통 Down
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollX(dragRef.current?.scrollLeft ?? 0);
  };

  // 움직이기
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (dragRef.current) {
      dragRef.current.scrollLeft = scrollX - dx;
    }
  };

  // up
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={dragRef}
      className="flex gap-5 overflow-x-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {categories.map(cat => {
        const Icon = categoryIcons[cat];
        return (
          <button key={cat} className="flex w-fit flex-col items-center">
            <div className="scrollbar-hide mb-0.5 aspect-square w-[48px] rounded-3xl bg-[#EAEAEA] p-2.5">
              <Icon className="h-full w-full" />
            </div>
            <p className="text-[12px] select-none">{cat}</p>
          </button>
        );
      })}
    </div>
  );
};

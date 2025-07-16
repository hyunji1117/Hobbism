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
  // 상품 카테고리
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

  // 카테고리 별 stroke 컬러
  const categoryColors = {
    전체: 'stroke-[#4B5563]',
    향수: 'stroke-[#6E67DA]',
    러닝: 'stroke-[#D2E308]',
    홈카페: 'stroke-[#FAB91D]',
    인테리어: 'stroke-[#6E67DA]',
    인형: 'stroke-[#FE508B]',
    패션: 'stroke-[#51AAED]',
    굿즈: 'stroke-[#D2E308]',
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

  // 클릭된 버튼 색상 바꾸기(클릭된 카테고리 이름 저장 > 스타일 적용)
  const [selectedBtn, setSelectedBtn] = useState('전체');

  // 카테고리 버튼 클릭 시 클릭된 항목 이름 저장
  const changeColor = (cat: string) => {
    setSelectedBtn(cat);
  };

  return (
    <>
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
            <button
              key={cat}
              className="flex w-fit flex-col items-center"
              onClick={() => changeColor(cat)}
            >
              <div className="scrollbar-hide mb-0.5 aspect-square w-[48px] rounded-3xl bg-[#EAEAEA] p-2.5">
                <Icon
                  className={`btn-icon h-full w-full ${selectedBtn === cat ? categoryColors[cat] : 'stroke-[black]'}`}
                />
              </div>
              <p className="text-[12px] select-none">{cat}</p>
            </button>
          );
        })}
      </div>

      {/* shop main page에 이렇게 연결 사용 */}
      {/* <h2>{selectedBtn} 상품</h2> */}
    </>
  );
};

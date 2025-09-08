// 장바구니 전체 선택 컴포넌트
'use client';

import Image from 'next/image';

interface CartSelectAllProps {
  isAllChecked: boolean;
  onToggleAll: () => void;
  onSelectionRemove: () => void;
}

export function CartSelectAll({
  isAllChecked,
  onToggleAll,
  onSelectionRemove,
}: CartSelectAllProps) {
  return (
    <div className="relative flex">
      <button
        onClick={onToggleAll}
        aria-label={isAllChecked ? '전체 상품 선택 해제' : '전체 상품 선택'}
        className="absolute top-3.5"
      >
        <Image
          src={isAllChecked ? '/check-on.svg' : '/check-off.svg'}
          alt="전체 선택 설정 버튼"
          width={20}
          height={20}
          className="ml-5"
        />
      </button>

      <span className="relative top-3 left-14 text-lg leading-6 font-semibold">
        전체 선택
      </span>

      <button
        className="absolute top-3 right-5 text-[#F05656]"
        onClick={onSelectionRemove}
      >
        선택 삭제
      </button>
    </div>
  );
}

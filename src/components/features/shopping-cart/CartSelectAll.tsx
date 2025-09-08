// 장바구니 전체 선택 컴포넌트
'use client';

import { Check } from 'lucide-react';

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
    <div className="relative flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleAll}
          aria-label={isAllChecked ? '전체 상품 선택 해제' : '전체 상품 선택'}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-[3px] ${
              isAllChecked ? 'bg-[#4B5564]' : 'border border-gray-300 bg-white'
            }`}
          >
            {isAllChecked && (
              <Check size={12} className="text-white" strokeWidth={2.5} />
            )}
          </div>
        </button>

        <span className="font-semibold">전체 선택</span>
      </div>

      <button className="text-[#F05656]" onClick={onSelectionRemove}>
        선택 삭제
      </button>
    </div>
  );
}

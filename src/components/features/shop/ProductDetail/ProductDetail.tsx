'use client';

import { Minus, Plus } from 'lucide-react';
import { ProductDetailInfoProps } from '@/types';

// 상품 상세 정보 컴포넌트
export const ProductDetailInfo = ({
  item,
  discountRate,
  discountedPrice,
  extra,
}: ProductDetailInfoProps) => {
  // recommendedBy 값을 한글로 변환하는 함수
  const getRecommendedByText = (recommendedBy: string) => {
    const mapping: Record<string, string> = {
      inhwan: '인환',
      hyunji: '현지',
      woomin: '우민',
      youngchan: '영찬',
      ayoung: '아영',
    };
    return mapping[recommendedBy] || '추천';
  };

  return (
    <section className="h-[145px] items-center justify-center px-5 py-4">
      <span className="mb-2 flex h-[28px] w-[76px] items-center justify-center rounded-[6px] bg-[#D2E308] text-[12px]">
        {extra && extra.recommendedBy
          ? getRecommendedByText(extra.recommendedBy)
          : '추천'}{' '}
        PICK
      </span>
      <h1 className="relative text-[24px] font-semibold text-black">
        {/* 아디다스 언더아머 2.0 윈터브레이크 */}
        {item.name}
      </h1>
      <span className="flex flex-col pt-2 text-[12px] text-[#C3C3C3]">
        {/* 167,000원 */}
        {item.price.toLocaleString()}원
      </span>
      <div className="mt-1 flex items-center">
        {discountRate > 0 && (
          <span className="pr-2 text-[24px] font-semibold text-[#EF4444]">
            {discountRate.toLocaleString()}%
          </span>
        )}
        <span className="justify-self-center text-[24px] font-semibold text-black">
          {/* 139,000원 */}
          {discountedPrice.toLocaleString()}원
        </span>
        <span className="ml-auto flex h-[28px] w-[76px] items-center justify-center rounded-[4px] bg-[#F3F4F6] text-[14px] text-black">
          무료배송
        </span>
      </div>
    </section>
  );
};

// 상품 수량 선택 컴포넌트
export const ProductQuantitySelector = ({
  selectedOption,
  quantity,
  onIncrease,
  onDecrease,
  price,
}: {
  selectedOption: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  price: number;
}) => {
  return (
    <section className="h-[100px] w-full rounded-[8px] bg-[#EAEAEA] p-3">
      <h2 className="mb-4 text-[18px] font-semibold text-black">
        {/* 리미티드 스페이스블랙 L */}
        {selectedOption || '옵션을 선택하세요'}
      </h2>
      <div id="counter" className="flex gap-4">
        <button
          type="button"
          className={`flex h-[28px] w-[28px] items-center justify-center rounded-full border ${
            quantity === 1
              ? 'border-[#C3C3C3] bg-[#C3C3C3]'
              : 'border-[#C3C3C3] bg-white'
          } text-[18px] leading-none text-[#4B5563]`}
          onClick={onDecrease}
          disabled={quantity === 1}
        >
          <Minus className="h-[20] w-[20]" />
        </button>
        <button
          type="button"
          className="text-[18px] font-semibold text-[#4B5563]"
        >
          {quantity}
        </button>
        <button
          type="button"
          className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[#C3C3C3] bg-white text-[18px] leading-none text-[#4B5563]"
          onClick={onIncrease}
        >
          <Plus className="h-[20] w-[20] border-[#C3C3C3]" />
        </button>
        <span className="ml-auto flex items-center justify-center text-[18px] font-semibold text-black">
          {/* 158,900원 */}
          {(quantity * price).toLocaleString()}
        </span>
      </div>
    </section>
  );
};

// 상품 액션 버튼 컴포넌트
export const ProductActionButtons = ({
  onCartClick,
}: {
  onCartClick: () => void;
}) => {
  return (
    <section className="flex h-[54px] gap-3">
      <button
        type="button"
        className="w-[40%] cursor-pointer rounded-[8px] bg-[#EAEAEA] text-[16px]"
        onClick={onCartClick}
      >
        장바구니 담기
      </button>
      <button
        type="button"
        className="w-[60%] cursor-pointer rounded-[8px] bg-[#FE508B] text-[18px] font-semibold text-white"
      >
        구매하기
      </button>
    </section>
  );
};

// 옵션 선택 컴포넌트 클라이언트 사이드 관리로 별도 파일 생성 (OptionSelector.tsx)

// 총 결제 금액 컴포넌트
export const TotalPrice = ({
  quantity,
  price,
}: {
  quantity: number;
  price: number;
}) => {
  const totalPrice = quantity * price;

  return (
    <section className="z-20 flex h-[54px] items-center justify-between border-t border-[#EAEAEA] bg-white px-4 pt-4">
      <span className="text-[18px] font-semibold text-black">총 결제 금액</span>
      <span className="text-[24px] font-semibold text-black">
        {totalPrice.toLocaleString()}원
      </span>
    </section>
  );
};

'use client';

import { Minus, Plus } from 'lucide-react';
import {
  ProductDetailInfoProps,
  ProductQuantitySelectorProps,
} from '@/types/product';
import { useCart } from '@/components/features/shop/ProductDetail/CartContext';
// import { useEffect, useState } from 'react';
// import { fetchCartList } from '@/data/functions/CartFetch.client';

// 상품 상세 정보 컴포넌트
export const ProductDetailInfo = ({
  item,
  price,
  discountRate,
  extra,
  sizes,
  colors,
}: ProductDetailInfoProps) => {
  // MD PICK 한글 이름, 색상 매핑
  const recommendData: Record<
    string,
    { name: string; color: string; textColor: string }
  > = {
    inhwan: { name: '인환', color: 'bg-[#FE508B]', textColor: 'text-white' },
    hyunji: { name: '현지', color: 'bg-[#FAB91D]', textColor: 'text-black' },
    woomin: { name: '우민', color: 'bg-[#51AAED]', textColor: 'text-white' },
    youngchan: { name: '영찬', color: 'bg-[#D2E308]', textColor: 'text-black' },
    ayoung: { name: '아영', color: 'bg-[#6E67DA]', textColor: 'text-white' },
  };

  // MD PICK 정보 가져오기
  const recommendInfo = extra?.recommendedBy
    ? recommendData[extra.recommendedBy]
    : { name: '추천', color: 'bg-[#C3C3C3]', textColor: 'text-black' };

  const originalPrice = extra.originalPrice;

  return (
    <section className="h-[145px] items-center justify-center px-5 py-4">
      <span
        className={`mb-2 flex h-[28px] w-[76px] items-center justify-center rounded-[6px] text-[12px] ${recommendInfo.color} ${recommendInfo.textColor}`}
      >
        {recommendInfo.name} PICK
      </span>
      <h1 className="relative text-[24px] font-semibold text-black">
        {/* 상품명 */}
        {item.name}
      </h1>
      <span className="flex flex-col pt-2 text-[12px] text-[#C3C3C3] line-through">
        {/* 원가 */}
        {originalPrice.toLocaleString()}원
      </span>
      <div className="mt-1 flex items-center">
        {/* 할인률 */}
        {discountRate > 0 && (
          <span className="pr-2 text-[24px] font-semibold text-[#F05656]">
            {discountRate.toLocaleString()}%
          </span>
        )}
        <span className="justify-self-center text-[24px] font-semibold text-black">
          {/* 할인된 금액 */}
          {item.price.toLocaleString()}원
        </span>
        <span className="ml-auto flex h-[28px] w-[76px] items-center justify-center rounded-[4px] bg-[#F3F4F6] text-[14px] text-black">
          무료배송
        </span>
      </div>
    </section>
  );
};

// 장바구니 담기 버튼 컴포넌트
// export function ProductDetail({
//   product,
// }: {
//   product: { id: string; name: string; price: number };
// }) {
//   const { addToCart } = useCart();

//   const handleAdd = () => {
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: 1,
//     });
//     alert('장바구니에 담겼습니다.');
//   };

//   return <button onClick={handleAdd}>장바구니 담기</button>;
// }

// 수량 컨트롤
export const ProductQuantitySelector = ({
  selectedOption,
  quantity,
  onIncrease,
  onDecrease,
  price,
  originalPrice,
  item,
}: {
  selectedOption: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  price: number;
  originalPrice: number;
  item: { name: string };
}) => {
  return (
    <section className="mx-5 my-4 h-[100px] rounded-[8px] bg-[#EAEAEA] p-3">
      {selectedOption ? (
        <h2 className="mb-4 text-[18px] font-semibold text-black">
          {item.name}
        </h2>
      ) : item?.name ? (
        <h2 className="mb-4 text-[18px] font-semibold text-black">
          {item.name}
        </h2>
      ) : null}
      <div id="counter" className="flex gap-4">
        <button
          type="button"
          className={`flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full border ${
            quantity === 1
              ? 'border-[#ECEDEE] bg-[#C3C3C3]'
              : 'border-[#ECEDEE] bg-white'
          } text-[18px] leading-none text-[#ECEDEE]`}
          onClick={onDecrease}
          disabled={quantity === 1}
        >
          <Minus size={20} color="#787878" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className="cursor-pointer px-2 text-[18px] font-semibold text-[#787878]"
        >
          {quantity}
        </button>
        <button
          type="button"
          className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-[#ECEDEE] bg-white text-[18px] leading-none text-[#4B5563]"
          onClick={onIncrease}
        >
          <Plus size={20} strokeWidth={1.5} color="#787878" />
        </button>
        <span className="ml-auto flex items-center justify-center text-[18px] font-semibold text-black">
          {(quantity * price).toLocaleString()}원
        </span>
      </div>
    </section>
  );
};

// 상품 액션 버튼 컴포넌트
interface ProductActionButtonsProps {
  onCartClick: () => void;
  onBuyNowClick: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    productImg: string;
  };
  options?: { id: string; name: string; price: number }[];
}

export const ProductActionButtons = ({
  onCartClick,
  onBuyNowClick,
  product,
  options,
}: ProductActionButtonsProps) => {
  return (
    <div className="flex h-[54px] justify-between gap-3">
      <button
        onClick={onCartClick}
        className="w-[40%] cursor-pointer rounded-[8px] border border-[#4B5563] px-4 py-2 text-[16px] text-black hover:bg-[#EAEAEA]"
      >
        장바구니 담기
      </button>
      <button
        onClick={onBuyNowClick}
        className="0 w-[57%] cursor-pointer rounded-[8px] bg-[#4B5563] px-4 py-2 text-[18px] font-semibold text-white hover:bg-[#2C2F33]"
      >
        {/* bg-[#2C2F33] */}
        구매하기
      </button>
    </div>
  );
};

// 총 결제 금액 컴포넌트
export const TotalPrice = ({
  quantity,
  price,
  originalPrice,
}: {
  quantity: number;
  price: number;
  originalPrice?: number;
}) => {
  const totalPrice = quantity * (price ?? originalPrice);

  return (
    <section className="z-20 flex h-[54px] items-center justify-between border-t border-[#EAEAEA] bg-white px-4 pt-4">
      <span className="text-[18px] font-semibold text-black">총 결제 금액</span>
      <span className="text-[24px] font-semibold text-black">
        {totalPrice.toLocaleString()}원
      </span>
    </section>
  );
};

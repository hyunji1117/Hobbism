'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  ProductActionButtons,
  ProductQuantitySelector,
  TotalPrice,
} from '@/components/features/shop/ProductDetail/ProductDetail';
import { OptionSelector } from '@/components/features/shop/ProductDetail/OptionSelector';

export const Cta = ({ price }: { price: number }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isQuantitySelectorEnabled, setIsQuantitySelectorEnabled] =
    useState(false);

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => setIsBottomSheetOpen(false),
    trackMouse: true,
  });

  return (
    <>
      {/* 상품 액션 버튼 컴포넌트 */}
      <div className="bt-rounded-[8px] fixed bottom-0 z-30 w-full max-w-[600px] bg-white px-5 py-3">
        <ProductActionButtons
          onCartClick={() => {
            setIsBottomSheetOpen(true);
            setIsQuantitySelectorEnabled(false);
          }}
        />
      </div>

      {/* 바텀시트 */}
      {isBottomSheetOpen && (
        <div
          {...swipeHandlers}
          className="fixed bottom-[133px] z-20 w-full max-w-[600px] rounded-t-[16px] bg-white shadow-lg"
        >
          {/* 스와이프 핸들 디자인 */}
          <div className="flex justify-center">
            <div className="mt-2.5 h-[4px] w-[109px] rounded-full bg-[#3D3D3D]"></div>
          </div>

          {/* 옵션 선택 컴포넌트 */}
          <div className="bg-white px-5 pt-3.5">
            <OptionSelector
              options={['S', 'M', 'L', 'XL']}
              selectedOption={selectedOption}
              onSelect={option => {
                setSelectedOption(option);
                setIsQuantitySelectorEnabled(true);
              }}
            />
          </div>

          {/* 상품 수량 선택 컴포넌트: 옵션이 선택된 경우에만 렌더링 */}
          {isQuantitySelectorEnabled && (
            <div className="bg-white px-5 py-3">
              <ProductQuantitySelector
                selectedOption={selectedOption}
                quantity={quantity}
                onIncrease={() => setQuantity(quantity + 1)}
                onDecrease={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                price={price}
              />
            </div>
          )}

          {/* 총 결제 금액 컴포넌트: 옵션이 선택된 경우에만 렌더링 */}
          {isQuantitySelectorEnabled && (
            <TotalPrice quantity={quantity} price={price} />
          )}
        </div>
      )}
    </>
  );
};

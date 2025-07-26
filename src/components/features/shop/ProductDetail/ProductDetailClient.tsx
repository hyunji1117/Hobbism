'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import {
  ProductActionButtons,
  ProductQuantitySelector,
  TotalPrice,
} from '@/components/features/shop/ProductDetail/ProductDetail';
import { OptionSelector } from '@/components/features/shop/ProductDetail/OptionSelector';
import { useCart } from '@/components/features/shop/ProductDetail/CartContext';
import { CartActionsProps } from '@/types/product';

// 뒤로가기 버튼 핸들러 분리해서 export: 서버 컴포넌트에서 사용
export function GoBackButton({ stroke }: { stroke: string }) {
  function handleGoBack(): void {
    if (window.history.length > 2) {
      // 사용자가 URL을 직접 입력하여 접속 경우, 뒤로가기 버튼을 클릭하면 검색 엔진이나 서비스 외부 페이지로 이동하는 문제 해결 가능
      // browser history stack이 2 이하일 때 내부경로로 이동하도록 설정 (history 1개로 설정 시 브라우저 첫 페이지가 이전 기록이 되어 문제 해결이 어렵기 때문)
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }

  return (
    <button onClick={handleGoBack}>
      <ChevronLeft className={stroke} />
    </button>
  );
}

export function CartIcon() {
  const { cartCount } = useCart();
  return (
    <div className="relative">
      <ShoppingCart />
      {cartCount > 0 && (
        <span className="absolute -top-0.5 right-[-7] rounded-full bg-red-300 px-1 text-xs font-semibold text-white">
          {cartCount}
        </span>
      )}
    </div>
  );
}

// 상품 상세 하위 로직
export default function CartActions({
  price,
  options,
  discountRate,
}: CartActionsProps & { discountRate: number }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { cartCount, setCartCount } = useCart();

  // 옵션 배열 길이가 1개 이상이면 true (옵션 유무 판별)
  const hasOptions = Array.isArray(options) && options.length > 0;

  // 옵션이 없으면 수량 선택 UI는 항상 보이도록 처리
  // 옵션이 있으면 옵션 선택 후 수량 UI가 활성화됨
  const isQuantitySelectorEnabled =
    !hasOptions || (hasOptions && selectedOption !== '');

  const discountedPrice = price * (1 - discountRate / 100);

  // 바텀시트에서 아래로 스와이프하면 닫히는 핸들링
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
            if (!isBottomSheetOpen) {
              setIsBottomSheetOpen(true);
              // 옵션이 없으면 수량 선택 UI 활성화
              if (!hasOptions) {
                setSelectedOption('');
              } else {
                setSelectedOption('');
              }
              setQuantity(1);
              return;
            }
          }}
        />
      </div>

      {/* 바텀시트 어두운 배경 */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="h-full w-full max-w-[600px] bg-black opacity-50"></div>
        </div>
      )}

      {/* 바텀시트 */}
      {isBottomSheetOpen && (
        <div
          {...swipeHandlers}
          className={`fixed z-20 flex w-full max-w-[600px] flex-col rounded-t-[16px] bg-white shadow-lg ${hasOptions ? 'bottom-[133px]' : 'bottom-[78px]'} `}
        >
          <div className="flex justify-center">
            <div className="mt-2.5 h-[4px] w-[109px] rounded-full bg-[#3D3D3D]" />
          </div>

          {hasOptions && (
            <div className="bg-white px-5 pt-3.5">
              {hasOptions && (
                <OptionSelector
                  options={options}
                  selectedOption={selectedOption}
                  onSelect={option => setSelectedOption(option)}
                />
              )}
            </div>
          )}

          {isQuantitySelectorEnabled && (
            <div className="bg-white px-5 py-3">
              <ProductQuantitySelector
                selectedOption={selectedOption}
                quantity={quantity}
                onIncrease={() => setQuantity(quantity + 1)}
                onDecrease={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                price={price}
                discountedPrice={discountedPrice}
              />
            </div>
          )}

          {isQuantitySelectorEnabled && (
            <TotalPrice quantity={quantity} price={discountedPrice} />
          )}
        </div>
      )}
    </>
  );
}

// NavBar에서 사용할 수 있게 내보내기
CartActions.GoBackButton = GoBackButton;
CartActions.CartIcon = CartIcon;

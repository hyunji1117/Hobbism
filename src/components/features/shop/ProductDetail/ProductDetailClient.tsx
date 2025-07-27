'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { ProductActionButtons } from '@/components/features/shop/ProductDetail/ProductDetail';
import { OptionSelector } from '@/components/features/shop/ProductDetail/OptionSelector';
import { useCart } from '@/components/features/shop/ProductDetail/CartContext';
import { ProductOption } from '@/types/product';

type OptionSelections = { [optionName: string]: string };

// 뒤로가기 버튼
export function GoBackButton({ stroke }: { stroke: string }) {
  const handleGoBack = () => {
    if (window.history.length > 2) {
      // 사용자가 URL을 직접 입력하여 접속 경우, 뒤로가기 버튼을 클릭하면 검색 엔진이나 서비스 외부 페이지로 이동하는 문제 해결 가능
      // browser history stack이 2 이하일 때 내부경로로 이동하도록 설정 (history 1개로 설정 시 브라우저 첫 페이지가 이전 기록이 되어 문제 해결이 어렵기 때문)
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <button onClick={handleGoBack}>
      <ChevronLeft className={stroke} />
    </button>
  );
}

// 장바구니 아이콘
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
}: {
  price: number;
  options: ProductOption[];
  discountRate: number;
}) {
  const [selectedOptions, setSelectedOptions] = useState<OptionSelections>({});
  const [quantity, setQuantity] = useState(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { cartCount, setCartCount, addToCart } = useCart?.() || {};

  const hasOptions = Array.isArray(options) && options.length > 0;
  const allOptionsSelected =
    !hasOptions || options.every(opt => selectedOptions[opt.name]);
  const discountedPrice = price * (1 - discountRate / 100);

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [name]: value }));
  };

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => setIsBottomSheetOpen(false),
    trackMouse: true,
  });

  const handleAddToCart = () => {
    addToCart?.({
      name: '상품이름',
      price: discountedPrice,
      option: hasOptions ? selectedOptions : undefined,
      quantity,
      productImg: '',
    });
    setIsBottomSheetOpen(false);
    setCartCount?.(cartCount + 1);
  };

  return (
    <>
      {/* 상품 액션 버튼 */}
      <div className="bt-rounded-[8px] fixed bottom-0 z-30 w-full max-w-[600px] bg-white px-5 py-3">
        <ProductActionButtons
          onCartClick={() => {
            setIsBottomSheetOpen(true);
            setQuantity(1);
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
          className={`fixed z-20 flex w-full max-w-[600px] flex-col rounded-t-[16px] bg-white shadow-lg ${
            hasOptions ? 'bottom-[78px]' : 'bottom-[78px]'
          }`}
        >
          <div className="flex justify-center">
            <div className="mt-2.5 h-[4px] w-[109px] rounded-full bg-[#3D3D3D]" />
          </div>

          {/* 옵션 드롭다운 */}
          {hasOptions &&
            options.map(opt => (
              <div key={opt.name} className="bg-white px-5 pt-3.5">
                <OptionSelector
                  name={opt.name}
                  options={opt.values}
                  selectedOption={selectedOptions[opt.name] || ''}
                  onSelect={value => handleOptionChange(opt.name, value)}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
}

// NavBar에서 사용할 수 있게 내보내기
CartActions.GoBackButton = GoBackButton;
CartActions.CartIcon = CartIcon;

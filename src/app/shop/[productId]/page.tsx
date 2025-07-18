'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { HeaderNav } from '@/components/layout/header/Header';
import Tabbar from '@/components/layout/tabbar/Tabbar';
import {
  ProductActionButtons,
  ProductDetailInfo,
  ProductQuantitySelector,
  TotalPrice,
} from '@/components/features/shop/ProductDetail/ProductDetail';

import { OptionSelector } from '@/components/features/shop/ProductDetail/OptionSelector';

export default function ProductPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isQuantitySelectorEnabled, setIsQuantitySelectorEnabled] =
    useState(false);
  const price = 158900;
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => setIsBottomSheetOpen(false),
    trackMouse: true,
  });

  // 뒤로가기 버튼 핸들러
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
    <>
      <HeaderNav>
        <HeaderNav.LeftContent>
          <button onClick={handleGoBack}>
            <ChevronLeft />
          </button>
        </HeaderNav.LeftContent>
        <HeaderNav.Title>제품상세</HeaderNav.Title>
        <HeaderNav.RightContent>
          <ShoppingCart />
        </HeaderNav.RightContent>
      </HeaderNav>

      <div className={`relative mb-1 aspect-square w-full`}>
        <Image
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          src="/images/hyunji/interior_02.webp"
          alt="ankrouge"
          className="pointer-events-none"
        />
      </div>
      <ProductDetailInfo />
      <h2 className="p-5 text-[18px] font-semibold">상품정보</h2>
      <div className="relative mb-1 w-full">
        <Image
          layout="intrinsic"
          width={1920}
          height={1080}
          src="/images/hyunji/interior_02_01.webp"
          alt="ankrouge"
          className="pointer-events-none"
        />
      </div>

      {/* 상품 액션 버튼 컴포넌트 */}

      <div className="bt-rounded-[8px] fixed bottom-[55px] z-30 w-full max-w-[600px] bg-white px-5 py-3">
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
      <Tabbar />
    </>
  );
}

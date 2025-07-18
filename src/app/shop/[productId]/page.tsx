'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const router = useRouter();
  const quantity = 1;
  const price = 139000;

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => setIsBottomSheetOpen(false),
    trackMouse: true,
  });

  return (
    <>
      <HeaderNav>
        <HeaderNav.LeftContent>
          <button onClick={() => router.back()}>
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
        <ProductActionButtons onCartClick={() => setIsBottomSheetOpen(true)} />
      </div>

      {/* 바텀시트 */}
      {isBottomSheetOpen && (
        <div
          {...swipeHandlers}
          className="fixed bottom-[133px] z-20 w-full max-w-[600px] rounded-t-[16px] bg-white shadow-lg"
        >
          {/* 스와이프 핸들 */}
          <div className="flex justify-center">
            <div className="mt-2.5 h-[4px] w-[109px] rounded-full bg-[#3D3D3D]"></div>
          </div>

          <div className="bg-white px-5 pt-3.5">
            <OptionSelector />
          </div>
          <div className="bg-white px-5 py-3">
            <ProductQuantitySelector />
          </div>
          <TotalPrice quantity={quantity} price={price} />
          {/* </div> */}
        </div>
      )}

      {/* 바텀시트 외부 영역 */}
      {isBottomSheetOpen && (
        <div
          className="bg-opacity-50 relative inset-0 z-10 bg-black"
          onClick={() => setIsBottomSheetOpen(false)}
        ></div>
      )}
      <Tabbar />
    </>
  );
}

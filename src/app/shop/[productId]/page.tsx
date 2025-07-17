'use client';

import {
  ProductActionButtons,
  ProductDetailInfo,
} from '@/components/features/shop/ProductDetail/ProductDetail';
import { HeaderNav } from '@/components/layout/header/Header';
import Tabbar from '@/components/layout/tabbar/Tabbar';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductPage() {
  const router = useRouter();
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
      <div className="fixed bottom-[55px] z-10 w-full max-w-[600px] bg-white px-5 py-3">
        <ProductActionButtons />
      </div>

      <Tabbar />
    </>
  );
}

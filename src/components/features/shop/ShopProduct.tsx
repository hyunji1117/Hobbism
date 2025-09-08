//      ShopProduct Component with QuickCartBottomSheet      //
'use client';

import { LiveProgress } from '@/components/features/live/LiveProgress';
import { QuickCartBottomSheet } from '@/components/features/shop/QuickCartBottomSheet';
import { useLiveStore } from '@/store/live.store';
import { useCartState } from '@/store/cartStore';
import { fetchAddToCart } from '@/data/functions/CartFetch.client';
import { ShoppingBasket, Check } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

//        interface: 상품 인터페이스        //
interface ShopProductProps {
  _id: number;
  price: number;
  name: string;
  mainImageSrc: string;
  category: string[];
  discountRate?: number;
  recommendedBy: string;
  textPrice: string;
  options?: { size?: (string | number)[]; color?: string[] };
  originalPrice?: number;
}

//       component: shop main 상품 컴포넌트       //
export const ShopProduct = ({
  _id,
  price,
  name,
  mainImageSrc,
  discountRate,
  recommendedBy,
  textPrice,
  options,
  originalPrice,
}: ShopProductProps) => {
  // 카테고리 한글 변환, 배경색, 글자색
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

  const recommendInfo = recommendData[recommendedBy];
  const currentLive = useLiveStore(state => state.currentLive);
  const { refreshCartCount, cartItems } = useCartState();

  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const now = moment();
  const hasOptions = options && (options.size?.length || options.color?.length);

  const isLive = currentLive.some(product => {
    if (product._id !== _id) return false;
    const start = moment(product.start);
    const end = moment(product.end);
    return now.isBetween(start, end);
  });

  // 장바구니에 이미 담긴 상품인지 확인
  useEffect(() => {
    const itemInCart = cartItems?.some(item => item.product._id === _id);
    setIsInCart(itemInCart || false);
  }, [cartItems, _id]);

  // 장바구니 버튼 클릭 핸들러
  const handleCartButtonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      toast('이미 장바구니에 담긴 상품입니다', { icon: '🛒' });
      return;
    }

    if (isLoading) return;

    // 옵션이 있는 상품인 경우 바텀시트 열기
    if (hasOptions) {
      setIsBottomSheetOpen(true);
      return;
    }

    // 옵션이 없는 상품은 바로 담기
    setIsLoading(true);
    try {
      await fetchAddToCart({
        product_id: _id,
        quantity: 1,
      });
      await refreshCartCount();
      setIsInCart(true);
      toast.success('장바구니에 담았습니다!');
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      toast.error('장바구니에 담아지지 않았어요. 새로고침 후 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  //        render: 상품 렌더        //
  return (
    <>
      <Link
        href={isLive ? '/live' : `/shop/${_id}`}
        className={`mb-2 flex w-full flex-col gap-1`}
      >
        {/* 라이브 중인 상품일 경우 라이브 뱃지 */}
        {isLive && (
          <div className="absolute top-2 -left-2 z-5">
            <LiveProgress />
          </div>
        )}

        <div className={`relative mb-1 aspect-square w-full`}>
          <Image
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            src={`${mainImageSrc}`}
            alt={mainImageSrc}
            sizes="100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            className="pointer-events-none rounded-xl"
          />

          {/* 퀵 장바구니 버튼 */}
          <button
            onClick={handleCartButtonClick}
            disabled={isLoading}
            className={`absolute right-2 bottom-2 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all duration-200 ${
              isInCart
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-white hover:bg-gray-100'
            } ${isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
            aria-label={isInCart ? '장바구니에 담긴 상품' : '장바구니에 담기'}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
            ) : isInCart ? (
              <Check className="h-5 w-5 text-white" strokeWidth={2.5} />
            ) : (
              <ShoppingBasket
                className="h-5 w-5 text-gray-700"
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>

        <div className="flex max-w-full gap-2 text-wrap">
          <p className="pointer-events-none overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
            {name}
          </p>

          {recommendedBy && (
            <span
              className={`${recommendInfo.color} pointer-events-none flex items-center rounded-sm px-2 text-[8px] whitespace-nowrap ${recommendInfo.textColor}`}
            >
              {recommendInfo.name}PICK
            </span>
          )}
        </div>
        <p className={`${textPrice} font-semibold`}>
          {discountRate != 0 && (
            <span className="sale pointer-events-none mr-1 text-red-500">
              {discountRate}%
            </span>
          )}
          {Number(price).toLocaleString()}원
        </p>
      </Link>

      {/* 재사용 가능한 바텀시트 컴포넌트 사용 */}
      <QuickCartBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        productId={_id}
        productName={name}
        price={price}
        originalPrice={originalPrice}
        options={options}
        onSuccess={() => setIsInCart(true)}
      />
    </>
  );
};

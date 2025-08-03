'use client';

// import { OrderListFetch } from '@/data/functions/OrderFetch';
import Image from 'next/image';
import Link from 'next/link';

export function UserShopTab() {
  // const data = await OrderListFetch();
  return (
    <div className="p-4">
      <h3 className="mb-4 pl-2 text-lg font-semibold">쇼핑 내역</h3>
      <ul className="space-y-4">
        <li className="flex items-center gap-5 overflow-x-auto rounded-lg border p-4 sm:gap-4">
          {/* 주문 번호 */}
          <div className="min-w-[70px] text-center">
            <span className="text-xs text-gray-500">주문 번호</span>
            <p className="font-light">OS001</p>
          </div>
          {/* 주문 일자 */}
          <div className="mr-2 hidden min-w-[130px] text-center sm:block">
            <span className="relative bottom-1 text-xs text-gray-500">
              주문 일자
            </span>
            <p className="text-xs text-gray-600">2025.07.31 16:48:48</p>
          </div>
          {/* 주문 상품 이미지 */}
          <div className="hidden min-w-[64px] justify-center sm:flex">
            <Image
              src="/images/hyunji/interior_04.webp"
              alt="상품이미지"
              className="h-16 w-16 rounded object-cover"
              width={40}
              height={40}
            />
          </div>
          {/* 주문 상품 및 금액 */}
          <div className="min-w-[130px] flex-1">
            <div className="flex items-center">
              <span className="truncate font-medium">
                <span className="sm:hidden">
                  {`구매한 상품이름 구매한 상품이름`.length > 13
                    ? `${'구매한 상품이름 구매한 상품이름'.slice(0, 13)}...`
                    : '구매한 상품이름 구매한 상품이름'}
                </span>
                <span className="hidden sm:inline">
                  {`구매한 상품이름 구매한 상품이름`.length > 7
                    ? `${'구매한 상품이름 구매한 상품이름'.slice(0, 7)}...`
                    : '구매한 상품이름 구매한 상품이름'}
                </span>
              </span>
              <span className="w-12 pl-1 text-xs text-gray-500">외 n개</span>
            </div>
            <p className="mt-1 text-sm font-medium">총 결제금액: 317,020원</p>
          </div>
          {/* 상세 조회 버튼 */}
          <div className="flex min-w-[60px] justify-end">
            <Link href={`/shop/order/1`}>
              <button className="text-xs text-[#999999] underline hover:text-[#888888]">
                상세 조회
              </button>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

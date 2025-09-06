// components/features/shopping-cart/EmptyCart.tsx
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4">
      <div className="p-12 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          장바구니에 담긴 상품이 없어요
        </h2>
        <p className="mb-8 text-lg text-gray-500">원하는 상품을 담아보세요</p>
        <Link
          href="/shop"
          className="inline-block min-w-[120px] cursor-pointer rounded-[5px] bg-[#4B5563] px-4 py-2 text-[16px] font-semibold text-white transition-colors hover:bg-[#2c2f33]"
        >
          상품 보러 가기
        </Link>
      </div>
    </div>
  );
}

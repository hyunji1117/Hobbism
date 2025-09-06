// app/(main)/shop/cart/page.tsx
import { cookies } from 'next/headers';
import { fetchCartList } from '@/data/functions/CartFetch.server';
import { CartItem } from '@/types/cart';
import CartPageClient from '@/components/features/shopping-cart/CartPageClient';
import { Link } from 'lucide-react';

// 메타데이터 (서버 컴포넌트에서만 가능)
export const metadata = {
  title: '장바구니',
  description: '장바구니에 담은 상품을 확인하고 구매하세요',
};

// 서버 컴포넌트 - async 함수
export default async function CartPage() {
  // 서버에서 인증 확인
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // 로그인하지 않은 경우
  if (!accessToken) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4">
        <div className="p-12 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            로그인이 필요합니다
          </h1>
          <p className="mb-8 text-lg text-gray-500">
            장바구니를 이용하려면 로그인해주세요
          </p>
          <a
            href="/login"
            className="inline-block min-w-[120px] cursor-pointer rounded-[5px] bg-[#4B5563] px-4 py-2 text-[16px] font-semibold text-white transition-colors hover:bg-[#2c2f33]"
          >
            로그인하기
          </a>
        </div>
      </div>
    );
  }

  let initialCartItems: CartItem[] = [];
  let hasError = false;

  try {
    // 서버에서 장바구니 데이터 페칭
    const data = await fetchCartList(1, 100);
    initialCartItems = data.item || [];
    console.log(`서버: ${initialCartItems.length}개 아이템 로드`);
  } catch (error) {
    console.error('서버 페칭 실패:', error);
    hasError = true;
  }

  // 에러 상태
  if (hasError) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4">
        <p className="mb-4 text-gray-600">
          장바구니를 불러오는 중 문제가 발생했습니다.
        </p>
        <a href="/cart" className="text-blue-500 underline">
          새로고침
        </a>
      </div>
    );
  }

  // 빈 장바구니
  if (initialCartItems.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4">
        <div className="p-12 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            장바구니에 담긴 상품이 없어요
          </h1>
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

  // 데이터가 있는 경우
  return (
    <>
      {/* SEO를 위한 서버 렌더링 콘텐츠 */}
      <div className="sr-only">
        <h1>장바구니</h1>
        <p>{initialCartItems.length}개의 상품이 장바구니에 있습니다</p>
      </div>

      {/* 클라이언트 컴포넌트로 데이터 전달 */}
      <CartPageClient
        initialCartItems={initialCartItems}
        accessToken={accessToken}
      />
    </>
  );
}

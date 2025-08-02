'use client';

import { useEffect, useState } from 'react';
import { fetchCartList } from '@/data/functions/CartFetch.client';
import { CartItem } from '@/types/cart';
import Loading from '@/app/loading';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // 초기값을 빈 배열로 설정
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCartList(1, 10); // 페이지 번호와 limit 설정
        setCartItems(data.item); // API 응답에서 items를 가져와 상태에 저장
      } catch (err) {
        console.error('장바구니 데이터를 가져오는 중 오류 발생:', err);
        setError('장바구니 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  if (isLoading) {
    return <p className="py-10 text-center">로딩 중...</p>;
  }

  if (error) {
    return <p className="py-10 text-center text-red-500">{error}</p>;
  }

  if (cartItems.length === 0) {
    return <p className="py-10 text-center">장바구니가 비어 있습니다.</p>;
  }

  return (
    <main className="mx-auto max-w-2xl p-4">
      {/* 장바구니 상품목록 */}
      <div className="space-y-6 py-3">
        {cartItems.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded bg-gray-50 p-2"
          >
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-500">
                단가: {item.price.toLocaleString()}원
              </span>
            </div>
            <div className="w-20 text-right font-bold">
              {(item.price * item.quantity).toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

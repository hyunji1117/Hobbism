'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartState } from '@/store/cartStore';
import { useEffect } from 'react';

export function CartIcon() {
  const { cartCount, refreshCartCount } = useCartState();

  // 컴포넌트 마운트 시 장바구니 개수 로드
  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  return (
    <div className="relative">
      <ShoppingCart />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </div>
  );
}

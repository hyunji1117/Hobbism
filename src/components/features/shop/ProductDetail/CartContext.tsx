'use client';

import { createContext, useContext } from 'react';

const CartContext = createContext({ cartCount: 0 });

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartContext.Provider value={{ cartCount: 0 }}>
        {children}
      </CartContext.Provider>
      {/* 선택된 옵션 표시 */}
      {/* {(selectedSize || selectedColor) && (
        <p className="h-auto w-500 text-sm text-gray-500" bg-blue-500>
          {selectedSize && `사이즈: ${selectedSize}`}
          {selectedSize && selectedColor && ' | '}
          {selectedColor && `색상: ${selectedColor}`}
        </p>
      )} */}
    </>
  );
}

export function useCart() {
  return useContext(CartContext);
}

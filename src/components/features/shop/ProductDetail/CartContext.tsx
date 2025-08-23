'use client';

import { createContext, useContext } from 'react';

const CartContext = createContext({ cartCount: 0 });

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartContext.Provider value={{ cartCount: 0 }}>
        {children}
      </CartContext.Provider>
    </>
  );
}

export function useCart() {
  return useContext(CartContext);
}

// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';
// import { fetchCartList } from '@/data/functions/CartFetch.client';

// const CartContext = createContext({ cartCount: 0 });

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const res = await fetchCartList();
//         const totalCount = res.item.reduce(
//           (sum, item) => sum + item.quantity,
//           0,
//         );
//         setCartCount(totalCount); // totalCount를 cartCount로 설정
//       } catch (error) {
//         console.error('장바구니 목록 불러오기 실패:', error);
//       }
//     };

//     fetchCartData();
//   }, []);

//   return (
//     <CartContext.Provider value={{ cartCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }
'use client';

import { createContext, useContext } from 'react';

const CartContext = createContext({ cartCount: 0 });

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartContext.Provider value={{ cartCount: 0 }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

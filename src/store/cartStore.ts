import { create } from 'zustand';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[]; // 장바구니 목록
  cartCount: number; // 장바구니 아이템 개수
  setCartItems: (items: CartItem[]) => void; // 장바구니 목록 설정
  setCartCount: (count: number) => void; // 장바구니 아이템 개수 설정
}

export const useCartStore = create<CartState>(set => ({
  cartItems: [], // 초기 장바구니 목록
  cartCount: 0, // 초기 장바구니 아이템 개수
  setCartItems: items => set({ cartItems: items }), // 장바구니 목록 업데이트
  setCartCount: count => set({ cartCount: count }), // 장바구니 아이템 개수 업데이트
}));

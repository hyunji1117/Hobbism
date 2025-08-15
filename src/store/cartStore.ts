import { create } from 'zustand';
import { fetchCartList } from '@/data/functions/CartFetch.client';
import { CartItem } from '@/types/cart';

interface CartState {
  cartItems: CartItem[];
  cartCount: number;
  isLoading: boolean;

  // Actions
  setCartItems: (items: CartItem[]) => void;
  updateCartCount: () => void;
  fetchCartData: () => Promise<void>; // API에서 장바구니 데이터 가져오기
  refreshCartCount: () => Promise<void>; // 장바구니 개수만 새로고침
}

export const useCartState = create<CartState>((set, get) => ({
  cartItems: [],
  cartCount: 0,
  isLoading: false,

  setCartItems: items =>
    set({
      cartItems: items,
      cartCount: items.length,
    }),

  updateCartCount: () => {
    const { cartItems } = get();
    set({ cartCount: cartItems.length });
  },

  // 전체 장바구니 데이터 가져오기
  fetchCartData: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchCartList(1, 100);
      const items = data.item.map(item => ({
        ...item,
        isChecked: false,
        selectedOption: item.selectedOption || '',
      }));

      set({
        cartItems: items,
        cartCount: items.length,
        isLoading: false,
      });
    } catch (error) {
      console.error('장바구니 데이터 로드 실패:', error);
      set({ isLoading: false });
    }
  },

  // 장바구니 개수만 새로고침
  refreshCartCount: async () => {
    try {
      const data = await fetchCartList(1, 100);
      set({ cartCount: data.item.length });
    } catch (error) {
      console.error('장바구니 개수 조회 실패:', error);
      set({ cartCount: 0 });
    }
  },
}));

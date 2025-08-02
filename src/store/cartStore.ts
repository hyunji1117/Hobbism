import { create } from 'zustand';

export interface CartItem {
  _id: number | string;
  name: string;
  price: number;
  quantity: number;
  mainImages: string[];
  size: string | number;
  color: string;
}

interface CartState {
  // 장바구니 전체 목록
  cartItems: CartItem[];
  // 장바구니에 담긴 모든 상품 수량 합계)
  cartCount: number;
  // 전체 목록 교체
  setCartItems: (items: CartItem[]) => void;
  // 옵션까지 완전히 동일시 수량증가, 아니면 새로 추가
  addOrUpdateCartItem: (item: CartItem) => void;
  getTotalItems: () => number;
  clear: () => void;
}

function isSameCartItem(a: CartItem, b: CartItem) {
  // 상품ID, 옵션이 모두 같으면 true
  return (
    a._id === b._id &&
    (a.size ?? null) === (b.size ?? null) &&
    (a.color ?? null) === (b.color ?? null)
  );
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  cartCount: 0,

  setCartItems: items =>
    set({
      cartItems: items,
      cartCount: items.reduce((total, item) => total + item.quantity, 0),
    }),

  addOrUpdateCartItem: newItem =>
    set(state => {
      const idx = state.cartItems.findIndex(item =>
        isSameCartItem(item, newItem),
      );
      let nextCart: CartItem[];
      if (idx > -1) {
        // 옵션/상품ID 같으면 수량 증가
        nextCart = state.cartItems.map((item, i) =>
          i === idx
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        // 완전 새로운 상품/옵션이면 추가
        nextCart = [...state.cartItems, newItem];
      }
      return {
        cartItems: nextCart,
        cartCount: nextCart.reduce((total, item) => total + item.quantity, 0),
      };
    }),

  getTotalItems: () => get().cartCount,
  clear: () => set({ cartItems: [], cartCount: 0 }),
}));

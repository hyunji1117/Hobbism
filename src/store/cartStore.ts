import { create } from 'zustand';

export interface CartItem {
  id: number | string; // 기존 _id를 id로 변경
  name: string;
  price: number;
  quantity: number;
  mainImages?: string[]; // 선택적 필드로 유지
  size?: string | number; // 선택적 필드로 유지
  color?: string; // 선택적 필드로 유지
}

interface CartState {
  // 장바구니 전체 목록
  items: CartItem[];
  // 총 결제 금액
  totalAmount: number;
  // 장바구니에 담긴 모든 상품 수량 합계
  cartCount: number;
  // 전체 목록 교체
  setCartItems: (items: CartItem[]) => void;
  // 옵션까지 완전히 동일시 수량 증가, 아니면 새로 추가
  addOrUpdateCartItem: (item: CartItem) => void;
  // 특정 상품 수량 업데이트
  updateCartItem: (id: number | string, quantity: number) => void;
  // 총 결제 금액 계산
  calculateTotal: () => void;
  // 장바구니 초기화
  clear: () => void;
}

function isSameCartItem(a: CartItem, b: CartItem) {
  // 상품 ID와 옵션이 모두 같으면 true
  return (
    a.id === b.id &&
    (a.size ?? null) === (b.size ?? null) &&
    (a.color ?? null) === (b.color ?? null)
  );
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalAmount: 0,
  cartCount: 0,

  setCartItems: items =>
    set({
      items,
      cartCount: items.reduce((total, item) => total + item.quantity, 0),
    }),

  addOrUpdateCartItem: newItem =>
    set(state => {
      const idx = state.items.findIndex(item => isSameCartItem(item, newItem));
      let nextCart: CartItem[];
      if (idx > -1) {
        // 옵션/상품 ID가 같으면 수량 증가
        nextCart = state.items.map((item, i) =>
          i === idx
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        // 완전히 새로운 상품/옵션이면 추가
        nextCart = [...state.items, newItem];
      }
      return {
        items: nextCart,
        cartCount: nextCart.reduce((total, item) => total + item.quantity, 0),
      };
    }),

  updateCartItem: (id, quantity) => {
    set(state => {
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item,
      );
      return { items: updatedItems };
    });
    get().calculateTotal();
  },

  calculateTotal: () => {
    set(state => ({
      totalAmount: state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    }));
  },

  clear: () => set({ items: [], totalAmount: 0, cartCount: 0 }),
}));

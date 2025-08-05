// import { create } from 'zustand';
// import { fetchCartList } from '@/data/functions/CartFetch.client';

// export interface CartItem {
//   id: number | string; // 기존 _id를 id로 변경
//   name: string;
//   price: number;
//   quantity: number;
//   mainImages?: string[]; // 선택적 필드로 유지
//   size?: string | number; // 선택적 필드로 유지
//   color?: string; // 선택적 필드로 유지
// }

// interface CartState {
//   // 장바구니 전체 목록
//   items: CartItem[];
//   // 총 결제 금액
//   totalAmount: number;
//   // 장바구니에 담긴 모든 상품 수량 합계
//   cartCount: number;
//   // 장바구니 아이템 개수
//   itemCount: number; // 추가된 필드
//   // 전체 목록 교체
//   setCartItems: (items: CartItem[]) => void;
//   // 옵션까지 완전히 동일시 수량 증가, 아니면 새로 추가
//   addOrUpdateCartItem: (item: CartItem) => void;
//   // 장바구니 목록 불러오기
//   fetchCartItems: () => Promise<void>;
// }

// function isSameCartItem(a: CartItem, b: CartItem) {
//   // 상품 ID와 옵션이 모두 같으면 true
//   return (
//     a.id === b.id &&
//     (a.size ?? null) === (b.size ?? null) &&
//     (a.color ?? null) === (b.color ?? null)
//   );
// }

// export const useCartStore = create<CartState>((set, get) => ({
//   items: [],
//   totalAmount: 0,
//   cartCount: 0,
//   itemCount: 0, // 초기값 설정

//   setCartItems: items =>
//     set({
//       items,
//       cartCount: items.reduce((total, item) => total + item.quantity, 0),
//       itemCount: items.reduce((total, item) => total + item.quantity, 0), // itemCount 계산
//     }),

//   addOrUpdateCartItem: newItem =>
//     set(state => {
//       const idx = state.items.findIndex(item => isSameCartItem(item, newItem));
//       let nextCart: CartItem[];
//       if (idx > -1) {
//         // 옵션/상품 ID가 같으면 수량 증가
//         nextCart = state.items.map((item, i) =>
//           i === idx
//             ? { ...item, quantity: item.quantity + newItem.quantity }
//             : item,
//         );
//       } else {
//         // 완전히 새로운 상품/옵션이면 추가
//         nextCart = [...state.items, newItem];
//       }
//       return {
//         items: nextCart,
//         cartCount: nextCart.reduce((total, item) => total + item.quantity, 0),
//         itemCount: nextCart.reduce((total, item) => total + item.quantity, 0), // itemCount 계산
//       };
//     }),

//   fetchCartItems: async () => {
//     try {
//       const res = await fetchCartList();
//       set({
//         items: res.item.map(item => ({
//           id: item._id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           mainImages: item.mainImages,
//           size: item.size,
//           color: item.color,
//         })),
//         cartCount: res.item.reduce((sum, item) => sum + item.quantity, 0),
//         itemCount: res.item.reduce((sum, item) => sum + item.quantity, 0), // itemCount 계산
//         totalAmount: res.item.reduce(
//           (sum, item) => sum + item.price * item.quantity,
//           0,
//         ),
//       });
//     } catch (err) {
//       console.error('장바구니 목록 불러오기 실패', err);
//     }
//   },
// }));

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
  // 장바구니 아이템 개수
  itemCount: number; // 추가된 필드
  // 전체 목록 교체
  setCartItems: (items: CartItem[]) => void;
  // 옵션까지 완전히 동일시 수량 증가, 아니면 새로 추가
  addOrUpdateCartItem: (item: CartItem) => void;
}

function isSameCartItem(a: CartItem, b: CartItem) {
  // 상품 ID와 옵션이 모두 같으면 true
  return (
    a.id === b.id &&
    (a.size ?? null) === (b.size ?? null) &&
    (a.color ?? null) === (b.color ?? null)
  );
}

export const useCartStore = create<CartState>(set => ({
  items: [],
  totalAmount: 0,
  cartCount: 0,
  itemCount: 0, // 초기값 설정

  setCartItems: items =>
    set({
      items,
      cartCount: items.length, // 장바구니 목록 개수로 cartCount 계산
      itemCount: items.reduce((total, item) => total + item.quantity, 0), // itemCount 계산
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
        cartCount: nextCart.length, // 장바구니 목록 개수로 cartCount 계산
        itemCount: nextCart.reduce((total, item) => total + item.quantity, 0), // itemCount 계산
      };
    }),
}));

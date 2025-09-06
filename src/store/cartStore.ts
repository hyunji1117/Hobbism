// store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { fetchCartList } from '@/data/functions/CartFetch.client';
import { CartItem } from '@/types/cart';

interface CartState {
  cartItems: CartItem[];
  cartCount: number;
  isLoading: boolean;
  selectedItems: number[]; // 선택된 아이템 ID 저장 (SSR 지원)
  hydrated: boolean; // Hydration 상태 추적

  // Actions
  setCartItems: (items: CartItem[]) => void;
  updateCartCount: () => void;
  fetchCartData: () => Promise<void>;
  refreshCartCount: () => Promise<void>;

  // SSR 지원 Actions
  setSelectedItems: (items: number[]) => void;
  toggleItemSelection: (itemId: number) => void;
  clearSelectedItems: () => void;
  setHydrated: (state: boolean) => void;
  getSelectedItems: () => number[];
}

export const useCartState = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      cartCount: 0,
      isLoading: false,
      selectedItems: [],
      hydrated: false,

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

      // === SSR 지원 추가 기능 ===

      // 선택된 아이템 설정
      setSelectedItems: items => set({ selectedItems: items }),

      // 아이템 선택 토글
      toggleItemSelection: itemId => {
        const currentItems = get().selectedItems;
        const isSelected = currentItems.includes(itemId);

        if (isSelected) {
          set({
            selectedItems: currentItems.filter(id => id !== itemId),
          });
        } else {
          set({
            selectedItems: [...currentItems, itemId],
          });
        }
      },

      // 선택된 아이템 모두 해제
      clearSelectedItems: () => set({ selectedItems: [] }),

      // Hydration 상태 설정
      setHydrated: state => set({ hydrated: state }),

      // 선택된 아이템 가져오기
      getSelectedItems: () => get().selectedItems,
    }),
    {
      name: 'cart-storage', // localStorage 키 이름
      storage: createJSONStorage(() => {
        // SSR 환경 체크
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      onRehydrateStorage: () => state => {
        // Hydration 완료 시 호출
        state?.setHydrated(true);
      },
      // localStorage에 저장할 데이터 선택
      partialize: state => ({
        cartCount: state.cartCount,
        selectedItems: state.selectedItems,
        // cartItems는 API에서 매번 가져오므로 저장하지 않음
      }),
    },
  ),
);

// SSR을 위한 초기화 함수
export const initializeCartStore = (initialData?: {
  cartItems?: CartItem[];
  cartCount?: number;
  selectedItems?: number[];
}) => {
  if (initialData) {
    useCartState.setState({
      cartItems: initialData.cartItems || [],
      cartCount: initialData.cartCount || 0,
      selectedItems: initialData.selectedItems || [],
    });
  }
};

// Hydration 상태를 기다리는 헬퍼 함수
export const useHydratedCartState = () => {
  const state = useCartState();

  // 클라이언트 사이드에서만 hydrated 상태 체크
  if (typeof window !== 'undefined' && !state.hydrated) {
    // Hydration 진행 중일 때는 기본값 반환
    return {
      ...state,
      selectedItems: [],
      cartCount: 0,
    };
  }

  return state;
};

// store/purchase.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PurchaseItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  originalPrice?: number;
  size?: number | string;
  color?: string;
  productImg: string;
  cartId?: number;
};

type Store = {
  purchaseData: PurchaseItem[];
  setPurchaseData: (data: PurchaseItem[]) => void;
  clearPurchaseData: () => void;
};

export const usePurchaseStore = create<Store>()(
  persist(
    set => ({
      purchaseData: [],
      setPurchaseData: data => set({ purchaseData: data }),
      clearPurchaseData: () => set({ purchaseData: [] }),
    }),
    {
      name: 'purchase-storage', // localStorage 키 이름
    },
  ),
);

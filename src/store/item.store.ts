// src/store/item.store.ts
import { create } from 'zustand';
import { Code } from '@/types';

interface ItemState {
  equippedItems: Code[];
  ownedItems: Code[];
  setEquippedItems: (items: Code[]) => void;
  setOwnedItems: (items: Code[]) => void;
  updateEquippedItems: (updater: (prev: Code[]) => Code[]) => void;
}

export const useItemStore = create<ItemState>(set => ({
  equippedItems: [],
  ownedItems: [],
  setEquippedItems: items => set({ equippedItems: items }),
  setOwnedItems: items => set({ ownedItems: items }),
  updateEquippedItems: updater =>
    set(state => ({
      equippedItems: updater(state.equippedItems),
    })),
}));

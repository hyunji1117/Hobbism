import { FunctionComponent } from 'react';
import { create } from 'zustand';

interface ModalState {
  modals: FunctionComponent<{ onClose: () => void }>[];
}

type ModalAction = {
  openModal: (modal: FunctionComponent<{ onClose: () => void }>) => void;
  closeModal: (index: number) => void;
  clearModals: () => void;
};

export const useModalStore = create<ModalState & ModalAction>()(set => ({
  modals: [],
  openModal: modal => set(state => ({ modals: [...state.modals, modal] })),
  closeModal: index =>
    set(state => ({ modals: state.modals.filter((_, i) => i !== index) })),
  clearModals: () => set({ modals: [] }),
}));

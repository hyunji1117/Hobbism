import { create } from 'zustand';

interface PointState {
  point: number;
  setPoint: (value: number) => void;
  addPoint: (value: number) => void;
  subtractPoint: (value: number) => void;
}

export const usePointStore = create<PointState>(set => ({
  point: 0,

  setPoint: value => set({ point: value }),

  addPoint: value =>
    set(state => ({
      point: state.point + value,
    })),

  subtractPoint: value =>
    set(state => ({
      point: state.point - value,
    })),
}));

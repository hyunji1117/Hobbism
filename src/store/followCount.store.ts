import { create } from 'zustand';

interface FollowCountState {
  followCount: number;
  setFollowCount: (count: number) => void;
  increaseFollow: () => void;
  decreaseFollow: () => void;
}

export const useFollowCountStore = create<FollowCountState>(set => ({
  followCount: 0,
  setFollowCount: count => set({ followCount: count }),
  increaseFollow: () => set(state => ({ followCount: state.followCount + 1 })),
  decreaseFollow: () => set(state => ({ followCount: state.followCount - 1 })),
}));

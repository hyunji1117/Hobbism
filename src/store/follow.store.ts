import { create } from 'zustand';

interface FollowState {
  followingCount: number;
  setFollowingCount: (count: number) => void;
  increaseFollowing: () => void;
  decreaseFollowing: () => void;
}

export const useFollowStore = create<FollowState>(set => ({
  followingCount: 0,
  setFollowingCount: count => set({ followingCount: count }),
  increaseFollowing: () =>
    set(state => ({ followingCount: state.followingCount + 1 })),
  decreaseFollowing: () =>
    set(state => ({ followingCount: state.followingCount - 1 })),
}));

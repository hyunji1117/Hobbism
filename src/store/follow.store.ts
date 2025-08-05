import { create } from 'zustand';

interface FollowState {
  followMap: Record<string, number>;
  setFollow: (userId: string, followId: number) => void;
  removeFollow: (userId: string) => void;
  setBulkFollows: (follows: Record<string, number>) => void;
}

export const useFollowStore = create<FollowState>(set => ({
  followMap: {},
  setFollow: (userId, followId) =>
    set(state => ({
      followMap: {
        ...state.followMap,
        [userId]: followId,
      },
    })),
  removeFollow: userId =>
    set(state => {
      const newMap = { ...state.followMap };
      delete newMap[userId];
      return { followMap: newMap };
    }),
  setBulkFollows: follows => set({ followMap: follows }),
}));

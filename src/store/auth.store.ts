import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id?: number;
  name?: string;
  email?: string;
  points?: number;
}

interface AuthState {
  accessToken: string | null;
  loginType: string | null;
  user: User | null;

  // action 설정
  setAccessToken: (accessToken: string) => void;
  setLoginType: (loginType: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  addPoints: (point: number) => void;
}

// store 생성
export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      loginType: null,
      user: null,

      setAccessToken: accessToken => set({ accessToken }),

      setLoginType: loginType => set({ loginType }),

      setUser: user => set({ user }),

      clearAuth: () => set({ accessToken: null, loginType: null, user: null }),

      addPoints: point =>
        set(state =>
          state.user
            ? {
                user: {
                  ...state.user,
                  points: (state.user.points ?? 0) + point,
                },
              }
            : state,
        ),
    }),
    {
      name: 'userInfo-storage', // localStorage
    },
  ),
);

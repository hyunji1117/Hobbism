import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  loginType: string | null;
  user: {
    _id: number;
    name: string;
    email: string;
  } | null;

  // action 설정
  setAccessToken: (accessToken: string) => void;
  setLoginType: (loginType: string) => void;
  setUser: (user: { _id: number; name: string; email: string }) => void;
  clearAuth: () => void;
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
    }),
    {
      name: 'userInfo-storage', // localStorage
    },
  ),
);

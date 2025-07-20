'use client';

import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';

export default function TokenSync() {
  const { data: session, status } = useSession();
  const { setAccessToken, setLoginType, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.accessToken) {
      setAccessToken(session.accessToken);

      if (session.loginType) {
        setLoginType(session.loginType);
      }

      if (session.user) {
        setUser({
          _id: session.user._id,
          name: session.user.name,
          email: session.user.email,
        });
      }
    } else {
      clearAuth();
    }
  }, [session, status, setAccessToken, setLoginType, setUser, clearAuth]);

  return null;
}

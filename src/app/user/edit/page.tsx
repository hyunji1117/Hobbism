'use client';

import { useEffect, useState } from 'react';
import { getUserInfo } from '@/data/actions/user';
import { UserEditForm } from '@/components/features/user/UserEditForm';
import { useAuthStore } from '@/store/auth.store';
import { User } from '@/types';

export default function UserEditPage() {
  const currentUser = useAuthStore(state => state.user);
  const accessToken = useAuthStore(state => state.accessToken);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!accessToken) return null;

      if (!currentUser?._id) return;
      const res = await getUserInfo(currentUser._id);
      if (res.ok === 1 && res.item) {
        setUser(res.item);
      }
    };

    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (!user) return null;

  return (
    <div className="flex h-[calc(100%-48px)] flex-col">
      <UserEditForm user={user} />
    </div>
  );
}

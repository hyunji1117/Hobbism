'use client';

import { PostList, User } from '@/types';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HeaderNav } from '@/components/layout/header/Header';
import { SettingButton } from '@/components/common/SettingButton';
import { BackButton } from '@/components/common/BackButton';
import { UserProfileSection } from '@/components/features/user/UserProfileSection';
import UserPreviewList from '@/components/features/user/UserPreviewList';
import { UserFeedTab } from '@/components/features/user/UserFeedTab';
import { UserShopTab } from '@/components/features/user/UserShopTab';
import { useAuthStore } from '@/store/auth.store';
import { useEffect, useState } from 'react';

interface Props {
  user: User;
  posts: PostList[];
  recommenedUser: User[];
}

export function UserPageClient({ user, posts, recommenedUser }: Props) {
  const currentUser = useAuthStore(state => state.user);

  const [isMypage, setMypage] = useState<boolean>(true);

  useEffect(() => {
    if (!currentUser?._id) return;
    setMypage(currentUser._id === user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main className="flex flex-col">
      <section className="flex flex-col gap-5 p-5">
        <UserProfileSection user={user} isMypage={isMypage} />
      </section>

      {isMypage && <UserPreviewList recommendedUser={recommenedUser} />}

      <section className="flex flex-col">
        <Tabs defaultValue="feed" className="">
          <TabsList className="h-14 w-full rounded-none border-b bg-white px-5 py-0">
            <TabsTrigger
              value="feed"
              className="rounded-none border-none !shadow-none data-[state=active]:bg-gray-200"
            >
              {isMypage ? '내 피드' : '피드'}
            </TabsTrigger>
            {isMypage && (
              <TabsTrigger
                value="shop"
                className="rounded-none border-none !shadow-none data-[state=active]:bg-gray-200"
              >
                쇼핑 내역
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="feed">
            <UserFeedTab posts={posts} />
          </TabsContent>
          {isMypage && (
            <TabsContent value="shop">
              <UserShopTab />
            </TabsContent>
          )}
        </Tabs>
      </section>
    </main>
  );
}

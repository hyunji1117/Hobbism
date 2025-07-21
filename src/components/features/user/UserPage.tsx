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

interface Props {
  user: User;
  posts: PostList[];
  recommenedUser: User[];
}

export function UserPageClient({ user, posts, recommenedUser }: Props) {
  // const { user: currentUser } = useUserStore();
  const isMypage = 1 === user._id;
  console.log('recommend', recommenedUser);

  return (
    <div>
      <HeaderNav>
        {isMypage ? (
          <HeaderNav.RightContent>
            <SettingButton />
          </HeaderNav.RightContent>
        ) : (
          <HeaderNav.LeftContent>
            <BackButton />
          </HeaderNav.LeftContent>
        )}
      </HeaderNav>

      <main>
        <section className="flex flex-col gap-5 p-5">
          <UserProfileSection user={user} isMypage={true} />
        </section>

        {isMypage && <UserPreviewList recommendedUser={recommenedUser} />}

        <section>
          <Tabs defaultValue="feed">
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
    </div>
  );
}

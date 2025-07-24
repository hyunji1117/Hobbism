import { getOtherUserInfo, getUserInfo } from '@/data/actions/user';
import { UserPageClient } from '@/components/features/user/UserPage';
import { getUserPosts } from '@/data/actions/post';

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);
  const res = await getUserInfo(userId);

  console.log('유저 데이터', res);

  if (!res.ok || !res.item) return null;
  const user = res.item;

  const postRes = await getUserPosts(userId, 'community');
  const posts = postRes.ok ? postRes.item : [];

  const recommendedRes = await getOtherUserInfo(userId);

  if (!recommendedRes.ok || !recommendedRes.item) return null;
  const recommendedUser = recommendedRes.item;

  return (
    <UserPageClient
      user={user}
      posts={posts}
      recommenedUser={recommendedUser}
    />
  );
}

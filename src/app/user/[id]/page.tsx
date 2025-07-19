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

  if (!res.ok || !res.item) return null;
  const user = res.item;

  const postRes = await getUserPosts(userId, 'community');
  const posts = postRes.ok ? postRes.item : [];
  console.log(id);
  console.log(posts);

  const recommendedRes = await getOtherUserInfo(userId);

  if (!recommendedRes.ok || !recommendedRes.item) return null;
  const recommendedUser = recommendedRes.item;
  console.log(recommendedRes);
  return (
    <UserPageClient
      user={user}
      posts={posts}
      recommenedUser={recommendedUser}
    />
  );
}

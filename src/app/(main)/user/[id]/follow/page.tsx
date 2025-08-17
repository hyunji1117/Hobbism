import FollowingSection from '@/components/features/user/follow/FollowingSection';
import FollowSection from '@/components/features/user/follow/FollowSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllUserBookmark } from '@/data/actions/bookmark';

export default async function FollowPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);
  const defaultTab = (await searchParams).tab || 'follow';
  const res = await getAllUserBookmark(userId);
  if (!res.ok || !res.item) return null;

  return (
    <>
      <Tabs defaultValue={defaultTab}>
        <TabsList className="h-14 w-full rounded-none border-b bg-white px-0 py-0 text-[#4A4A4A]">
          <TabsTrigger
            value="follow"
            className="rounded-none border-none !shadow-none data-[state=active]:bg-[#4a4a4a] data-[state=active]:text-white"
          >
            팔로우
          </TabsTrigger>

          <TabsTrigger
            value="following"
            className="rounded-none border-none !shadow-none data-[state=active]:bg-[#4a4a4a] data-[state=active]:text-white"
          >
            팔로잉
          </TabsTrigger>
        </TabsList>
        <TabsContent value="follow">
          <FollowSection byUser={res.item.byUser} />
        </TabsContent>
        <TabsContent value="following">
          <FollowingSection user={res.item.user} />
        </TabsContent>
      </Tabs>
    </>
  );
}

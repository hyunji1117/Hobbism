import { FeedCard } from '@/components/features/user/FeedCard';
import { getAllUserBookmark } from '@/data/actions/bookmark';

export default async function BookmarkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);
  const res = await getAllUserBookmark(userId);

  if (!res.ok || !res.item) return null;
  const bookmarks = res.item.post;

  return (
    <div className="p-4">
      {bookmarks.length === 0 ? (
        <div className="mt-8 flex items-center justify-center text-sm text-gray-400">
          북마크한 피드가 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {bookmarks.map(bookmark => (
            <FeedCard
              key={bookmark._id}
              images={bookmark.post.image}
              href={`/community/${bookmark.post._id}`}
              alt={bookmark.post.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}

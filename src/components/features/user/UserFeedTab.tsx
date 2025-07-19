import { PostList } from '@/types';
import { FeedCard } from './FeedCard';

export function UserFeedTab({ posts }: { posts: PostList[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center pt-20 text-sm">
        <p>아직 작성한 피드가 없습니다!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {posts.map(post => (
        <FeedCard
          key={post._id}
          images={post.image}
          href={`/${post.type}/${post._id}`}
          alt={post.title}
          onClick={() => console.log(`${post.title} 클릭됨`)}
        />
      ))}
    </div>
  );
}

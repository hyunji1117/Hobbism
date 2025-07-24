import CommentItem from './CommentItem';
import { fetchReplies } from '@/data/functions/CommunityFetch';

export default async function CommentSection({ postId }: { postId: number }) {
  const res = await fetchReplies(postId);

  return (
    <div className="w-full">
      <div className="mt-2.5 px-5">
        <span className="text-sm font-bold text-black">
          댓글 {res.ok ? res.item.length : 0}개
        </span>
      </div>

      <div>
        {res.ok ? (
          res.item.length > 0 ? (
            res.item.map(comment => (
              <CommentItem
                key={comment._id}
                profileImage={
                  comment.user?.image || '/images/inhwan/profile-default.png'
                }
                userName={comment.user?.name || '사용자'}
                timeAgo={comment.createdAt || ''}
                comment={comment.content || ''}
                postId={postId}
                replyId={comment._id.toString()}
              />
            ))
          ) : (
            <div className="p-5 text-center text-gray-500">
              아직 댓글이 없습니다.
            </div>
          )
        ) : (
          <div className="p-5 text-center text-gray-500">{res.message}</div>
        )}
      </div>
    </div>
  );
}

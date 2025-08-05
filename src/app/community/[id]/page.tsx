import { getPost } from '@/data/actions/post';
import CommunityFeed from '@/components/features/community/community-main/CommunityFeed';
import CommunityComment from '@/components/features/community/community-comment/CommunityComment';
import { fetchReplies } from '@/data/functions/CommunityFetch';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getBookmarks } from '@/data/actions/bookmark';
import { Suspense } from 'react';
import CommunityFeedSkeleton from '@/components/features/community/community-main/CommunityFeedSkeleton';

interface CommunityDetailPageProps {
  params: Promise<{ id: string }>;
}

//          component: 커뮤니티 상세 페이지 컴포넌트          //
export default async function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  const { id } = await params;
  const postId = Number(id);

  // 게시글 데이터 조회
  const res = await getPost(postId);

  if (res.ok !== 1) return;
  const post = res.item;

  const session = await getServerSession(authOptions);

  if (!session?.user?._id || !session.accessToken) {
    throw new Error('로그인이 필요합니다');
  }

  const userId = session.user._id;
  const commentRes = await fetchReplies(postId);

  if (commentRes.ok !== 1) return null;
  const myCommentIds =
    commentRes.ok === 1
      ? commentRes.item.filter(c => c.user._id === userId).map(c => c._id)
      : [];

  const bookmarkRes = await getBookmarks('post', session.accessToken);

  if (bookmarkRes.ok !== 1) return null;
  const userBookmark = bookmarkRes.item;

  const bookmark = userBookmark.find(b => b.post._id === postId);

  const isBookmarked = !!bookmark;
  const bookmark_id = bookmark?._id;

  if (res.ok !== 1 || !res.item) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            게시글를 찾을 수 없습니다
          </h2>
          <p className="mb-4 text-gray-600">
            요청하신 게시글이 존재하지 않거나, 이동 또는 삭제되었습니다.
          </p>
          <button
            onClick={() => window.history.back()}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            이전으로
          </button>
        </div>
      </div>
    );
  }

  if (commentRes.ok !== 1) return null;

  //           render: 커뮤니티 상세 페이지 컴포넌트 렌더링          //
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Suspense fallback={<CommunityFeedSkeleton />}>
        <CommunityFeed
          post={res.item}
          page="detail"
          isBookmarked={isBookmarked}
          bookmark_id={bookmark_id}
        />
      </Suspense>
      <CommunityComment
        commentList={commentRes.item}
        post_id={id}
        myCommentIds={myCommentIds}
      />
    </div>
  );
}

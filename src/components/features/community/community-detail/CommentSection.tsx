'use client';

import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { useEffect, useState } from 'react';
import { fetchComments } from '@/data/functions/CommentsFetch';

type Comment = {
  _id: string;
  user?: {
    profileImage?: string;
    name?: string;
  };
  createdAt?: string;
  content?: string;
};

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState<null | {
    replyId: string;
    content: string;
  }>(null);

  // input으로 수정할 수 있게끔 전달
  const handleEditClick = (replyId: string, content: string) => {
    setIsEdit({ replyId, content });
  };

  // 수정 완료 후 다시 등록
  const handleEditSubmit = () => {
    setIsEdit(null);
    getComments();
  };

  // 댓글 목록 불러옴
  const getComments = async () => {
    try {
      setIsLoading(true);
      const data = await fetchComments(postId);
      setComments(data.items || []);
    } catch (error) {
      console.log('댓글 목록 조회 오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  // postId 바뀔 때 마다 geComments 호출
  useEffect(() => {
    if (postId) getComments();
  }, [postId]);

  return (
    <div className="w-full">
      {/* 댓글 타이틀 */}
      <div className="mt-2.5 px-5">
        <span className="text-sm font-bold text-black">댓글</span>
      </div>

      {/* 댓글 목록 */}
      <div>
        {isLoading ? (
          <div className="p-5 text-center text-gray-500">
            댓글을 불러오는 중...
          </div>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem
              key={comment._id}
              profileImage={comment.user?.profileImage || ''}
              userName={comment.user?.name || '사용자'}
              timeAgo={comment.createdAt || ''}
              comment={comment.content || ''}
              postId={postId}
              replyId={comment._id}
              onEditClick={handleEditClick}
              onAfterDelete={getComments}
            />
          ))
        ) : (
          <div className="p-5 text-center text-gray-500">
            아직 댓글이 없습니다.
          </div>
        )}
      </div>

      {/* 댓글 입력창 */}
      <CommentInput
        postId={postId}
        onCommentAdd={() => getComments()}
        profileImage="/images/inhwan/profile-default.png"
        mode={isEdit ? 'edit' : 'create'}
        replyId={isEdit?.replyId}
        initialValue={isEdit?.content || ''}
        onEditSubmit={handleEditSubmit}
      />
    </div>
  );
}

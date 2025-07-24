'use client';

import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { useEffect, useState, useCallback } from 'react';
import { PostReply } from '@/types/interface';

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<PostReply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState<null | {
    replyId: string;
    content: string;
  }>(null);

  const handleEditClick = (replyId: string, content: string) => {
    setIsEdit({ replyId, content });
  };

  const handleEditSubmit = () => {
    setIsEdit(null);
    getComments();
  };

  const getComments = useCallback(async () => {
    try {
      setIsLoading(true);
      // API Route를 통해 댓글 조회
      const response = await fetch(`/api/comments?postId=${postId}`);
      const data = await response.json();

      // API 응답 구조에 따라 데이터 설정
      if (data.ok) {
        setComments(data.item || []);
      } else {
        console.error('댓글 조회 실패:', data.message);
        setComments([]);
      }
    } catch (error) {
      console.log('댓글 목록 조회 오류', error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) getComments();
  }, [postId, getComments]);

  return (
    <div className="w-full">
      <div className="mt-2.5 px-5">
        <span className="text-sm font-bold text-black">댓글</span>
      </div>

      <div>
        {isLoading ? (
          <div className="p-5 text-center text-gray-500">
            댓글을 불러오는 중...
          </div>
        ) : comments.length > 0 ? (
          comments.map(comment => (
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

      <CommentInput
        postId={postId}
        profileImage="/images/inhwan/profile-default.png"
        mode={isEdit ? 'edit' : 'create'}
        replyId={isEdit?.replyId}
        initialValue={isEdit?.content || ''}
        onEditSubmit={handleEditSubmit}
      />
    </div>
  );
}

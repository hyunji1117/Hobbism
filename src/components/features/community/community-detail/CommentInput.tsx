'use client';

import Image from 'next/image';
import { CircleArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { createReply } from '@/data/actions/post';

interface CommentInputProps {
  profileImage: string;
  postId: number;
  mode: 'create' | 'edit';
  initialValue?: string;
  replyId?: string;
  onEditSubmit: () => void;
}

export default function CommentInput({
  profileImage = '/images/inhwan/profile-default.png',
  postId,
  mode = 'create',
  initialValue = '',
  replyId,
  onEditSubmit,
}: CommentInputProps) {
  const [content, setContent] = useState('');

  const [state, formAction, isLoading] = useActionState(createReply, null);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (state?.ok) {
      setContent('');
    }
  }, [state]);

  const handleEditSubmit = async () => {
    if (mode === 'edit' && replyId) {
      try {
        const response = await fetch('/api/comments', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: postId, reply_id: replyId, content }),
        });
        if (response.ok) {
          setContent('');
          onEditSubmit?.();
        }
      } catch (error) {
        console.log('댓글 수정 오류', error);
      }
    }
  };

  return (
    <div className="flex h-[74px] w-full items-center gap-3 bg-white px-5">
      <div className="h-8 w-8 flex-shrink-0">
        <Image
          src={profileImage}
          alt="프로필"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>

      {mode === 'create' ? (
        <form action={formAction} className="flex flex-1 items-center">
          <input type="hidden" name="_id" value={postId} />

          <div className="relative flex-1 items-center pr-3">
            <input
              type="text"
              name="content"
              placeholder="댓글을 입력하세요"
              className="h-10 w-full rounded-full bg-[#F3F4F6] px-4 text-sm placeholder-[#c3c3c3] focus:outline-none"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            <CircleArrowUp size={24} className="mr-4" />
          </button>
        </form>
      ) : (
        <>
          <div className="relative flex-1 items-center pr-3">
            <input
              type="text"
              placeholder="댓글을 입력하세요"
              className="h-10 w-full rounded-full bg-[#F3F4F6] px-4 text-sm placeholder-[#c3c3c3] focus:outline-none"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <button onClick={handleEditSubmit}>
            <CircleArrowUp size={24} className="mr-4" />
          </button>
        </>
      )}
    </div>
  );
}

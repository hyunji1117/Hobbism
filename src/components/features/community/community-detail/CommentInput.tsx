'use client';

import Image from 'next/image';
import { CircleArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CommentInputProps {
  profileImage: string;
  postId: number;
  onCommentAdd: () => void;
  mode: 'create' | 'edit';
  initialValue?: string;
  replyId?: string;
  onEditSubmit: () => void;
}

export default function CommentInput({
  profileImage = '/images/inhwan/profile-default.png',
  postId,
  onCommentAdd,
  mode = 'create',
  initialValue = '',
  replyId,
  onEditSubmit,
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  // 댓글 작성 및 수정 까지
  const handleSubmit = async () => {
    try {
      if (mode === 'edit' && replyId) {
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
      } else {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: postId,
            content,
          }),
        });
        if (response.ok) {
          setContent('');
          router.refresh();
          onCommentAdd?.();
        } else {
          throw new Error('댓글 등록 실패');
        }
      }
    } catch (error) {
      console.log('댓글 등록 오류', error);
    }
  };

  return (
    <div className="flex h-[74px] w-full items-center gap-3 bg-white px-5">
      {/* 프로필 이미지 */}
      <div className="h-8 w-8 flex-shrink-0">
        <Image
          src={profileImage}
          alt="프로필"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>

      {/* 입력창 + 전송 버튼 */}
      <div className="relative flex-1 items-center pr-3">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          className="h-10 w-full rounded-full bg-[#F3F4F6] px-4 text-sm placeholder-[#c3c3c3] focus:outline-none"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>
        <CircleArrowUp size={24} className="mr-4" />
      </button>
    </div>
  );
}

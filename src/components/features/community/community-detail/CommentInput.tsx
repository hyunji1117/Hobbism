'use client';

import Image from 'next/image';
import { CircleArrowUp } from 'lucide-react';
import { useActionState } from 'react';
import { createReply } from '@/data/actions/post';
import { useSession } from 'next-auth/react';

interface CommentInputProps {
  profileImage: string;
  postId: number;
}

export default function CommentInput({
  profileImage = '/images/inhwan/profile-default.png',
  postId,
}: CommentInputProps) {
  const [state, formAction, isLoading] = useActionState(createReply, null);
  const { data: session } = useSession();

  return (
    <div className="px-4 py-3">
      <form action={formAction}>
        <input type="hidden" name="_id" value={postId} />
        <input
          type="hidden"
          name="accessToken"
          value={session?.accessToken || ''}
        />{' '}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex-shrink-0">
            <Image
              src={profileImage}
              alt="프로필"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              name="content"
              placeholder="댓글을 입력하세요"
              className="bg-hobbism-white-gray text-hobbism-black placeholder:text-hobbism-tmi-gray01 h-10 w-full rounded-full border-none px-3 text-sm outline-none"
            />
          </div>

          <button type="submit" disabled={isLoading} className="flex-shrink-0">
            <CircleArrowUp size={24} className="text-hobbism-black" />
          </button>
        </div>
        {state?.ok === 0 && (
          <p className="mt-2 text-sm text-red-500">
            {state.errors?.content?.msg || state.message}
          </p>
        )}
      </form>
    </div>
  );
}

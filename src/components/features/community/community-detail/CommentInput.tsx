'use client';

import Image from 'next/image';
import { CircleArrowUp } from 'lucide-react';
import { useActionState } from 'react';
import { createReply } from '@/data/actions/post';
import { useSession } from 'next-auth/react'; // 세션에서 accessToken 가져오기

interface CommentInputProps {
  profileImage: string;
  postId: number;
}

export default function CommentInput({
  profileImage = '/images/inhwan/profile-default.png',
  postId,
}: CommentInputProps) {
  const [state, formAction, isLoading] = useActionState(createReply, null);
  const { data: session } = useSession(); // 세션 데이터 가져오기

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form action={formAction}>
        <input type="hidden" name="_id" value={postId} />
        <input
          type="hidden"
          name="accessToken"
          value={session?.accessToken || ''}
        />

        <div className="flex h-[74px] w-full items-center gap-3 bg-white">
          <div className="h-8 w-8 flex-shrink-0">
            <Image
              src={profileImage}
              alt="프로필"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>

          <div className="relative flex-1 items-center pr-3">
            <textarea
              name="content"
              rows={3}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              placeholder="내용을 입력하세요."
            />
          </div>

          <button type="submit" disabled={isLoading}>
            <CircleArrowUp size={24} className="mr-4" />
          </button>
        </div>

        {state?.ok === 0 && (
          <p className="mt-1 ml-2 text-sm text-red-500">
            {state.errors?.content?.msg || state.message}
          </p>
        )}
      </form>
    </div>
  );
}

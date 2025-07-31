'use client';

import { useActionState } from 'react';
import { createPost } from '@/data/actions/post';
import { useAuthStore } from '@/store/auth.store'; // 영찬님 로그인
import FeedCategorySelect from './FeedCategorySelect';
import FeedContentInput from './FeedContentInput';
import FeedImageUpload from './FeedImageUpload';
import FeedSubmitButton from './FeedSubmitButton';

export default function FeedWriteForm() {
  const [state, formAction, isLoading] = useActionState(createPost, null);

  const { accessToken } = useAuthStore();

  return (
    <form action={formAction}>
      {/* 숨겨진 필드들 */}
      <input type="hidden" name="type" value="community" />
      <input type="hidden" name="accessToken" value={accessToken || ''} />

      <div className="mt-9">
        <FeedImageUpload />
      </div>

      <div className="mt-9">
        <FeedContentInput />
      </div>

      <div className="mt-9">
        <FeedCategorySelect />
      </div>

      <div className="mt-28 text-center">
        <FeedSubmitButton disabled={isLoading} />
      </div>

      {/* 에러 메시지 표시 */}
      {state?.ok === 0 && (
        <div className="mt-4 text-center text-red-500">
          <p>{state.message}</p>
          {state.errors?.content?.msg && <p>{state.errors.content.msg}</p>}
        </div>
      )}
    </form>
  );
}

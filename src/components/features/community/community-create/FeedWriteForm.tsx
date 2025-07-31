'use client';

import { useActionState, useState } from 'react';
import { createPost } from '@/data/actions/post';
import { useAuthStore } from '@/store/auth.store'; // 영찬님 로그인
import FeedCategorySelect from './FeedCategorySelect';
import FeedContentInput from './FeedContentInput';
import FeedImageUpload from './FeedImageUpload';
import FeedSubmitButton from './FeedSubmitButton';
import Modal, { ModalBackdrop, ModalPanel } from '@/components/common/Modal';

export default function FeedWriteForm() {
  const [state, formAction, isLoading] = useActionState(createPost, null);
  const { accessToken } = useAuthStore();

  // 모달 상태 추가
  const [showImageAlert, setShowImageAlert] = useState(false);

  // 폼 제출 전 검증
  const handleSubmit = (formData: FormData) => {
    // 이미지 파일 체크
    const imageFiles = formData.getAll('attach') as File[];

    if (!imageFiles || imageFiles.length === 0 || imageFiles[0].size === 0) {
      setShowImageAlert(true); // ← alert 대신 모달 띄우기
      return;
    }

    // 검증 통과 시 서버 액션 실행
    formAction(formData);
  };

  return (
    <>
      <form action={handleSubmit}>
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

        {state?.ok === 0 && (
          <div className="mt-4 text-center text-red-500">
            <p>{state.message}</p>
            {state.errors?.content?.msg && <p>{state.errors.content.msg}</p>}
          </div>
        )}
      </form>

      {/* 이미지 필수 모달 */}
      {showImageAlert && (
        <Modal onClose={() => setShowImageAlert(false)}>
          <ModalBackdrop />
          <ModalPanel className="w-80 p-6">
            <div className="text-center">
              <p className="mb-4 text-lg font-medium">
                이미지를 선택해주세요
              </p>
              <p className="mb-6 text-sm text-gray-600">이미지가 없으면 등록되지 않습니다</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowImageAlert(false)}
                  className="flex-1 rounded-lg bg-black py-2 text-white"
                >
                  확인
                </button>
              </div>
            </div>
          </ModalPanel>
        </Modal>
      )}
    </>
  );
}
